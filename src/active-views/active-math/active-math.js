/*
 * active-math
 * ----------
 * A view that lets you view and edit LaTeX blocks
 *
 */

var ActiveMathView = ProcessedEditView.extend({
  initialize: function() {
    ProcessedEditView.prototype.initialize.apply(this, arguments);
    this.InertView = InertMathView;
  }
});
