import { ValueComponents } from "./index";

export const components = (): ValueComponents => ({
    resolution: `${window.outerWidth},${window.outerHeight}`,
    timezone_offset: new Date().getTimezoneOffset(),
});
