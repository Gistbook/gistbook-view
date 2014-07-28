/*
 * radio-util
 * ----------
 * Utility methods for Backbone.Radio
 *
 */

var radioUtil = {

  // Generate a unique channel name from a collection or a model
  channelName: function(entity) {
    entity = entity instanceof Backbone.Model ? entity.collection : entity;
    return 'gistbook-' + entity.uniqueId;
  }
};
