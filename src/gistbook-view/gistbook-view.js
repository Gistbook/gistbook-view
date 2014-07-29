/*
 * gistbook-view
 * -------------
 * The publicly exposed view from this library.
 * It is a LayoutView that renders the Gistbook.
 *
 */

var GistbookView = Marionette.LayoutView.extend({
  template: gistbookTemplates.gistbookView,

  ui: {
    container: '.gistbook-container',
    header: '.gistbook-header'
  },

  regions: {
    blocks: '.gistbook-container',
    header: '.gistbook-header'
  },

  className: 'gistbook',

  // Create our collection from the gistbook's blocks
  initialize: function(options) {
    this._createCollection();

    this.titleManager = new TitleManager({
      region: this.getRegion('header'),
      model: this.model
    });
  },

  getBlocksView: function() {
    return new BlocksView({
      collection: this.collection
    });
  },

  onRender: function() {
    this.getRegion('blocks').show(this.getBlocksView());
    this.titleManager.showDisplayTitleView();
  },

  onBeforeDestroy: function() {
    this.titleManager.destroy();

    delete this.collection;
    delete this.titleManager;
  },

  _createCollection: function() {
    var gistblocks = this.model.get('blocks');
    this.collection = new Backbone.Collection(gistblocks);
  }
});
