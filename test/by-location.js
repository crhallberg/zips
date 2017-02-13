const assert = require('assert');
const zips = require('../index.js');

describe('Valid locations', function() {
  it('correct when spot on', function() {
    let place = zips.getByZipCode('19026');
    let locPlace = zips.getByLocation(place.lat, place.long);
    assert.equal('19026', locPlace.zip);
  });
  it('correct when slightly off', function() {
    let place = zips.getByZipCode('19026');
    let locPlace = zips.getByLocation(place.lat + 0.000001, place.long + 0.000001);
    assert.equal('19026', locPlace.zip);
  });
  it('return multiple closest when asked', function() {
    let count = 3;
    assert.equal(count, zips.getByLocation(38, -90, count).length);
  });
  describe('always return a city when the location is in the US', function() {
    // Safe band: 35 to 40 lat, -120 to -80 long
    // http://www.okatlas.org/okatlas/location/usa/lat-long.gif
    for (let i = 1; i <= 10; i++) {
      const lat  = Math.random() * 5  + 35;
      const long = Math.random() * 40 - 120;
      it ('random US location ' + i + ' (' + lat + ', ' + long + ')', function() {
        assert.ok(zips.getByLocation(lat, long));
      });
    }
  });
});
describe('Invalid locations', function() {
  it('only one parameter', function() {
    assert.equal(null, zips.getByLocation(38));
  });
  it('outside the US should be null (unimplemented)', function() {
    assert.equal(null, zips.getByLocation(34));
  });
});