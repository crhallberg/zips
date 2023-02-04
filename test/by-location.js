const assert = require('assert');
const zips = require('../index.js');

describe('Valid locations', function() {
  it('correct when spot on', function() {
    let place = zips.getByZipCode('19085');
    let locPlace = zips.getByLocation(place.lat, place.long);
    assert.equal('19085', locPlace.zip);
  });
  it('correct when slightly off', function() {
    let place = zips.getByZipCode('19085');
    let locPlace = zips.getByLocation(place.lat + 0.000001, place.long + 0.000001);
    assert.equal('19085', locPlace.zip);
  });
  it.skip('return multiple closest when asked', function() {
    let count = 3;
    assert.equal(count, zips.getByLocation(41.5, -74.5, count).length);
    // 41 -74 is the most populated quadrant
  });
  const randomLocCount = 1000;
  it('always return a city when the location is in the US (checking ' + randomLocCount + ' random points)', function() {
    // Safe band: 35 to 40 lat, -120 to -80 long
    // http://www.okatlas.org/okatlas/location/usa/lat-long.gif
    for (let i = 1; i <= randomLocCount; i++) {
      const lat  = 35 + Math.random() *  5;   //   35 to  40
      const long = -120 + Math.random() * 40; // -120 to -80
      assert.ok(zips.getByLocation(lat, long), `no zipcodes near ${lat},${long} (${i})`);
    }
  });
});
describe('Invalid locations', function() {
  it('only one parameter', function() {
    assert.equal(null, zips.getByLocation(38));
  });
});
