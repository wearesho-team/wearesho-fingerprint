# Wearesho Fingerprint Generator

## Usage

### Setup

Create instance of generator, set function that generates default fingerprint components:

```typescript
import { FingerprintGenerator } from "@wearesho/fingerprint-generator";

const generator = new FingerprintGenerator(() => ({
    resolution: "1600,900",
    timezone_offset: new Date().getTimezoneOffset(),
    anyOtherComponentKey: "anyOtherComponentValue",
}));
```

### Generate unique fingerprint

```typescript
const fingerprint = await generator.generate();
```
