/* global require */

'use strict';

const commandLineArgs = require('command-line-args');
const {GridFactory} = require('../bin/generator');
const {Stack, Vector3} = require('../bin/classes');
const {printOut} = require('./cmd-line-utils');
const profilerSettings = require('../src/profiler/settings.json');

const config = commandLineArgs([
    {name: 'profile', defaultValue: profilerSettings.default},
    {name: 'lod', type: Number, defaultValue: 0}
]);

const Z_AXIS = new Vector3(0, 0, 1);

const grid = GridFactory(config.profile).generateGrid(config.lod);

const output = tilesStats();

printOut(output);

function tilesStats() {
    const pentaSquares = grid.tiles.slice(0, 12).map(square);
    const hexaSquares = grid.tiles.slice(12).map(square);

    const minPentaSquare = Math.min(...pentaSquares);
    const maxPentaSquare = Math.max(...pentaSquares);

    const minHexaSquare = Math.min(...hexaSquares);
    const maxHexaSquare = Math.max(...hexaSquares);

    hexaSquares.sort();

    return {
        count: grid.tiles.length,
        squares: {
            penta: {
                min: minPentaSquare,
                max: maxPentaSquare
            },
            hexa: {
                min: minHexaSquare,
                max: maxHexaSquare,
                all: hexaSquares
            }
        }
    };
}

function square({corners}) {
    // - get mid-vector - sum all vectors, normalize result;
    const midVector = corners.reduce((accumulator, {vector}) => accumulator.add(vector), new Vector3()).normalize();

    // - get rotation axis between mid-vector and z-axis
    const rotationAxis = Vector3.crossProduct(midVector, Z_AXIS).normalize();

    // - get rotation angle between mid-vector and z-axis
    const rotationAngle = Vector3.angle(midVector, Z_AXIS);

    // - get rotation matrix from mid-vector to z-axis
    const {x, y, z} = rotationAxis;
    const [s, c] = [Math.sin(rotationAngle), Math.cos(rotationAngle)];
    const rotationMatrix = [
        [ x * x * (1 - c) + c,     x * y * (1 - c) - z * s, x * z * (1 - c) + y * s ],
        [ y * x * (1 - c) + z * s, y * y * (1 - c) + c,     y * z * (1 - c) - x * s ],
        [ x * z * (1 - c) - y * s, y * z * (1 - c) + x * s, z * z * (1 - c) + c     ]
    ];

    // - rotate all vectors using rotation matrix
    const rotatedOrigins = corners.map(({vector: {x, y, z}}) => {
        return new Vector3(
            x * rotationMatrix[0][0] + y * rotationMatrix[0][1] + z * rotationMatrix[0][2],
            x * rotationMatrix[1][0] + y * rotationMatrix[1][1] + z * rotationMatrix[1][2]
        );
    });

    // - get tile square by sum of triangle squares - S = (x1y2 — x2y1) / 2
    return Stack.from(rotatedOrigins).reduce((accumulator, {x: fX, y: fY}, index, array) => {
        const {x: tX, y: tY} = array[index + 1];

        return accumulator + Math.abs((fX * tY - tX * fY) / 2);
    }, 0);
}

/**
 0l - 0t + 0c
 1l - 0t + 0c
 2l - 0t + 2c
 3l - 2t + 0c
 4l - 2t + 6c
 5l - 8t + 0c
 6l - 8t + 18c
 7l - 26t+ 0c
 8l - 26t+ 54c

 Nt = Math.pow(3, ((l - 1) / 2) | 0) - 1

 * @param lod
 * @return {number}
 */
function tilesRadius(lod) {
    console.assert(lod % 2, `LOD should be odd, not ${lod}`);

    return Math.pow(3, ((lod - 1) / 2) | 0) - 1;
}

/**
 0l - 0t
 1l - 0t
 2l - 5t
 3l - 5t, 10t
 4l - 5t, 10t, 15t, 20t
 5l - 5t, 10t, 15t, 20t, 25t, 30t, 35t, 40t

 Nt = 5 * Math.pow(2, l - 2)

 * @param radius
 * @return {number}
 */
function tilesBelt(radius) {
    return 5 * radius;
}
