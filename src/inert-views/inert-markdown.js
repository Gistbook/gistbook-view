/*
 * inert-markdown
 * --------------
 * Displays formatted Markdown.
 *
 */

var InertMarkdownView = Marionette.ItemView.extend({
  template: _.template(''),

  className: 'gistblock gistblock-markdown',

  // After render begin processing the markdown
  onRender: function() {
    var markdown = this.model.get('source');
    var $el = this.$el;
    if (markdown) {
      marked(markdown, function(err, content) {
        $el.html(content);
      })
    }
  }
});
