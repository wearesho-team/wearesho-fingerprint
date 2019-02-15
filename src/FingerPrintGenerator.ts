import Fingerprint2 from "fingerprintjs2";
import Cookies from "js-cookie";

export interface Components {
    resolution: string;
    timezone_offset: number;
    [K: string]: any;
}

export const generate = async (): Promise<{ token: string, components: Components }> => {
    const cookieKey = "bobra.fingerprint";
    const savedToken = Cookies.get(cookieKey);

    const result = await new Promise<{ token: string, components: Components }>((resolve) => {
        try {
            new Fingerprint2().get((token, components) => {
                const targetComponents: Components = {
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
