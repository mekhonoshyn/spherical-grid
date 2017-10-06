'use strict';

class Edge {
    constructor(id) {
        Object.assign(this, {
            id,
            corners: new Array(2),
            tiles: new Array(2)
        });
    }
}

export default Edge;
