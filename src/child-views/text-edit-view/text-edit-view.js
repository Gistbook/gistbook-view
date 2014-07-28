/*
 * text-edit-view
 * ---------------
 * Modify text based on a textarea
 *
 */

var TextEditView = Marionette.ItemView.extend({
  template: _.template('<%= source %>'),

  tagName: 'textarea',

  className: 'gistbook-textarea',

  // Get the value of the element
  value: function() {
    return this.el.value;
  }
});
