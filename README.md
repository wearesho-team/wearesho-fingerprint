# Wearesho Fingerprint Generator

## Installation

```bash
npm i --save @sho-js/fingerprint
```

Peer dependencies:
- [fingerprintjs2](https://github.com/Valve/fingerprintjs2)
- [js-cookie](https://github.com/js-cookie/js-cookie)

## Usage

### Setup and generation

```typescript
import * as FingerPrint from "@sho-js/fingerprint";

// generating token based on random and current timestamp
FingerPrint.simple()
    .then((randomToken) => console.log(randomToken));

// https://github.com/Valve/fingerprintjs2
FingerPrint.fp2()
    .catch(FingerPrint.simple) // fallback to random token on error
    .then((fp2token) => console.log(fp2token));

// https://github.com/js-cookie/js-cookie
FingerPrint.cookie(
    FingerPrint.fp2(), // fallback if no cookie
    "cookie.name",
    { // cookie attributes, see js-cookie for details
        domain: ".wearesho.com",
    }
)
```
