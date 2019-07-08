export * from "./simple";
export * from "./fp2";
export * from "./cookie";
export * from "./components";

export interface Value {
    token: string;
    components: ValueComponents;
}

export interface ValueComponents {
    resolution: string;
    timezone_offset: number;
    [K: string]: any;
}

export interface ValueGenerator {
    (): Promise<Value>;
}
