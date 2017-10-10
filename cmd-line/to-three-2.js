/* global require */

'use strict';

const commandLineArgs = require('command-line-args');
const {GridFactory} = require('../bin/generator');
const {printOut} = require('./cmd-line-utils');
const profilerSettings = require('../src/profiler/settings.json');

const config = commandLineArgs([
    {name: 'profile', defaultValue: profilerSettings.default},
    {name: 'lod', type: Number, defaultValue: 0},
    {name: 'fix', type: Boolean, defaultValue: true}
]);

const grid = GridFactory(config.profile).generateGrid(config.lod);

const output = toThreeJs2();

printOut(output);

function toThreeJs2() {
    const [vectors0, vectors1, vectors2] = [[], [], []];
    const [threeData0, threeData1, threeData2] = [{
        c: 0x00ff00,
        t: [],
        v: []
    },
    {
        c: 0x0000ff,
        t: [],
        v: []
    },
    {
        c: 0xff0000,
        t: [],
        v: []
    }];

    grid.tiles.slice(0, 12).forEach(({corners}) => {
        corners.forEach(({vector}) => {
            vectors0.includes(vector) || vectors0.push(vector);
        });

        threeData0.t.push(corners.map(({vector}) => vectors0.indexOf(vector)));
    });

    grid.tiles.slice(12, 32).forEach(({corners}) => {
        corners.forEach(({vector}) => {
            vectors1.includes(vector) || vectors1.push(vector);
        });

        threeData1.t.push(corners.map(({vector}) => vectors1.indexOf(vector)));
    });

    grid.tiles.slice(32).forEach(({corners}) => {
        corners.forEach(({vector}) => {
            vectors2.includes(vector) || vectors2.push(vector);
        });

        threeData2.t.push(corners.map(({vector}) => vectors2.indexOf(vector)));
    });

    if (config.fix) {
        vectors0.forEach((vector) => {
            vector.normalize();
        });
        vectors1.forEach((vector) => {
            vector.normalize();
        });
        vectors2.forEach((vector) => {
            vector.normalize();
        });
    }

    vectors0.forEach(({x, y, z}) => {
        threeData0.v.push([x, y, z]);
    });

    vectors1.forEach(({x, y, z}) => {
        threeData1.v.push([x, y, z]);
    });

    vectors2.forEach(({x, y, z}) => {
        threeData2.v.push([x, y, z]);
    });

    return [threeData0, threeData1, threeData2];
}
