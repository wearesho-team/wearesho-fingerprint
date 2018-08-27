import Fingerprint2 from "fingerprintjs2";
import Cookies from "js-cookie";
import { FingerPrintComponents } from "@wearesho/analytics-frontend/src/interfaces";

export const FingerPrintGenerator = (): Promise<{ token: string, components: FingerPrintComponents }> => {
    return new Promise((resolve) => {
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
            const cookieKey = "bobra.timestamp-finger-print";

            const cookieToken = Cookies.get(cookieKey);

            const targetValue = {
                token: cookieToken || (
                    Date.now()
                    + Math.random().toString().replace(/\./g, "")
                    + Math.random().toString().replace(/\./g, "")
                ).substr(0, 32),
                components: {
                    resolution: `${window.outerWidth},${window.outerHeight}`,
                    timezone_offset: new Date().getTimezoneOffset(),
                }
            };

            Cookies.set(cookieKey, targetValue.token);

            return Promise.resolve(targetValue);
        }
    });
};
