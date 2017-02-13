const assert = require('assert');
const zips = require('../index.js');

describe('Valid zipcodes', function() {
  it('should return cities that match', function() {
    let place = zips.getByZipCode('19026');
    assert.equal('19026', place.zip);
    assert.equal('Drexel Hill', place.city);
    assert.equal('PA', place.state);
  });
  it('should fix dropped zeros', function() {
    let place = zips.getByZipCode(08848); // Milford, NJ
    assert.equal('08848', place.zip);
    let place2 = zips.getByZipCode(00501); // Holtsville, NY
    assert.equal('01234', place2.zip);
  });
});

describe('Invalid zipcodes', function() {
  it('"zipcodes" that aren\'t 5 long should get rejected', function() {
    assert.equal(null, zips.getByZipCode('12'));
    assert.equal(null, zips.getByZipCode('123456'));
    assert.equal(null, zips.getByZipCode(123456));
  });
  it('padding 0 should not invent new places', function() {
    assert.equal(null, zips.getByZipCode(123));
  });
  it('decimal formats return null', function() {
    assert.equal(null, zips.getByZipCode(12.45));
    assert.equal(null, zips.getByZipCode('12.45'));
    assert.equal(null, zips.getByZipCode('12345.1234'));
  });
  it('non-numerical formats return null', function() {
    assert.equal(null, zips.getByZipCode('12a45'));
    assert.equal(null, zips.getByZipCode('O1234'));
    assert.equal(null, zips.getByZipCode('apple'));
  });
});