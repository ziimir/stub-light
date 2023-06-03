import curry from 'lodash/curry';

export namespace Utils {
    console.log('run in namespace');

    export const UTIL_CONST = 'util_const';

    export const fn = curry((a, b) => a + b);
}
