const { QuadTree, Rectangle, Point } = require("ct-quadtree");
const quad = new QuadTree(new Rectangle(0, 0, 180, 360), 4);

var lineReader = require("readline").createInterface({
    input: require("fs").createReadStream("data/US.txt"),
});

lineReader.on("line", function(line) {
    parts = line.split("\t");
    quad.insert(
        new Point(parts[9], parts[10], {
            zipcode: parts[1],
            city: parts[2],
            state: parts[3],
        })
    );
});

lineReader.on("close", function() {
    require("fs").writeFileSync("../data/us-tree.json", JSON.stringify(quad.toJSON()));
});
