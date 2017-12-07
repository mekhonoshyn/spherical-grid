'use strict';

import profiler from './profiler/profiler';
import Grid from './classes/grid';
import Stack from './utils/stack';

const x = -0.525731112119133606;
const z = -0.850650808352039932;
const icosahedronVectors = [
    [-x, 0, z],
    [x, 0, z],
    [-x, 0, -z],
    [x, 0, -z],
    [0, z, x],
    [0, z, -x],
    [0, -z, x],
    [0, -z, -x],
    [z, x, 0],
    [-z, x, 0],
    [z, -x, 0],
    [-z, -x, 0]
];
const icosahedronTiles = [
    new Stack(9, 4, 1, 6, 11),
    new Stack(4, 8, 10, 6, 0),
    new Stack(11, 7, 3, 5, 9),
    new Stack(2, 7, 10, 8, 5),
    new Stack(9, 5, 8, 1, 0),
    new Stack(2, 3, 8, 4, 9),
    new Stack(0, 1, 10, 7, 11),
    new Stack(11, 6, 10, 3, 2),
    new Stack(5, 3, 10, 1, 4),
    new Stack(2, 5, 4, 0, 11),
    new Stack(3, 7, 6, 1, 8),
    new Stack(7, 2, 9, 0, 6)
];
const api = {};

export default initializer;

function initializer({profile} = {}) {
    const {entryPoint, utility} = profiler(profile);

    Object.assign(api, {
        generateGrid: entryPoint($generateGrid),
        createNLevelGrid: utility($createNLevelGrid),
        create0LevelGrid: utility($create0LevelGrid),
        subdivideGrid: utility($subdivideGrid),
        addCorner: utility($addCorner),
        addEdge: utility($addEdge)
    });

    return {
        generateGrid: api.generateGrid,
        subdivideGrid: api.subdivideGrid
    };
}

function $generateGrid(lod = 0) {
    return lod
        ? api.createNLevelGrid(lod)
        : api.create0LevelGrid(lod);
}

function $createNLevelGrid(lod = 0) {
    return lod
        ? api.subdivideGrid(api.createNLevelGrid(lod - 1))
        : api.create0LevelGrid(lod);
}

function $create0LevelGrid(lod) {
    const grid = new Grid(lod);
    const {corners: dCorners, tiles: dTiles} = grid;

    let nextEdgeId = 0;

    dTiles.forEach((dTile) => {
        const {id: dTileId, tiles: dTileTiles, vector: dTileVector} = dTile;

        dTileVector.xyz = icosahedronVectors[dTileId];

        for (let k = 0; k < 5; k++) {
            dTileTiles[k] = dTiles[icosahedronTiles[dTileId][k]];
        }
    });

    for (let i = 0; i < 5; i++) {
        api.addCorner(i, grid, 0, icosahedronTiles[0][i + 4], icosahedronTiles[0][i]);
    }

    for (let i = 0; i < 5; i++) {
        api.addCorner(i + 5, grid, 3, icosahedronTiles[3][i + 4], icosahedronTiles[3][i]);
    }

    api.addCorner(10, grid, 10, 1, 8);
    api.addCorner(11, grid, 1, 10, 6);
    api.addCorner(12, grid, 6, 10, 7);
    api.addCorner(13, grid, 6, 7, 11);
    api.addCorner(14, grid, 11, 7, 2);
    api.addCorner(15, grid, 11, 2, 9);
    api.addCorner(16, grid, 9, 2, 5);
    api.addCorner(17, grid, 9, 5, 4);
    api.addCorner(18, grid, 4, 5, 8);
    api.addCorner(19, grid, 4, 8, 1);

    dCorners.forEach((dCorner) => {
        const {corners: dCornerCorners, tiles: dCornerTiles} = dCorner;

        for (let k = 0; k < 3; k++) {
            dCornerCorners[k] = dCornerTiles[k].corners[dCornerTiles[k].position(dCorner) + 1];
        }
    });

    dTiles.forEach((dTile) => {
        const {id: dTileId, edges: dTileEdges} = dTile;

        for (let k = 0; k < 5; k++) {
            if (!dTileEdges[k]) {
                api.addEdge(nextEdgeId++, grid, dTileId, icosahedronTiles[dTileId][k]);
            }
        }
    });

    return grid;
}

function $subdivideGrid({lod: sLod, tiles: sTiles, corners: sCorners}) {
    const dGrid = new Grid(sLod + 1);
    const {corners: dCorners, tiles: dTiles} = dGrid;
    const {length: sTilesCount} = sTiles;
    const {length: sCornersCount} = sCorners;

    let nextCornerId = 0;
    let nextEdgeId = 0;

    for (let i = 0; i < sTilesCount; i++) {
        const {corners: sTileCorners, vector: sTileVector} = sTiles[i];
        const {edgesCount: dTileEdgesCount, tiles: dTileTiles, vector: dTileVector} = dTiles[i];

        dTileVector.xyz = sTileVector;

        for (let k = 0; k < dTileEdgesCount; k++) {
            dTileTiles[k] = dTiles[sTileCorners[k].id + sTilesCount];
        }
    }

    for (let i = 0; i < sCornersCount; i++) {
        const {corners: sCornerCorners, tiles: sCornerTiles, vector: sCornerVector} = sCorners[i];
        const {tiles: dTileTiles, vector: dTileVector} = dTiles[i + sTilesCount];

        dTileVector.xyz = sCornerVector;

        for (let k = 0; k < 3; k++) {
            dTileTiles[2 * k] = dTiles[sCornerCorners[k].id + sTilesCount];
            dTileTiles[2 * k + 1] = dTiles[sCornerTiles[k].id];
        }
    }

    sTiles.forEach((sTile) => {
        const {id: sTileId} = sTile;
        const {id: dTileId, edgesCount: dTileEdgesCount, tiles: dTileTiles} = dTiles[sTileId];

        for (let k = 0; k < dTileEdgesCount; k++) {
            api.addCorner(nextCornerId++, dGrid, dTileId, dTileTiles[k - 1].id, dTileTiles[k].id);
        }
    });

    dCorners.forEach((dCorner) => {
        const {corners: dCornerCorners, tiles: dCornerTiles} = dCorner;

        for (let k = 0; k < 3; k++) {
            dCornerCorners[k] = dCornerTiles[k].corners[dCornerTiles[k].position(dCorner) + 1];
        }
    });

    dTiles.forEach((dTile) => {
        const {id: dTileId, edgesCount: dTileEdgesCount, edges: dTileEdges, tiles: dTileTiles} = dTile;

        for (let k = 0; k < dTileEdgesCount; k++) {
            if (!dTileEdges[k]) {
                api.addEdge(nextEdgeId++, dGrid, dTileId, dTileTiles[k].id);
            }
        }
    });

    return dGrid;
}

function $addCorner(cornerId, {tiles, corners}, tileIndexA, tileIndexB, tileIndexC) {
    const corner = corners[cornerId];
    const tileA = tiles[tileIndexA];
    const tileB = tiles[tileIndexB];
    const tileC = tiles[tileIndexC];

    corner.vector.add(tileA.vector).add(tileB.vector).add(tileC.vector).normalize();

    tileA.corners[tileA.position(tileC)] =
    tileB.corners[tileB.position(tileA)] =
    tileC.corners[tileC.position(tileB)] = corner;

    corner.tiles[0] = tileA;
    corner.tiles[1] = tileB;
    corner.tiles[2] = tileC;
}

function $addEdge(edgeId, {corners, edges, tiles}, tileIndexA, tileIndexB) {
    const edge = edges[edgeId];
    const tileA = tiles[tileIndexA];
    const tileB = tiles[tileIndexB];
    const tileBIndexInTileA = tileA.position(tileB);
    const cornerA = corners[tileA.corners[tileBIndexInTileA].id];
    const cornerB = corners[tileA.corners[tileBIndexInTileA + 1].id];

    tileA.edges[tileBIndexInTileA] =
    tileB.edges[tileB.position(tileA)] =
    cornerA.edges[cornerA.position(cornerB)] =
    cornerB.edges[cornerB.position(cornerA)] = edge;

    edge.tiles[0] = tileA;
    edge.tiles[1] = tileB;

    edge.corners[0] = cornerA;
    edge.corners[1] = cornerB;
}
