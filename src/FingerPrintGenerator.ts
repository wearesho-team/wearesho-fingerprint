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

export const generateFP2: Generator = (): Promise<FingerPrintData> => {
    return new Promise((resolve: (data: FingerPrintData) => void) => {
        new FingerPrint2().get((token, components) => resolve({
            token,
            components: {
                ...this.defaultComponents,
                ...components,
            },
        }));
    });
};

export const generateTimestamp: Generator = (): Promise<FingerPrintData> => {
    const cookieKey = "bobra.timestamp-finger-print";

    const cookieToken = Cookies.get(cookieKey);

    const targetValue = {
        token: cookieToken || (
            Date.now()
            + Math.random().toString().replace(/\./g, "")
            + Math.random().toString().replace(/\./g, "")
        ).substr(0, 32),
        components: this.defaultComponents,
    };

    Cookies.set(cookieKey, targetValue.token);

    return Promise.resolve(targetValue);
};
