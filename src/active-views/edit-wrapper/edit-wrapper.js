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

  // Default values for options
  defaults: {
    // What the tab says that shows the source
    sourceTabText: 'Code',
    // Options to pass along to the ace editor
    aceEditorOptions: {}
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

  // Store our options on the object itself
  initialize: function(options) {
    var validOptions = _.keys(this.defaults)
    _.extend(this, this.defaults, _.pick(options, validOptions));
  },

  // Where to render the inert view
  regions: {
    content: '.gistblock-content'
  },

  // Show the inert view after rendering
  onRender: function() {
    this._showMenu();
    var region = this.getRegion('content');
    var options = _.extend(this.aceEditorOptions, {model: this.model});
    region.show(new AceEditorView(options));
  },

  // Show or hide each menu item based on options
  _showMenu: function() {
    _.each(this.editOptions, function(val, key) {
      this.ui[key].toggleClass('active-option', val);
    }, this);
  }
});
