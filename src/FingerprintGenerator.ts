import Fingerprint2 from "fingerprintjs2";
import Cookies from "js-cookie";

export interface FingerprintComponents {
    resolution: string;
    timezone_offset: number;

    [K: string]: any;
}

export interface FingerprintData {
    token: string;
    components: FingerprintComponents;
}

export class FingerprintGenerator {
    public static readonly timestampCookieKey = "bobra.timestamp-fingerprint";

    protected generateDefaultComponents: () => FingerprintComponents;

    protected get defaultComponents(): FingerprintComponents {
        return {
            resolution: `${window.outerWidth},${window.outerHeight}`,
            timezone_offset: new Date().getTimezoneOffset(),
            ...this.generateDefaultComponents(),
        }
    }

    public constructor(generateDefaultComponents: () => FingerprintComponents) {
        this.generateDefaultComponents = generateDefaultComponents;
    }

    public generate(): Promise<FingerprintData> {
        return this.generateFP2()
            .catch((error) => {
                console.error(error);
                return this.generateTimestamp();
            });
    }

    protected generateFP2(): Promise<FingerprintData> {
        return new Promise((resolve: (data: FingerprintData) => void) => {
            new Fingerprint2().get((token, components) => resolve({
                token,
                components: {
                    ...this.defaultComponents,
                    ...components,
                },
            }));
        });
    }

    protected generateTimestamp(): FingerprintData {
        const cookieToken = Cookies.get(FingerprintGenerator.timestampCookieKey);

        const targetValue = {
            token: cookieToken || (
                Date.now()
                + Math.random().toString().replace(/\./g, "")
                + Math.random().toString().replace(/\./g, "")
            ).substr(0, 32),
            components: this.defaultComponents,
        };

        Cookies.set(FingerprintGenerator.timestampCookieKey, targetValue.token);

        return targetValue;
    }
}
