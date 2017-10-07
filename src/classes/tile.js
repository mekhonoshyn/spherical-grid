'use strict';

import Corner from './corner';
import Stack from '../utils/stack';
import Vector3 from './vector3';

class Tile {
    constructor(id, edgesCount) {
        Object.assign(this, {
            id,
            edgesCount,
            corners: new Stack(edgesCount),
            edges: new Array(edgesCount),
            tiles: new Stack(edgesCount),
            vector: new Vector3()
        });
    }
    position(instance) {
        switch (instance.constructor) {
            case Corner: {
                return this.corners.indexOf(instance);
            }
            case Tile: {
                return this.tiles.indexOf(instance);
            }
            default: {
                console.error(this, instance, `instance class should be one of the following: ${Corner.name} or ${Tile.name}`);
                return -1;
            }
        }
    }
}

export default Tile;
