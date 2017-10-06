'use strict';

const proxyHandler = {
    get: (target, property) => {
        const fixedProperty = isInteger(property)
            ? normalizeIndex(+property, target.length)
            : property;

        return target[fixedProperty];
    },
    set: (target, property, value) => {
        const fixedProperty = isInteger(property)
            ? normalizeIndex(+property, target.length)
            : property;

        target[fixedProperty] = value;

        return true;
    }
};

class Stack extends Array {
    constructor(firstArg, ...restArgs) {
        super(firstArg, ...restArgs);

        if (isInteger(firstArg) && !restArgs.length) {
            this.fill(null);
        }

        return new Proxy(this, proxyHandler);
    }
}

export default Stack;

function isInteger(value) {
    return typeof value === 'string'
        ? Number.isInteger(+value)
        : Number.isInteger(value)
}

function normalizeIndex(index, length) {
    return (index % length + length) % length;
}
