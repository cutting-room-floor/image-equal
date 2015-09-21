var test = require('tape'),
  path = require('path'),
  fs = require('fs'),
  imageEqual = require('../');

test('imageEqual', function(t) {

  t.ifError(imageEqual(
    fs.readFileSync(path.join(__dirname, '/input/identical.png')),
    fs.readFileSync(path.join(__dirname, '/output/identical.png'))),
    'images are equal');

  t.equal(imageEqual(
    fs.readFileSync(path.join(__dirname, '/input/sizediff.png')),
    fs.readFileSync(path.join(__dirname, '/output/sizediff.png'))).message,
    'Image size is too different from fixture: 15118 vs. 22175',
    'image size fails');

  t.equal(imageEqual(
    fs.readFileSync(path.join(__dirname, '/input/color.png')),
    fs.readFileSync(path.join(__dirname, '/output/color.png'))).message,
    'Image is too different from fixture: 366705 pixels > 8847.36 pixels',
    'image size option');

  t.end();
});
