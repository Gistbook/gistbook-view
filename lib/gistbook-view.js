this["gistbookTemplates"] = this["gistbookTemplates"] || {};

this["gistbookTemplates"]["activeMarkdown"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div>\n  active template\n</div>\n';

}
return __p
};

this["gistbookTemplates"]["activeMath"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'gistblock-wrapper\'>\n</div>\n<div class=\'gistbook-row-controls\'>\n  <hr>\n  <ul>\n    <li><a href=\'#\' class=\'add-latex\'><i class=\'fa fa-stop\'></i></a></li>\n    <li><a href=\'#\' class=\'add-markdown\'><i class=\'fa fa-pause\'></i></a></li>\n    <li><a href=\'#\' class=\'add-javascript\'><i class=\'fa fa-forward\'></i></a></li>\n  </ul>\n</div>\n';

}
return __p
};

this["gistbookTemplates"]["editWrapper"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<ul>\n  <li><a href=\'#\' class=\'gistblock-code active-tab\'>' +
((__t = ( sourceTabText )) == null ? '' : __t) +
'</a></li>\n  <li><a href=\'#\' class=\'gistblock-preview\'>Preview</a></li>\n</ul>\n<div class=\'gistblock-content\'></div>\n<div class=\'button-container\'>\n  <button class=\'gistblock-cancel\'>Cancel</button>\n  <button class=\'gistblock-update blue\'>Update</button>\n</div>\n';

}
return __p
};

this["gistbookTemplates"]["menuWrapper"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<a href=\'#\' class=\'gistblock-move\'><i class=\'fa fa-bars\'></i></a>\n<a href=\'#\' class=\'gistblock-edit\'><i class=\'fa fa-pencil\'></i></a>\n<a href=\'#\' class=\'gistblock-delete\'><i class=\'fa fa-trash-o\'></i></a>\n<div class=\'gistblock-content\'></div>\n';

}
return __p
};

(function() {

  var radio = Backbone.Wreqr.radio;

  /*
   * ace-editor-view
   * ---------------
   * A view for the ace editor. Used for both
   * inert and active views
   *
   */
  
  var AceEditorView = Marionette.ItemView.extend({
    template: _.template('<%= source %>'),
  
    // Defaults for the view
    defaults: {
      readOnly: false,
      tabSize: 2,
      softTabs: true,
      highlightActiveLine: false,
      theme: 'tomorrow',
      mode: 'javascript',
      showGutter: false
    },
  
    // Merge the options
    initialize: function(options) {
      var validOptions = _.keys(this.defaults)
      _.extend(this, this.defaults, _.pick(options, validOptions));
    },
  
    // Where ace stores its themes
    _getThemePath: function(themeName) {
      return 'ace/theme/'+themeName;
    },
  
    // Where ace stores modes
    _getModePath: function(modeName) {
      return 'ace/mode/'+modeName;
    },
  
    // Configure the editor based on our options
    _configureEditor: function() {
      // var themePath = this._getThemePath(this.theme);
      // var modePath  = this._getModePath(this.mode);
      //
      // var session = this.editor.getSession();
      // var renderer = this.editor.renderer;
      //
      // this.editor.setHighlightActiveLine(this.highlightActiveLine);
      // this.editor.getSession().setMode(modePath);
      // this.editor.setTheme(themePath);
      // session.setTabSize(this.tabSize);
      // session.setUseSoftTabs(this.softTabs);
      // renderer.setShowGutter(this.showGutter);
    },
  
    // Create the editor and configure it
    onRender: function() {
      this.editor = ace.edit(this.el);
      this._configureEditor();
    },
  
    // Clean up the editor before we close down!
    onBeforeClose: function() {
      this.editor.destroy();
    }
  });
  

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
  

  /*
   * menu-wrapper
   * ------------
   * A wrapper for an Inert View;
   * It provides controls for editing
   *
   *
   */
  
  var MenuWrapper = Marionette.Layout.extend({
    template: gistbookTemplates.menuWrapper,
  
    className: 'gistblock-menu',
  
    // Default values for options
    defaults: {
      InertView: undefined,
      editOptions: {
        edit: true,
        delete: true,
        move: true
      }
    },
  
    // Where to put the InertView, and the 3 menu options
    ui: {
      content: '.gistblock-content',
      edit: '.gistblock-edit',
      move: '.gistblock-move',
      delete: '.gistblock-delete'
    },
  
    // Respond to clicks; the parent view is listening
    triggers: {
      'click @ui.edit': 'edit',
      'click @ui.move': 'move',
      'click @ui.delete': 'delete'
    },
  
    // Store our options on the object itself
    initialize: function(options) {
      var validOptions = _.keys(this.defaults)
      _.extend(this, this.defaults, _.pick(options, validOptions));
    },
  
    // Where to render the inert view
    regions: {
      content: '.gistblock-content'
    },
  
    // Show the inert view after rendering
    onRender: function() {
      this._showMenu();
      var region = this.getRegion('content');
      region.show(new this.InertView({
        model: this.model
      }));
    },
  
    // Show or hide each menu item based on options
    _showMenu: function() {
      _.each(this.editOptions, function(val, key) {
        this.ui[key].toggleClass('active-option', val);
      }, this);
    }
  });
  
  /*
   * edit-wrapper
   * ------------
   * A wrapper for an editable Ace Editor View;
   * It provides the controls to toggle between source/preview,
   * and the buttons to cancel/save the changes
   *
   */
  
  var EditWrapper = Marionette.Layout.extend({
    template: gistbookTemplates.editWrapper,
  
    className: 'gistblock-editor',
  
    // Default values for options
    defaults: {
      // What the tab says that shows the source
      sourceTabText: 'Code',
      // Options to pass along to the ace editor
      aceEditorOptions: {}
    },
  
    serializeData: function() {
      var data = Marionette.ItemView.prototype.serializeData.call(this);
      data.sourceTabText = this.sourceTabText;
      return data;
    },
  
    // Where to put the InertView, and the 3 menu options
    ui: {
      content: '.gistblock-content',
      code:    '.gistblock-code',
      preview: '.gistblock-preview',
      cancel:  '.gistblock-cancel',
      update:  '.gistblock-update'
    },
  
    // Respond to clicks; the parent view is listening
    triggers: {
      'click @ui.code':    'code',
      'click @ui.preview': 'preview',
      'click @ui.cancel':  'cancel',
      'click @ui.update':  'update'
    },
  
    // Store our options on the object itself
    initialize: function(options) {
      var validOptions = _.keys(this.defaults)
      _.extend(this, this.defaults, _.pick(options, validOptions));
    },
  
    // Where to render the inert view
    regions: {
      content: '.gistblock-content'
    },
  
    // Show the inert view after rendering
    onRender: function() {
      this._showMenu();
      var region = this.getRegion('content');
      var options = _.extend(this.aceEditorOptions, {model: this.model});
      region.show(new AceEditorView(options));
    },
  
    // Show or hide each menu item based on options
    _showMenu: function() {
      _.each(this.editOptions, function(val, key) {
        this.ui[key].toggleClass('active-option', val);
      }, this);
    }
  });
  

  /*
   * active-math
   * ----------
   * A view that lets you view and edit LaTeX blocks
   *
   */
  
  var ActiveMathView = Marionette.Layout.extend({
    template: gistbookTemplates.activeMath,
  
    className: 'gistblock gistblock-math gistblock-active',
  
    initialize: function() {
      _.bindAll(this,
        'onEdit', 'onMove', 'onDelete',
        'onCode', 'onPreview', 'onCancel', 'onUpdate'
      );
      this._createCache();
    },
  
    // Store a cached model on the view. The user can manipulate
    // this all they want. If they save the block we will persist
    // it to the model
    _createCache: function() {
      this.cachedModel = new Backbone.Model(
        this.model.toJSON()
      );
    },
  
    // Call this when the user hits update and wants to save
    // their changes to the model
    _saveCache: function() {
      this.model.set(
        this.model.toJSON()
      );
    },
  
    // If the user changes the cache and wants to reset it,
    // call this
    _resetCache: function() {
      this.cachedModel.set(
        this.model.toJSON()
      );
    },
  
    regions: {
      wrapper: '.gistblock-wrapper'
    },
  
    onEdit: function() {
      console.log('The parent has been told to edit');
      // Remove handlers; the child is about to be destroyed
      this.showEdit();
    },
  
    showEdit: function() {
      this.stopListening();
      this.getRegion('wrapper').show(
        new MenuWrapper({
          InertView: InertMathView,
          model: this.cachedModel
        })
      );
      this.currentView = this.getRegion('wrapper').currentView;
      this._configurePreviewListeners();
    },
  
    showPreview: function() {
      this.stopListening();
      var region = this.getRegion('wrapper');
      region.show(
        new EditWrapper({
          model: this.cachedModel
        })
      );
      this.currentView = region.currentView;
      this._configureEditListeners();
    },
  
    onMove: function() {
      console.log('The parent has been told to move');
    },
  
    onDelete: function() {
      this.model.collection.remove(this.model);
    },
  
    onCode: function() {
      console.log('The parent has been told to show the code');
    },
  
    onPreview: function() {
      console.log('The parent has been told to show the preview');
    },
  
    onCancel: function() {
      console.log('The parent has been told to cancel');
      this.showPreview();
    },
  
    onUpdate: function() {
      console.log('The parent has been told to update');
    },
  
    // Show the edit view with the InertView as the display
    onRender: function() {
      this.showPreview();
      console.log('Rendering', this.currentView.content.currentView.editor.resize(true));
    },
  
    _configureEditListeners: function() {
      this.listenTo(this.currentView, 'code', this.onCode);
      this.listenTo(this.currentView, 'preview', this.onPreview);
      this.listenTo(this.currentView, 'cancel', this.onCancel);
      this.listenTo(this.currentView, 'update', this.onUpdate);
    },
  
    _configurePreviewListeners: function() {
      this.listenTo(this.currentView, 'edit', this.onEdit);
      this.listenTo(this.currentView, 'delete', this.onDelete);
      this.listenTo(this.currentView, 'move', this.onMove);
    }
  });
  
  /*
   * active-math
   * ----------
   * A view that lets you edit and view Markdown
   *
   */
  
  var ActiveMarkdownView = Marionette.ItemView.extend({
    template: _.template('')
  
  
  });
  
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
  

  var GistbookView = Marionette.CollectionView.extend({
    // Never used; just here to prevent errors
    itemView: Marionette.ItemView.extend({
      template: _.template('<div>hi</div>')
    }),
  
    className: 'gistbook',
  
    initialize: function() {
      this.InertMarkdownView = InertMarkdownView;
      this.InertMathView = InertMathView;
      this.InertJavascriptView = InertJavascriptView;
      this.ActiveMarkdownView = ActiveMarkdownView;
      this.ActiveMathView = ActiveMathView;
      this.ActiveJavascriptView = ActiveJavascriptView;
    },
  
    // Determine the view based on the authorization
    // and model info
    getItemView: function(model) {
      var authorized = radio.reqres.request('global', 'authorized');
      var viewType = model.get('type');
      var ViewClass = this._viewName(viewType, authorized);
      return this[ViewClass];
    },
  
    _viewPrefix: function(authorized) {
      return authorized ? 'Active' : 'Inert';
    },
  
    _viewType: function(viewType) {
      return viewType.charAt(0).toUpperCase() + viewType.slice(1);
    },
  
    _viewName: function(viewType, authorized) {
      return this._viewPrefix(authorized) + this._viewType(viewType) + 'View';
    }
  });
  

  window.GistbookView = GistbookView;

})();
