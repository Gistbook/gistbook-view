/*
 * active-math
 * ----------
 * A view that lets you view and edit LaTeX blocks
 *
 */

var ActiveMathView = Marionette.Layout.extend({
  template: gistbookTemplates.activeMath,

  className: 'gistblock gistblock-math gistblock-active',

  initialize: function() {
    _.bindAll(this,
      'onEdit', 'onMove', 'onDelete',
      'onCode', 'onPreview', 'onCancel', 'onUpdate'
    );
    this._createCache();
  },

  // Store a cached model on the view. The user can manipulate
  // this all they want. If they save the block we will persist
  // it to the model
  _createCache: function() {
    this.cachedModel = new Backbone.Model(
      this.model.toJSON()
    );
  },

  // Call this when the user hits update and wants to save
  // their changes to the model
  _saveCache: function() {
    this.model.set(
      this.model.toJSON()
    );
  },

  // If the user changes the cache and wants to reset it,
  // call this
  _resetCache: function() {
    this.cachedModel.set(
      this.model.toJSON()
    );
  },

  regions: {
    wrapper: '.gistblock-wrapper'
  },

  onEdit: function() {
    console.log('The parent has been told to edit');
    // Remove handlers; the child is about to be destroyed
    this.showEdit();
  },

  showEdit: function() {
    this.stopListening();
    this.getRegion('wrapper').show(
      new MenuWrapper({
        InertView: InertMathView,
        model: this.cachedModel
      })
    );
    this.currentView = this.getRegion('wrapper').currentView;
    this._configurePreviewListeners();
  },

  showPreview: function() {
    this.stopListening();
    var region = this.getRegion('wrapper');
    region.show(
      new EditWrapper({
        model: this.cachedModel
      })
    );
    this.currentView = region.currentView;
    this._configureEditListeners();
  },

  onMove: function() {
    console.log('The parent has been told to move');
  },

  onDelete: function() {
    this.model.collection.remove(this.model);
  },

  onCode: function() {
    console.log('The parent has been told to show the code');
  },

  onPreview: function() {
    console.log('The parent has been told to show the preview');
  },

  onCancel: function() {
    console.log('The parent has been told to cancel');
    this.showPreview();
  },

  onUpdate: function() {
    console.log('The parent has been told to update');
  },

  // Show the edit view with the InertView as the display
  onRender: function() {
    this.showPreview();
    console.log('Rendering', this.currentView.content.currentView.editor.resize(true));
  },

  _configureEditListeners: function() {
    this.listenTo(this.currentView, 'code', this.onCode);
    this.listenTo(this.currentView, 'preview', this.onPreview);
    this.listenTo(this.currentView, 'cancel', this.onCancel);
    this.listenTo(this.currentView, 'update', this.onUpdate);
  },

  _configurePreviewListeners: function() {
    this.listenTo(this.currentView, 'edit', this.onEdit);
    this.listenTo(this.currentView, 'delete', this.onDelete);
    this.listenTo(this.currentView, 'move', this.onMove);
  }
});
