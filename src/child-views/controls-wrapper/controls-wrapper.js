/*
 * controls-wrapper
 * ----------------
 * Views that can be edited are wrapped in controls that appear on hover.
 * This includes the menu options to create new views above or below the view,
 * as well as the move, delete, and edit menu options. This is the view
 * wrapper that provides those tools.
 *
 */

var ControlsWrapper = Marionette.LayoutView.extend({
  template: gistbookTemplates.controlsWrapper,

  className: 'controls-wrapper-view',

  tagName: 'li',

  defaults: {
    InertView: undefined,
    initialMode: 'inert',
    editOptions: {
      edit: true,
      delete: true,
      move: true
    }
  },

  regions: {
    wrapper: '.gistblock-wrapper'
  },

  ui: {
    addText: '.add-text',
    addJavascript: '.add-javascript'
  },

  triggers: {
    'click @ui.addText': 'add:text',
    'click @ui.addJavascript': 'add:javascript'
  },

  // Sets our options, binds callback context, and creates
  // a cached model for users to mess around with
  initialize: function(options) {
    var validOptions = _.keys(this.defaults)
    _.extend(this, this.defaults, _.pick(options, validOptions));

    _.bindAll(this,
      'onEdit', 'onDelete',
      'onCancel', 'onUpdate',
      'onAddText', 'onAddJavascript'
    );

    this._createCache();
    this.gistbookCh = radio.channel(channelName(this.model));
  },

  onEdit: function() {
    this.showActive();
  },

  // Refactor to use the channel
  onDelete: function() {
    this.model.collection.remove(this.model);
  },

  // When the user cancels editing, first reset the cache to match
  // the saved state. Then, show the preview
  onCancel: function() {
    this._resetCache();
    this.showInert();
  },

  onAddText: function() {
    this.gistbookCh.vent.trigger('add:block', 'text', this.model);
  },

  onAddJavascript: function() {
    this.gistbookCh.vent.trigger('add:block', 'javascript', this.model);
  },

  showInert: function() {
    this.stopListening();
    var menuWrapper = this.getMenuWrapper();
    this.getRegion('wrapper').show(menuWrapper);
    this.currentView = menuWrapper;
    this._configurePreviewListeners();
  },

  showActive: function() {
    this.stopListening();
    var region = this.getRegion('wrapper');
    var editWrapper = this.getEditWrapper();
    region.show(editWrapper);
    this.currentView = editWrapper;
    this._configureEditListeners();
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
    this.initialMode === 'active' ? this.showActive() : this.showInert();
  },

  getMenuWrapper: function() {
    return new MenuWrapper({
      InertView: this.InertView,
      editOptions: this.editOptions,
      model: this.cachedModel
    });
  },

  getEditWrapper: function() {
    return new EditWrapper({
      PreviewView: this.InertView,
      model: this.cachedModel,
      aceEditorOptions: {
        minLines: 4
      },
      parent: this
    });
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
    this.model.set(this.cachedModel.toJSON());
  },

  // If the user changes the cache and wants to reset it,
  // call this
  _resetCache: function() {
    this.cachedModel.set(this.model.toJSON());
  },

  // Update the cache with the latest content of the text editor
  _updateCache: function() {
    var cachedSource = this.getRegion('wrapper').currentView.cache;
    this.cachedModel.set('source', cachedSource);
  },

  _configureEditListeners: function() {
    this.listenTo(this.currentView, 'cancel', this.onCancel);
    this.listenTo(this.currentView, 'update', this.onUpdate);
  },

  _configurePreviewListeners: function() {
    this.listenTo(this.currentView, 'edit', this.onEdit);
    this.listenTo(this.currentView, 'delete', this.onDelete);
  }
});
