/*
 * radio-shim
 * ----------
 * Safely use Backbone.Radio in place of Wreqr.
 *
 */

Marionette.Application.prototype._initChannel = function () {
  this.channelName = _.result(this, 'channelName') || 'global';
  this.channel = _.result(this, 'channel') || Radio.channel(this.channelName);
}
