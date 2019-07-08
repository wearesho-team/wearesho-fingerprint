import Fingerprint2 from "fingerprintjs2";
import { Value, ValueComponents, ValueGenerator } from "./index";

export const fp2options: Fingerprint2.Options = {
    fonts: {
        swfContainerId: 'fingerprintjs2',
        swfPath: 'flash/compiled/FontList.swf',
        userDefinedFonts: [],
        extendedJsFonts: true,
    },
    excludes: {
        enumerateDevices: true,
        pixelRatio: true,
        doNotTrack: true,
        userAgent: true,
        fontsFlash: true,
    },
    screen: {
        detectScreenOrientation: false,
    },
};

export const fp2 = (options: Fingerprint2.Options = fp2options): Promise<Value> =>
    Fingerprint2.getPromise(options)
        .then((result) => {
            const components = result.reduce((obj, {key, value}) => {
                obj[key] = value;
                return obj;
            }, {}) as ValueComponents;
            const token = Fingerprint2.x64hash128(
                result.map(({value}) => value).join(""),
                31
            );

            return { token, components };
        });
