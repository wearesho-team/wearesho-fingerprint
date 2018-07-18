import Fingerprint2 from "fingerprintjs2";
import { LoggerInterface } from "./LoggerInterface";

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
    protected logger?: LoggerInterface;
    protected defaultComponents: FingerprintComponents;

    protected get defaultToken(): string {
        return (
            Date.now()
            + Math.random().toString().replace(/\./g, "")
            + Math.random().toString().replace(/\./g, "")
        ).substr(0, 32);
    }

    public constructor(defaultComponents: object = {}, logger?: LoggerInterface) {
        this.logger = logger;

        this.defaultComponents = {
            resolution: `${window.outerWidth},${window.outerHeight}`,
            timezone_offset: new Date().getTimezoneOffset(),
            ...defaultComponents,
        };
    }

    public generate(): Promise<FingerprintData> {
        return new Promise((resolve: (data: FingerprintData) => void) => {
            try {
                new Fingerprint2().get((token, components) => {
                    resolve({
                        token,
                        components: {
                            ...this.defaultComponents,
                            ...components,
                        },
                    });
                });
            } catch (error) {
                this.logger && this.logger.captureException(error);

                resolve({
                    token: this.defaultToken,
                    components: this.defaultComponents,
                });
            }
        });
    }
}
