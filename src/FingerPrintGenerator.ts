import Fingerprint2 from "fingerprintjs2";
import Cookies from "js-cookie";
import { FingerPrintComponents } from "@wearesho/analytics-frontend/src/interfaces";

export const FingerPrintGenerator = async (): Promise<{ token: string, components: FingerPrintComponents }> => {
    const cookieKey = "bobra.fingerprint";
    const savedToken = Cookies.get(cookieKey);

    const result = await new Promise<{ token: string, components: FingerPrintComponents }>((resolve) => {
        try {
            new Fingerprint2().get((token, components) => {
                const targetComponents: FingerPrintComponents = {
                    resolution: `${window.outerWidth},${window.outerHeight}`,
                    timezone_offset: new Date().getTimezoneOffset(),
                };

                components.forEach(({ key, value }) => targetComponents[key] = value);

                resolve({
                    token,
                    components: targetComponents,
                });
            });
        } catch (error) {
            const targetValue = {
                token: (
                    Date.now()
                    + Math.random().toString().replace(/\./g, "")
                    + Math.random().toString().replace(/\./g, "")
                ).substr(0, 32),
                components: {
                    resolution: `${window.outerWidth},${window.outerHeight}`,
                    timezone_offset: new Date().getTimezoneOffset(),
                }
            };

            return Promise.resolve(targetValue);
        }
    });

    if (savedToken) {
        result.token = savedToken;
    }

    Cookies.set(cookieKey, result.token);

    return result;
};
