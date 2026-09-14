#!/usr/bin/env python3
"""Verify suggestpage site/{siteId}/{token} HMAC tokens. Reads key from shared path."""
from __future__ import annotations
import sys, json, hmac, hashlib, base64, time
from pathlib import Path

KEY_PATH = Path("/home/box/agent-data/shared/suggestpage-hmac.key")

def b64url_decode(s: str) -> bytes:
    pad = "=" * (-len(s) % 4)
    return base64.urlsafe_b64decode(s + pad)

def verify(token: str, key: bytes):
    try:
        body_b64, sig_b64 = token.split(".", 1)
    except ValueError:
        return {"ok": False, "error": "malformed"}
    raw = b64url_decode(body_b64)
    sig = b64url_decode(sig_b64)
    expect = hmac.new(key, raw, hashlib.sha256).digest()
    if not hmac.compare_digest(sig, expect):
        return {"ok": False, "error": "bad_signature"}
    payload = json.loads(raw.decode())
    if int(payload.get("exp", 0)) < time.time():
        return {"ok": False, "error": "expired", "payload": payload}
    return {"ok": True, "payload": payload}

def main(argv):
    if len(argv) < 2:
        print("usage: verify_site_token.py <token> | <siteId> <token>", file=sys.stderr)
        return 2
    key = KEY_PATH.read_bytes().strip()
    if len(argv) == 2:
        token = argv[1]
        site_id = None
    else:
        site_id, token = argv[1], argv[2]
    # allow full path fragments
    if "/" in token:
        parts = [p for p in token.split("/") if p]
        if "site" in parts:
            i = parts.index("site")
            if len(parts) >= i + 3:
                site_id = parts[i + 1]
                token = parts[i + 2]
    result = verify(token, key)
    if site_id and result.get("ok") and result["payload"].get("siteId") != site_id:
        result = {"ok": False, "error": "siteId_mismatch", "payload": result.get("payload")}
    print(json.dumps(result))
    return 0 if result.get("ok") else 1

if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
