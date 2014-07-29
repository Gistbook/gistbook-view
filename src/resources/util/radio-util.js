/*
 * radio-util
 * ----------
 * Utility methods for Backbone.Radio
 *
 */

var radioUtil = {

  // Generate a unique channel name from a collection or a model
  entityChannelName: function(entity) {
    return 'gistbook-' + entity.uniqueId;
  },

  // Get the channel from an entity
  entityChannel: function(entity) {
    return Radio.channel(radioUtil.entityChannelName(entity));
  }
};
