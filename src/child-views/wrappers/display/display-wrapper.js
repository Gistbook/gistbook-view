/*
 * display-wrapper
 * ---------------
 * A wrapper for display views that provide the controls
 * to edit the view
 *
 */

var DisplayWrapper = Marionette.LayoutView.extend({
  template: gistbookTemplates.displayWrapper,

  className: 'gistblock-menu',

  menuWrapperOptions: [
    'blockChannel',
    'editOptions'
  ],

  editOptions: {
    edit: true,
    delete: true,
    move: true
  },

  // Where to render the view
  regions: {
    content: '.gistblock-content'
  },

  // Where to put the view, and the 3 menu options
  ui: {
    content: '.gistblock-content',
    edit: '.gistblock-edit',
    move: '.gistblock-move',
    delete: '.gistblock-delete'
  },

  // Respond to clicks; the parent view is listening
  triggers: {
    'click @ui.edit': 'edit',
    'click @ui.move': 'move',
    'click @ui.delete': 'delete'
  },

  // Store our options on the object itself
  initialize: function(options) {
    this.mergeOptions(options, this.menuWrapperOptions);
  },

  getDisplayView: function() {
    return this.blockChannel.request('displayView', {
      model: this.model
    });
  },

  // Show the inert view after rendering
  onRender: function() {
    this._showMenu();
    var region = this.getRegion('content');
    var displayView = this.getDisplayView();
    region.show(displayView);
  },

  // Show or hide each menu item based on options
  _showMenu: function() {
    _.each(this.editOptions, function(val, key) {
      this.ui[key].toggleClass('active-option', val);
    }, this);
  }
});
