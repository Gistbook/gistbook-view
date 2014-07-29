/*
 * ace-editor-view
 * ---------------
 * A view for the ace editor. Used for both
 * inert and active views.
 *
 */

var AceEditorView = Marionette.ItemView.extend({
  template: gistbookTemplates.aceEditorView,

  // Defaults for the Ace Editor
  readOnly: false,
  tabSize: 2,
  softTabs: true,
  highlightActiveLine: false,
  theme: 'tomorrow',
  mode: 'javascript',
  minLines: 5,
  maxLines: 20,
  hideCursor: false,
  showGutter: false,

  aceEditorViewOptions: [
    'readOnly',
    'tabSize',
    'softTabs',
    'highlightActiveLine',
    'theme',
    'mode',
    'minLines',
    'maxLines',
    'hideCursor',
    'showGutter'
  ],

  ui: {
    aceContainer: '.ace-editor'
  },

  // Merge the options
  initialize: function(options) {
    this.mergeOptions(options, this.aceEditorViewOptions);
  },

  // Create the editor and configure it
  onRender: function() {
    this.editor = ace.edit(this.ui.aceContainer[0]);
    this._configureEditor();
  },

  // Clean up the editor before we close the view down
  onBeforeDestroy: function() {
    this.editor.destroy();
  },

  // Configure the editor based on our options
  _configureEditor: function() {
    var themePath = this._getThemePath(this.theme);
    var modePath  = this._getModePath(this.mode);

    var session = this.editor.getSession();
    var renderer = this.editor.renderer;

    this.editor.setHighlightActiveLine(this.highlightActiveLine);
    this.editor.getSession().setMode(modePath);
    this.editor.setTheme(themePath);
    this.editor.setOption("maxLines", this.maxLines);
    this.editor.setOption("minLines", this.minLines);

    this.editor.setReadOnly(this.readOnly);
    session.setTabSize(this.tabSize);
    session.setUseSoftTabs(this.softTabs);
    renderer.setShowGutter(this.showGutter);

    if (this.hideCursor) {
      renderer.$cursorLayer.element.style.opacity = 0;
    }
  },

  // Where ace stores its themes
  _getThemePath: function(themeName) {
    return 'ace/theme/' + themeName;
  },

  // Where ace stores modes
  _getModePath: function(modeName) {
    return 'ace/mode/' + modeName;
  }
});
