/*
 * menu-wrapper
 * ------------
 * A wrapper for an Inert View;
 * It provides controls for editing
 *
 *
 */

var MenuWrapper = Marionette.Layout.extend({
  template: gistbookTemplates.menuWrapper,

  className: 'gistblock-menu',

  // Default values for options
  defaults: {
    InertView: undefined,
    editOptions: {
      edit: true,
      delete: true,
      move: true
    }
  },

  // Where to put the InertView, and the 3 menu options
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
    region.show(new this.InertView({
      model: this.model
    }));
  },

  // Show or hide each menu item based on options
  _showMenu: function() {
    _.each(this.editOptions, function(val, key) {
      this.ui[key].toggleClass('active-option', val);
    }, this);
  }
});
