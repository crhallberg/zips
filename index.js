function getPath(zip) {
  return zip.split('').map((x) => parseInt(x));
}

let zipTree = null;
function getByZipCode(zip) {
  // Validate
  // - Convert to string
  if (typeof zip !== 'string')  zip += '';
  // - Check zip length
  if (zip.length < 5) zip = '00000'.substr(zip.length) + zip;
  else if (zip.length > 5) return null;
  // - Reject non-numeric
  if (zip.match(/\D/)) return null;
  // Load data if not loaded
  if (zipTree === null) {
    zipTree = require('./zip-tree.json');
  }
  const p = getPath(zip + '');
  return zipTree[p[0]] && zipTree[p[0]][p[1]] && zipTree[p[0]][p[1]][p[2]] && zipTree[p[0]][p[1]][p[2]][p[3]] && zipTree[p[0]][p[1]][p[2]][p[3]][p[4]]
    ? zipTree[p[0]][p[1]][p[2]][p[3]][p[4]]
    : null;
}

let locTree = null;
function distance(lat, long, op) {
  return Math.pow(lat - op.lat, 2) + Math.pow(long - op.long, 2);
}
function getByLocation(lat, long, count) {
  // Validate
  if (typeof long === 'undefined') return null;
  if (locTree === null) {
    locTree = require('./loc-tree.json');
  }
  let latPath  = Math.floor(Math.abs(lat)  * 10);
  let longPath = Math.floor(Math.abs(long) * 10);
  if (longPath < 1000) {
    longPath = '0' + longPath;
  }
  const p = getPath(latPath + '' + longPath);
  let curr = locTree.points;
  for (let i = 0; i < p.length; i++) {
    if (!curr[p[i]]) {
      return null;
    }
    curr = curr[p[i]];
  }
  // Return 1
  if (!count || count === 1) {
    let d = distance(lat, long, locTree.index[curr[0]]);
    let index = 0;
    for (let i = 1; i < curr.length; i++) {
      let nd = distance(lat, long, locTree.index[curr[i]]);
      if (nd < d) {
        d = nd;
        index = i;
      }
    }
    return locTree.index[curr[index]];
  } else {
    // Return multiple
    curr = curr.map((op) => {
      let place = locTree.index[op];
      place.distance = distance(lat, long, place);
      return place;
    });
    return curr.sort((a, b) => a.distance - b.distance).slice(0, count);
  }
}

module.exports = {
  getByLocation: getByLocation,
  getByZipCode: getByZipCode
};
