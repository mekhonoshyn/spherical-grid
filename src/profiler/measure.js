/* global global, performance */

'use strict';

export {
    entryPoint,
    utility
};

function entryPoint(fn) {
    return profiler(fn);
}

function utility(fn) {
    return profiler(fn);
}

function profiler(fn) {
    const DEFAULT_META = {times: 0, total: 0, mean: 0};
    const {name} = fn;

    return (...args) => {
        const [probablyMeta = {$$meta: 0}] = args.slice(-1);
        const params = probablyMeta.$$meta ? args.slice(0, -1) : args;

        if (probablyMeta.$$meta) {
            if (!probablyMeta.args) {
                probablyMeta.args = args.slice(0, -1);
            }

            if (!probablyMeta.times) {
                probablyMeta.times = 0;
            }

            global.gridMeta = probablyMeta;

            if (!probablyMeta.startTime) {
                probablyMeta.startTime = performance.now();
            }
        }

        const startTime = performance.now();
        const result = fn(...params);
        const endTime = performance.now();

        const meta = global.gridMeta || {};

        if (!meta[name]) {
            meta[name] = Object.assign({}, DEFAULT_META);
        }

        meta[name].times++;
        meta[name].total += endTime - startTime;
        meta[name].mean = meta[name].total / meta[name].times;

        if (probablyMeta.$$meta) {
            probablyMeta.endTime = performance.now();
            probablyMeta.totalTime = probablyMeta.endTime - probablyMeta.startTime;
            probablyMeta.times++;
            probablyMeta.meanTime = probablyMeta.totalTime / probablyMeta.times;

            delete global.gridMeta;
        }

        return result;
    };
}
