import Cookies, { CookieAttributes } from "js-cookie";
import { components, Value, ValueGenerator } from "./index";
import { simple } from "./simple";

export const cookie = (
    fallback: ValueGenerator = simple,
    cookieName: string = "wearesho.fp",
    options?: CookieAttributes
): Promise<Value> => Promise.resolve(Cookies.get(cookieName))
        .then((token) => {
            if (token) {
                return {
                    token,
                    components: components(),
                };
            }

            const value = fallback();
            Cookies.set(cookieName, options);
            return value;
        });
