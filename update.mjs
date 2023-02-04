import fs from "node:fs";
import readline from "node:readline";

import KDTree from "./src/kd-tree.mjs";

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

const kdt = new KDTree("lat", "long");

const rl = readline.createInterface({
  input: fs.createReadStream("./US.txt"),
});

rl.on("line", (line) => kdt.insert(parseRow(line)));

rl.on("close", () => {
  // re-build in tree order
  // reduces filesize by ~3%
  const order = kdt.toArray();
  kdt.clear();
  order.forEach((p) => kdt.insert(p));

  fs.writeFileSync(
    "./data/loc-tree.json",
    kdt.export(),
    "UTF8"
  );

  console.log("DONE");
});
