/**
 * Module dependencies.
 */

var Tween = require('tween');
var raf = require('raf');

var html = document.documentElement;

/**
 * Expose `scrollTo`.
 */

module.exports = scrollTo;

/**
 * Scroll to `(0, y)`.
 *
 * @param {Number} y
 * @api public
 */

function scrollTo(y) {
  // scroll positions and duration
  var start = window.pageYOffset || html.scrollTop;
  var end = Math.min(y, html.offsetHeight - window.innerHeight);
  var duration = Math.max(500, Math.abs(start - end));

  // setup tween
  var tween = Tween({ y: start }).to({ y: end })
    .ease('out-expo').duration(duration);

  // scroll
  tween.update(function(progress) {
    window.scrollTo(0, progress.y | 0);
  });

  // handle end
  tween.on('end', function() {
    animate = function() {};
  });

  // animate
  function animate() {
    raf(animate);
    tween.update();
  }

  animate();

  return tween;
}
