var mapnik = require('mapnik'),
  defined = require('defined');

/**
 * Assert that two images are similar.
 *
 * @param {Buffer} buffer input buffer
 * @param {Buffer} fixture expectation buffer
 * @param {Object} [options={}]
 * @param {number} [options.diffsize=0.10]
 * @param {number} [options.diffpx=0.02]
 * @param {number} [options.threshold=16]
 * @example
 * t.ifError(imageEqual(result, expectation));
 */
function imageEqual(buffer, fixture, options) {
  options = options || {};

  options.threshold = defined(options.threshold, 16);
  options.diffsize = defined(options.diffsize, 0.10);
  options.diffpx = defined(options.diffpx, 0.02);

  var sizediff = Math.abs(fixture.length - buffer.length) / fixture.length;

  if (sizediff > options.diffsize) {
    return new Error('Image size is too different from fixture: ' + buffer.length + ' vs. ' + fixture.length);
  }

  var expectImage = new mapnik.Image.fromBytesSync(fixture);
  var resultImage = new mapnik.Image.fromBytesSync(buffer);

  // Allow < 2% of pixels to vary by > default comparison threshold of 16.
  var pxThresh = resultImage.width() * resultImage.height() * options.diffpx;
  var pxDiff = expectImage.compare(resultImage, { threshold: options.threshold });

  if (pxDiff > pxThresh) {
    return new Error('Image is too different from fixture: ' + pxDiff + ' pixels > ' + pxThresh + ' pixels');
  }
}

module.exports = imageEqual;
