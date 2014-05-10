/*
 * active-markdown
 * ----------
 * A view that lets you view and edit Markdown blocks
 *
 */

var ActiveMarkdownView = ProcessedEditView.extend({
  initialize: function() {
    ProcessedEditView.prototype.initialize.apply(this, arguments);
    this.InertView = InertMarkdownView;
  }
});
