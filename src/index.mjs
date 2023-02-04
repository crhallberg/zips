import KDTree from "./kd-tree.mjs";

let zipTree = null;
export function getByZipCode(_zip) {
    // Cast to string
    let zip = String(_zip);
    // Validate
    // - Check zip length
    if (zip.length < 5) {
        zip = "00000".substr(zip.length) + zip;
    } else if (zip.length > 5) {
        return null;
    }
    // - Reject non-numeric
    if (zip.match(/\D/)) {
        return null;
    }
    // Load data if not loaded
    if (zipTree === null) {
        zipTree = require("../data/zip-tree.json");
    }
    const p = zip.split("").map(x => parseInt(x, 10));
    const place =
        zipTree[p[0]] &&
        zipTree[p[0]][p[1]] &&
        zipTree[p[0]][p[1]][p[2]] &&
        zipTree[p[0]][p[1]][p[2]][p[3]] &&
        zipTree[p[0]][p[1]][p[2]][p[3]][p[4]]
            ? zipTree[p[0]][p[1]][p[2]][p[3]][p[4]]
            : null;
    // Octal check
    if (place === null && typeof _zip !== "string" && _zip < 0o7777) {
        return getByZipCode(_zip.toString(8));
    }
    return place;
}

let locTree = null;
export function getByLocation(lat, long) {
    // Validate
    if (
        typeof lat === "undefined" ||
        isNaN(parseInt(lat, 10)) ||
        typeof long === "undefined" ||
        isNaN(parseInt(long, 10))
    ) {
        return null;
    }

    if (locTree === null) {
        const kdData = require("../data/loc-tree.json");
        locTree = new KDTree();
        locTree.import(kdData);
    }

    return locTree.search(lat, long);
}

export default {
    getByLocation,
    getByZipCode,
};
