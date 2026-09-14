# Secure decision links

Email buttons use:

`https://suggestpage.com/site/{siteId}/{token}`

Token format (HMAC-SHA256):

`base64url(json).base64url(hmac)`

JSON fields (sorted keys when minting): `action`, `exp`, `siteId`, `suggestionId`  
`action` is one of `yes`, `no`, `later`. `exp` is unix seconds.

Mint/verify with shared key at `/home/box/agent-data/shared/suggestpage-hmac.key` (never commit the key).
Agent helper: `scripts/verify_site_token.py`.

GitHub Pages serves unknown `/site/...` paths via root `404.html`, which loads this decision UI while keeping the signed URL.
