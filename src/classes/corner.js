'use strict';

import Vector3 from './vector3';

class Corner {
    constructor(id) {
        Object.assign(this, {
            id,
            corners: new Array(3),
            edges: new Array(3),
            tiles: new Array(3),
            vector: new Vector3()
        });
    }
    position(instance) {
        switch (instance.constructor) {
            case Corner: {
                return this.corners.indexOf(instance);
            }
            default: {
                console.error(this, instance, `instance class should be one of the following: ${Corner.name}`);
                return -1;
            }
        }
    }
}

export default Corner;
