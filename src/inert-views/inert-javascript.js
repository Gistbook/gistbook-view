/*
 * inert-javascript-view
 * ---------------------
 * Simply a read-only AceEditorView
 *
 */

var InertJavascriptView = AceEditorView.extend({
  initialize: function() {
    AceEditorView.prototype.initialize.apply(this, arguments);
    this.readOnly = true;
  }
});
