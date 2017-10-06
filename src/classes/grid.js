'use strict';

import Corner from 'corner';
import Edge from 'edge';
import Tile from 'tile';

class Grid {
    constructor(lod) {
        Object.assign(this, {
            lod,
            corners: createCorners(lod),
            edges: createEdges(lod),
            tiles: createTiles(lod)
        });
    }
    static cornersCount(lod) {
        return 20 * Math.pow(3, lod);
    }
    static edgesCount(lod) {
        return 30 * Math.pow(3, lod) + 2;
    }
    static tilesCount(lod) {
        return 10 * Math.pow(3, lod) + 2;
    }
}

export default Grid;

function createCorners(lod) {
    const cornersCount = Grid.cornersCount(lod);

    return new Array(cornersCount).fill(0).map((item, index) => new Corner(index));
}

function createEdges(lod) {
    const edgesCount = Grid.edgesCount(lod);

    return new Array(edgesCount).fill(0).map((item, index) => new Edge(index));
}

function createTiles(lod) {
    const tileCount = Grid.tilesCount(lod);

    return new Array(tileCount).fill(0).map((item, index) => new Tile(index, index < 12 ? 5 : 6));
}
