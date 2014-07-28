/*
 * cache-controller
 * ----------------
 * A Gistbook-View works with a cache of a gistbook, so that
 * user's changes aren't updated on the fly. Use the GistbookView API
 * to persist the changes to the original data.
 *
 */

var CacheController = Marionette.Controller.extend({

  initialize: function(options) {
    _.bindAll(this, '_addBlock');
    this.collection = options.collection;
    this.gistbookCh = radio.channel(channelName(this.collection));
    this._configureListeners();
  },

  _configureListeners: function() {
    this.listenTo(this.gistbookCh.vent, 'add:block', this._addBlock);
  },

  _addBlock: function(type, model) {
    var index = this.collection.indexOf(model);
    if (index === -1) {
      return;
    }

    // Create a new block
    var newBlock = new Backbone.Model({
      type: type,
      source: ''
    });
    
    // Adds the block
    this.collection.add(newBlock, {
      at: index
    });
  }
});
