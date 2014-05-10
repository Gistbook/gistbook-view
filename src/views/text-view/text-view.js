/*
 * inert-text-view
 * ---------------
 * Displays text, first formatted with Markdown, and then Latex.
 *
 */

var InertTextView = Marionette.ItemView.extend({
  template: _.template(''),

  className: 'gistblock gistblock-text',

  // After render begin processing the markdown
  onRender: function() {

    var markdown = this.model.get('source');
    var $el = this.$el;

    if (markdown) {
      marked(markdown, function(err, content) {
        $el.html(content);
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,$el[0]]);
      });
    }
  }
});
