/*
 * processed-edit-view
 * --------------
 * Some views are processed before they're rendered, like
 * MathJax and Markdown.
 * This is the edit view you should use for those things.
 *
 */

var ProcessedEditView = Marionette.Layout.extend({
  template: gistbookTemplates.processedEditView,

  className: 'processed-edit-view',

  defaults: {
    InertView: undefined
  },

  // Sets our options, binds callback context, and creates
  // a cached model for users to mess around with
  initialize: function(options) {
    var validOptions = _.keys(this.defaults)
    _.extend(this, this.defaults, _.pick(options, validOptions));

    _.bindAll(this,
      'onEdit', 'onMove', 'onDelete',
      'onCancel', 'onUpdate'
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
      this.cachedModel.toJSON()
    );
  },

  // If the user changes the cache and wants to reset it,
  // call this
  _resetCache: function() {
    this.cachedModel.set(
      this.model.toJSON()
    );
  },

  // Update the cache with the latest content of the Ace Editor
  _updateCache: function() {
    this.cachedModel.set('source', this._getEditorValue());
  },

  // Get the value from the ace editor. Very deeply nested. Yikes.
  _getEditorValue: function() {
    return this.getRegion('wrapper').currentView.editor.getValue();
  },

  regions: {
    wrapper: '.gistblock-wrapper'
  },

  onEdit: function() {
    // console.log('The parent has been told to edit');
    // Remove handlers; the child is about to be destroyed
    this.showEdit();
  },

  showPreview: function() {
    this.stopListening();
    this.getRegion('wrapper').show(
      new MenuWrapper({
        InertView: this.InertView,
        model: this.cachedModel
      })
    );
    this.currentView = this.getRegion('wrapper').currentView;
    this._configurePreviewListeners();
  },

  showEdit: function() {
    this.stopListening();
    var region = this.getRegion('wrapper');
    region.show(
      new EditWrapper({
        PreviewView: this.InertView,
        model: this.cachedModel,
        aceEditorOptions: {
          minLines: 4
        },
        parent: this
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

  // When the user cancels editing, first reset the cache to match
  // the saved state. Then, show the preview
  onCancel: function() {
    this._resetCache();
    this.showPreview();
  },

  // When the user updates, first update the cache with the value
  // from the AceEditor. Then persist those changes to the actual model.
  // Finally, take them to the preview view.
  onUpdate: function() {
    this._updateCache();
    this._saveCache();
    this.showPreview();
  },

  // Show the edit view with the InertView as the display
  onRender: function() {
    this.showPreview();
  },

  _configureEditListeners: function() {
    this.listenTo(this.currentView, 'cancel', this.onCancel);
    this.listenTo(this.currentView, 'update', this.onUpdate);
  },

  _configurePreviewListeners: function() {
    this.listenTo(this.currentView, 'edit', this.onEdit);
    this.listenTo(this.currentView, 'delete', this.onDelete);
    this.listenTo(this.currentView, 'move', this.onMove);
  }
});
