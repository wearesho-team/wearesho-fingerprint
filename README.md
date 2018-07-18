# Wearesho Fingerprint Generator

## Usage

### Setup

Create instance of generator, set default fingerprint components and [logger](./src/LoggerInterface.ts) (optional):

```typescript
import { FingerprintGenerator } from "@wearesho/fingerprint-generator";
import Raven from "raven-js";

const generator = new FingerprintGenerator({
    resolution: "1600,900",
    timezone_offset: new Date().getTimezoneOffset(),
    anyOtherComponentKey: "anyOtherComponentValue",
}, Raven);
```

### Generate unique fingerprint

```typescript
const fingerprint = await generator.generate();
```
