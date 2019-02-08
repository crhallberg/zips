const { QuadTree, Point } = require("ct-quadtree");
const NS_PER_SEC = 1e9;
function displayHRtime(start) {
    const diff = process.hrtime(start);
    console.log(`\t${(diff[0] * NS_PER_SEC + diff[1]) / 1000000}ms`);
}

console.log("Load US file...");
let start = process.hrtime();
const usJSON = require("../data/us-tree.json");
displayHRtime(start);

console.log("Create US tree...");
start = process.hrtime();
const us = QuadTree.fromJSON(usJSON);
displayHRtime(start);

console.log("Find in US...");
start = process.hrtime();
let home = us.closest(new Point(39.830129, -75.425761), 1, .01);
displayHRtime(start);
console.log(home[0].userData.zipcode);


console.log("\nLoad World file...");
start = process.hrtime();
const worldJSON = require("../data/world-tree.json");
displayHRtime(start);

console.log("Create US tree...");
start = process.hrtime();
const world = QuadTree.fromJSON(worldJSON);
displayHRtime(start);

console.log("Find in World...");
start = process.hrtime();
home = world.closest(new Point(39.830129, -75.425761), 1, .01);
displayHRtime(start);
console.log(home[0].userData.zipcode);
