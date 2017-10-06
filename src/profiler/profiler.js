/* global require */

'use strict';

import settings from './settings.json';

export default initializer;

function initializer(profile = settings.default) {
    if (typeof profile === 'string') {
        if (settings.all.includes(profile)) {
            return require(`./${profile}`);
        } else {
            return require(`./${settings.default}`);
        }
    } else {
        return profile;
    }
}
