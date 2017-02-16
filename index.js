let zipTree = null;
function getByZipCode(_zip) {
  // Cast to string
  let zip = String(_zip);
  // Validate
  // - Check zip length
  if (zip.length < 5) {
    zip = '00000'.substr(zip.length) + zip;
  } else if (zip.length > 5) {
    return null;
  }
  // - Reject non-numeric
  if (zip.match(/\D/)) {
    return null;
  }
  // Load data if not loaded
  if (zipTree === null) {
    zipTree = require('./data/zip-tree.json');
  }
  const p = zip.split('').map(x => parseInt(x, 10));
  const place = zipTree[p[0]] && zipTree[p[0]][p[1]] && zipTree[p[0]][p[1]][p[2]]
    && zipTree[p[0]][p[1]][p[2]][p[3]] && zipTree[p[0]][p[1]][p[2]][p[3]][p[4]]
    ? zipTree[p[0]][p[1]][p[2]][p[3]][p[4]]
    : null;
  // Octal check
  if (place === null && typeof _zip !== 'string' && _zip < 0o7777) {
    return getByZipCode(_zip.toString(8));
  }
  return place;
}

let locTree = null;
function distance(lat, long, op) {
  return Math.sqrt(((lat - op.lat) ** 2) + ((long - op.long) ** 2));
}
function getByLocation(lat, long, count) {
  // Validate
  if (
    typeof lat === 'undefined' || isNaN(parseInt(lat, 10))
    || typeof long === 'undefined' || isNaN(parseInt(long, 10))
  ) {
    return null;
  }
  if (locTree === null) {
    locTree = require('./data/loc-tree.json');
  }
  const latIndex = Math.round(Math.abs(parseFloat(lat, 10)));
  const longIndex = Math.round(Math.abs(parseFloat(long, 10)));
  if (!locTree.zones[latIndex] || !locTree.zones[latIndex][longIndex]) {
    return null;
  }
  const zone = locTree.zones[latIndex][longIndex];
  // Return 1
  if (!count || count === 1) {
    let d = distance(lat, long, locTree.index[zone[0]]);
    let index = 0;
    for (let i = 1; i < zone.length; i += 1) {
      const nd = distance(lat, long, locTree.index[zone[i]]);
      if (nd < d) {
        d = nd;
        index = i;
      }
    }
    return locTree.index[zone[index]];
  }
    // Return multiple
  const sortzone = zone.map((index) => {
    const place = locTree.index[index];
    place.distance = distance(lat, long, place);
    return place;
  });
  return sortzone.sort((a, b) => a.distance - b.distance).slice(0, count);
}

module.exports = {
  getByLocation,
  getByZipCode,
};
