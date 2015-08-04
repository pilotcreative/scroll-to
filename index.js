/**
 * Module dependencies.
 */

var Tween = require('tween');
var raf = require('raf');

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

function scrollTo(y, options) {
  options = options || {};

  // start position
  var start = window.pageYOffset || document.documentElement.scrollTop;

  // setup tween
  var tween = Tween({ top: start })
    .ease(options.ease || 'out-circ')
    .to({ top: y })
    .duration(options.duration || 1000);

  // scroll
  tween.update(function(progress) {
    window.scrollTo(0, progress.top | 0);
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
