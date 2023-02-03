const fs = require('node:fs');
const readline = require('node:readline');

function parseRow(rowStr) {
    const parts = rowStr.split("\t").map((str) => str.trim());
    return {
        country: parts[0],
        zip: parts[1],
        city: parts[2],
        state: parts[4],
        lat: parseFloat(parts[9]),
        long: parseFloat(parts[10]),
    };
}

const locTree = {
    index: [],
    zones: {},
};

const rl = readline.createInterface({ input: fs.createReadStream("./US.txt") });

rl.on("line", (line) => {
    const place = parseRow(line);

    const index = locTree.index.length;
    locTree.index.push(place);

    function addIndex(latIndex, longIndex, index) {
        if (typeof locTree.zones[latIndex] == "undefined") {
            locTree.zones[latIndex] = {};
        }

        if (typeof locTree.zones[latIndex][longIndex] == "undefined") {
            locTree.zones[latIndex][longIndex] = [];
        }

        locTree.zones[latIndex][longIndex].push(index);
    }

    let latIndex = Math.floor(Math.abs(parseFloat(place.lat, 10)));
    let longIndex = Math.floor(Math.abs(parseFloat(place.long, 10)));
    addIndex(latIndex, longIndex, index);

    latIndex = Math.ceil(Math.abs(parseFloat(place.lat, 10)));
    longIndex = Math.ceil(Math.abs(parseFloat(place.long, 10)));
    addIndex(latIndex, longIndex, index);
});

rl.on("close", () => {
    fs.writeFileSync("data/loc-tree.json", JSON.stringify(locTree), "UTF8");

    console.log("DONE");
});
