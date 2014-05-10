/*
 * active-math
 * ----------
 * A view that lets you view and edit LaTeX blocks
 *
 */

var ActiveMathView = Marionette.Layout.extend({
  template: gistbookTemplates.activeMath,

  className: 'gistblock gistblock-math gistblock-active',

  initialize: function() {
    _.bindAll(this, 'onEdit', 'onMove', 'onDelete');
  },

  regions: {
    wrapper: '.gistblock-wrapper'
  },

  onEdit: function() {
    console.log('The parent has been told to edit');
    // Remove handlers; the child is about to be destroyed
    this.stopListening();
    this.getRegion('wrapper').show(
      new MathEditorView({
        model: this.model
      })
    );
  },

  onMove: function() {
    console.log('The parent has been told to move');
  },

  onDelete: function() {
    console.log('The parent has been told to delete');
  },

  // Show the edit view with the InertView as the
  // display
  onRender: function() {
    this.getRegion('wrapper').show(
      new EditView({
        InertView: InertMathView,
        model: this.model
      })
    );
    this.currentView = this.getRegion('wrapper').currentView;
    this._configureListeners();
  },

  _configureListeners: function() {
    this.listenTo(this.currentView, 'edit', this.onEdit);
    this.listenTo(this.currentView, 'delete', this.onDelete);
    this.listenTo(this.currentView, 'move', this.onMove);
  }
});
