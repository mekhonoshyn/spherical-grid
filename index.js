/* global process, require */

'use strict';

/*
* config:
*   -   profile
*   -   output
*   -   format
*   -   help
*   -   lod
*   -   fix
* */

import fs from 'fs';
import generator from './src/generator';

if (require.main === module) {
    const config = process.argv.slice(2).reduce((accumulator, arg) => {
        const [key, value = true] = arg.split('=').filter(Boolean);

        return Object.assign(accumulator, {[key]: value});
    }, {});

    if (typeof config.help !== 'undefined') {
        console.log('show help');

        printOut(config);

        process.exit();
    }

    const grid = generator(config.profile)(config.lod ? parseInt(config.lod) : 0);

    const output = ({tilesStats, toThreeJs}[config.format] || toThreeJs)(grid, config);

    if (typeof config.output === 'string') {
        fs.writeFileSync(config.output, JSON.stringify(output), 'utf8');
    } else {
        printOut(output);
    }
}

export default generator;

function tilesStats(grid, config) {
    return {
        count: grid.tiles.length
    };
}

function toThreeJs(grid, config) {
    const vectors = [];
    const threeData = {
        t: [],
        v: []
    };

    grid.tiles.forEach(({corners}) => {
        corners.forEach(({vector}) => {
            vectors.includes(vector) || vectors.push(vector);
        });

        threeData.t.push(corners.map(({vector}) => vectors.indexOf(vector)));
    });

    if (typeof config.fix === 'string') {
        vectors.forEach((vector) => {
            vector.normalize();
        });
    }

    vectors.forEach(({x, y, z}) => {
        threeData.v.push([x, y, z]);
    });

    return threeData;
}

function printOut(data) {
    console.log(JSON.stringify(data));
}
