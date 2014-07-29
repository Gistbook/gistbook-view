/*
 * radio-util
 * ----------
 * Utility methods for Backbone.Radio
 *
 */

var radioUtil = {

  // Generate a unique channel name from an entity
  entityChannelName: function(entity) {
    entity._uniqueId = entity._uniqueId || _.uniqueId();
    return 'gistbook-' + entity._uniqueId;
  },

  // Get the channel from an entity
  entityChannel: function(entity) {
    return Radio.channel(radioUtil.entityChannelName(entity));
  }
};
