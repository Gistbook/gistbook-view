/*
 * edit-wrapper
 * ------------
 * A wrapper for an editable Ace Editor View;
 * It provides the controls to toggle between source/preview,
 * and the buttons to cancel/save the changes
 *
 */

var EditWrapper = Marionette.Layout.extend({
  template: gistbookTemplates.editWrapper,

  className: 'gistblock-editor',

  tagName: 'li',

  // Default values for options
  defaults: {
    // What the tab says that shows the source
    sourceTabText: 'Code',
    PreviewView: undefined,
    // Options to pass along to the ace editor
    aceEditorOptions: {},
    parent: undefined
  },

  serializeData: function() {
    var data = Marionette.ItemView.prototype.serializeData.call(this);
    data.sourceTabText = this.sourceTabText;
    return data;
  },

  // Where to put the InertView, and the 3 menu options
  ui: {
    content: '.gistblock-content',
    code:    '.gistblock-code',
    preview: '.gistblock-preview',
    cancel:  '.gistblock-cancel',
    update:  '.gistblock-update'
  },

  // Respond to clicks; the parent view is listening
  triggers: {
    'click @ui.code':    'code',
    'click @ui.preview': 'preview',
    'click @ui.cancel':  'cancel',
    'click @ui.update':  'update'
  },

  // On preview, update the cache with the changes in the Ace Editor
  // Then, show the preview state
  onPreview: function() {
    if (this.mode === 'preview') {
      return;
    }
    this.mode = 'preview';
    this.transitionUiToPreview();
    this.parent._updateCache();
    this.showPreview();
  },

  onCode: function() {
    if (this.mode === 'code') {
      return;
    }
    this.mode = 'code';
    this.transitionUiToCode();
    this.showEditor();
  },

  transitionUiToPreview: function() {
    this.ui.code.removeClass('active-tab');
    this.ui.preview.addClass('active-tab');
  },

  transitionUiToCode: function() {
    this.ui.preview.removeClass('active-tab');
    this.ui.code.addClass('active-tab');
  },

  getAceEditorView: function() {
    var aceOptions = _.extend(this.aceEditorOptions, {model: this.model});
    return new AceEditorView(aceOptions);
  },

  // Show the Ace Editor in our region
  showEditor: function() {
    var aceEditorView = this.getAceEditorView();
    var region = this.getRegion('content');
    region.show(aceEditorView);
    this.editor = region.currentView.editor;
  },

  // The preview is just an inert math view
  showPreview: function() {
    this.editor.destroy();
    var region = this.getRegion('content');
    delete this.editor;
    region.show(new this.PreviewView({
      model: this.model
    }));
  },

  // Store our options on the object itself.
  // Also set the initial mode to be code.
  initialize: function(options) {
    var validOptions = _.keys(this.defaults)
    _.extend(this, this.defaults, _.pick(options, validOptions));

    this.mode = 'code';
  },

  // Where to render the inert view
  regions: {
    content: '.gistblock-content'
  },

  // Show the editor view on the first render
  onRender: function() {
    this._showMenu();

    this.showEditor();
  },

  // Show or hide each menu item based on options
  _showMenu: function() {
    _.each(this.editOptions, function(val, key) {
      this.ui[key].toggleClass('active-option', val);
    }, this);
  }
});
