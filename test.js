function toMillis(start) {
  return Math.round(process.hrtime(start)[1] / 1e3) / 1e3;
}

const library = require('./index');
// Zip code
let start = process.hrtime();
library.getByZipCode('08848');
console.log('by zip - cold', toMillis(start), 'ms');
let avgStart = process.hrtime();
for (let i = 0; i < 5; i++) {
  start = process.hrtime();
  library.getByZipCode('19085');
  console.log('by zip - warm', toMillis(start), 'ms');
  start = process.hrtime();
  library.getByZipCode('19026');
  console.log('by zip - warm', toMillis(start), 'ms');
}
console.log('by zip warm avg', toMillis(avgStart) / 10, 'ms');
console.log();

// Location
start = process.hrtime();
library.getByLocation(40.5929, -75.1025);
console.log('by loc - cold', toMillis(start), 'ms');
avgStart = process.hrtime();
for (let i = 0; i < 5; i++) {
  start = process.hrtime();
  library.getByLocation(40.0399, -75.3459);
  console.log('by loc - warm', toMillis(start), 'ms');
  start = process.hrtime();
  library.getByLocation(39.9503, -75.304);
  console.log('by loc - warm', toMillis(start), 'ms');
}
console.log('by loc warm avg', toMillis(avgStart) / 10, 'ms');
