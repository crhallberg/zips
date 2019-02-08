const { QuadTree, Rectangle, Point } = require("ct-quadtree");
const quad = new QuadTree(new Rectangle(0, 0, 180, 360), 16);

var lineReader = require("readline").createInterface({
    input: require("fs").createReadStream("data/allCountries.txt"),
});

let lastCountry = "moon";
lineReader.on("line", function(line) {
    parts = line.split("\t");
    quad.insert(
        new Point(parts[9], parts[10], {
            zipcode: parts[1],
            city: parts[2],
            state: parts[3],
            country: parts[0],
        })
    );
    if (lastCountry !== parts[0]) {
        console.log(parts[0]);
        lastCountry = parts[0];
    }
});

lineReader.on("close", function() {
    require("fs").writeFileSync("../data/world-tree.json", quad.toJSON(), null, 4);
});
