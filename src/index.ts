import {Utils} from './js/utils';

const {UTIL_CONST, fn} = Utils;

window.addEventListener('DOMContentLoaded', (event) => {
    alert(UTIL_CONST);

    const addOne = fn(1);

    console.log('=============================+>', addOne(3));
});
