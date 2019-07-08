import { components, ValueGenerator } from "./index";

export const simple: ValueGenerator = () => Promise.resolve(
    {
        token: (
            Date.now()
            + Math.random().toString().replace(/\./g, "")
            + Math.random().toString().replace(/\./g, "")
        ).substr(0, 32),
        components: components(),
    }
);
