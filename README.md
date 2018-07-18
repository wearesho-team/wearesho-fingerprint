# Wearesho Fingerprint Generator

## Usage

### Setup

Create instance of generator, set function that generates default fingerprint components:

```typescript
import { FingerPrintGenerator } from "@wearesho/fingerprint-generator";

const generator = new FingerPrintGenerator(() => ({
    resolution: "1600,900",
    timezone_offset: new Date().getTimezoneOffset(),
    anyOtherComponentKey: "anyOtherComponentValue",
}));
```

### Generate unique fingerprint

```typescript
const fingerprint = await generator.generateFP2();
const timestampFingerprint = await generator.generateTimestamp();
```
