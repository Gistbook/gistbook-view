/*
 * to-json shim
 * ------------
 * Marionette v2.x Views use toJSON for serialization. Tsk tsk.
 * This fixes that misuse of toJSON.
 *
 */


Marionette.View.prototype.serializeModel = function(model) {
  model = model || this.model;
  return _.clone(model.attributes);
};

Marionette.ItemView.prototype.serializeCollection = function() {
  return collection.map(function(model){ return this.serializeModel(model); }, this);
};
