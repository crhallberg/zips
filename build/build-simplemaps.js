const { QuadTree, Rectangle, Point } = require("ct-quadtree");
const quad = QuadTree.create(0, 0, 180, 360, 16);

var lineReader = require("readline").createInterface({
    input: require("fs").createReadStream("data/simplemaps/worldcities.csv"),
});

let lastCountry = "moon";
let header = true;
lineReader.on("line", function(line) {
    parts = line.substring(1, line.length - 1).split('","');
    if (header) {
        header = false;
        return;
    }
    quad.insert(
        new Point(parts[2], parts[3], {
            city: parts[0],
            country: parts[4],
            population: parseInt(parts[9] || 0)
        })
    );
    if (lastCountry !== parts[4]) {
        console.log(parts[4]);
        lastCountry = parts[4];
    }
});

lineReader.on("close", function() {
    require("fs").writeFileSync("../data/world-cities.json", JSON.stringify(quad.toJSON()));
});
