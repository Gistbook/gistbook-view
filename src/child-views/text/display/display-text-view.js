/*
 * text-view
 * ---------
 * Displays text, first formatted with Markdown, and then Latex.
 *
 */

var DisplayTextView = Marionette.ItemView.extend({

  // This doesn't need a template, as we're rendering the HTML through
  // Mathjax and Marked. Once Marionette supports template: false; we should
  // use that instead.
  template: _.template(''),

  // They're not always displayed as sole gistblocks, such as
  // when they're rendered in an edit view. For those
  // times, the CSS is overwritten.
  className: 'gistblock gistblock-text',

  // Bind some context when initialized
  initialize: function() {
    _.bindAll(this, '_parseMarked');
  },

  // After render, check if the user has inputted any text. If so,
  // pass it along to be rendered by Mathjax and Marked.
  onRender: function() {
    var text = this.model.escape('source');

    if (!text) {
      return;
    }

    this.$el.html(text);
    this._parseText(text);
  },

  // Parse the text of the element as Mathjax, and then pass it along to Marked.
  _parseText: function(text) {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, this.$el[0]]);
    MathJax.Hub.Queue(this._parseMarked);
  },

  // Parse the element's HTML as Markdown, then set the element's text.
  _parseMarked: function() {
    var $el = this.$el;
    marked($el.html(), function(err, content) {
      $el.html(content);
    });
  }
});
