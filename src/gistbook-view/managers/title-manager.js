/*
 * title-manager
 * -------------
 * This is the manager for the titles. The Gistbook has the
 * region, but it doesn't need to manage the going-ons
 * within that Region. That'd be messy.
 *
 */

var TitleManager = Marionette.Object.extend({
  titleManagerOptions: ['region', 'model'],

  initialize: function(options) {
    _.bindAll(this, '_editHeader');
    this.mergeOptions(options, this.titleManagerOptions);
  },

  getDisplayTitleView: function() {
    return new DisplayTitleView({
      model: this.model,
      editable: Radio.request('auth', 'authorized')
    });
  },

  getEditTitleView: function() {
    return new EditTitleView({
      model: this.model
    });
  },

  showDisplayTitleView: function() {
    this.stopListening();
    var displayTitleView = this.getDisplayTitleView();
    this.region.show(displayTitleView);
    this._setDisplayListeners(displayTitleView);
  },

  showEditTitleView: function() {
    this.stopListening();
    var editTitleView = this.getEditTitleView();
    this.region.show(editTitleView);
    this._setEditListeners(editTitleView);
  },

  _setDisplayListeners: function(displayTitleView) {
    this.listenToOnce(displayTitleView, 'edit', this._editHeader);
  },

  _setEditListeners: function(editTitleView) {
    this.listenToOnce(editTitleView, 'save', this._displayHeader);
    this.listenToOnce(editTitleView, 'cancel', this._displayHeader);
  },

  _editHeader: function() {
    this.showEditTitleView();
  },

  _displayHeader: function() {
    this.showDisplayTitleView();
  },

  onBeforeDestroy: function() {
    delete this.region;
    delete this.model;
  }
});
