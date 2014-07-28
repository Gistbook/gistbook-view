/*
 * inert-text-view
 * ---------------
 * Displays text, first formatted with Markdown, and then Latex.
 *
 */

var InertTextView = Marionette.ItemView.extend({
  template: _.template(''),

  className: 'gistblock gistblock-text',

  initialize: function() {
    _.bindAll(this, '_parseMarked');
  },

  // After render, check if the user has inputted any text. If so,
  // pass it along to be rendered by Mathjax and Marked.
  onRender: function() {
    var text = this.model.escape('source');

    if (!text) { return; }

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
