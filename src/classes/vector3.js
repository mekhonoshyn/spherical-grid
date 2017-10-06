'use strict';

class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        Object.assign(this, {x, y, z});
    }
    set xyz({x: bx = 0, y: by = 0, z: bz = 0, 0: x = bx, 1: y = by, 2: z = bz}) {
        Object.assign(this, {x, y, z});
    }
    get length() {
        const {x, y, z} = this;

        return Math.hypot(x, y, z);
    }
    normalize() {
        return this.constructor.normalize(this, this);
    }
    add(u) {
        return this.constructor.add(this, u, this);
    }
    static eq(v, u) {
        const {x: vx, y: vy, z: vz} = v;
        const {x: ux, y: uy, z: uz} = u;

        return vx === ux && vy === uy && vz === uz;
    }
    static neq(v, u) {
        return !this.eq(v, u);
    }
    static add(v, u, destination = new Vector3()) {
        const {x: vx, y: vy, z: vz} = v;
        const {x: ux, y: uy, z: uz} = u;

        return Object.assign(destination, {x: vx + ux, y: vy + uy, z: vz + uz});
    }
    static subtract(v, u, destination = new Vector3()) {
        const {x: vx, y: vy, z: vz} = v;
        const {x: ux, y: uy, z: uz} = u;

        return Object.assign(destination, {x: vx - ux, y: vy - uy, z: vz - uz});
    }
    static multiply(v, k, destination = new Vector3()) {
        const {x: vx, y: vy, z: vz} = v;

        return Object.assign(destination, {x: vx * k, y: vy * k, z: vz * k});
    }
    static isZero(v) {
        return this.eq(v, ZERO);
    }
    static isParallel(v, u) {
        return this.isZero(this.crossProduct(v, u));
    }
    static normalize(v, destination = new Vector3()) {
        return this.multiply(v, 1 / v.length, destination);
    }
    static crossProduct(v, u) {
        const {x: vx, y: vy, z: vz} = v;
        const {x: ux, y: uy, z: uz} = u;

        return new Vector3(vy * uz - vz * uy, vz * ux - vx * uz, vx * uy - vy * ux);
    }
    static dotProduct(v, u) {
        const {x: vx, y: vy, z: vz} = v;
        const {x: ux, y: uy, z: uz} = u;

        return vx * ux + vy * uy + vz * uz;
    }
    static distance(v, u) {
        return this.subtract(v, u).length;
    }
    static angle(v, u) {
        return Math.acos(this.dotProduct(v, u) / (v.length * u.length));
    }
    static get ZERO() {
        return ZERO;
    }
}

const ZERO = new Vector3();

export default Vector3;
