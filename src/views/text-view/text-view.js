/*
 * inert-text-view
 * ---------------
 * Displays text, first formatted with Markdown, and then Latex.
 *
 */

var InertTextView = Marionette.ItemView.extend({
  template: _.template(''),

  className: 'gistblock gistblock-text',

  // After render, pass it to MathJax and then Markdown
  onRender: function() {

    var text = this.model.get('source');
    var $el = this.$el;
    var tempText = '';

    if (text) {

      // lol Mathjax API
      $el.html(text);
      MathJax.Hub.Queue(["Typeset",MathJax.Hub,$el[0]]);
      MathJax.Hub.Queue(function() {
        marked($el.html(), function(err, content) {
          $el.html(content);
        });
      });
    }
  }
});
