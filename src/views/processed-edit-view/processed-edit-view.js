/*
 * processed-edit-view
 * -------------------
 * The view you use when it's time to edit something
 *
 */

var ProcessedEditView = Marionette.LayoutView.extend({
  template: gistbookTemplates.processedEditView,

  className: 'processed-edit-view',

  tagName: 'li',

  defaults: {
    InertView: undefined,
    editOptions: {
      edit: true,
      delete: true,
      move: true
    }
  },

  ui: {
    addText: '.add-text',
    addJavascript: '.add-javascript'
  },

  triggers: {
    'click @ui.addText': 'add:text',
    'click @ui.addJavascript': 'add:javascript'
  },

  onAddText: function() {
    this.gistbookCh.vent.trigger('add:block', 'text', this.model);
  },

  onAddJavascript: function() {
    this.gistbookCh.vent.trigger('add:block', 'javascript', this.model);
  },

  // Sets our options, binds callback context, and creates
  // a cached model for users to mess around with
  initialize: function(options) {
    var validOptions = _.keys(this.defaults)
    _.extend(this, this.defaults, _.pick(options, validOptions));

    _.bindAll(this,
      'onEdit', 'onMove', 'onDelete',
      'onCancel', 'onUpdate',
      'onAddText', 'onAddJavascript'
    );
    this._createCache();
    this.gistbookCh = radio.channel(channelName(this.model));
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
    var cachedSource = this.getRegion('wrapper').currentView.cache;
    this.cachedModel.set('source', cachedSource);
  },

  regions: {
    wrapper: '.gistblock-wrapper'
  },

  onEdit: function() {
    this.showActive();
  },

  showInert: function() {
    this.stopListening();
    this.getRegion('wrapper').show(
      new MenuWrapper({
        InertView: this.InertView,
        editOptions: this.editOptions,
        model: this.cachedModel
      })
    );
    this.currentView = this.getRegion('wrapper').currentView;
    this._configurePreviewListeners();
  },

  showActive: function() {
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

  // lol...pls refactor to use the channel
  onDelete: function() {
    this.model.collection.remove(this.model);
  },

  // When the user cancels editing, first reset the cache to match
  // the saved state. Then, show the preview
  onCancel: function() {
    this._resetCache();
    this.showInert();
  },

  // When the user updates, first update the cache with the value
  // from the AceEditor. Then persist those changes to the actual model.
  // Finally, take them to the preview view.
  onUpdate: function() {
    this._updateCache();
    this._saveCache();
    this.showInert();
  },

  // Show the edit view with the InertView as the display
  onRender: function() {
    this.showInert();
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
