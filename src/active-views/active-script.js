/*
 * active-math
 * ----------
 * A view that lets you edit and execute Javascript
 *
 */

var ActiveJavascriptView = Marionette.ItemView.extend({
  template: _.template('<%= source %>'),

  className: 'gistblock gistblock-javascript',

  onRender: function() {
    var editor = ace.edit(this.el);
    var session = editor.getSession();
    var renderer = editor.renderer;
    session.setTabSize(2);
    session.setUseSoftTabs(true);
    editor.setHighlightActiveLine(false);
    editor.setShowPrintMargin(true);
    editor.getSession().setMode("ace/mode/javascript");
    editor.setTheme("ace/theme/tomorrow");
    renderer.setShowGutter(false);
  }
});
