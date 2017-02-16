# zips [![Travis status](https://travis-ci.org/crhallberg/zips.svg?branch=master)](https://travis-ci.org/crhallberg/zips) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/405b20a50b0d4918ac7ee50f3ab1d9cb)](https://www.codacy.com/app/crhallberg/zips?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=crhallberg/zips&amp;utm_campaign=Badge_Grade)
Light, fast, tree-based way to get cities by zipcode and location.

```bash
npm install zips
```

```javascript
const zips = require('zips');
```

U.S. postal codes only. For now.

### zips.getByZipCode(zipcode: string)

If zipcode is found, returns a **place object** with zipcode, city, state, lat, long. Returns `null` if zipcode not found.

### zips.getByLocation(lat: float, long: float)

Returns the closest place object to the specified coordinates.

### Under the hood

**zips** doesn't load its data until the first time a function is called. The longest loading time I've seen is 100ms. After that, sub-millisecond returns can be expected.

### Why?

I saw a lot of zip database modules on npm, but I was displeased with three aspects
 - Old data (zips uses 2010 US Census data from [geonames.org](http://www.geonames.org/), the most up-to-date I could find).
 - Huge, raw data (zips' data is pre-processed so it can just load and go).
 - List searching (zips organizes its data into trees instead of going down a list until a match is found or a large hash table).

I hope you're happy too.
