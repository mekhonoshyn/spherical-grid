'use strict';

import VERTICES from './constants/icosahedron-vertices';
import TILE_TILES from './constants/icosahedron-tile-tiles.json';
import EDGE_TILES from './constants/icosahedron-edge-tiles.json';
import CORNER_TILES from './constants/icosahedron-corner-tiles.json';

import profiler from './profiler/profiler';
import Grid from './classes/grid';

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

    dTiles.forEach((dTile) => {
        const {id: dTileId, tiles: dTileTiles, vector: dTileVector} = dTile;

        dTileVector.xyz = VERTICES[dTileId];

        for (let k = 0; k < 5; k++) {
            dTileTiles[k] = dTiles[TILE_TILES[dTileId][k]];
        }
    });

    CORNER_TILES.forEach((tileIds, cornerId) => {
        api.addCorner(cornerId, grid, ...tileIds);
    });

    dCorners.forEach((dCorner) => {
        const {corners: dCornerCorners, tiles: dCornerTiles} = dCorner;

        for (let k = 0; k < 3; k++) {
            dCornerCorners[k] = dCornerTiles[k].corners[dCornerTiles[k].position(dCorner) + 1];
        }
    });

    EDGE_TILES.forEach((tileIds, edgeId) => {
        api.addEdge(edgeId, grid, ...tileIds);
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
