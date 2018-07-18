import FingerPrint2 from "fingerprintjs2";
import Cookies from "js-cookie";
import { FingerPrintGenerator as Generator } from "@wearesho/analytics-frontend";

export interface FingerPrintComponents {
    resolution: string;
    timezone_offset: number;

    [K: string]: any;
}

export interface FingerPrintData {
    token: string;
    components: FingerPrintComponents;
}

export class FingerPrintGenerator {
    public static readonly timestampCookieKey = "bobra.timestamp-finger-print";

    protected generateDefaultComponents: () => FingerPrintComponents;

    protected get defaultComponents(): FingerPrintComponents {
        return {
            resolution: `${window.outerWidth},${window.outerHeight}`,
            timezone_offset: new Date().getTimezoneOffset(),
            ...this.generateDefaultComponents(),
        }
    }

    public constructor(generateDefaultComponents: () => FingerPrintComponents) {
        this.generateDefaultComponents = generateDefaultComponents;
    }

    public generateFP2: Generator = (): Promise<FingerPrintData> => {
        return new Promise((resolve: (data: FingerPrintData) => void) => {
            new FingerPrint2().get((token, components) => resolve({
                token,
                components: {
                    ...this.defaultComponents,
                    ...components,
                },
            }));
        });
    }

    public generateTimestamp: Generator = (): Promise<FingerPrintData> => {
        const cookieToken = Cookies.get(FingerPrintGenerator.timestampCookieKey);

        const targetValue = {
            token: cookieToken || (
                Date.now()
                + Math.random().toString().replace(/\./g, "")
                + Math.random().toString().replace(/\./g, "")
            ).substr(0, 32),
            components: this.defaultComponents,
        };

        Cookies.set(FingerPrintGenerator.timestampCookieKey, targetValue.token);

        return Promise.resolve(targetValue);
    }
}
