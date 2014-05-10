/*
 * inert-math
 * ----------
 * Displays formatted LaTeX.
 *
 */

var InertMathView = Marionette.ItemView.extend({
  template: _.template('<%= source %>'),

  className: 'gistblock gistblock-math',

  // Wrap our source with delimiters
  serializeData: function() {
    var data = Marionette.ItemView.prototype.serializeData.call( this );
    data.source = this._wrap( data.source );
    return data;
  },

  // On render, we need to tell Mathjax to typeset this element.
  // One day I'll use update if the thing has already been rendered
  onRender: function() {
    var latex = this.model.get('source');
    if (latex) {
      MathJax.Hub.Queue(["Typeset",MathJax.Hub,this.el]);
    }
  },

  // Mathjax uses delimiters to deermine what to process;
  // The default setting for block-level equations is $$
  _delimiter: '$$',

  // Wrap the user's input in those delimiters
  _wrap: function(source) {
    return this._delimiter + source + this._delimiter;
  }
});
