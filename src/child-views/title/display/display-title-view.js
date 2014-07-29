/*
 * display-title-view
 * ------------------
 * The display view for the title.
 *
 */

var DisplayTitleView = Marionette.ItemView.extend({
  template: gistbookTemplates.displayTitleView,

  className: 'display-title-view',

  ui: {
    edit: '.gistbook-title-edit'
  },

  triggers: {
    'click @ui.edit': 'edit'
  },

  editable: false,

  displayTitleViewOptions: ['editable'],

  initialize: function(options) {
    this.mergeOptions(options, this.displayTitleViewOptions);
    this._setClass();
  },

  // Sets whether the view is editable or not.
  _setClass: function() {
    this.$el.toggleClass('editable', this.editable);
  }
});
