
// Generate a channel name from a collection or a model in a collection
window.channelName = function( entity ) {
  entity = entity instanceof Backbone.Model ? entity.collection : entity;
  return 'gistbook-'+entity.uniqueId;
};
