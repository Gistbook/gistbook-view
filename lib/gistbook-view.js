this["gistbookTemplates"] = this["gistbookTemplates"] || {};

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

this["gistbookTemplates"]["processedEditView"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'gistblock-wrapper\'>\n</div>\n<div class=\'gistbook-row-controls\'>\n  <hr>\n  <ul>\n    <li><a href=\'#\' class=\'add-latex\'><i class=\'fa fa-stop\'></i></a></li>\n    <li><a href=\'#\' class=\'add-markdown\'><i class=\'fa fa-pause\'></i></a></li>\n    <li><a href=\'#\' class=\'add-javascript\'><i class=\'fa fa-forward\'></i></a></li>\n  </ul>\n</div>\n';

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
      minLines: 8,
      maxLines: 20,
      hideCursor: false,
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
  
    // Create the editor and configure it
    onRender: function() {
      this.$el.height('200px');
      // console.log('lalala', this.el);
      this.editor = ace.edit(this.el);
      this._configureEditor();
    },
  
    // Clean up the editor before we close down!
    onBeforeClose: function() {
      this.editor.destroy();
    }
  });
  
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
      PreviewView: undefined,
      // Options to pass along to the ace editor
      aceEditorOptions: {},
      parent: undefined
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
  
    // On preview, update the cache with the changes in the Ace Editor
    // Then, show the preview state
    onPreview: function() {
      if (this.mode === 'preview') {
        return;
      }
      this.mode = 'preview';
      this.transitionUiToPreview();
      this.parent._updateCache();
      this.showPreview();
    },
  
    onCode: function() {
      if (this.mode === 'code') {
        return;
      }
      this.mode = 'code';
      this.transitionUiToCode();
      this.showEditor();
    },
  
    transitionUiToPreview: function() {
      this.ui.code.removeClass('active-tab');
      this.ui.preview.addClass('active-tab');
    },
  
    transitionUiToCode: function() {
      this.ui.preview.removeClass('active-tab');
      this.ui.code.addClass('active-tab');
    },
  
    getAceEditorView: function() {
      var aceOptions = _.extend(this.aceEditorOptions, {model: this.model});
      return new AceEditorView(aceOptions);
    },
  
    // Show the Ace Editor in our region
    showEditor: function() {
      var aceEditorView = this.getAceEditorView();
      var region = this.getRegion('content');
      region.show(aceEditorView);
      this.editor = region.currentView.editor;
    },
  
    // The preview is just an inert math view
    showPreview: function() {
      this.editor.destroy();
      var region = this.getRegion('content');
      delete this.editor;
      region.show(new this.PreviewView({
        model: this.model
      }));
    },
  
    // Store our options on the object itself.
    // Also set the initial mode to be code.
    initialize: function(options) {
      var validOptions = _.keys(this.defaults)
      _.extend(this, this.defaults, _.pick(options, validOptions));
  
      this.mode = 'code';
    },
  
    // Where to render the inert view
    regions: {
      content: '.gistblock-content'
    },
  
    // Show the editor view on the first render
    onRender: function() {
      this._showMenu();
  
      this.showEditor();
    },
  
    // Show or hide each menu item based on options
    _showMenu: function() {
      _.each(this.editOptions, function(val, key) {
        this.ui[key].toggleClass('active-option', val);
      }, this);
    }
  });
  
  /*
   * processed-edit-view
   * --------------
   * Some views are processed before they're rendered, like
   * MathJax and Markdown.
   * This is the edit view you should use for those things.
   *
   */
  
  var ProcessedEditView = Marionette.Layout.extend({
    template: gistbookTemplates.processedEditView,
  
    className: 'processed-edit-view',
  
    defaults: {
      InertView: undefined
    },
  
    // Sets our options, binds callback context, and creates
    // a cached model for users to mess around with
    initialize: function(options) {
      var validOptions = _.keys(this.defaults)
      _.extend(this, this.defaults, _.pick(options, validOptions));
  
      _.bindAll(this,
        'onEdit', 'onMove', 'onDelete',
        'onCancel', 'onUpdate'
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
        this.cachedModel.toJSON()
      );
    },
  
    // If the user changes the cache and wants to reset it,
    // call this
    _resetCache: function() {
      this.cachedModel.set(
        this.model.toJSON()
      );
    },
  
    // Update the cache with the latest content of the Ace Editor
    _updateCache: function() {
      this.cachedModel.set('source', this._getEditorValue());
    },
  
    // Get the value from the ace editor. Very deeply nested. Yikes.
    _getEditorValue: function() {
      return this.getRegion('wrapper').currentView.editor.getValue();
    },
  
    regions: {
      wrapper: '.gistblock-wrapper'
    },
  
    onEdit: function() {
      // console.log('The parent has been told to edit');
      // Remove handlers; the child is about to be destroyed
      this.showEdit();
    },
  
    showPreview: function() {
      this.stopListening();
      this.getRegion('wrapper').show(
        new MenuWrapper({
          InertView: this.InertView,
          model: this.cachedModel
        })
      );
      this.currentView = this.getRegion('wrapper').currentView;
      this._configurePreviewListeners();
    },
  
    showEdit: function() {
      this.stopListening();
      var region = this.getRegion('wrapper');
      region.show(
        new EditWrapper({
          PreviewView: this.InertView,
          model: this.cachedModel,
          aceEditorOptions: {
            minLines: 4
          },
          parent: this
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
  
    // When the user cancels editing, first reset the cache to match
    // the saved state. Then, show the preview
    onCancel: function() {
      this._resetCache();
      this.showPreview();
    },
  
    // When the user updates, first update the cache with the value
    // from the AceEditor. Then persist those changes to the actual model.
    // Finally, take them to the preview view.
    onUpdate: function() {
      this._updateCache();
      this._saveCache();
      this.showPreview();
    },
  
    // Show the edit view with the InertView as the display
    onRender: function() {
      this.showPreview();
    },
  
    _configureEditListeners: function() {
      this.listenTo(this.currentView, 'cancel', this.onCancel);
      this.listenTo(this.currentView, 'update', this.onUpdate);
    },
  
    _configurePreviewListeners: function() {
      this.listenTo(this.currentView, 'edit', this.onEdit);
      this.listenTo(this.currentView, 'delete', this.onDelete);
      this.listenTo(this.currentView, 'move', this.onMove);
    }
  });
  

  var GistbookView = Marionette.CollectionView.extend({
    // Never used; just here to prevent errors
    itemView: Marionette.ItemView.extend({
      template: _.template('<div>hi</div>')
    }),
  
    className: 'gistbook',
  
    // Determine the view based on the authorization
    // and model info
    getItemView: function(model) {
      var authorized = radio.reqres.request('global', 'authorized');
      var viewType = model.get('type');
      return this['_'+viewType+'View'](authorized);
    },
  
    _textView: function(authorized) {
  
      if (authorized) {
        this.itemViewOptions = {
          InertView: InertTextView
        };
        return ProcessedEditView;
      }
  
      else {
        return InertTextView;
      }
  
    },
  
    _javascriptView: function(authorized) {
  
      if (authorized) {
        this.itemViewOptions = {
          className: 'gistblock gistblock-javascript'
        };
        return AceEditorView;
      }
  
      else {
        this.itemViewOptions = {
          readOnly: true,
          hideCursor: true,
          className: 'gistblock gistblock-javascript'
        };
        return AceEditorView;
      }
  
    }
  });
  

  window.GistbookView = GistbookView;

})();
