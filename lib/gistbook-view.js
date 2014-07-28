this["gistbookTemplates"] = this["gistbookTemplates"] || {};

this["gistbookTemplates"]["controlsWrapper"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'gistbook-row-controls\'>\n  <hr>\n  <ul>\n    <li>\n      <a href=\'#\' class=\'add-text\'>\n        <span class="fa-stack">\n          <i class="fa fa-circle fa-stack-2x"></i>\n          <i class="fa fa-font fa-stack-1x"></i>\n        </span>\n      </a>\n    </li>\n    <li>\n      <a href=\'#\' class=\'add-javascript\'>\n        <span class="fa-stack">\n          <i class="fa fa-circle fa-stack-2x"></i>\n          <i class="fa fa-code fa-stack-1x"></i>\n        </span>\n      </a>\n    </li>\n  </ul>\n</div>\n<div class=\'gistblock-wrapper\'>\n</div>\n';

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

this["gistbookTemplates"]["gistbookView"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'gistbook-header\'>\n  <h1>' +
((__t = ( title )) == null ? '' : __t) +
'</h1>\n</div>\n<ul class=\'gistbook-container\'>\n</ul>\n';

}
return __p
};

(function() {

  var radio = Backbone.Wreqr.radio;

  /*
   * HTML5 Sortable jQuery Plugin
   * http://farhadi.ir/projects/html5sortable
   * 
   * Copyright 2012, Ali Farhadi
   * Released under the MIT license.
   */
  (function($) {
  var dragging, placeholders = $();
  $.fn.sortable = function(options) {
  	var method = String(options);
  	options = $.extend({
  		connectWith: false
  	}, options);
  	return this.each(function() {
  		if (/^enable|disable|destroy$/.test(method)) {
  			var items = $(this).children($(this).data('items')).attr('draggable', method == 'enable');
  			if (method == 'destroy') {
  				items.add(this).removeData('connectWith items')
  					.off('dragstart.h5s dragend.h5s selectstart.h5s dragover.h5s dragenter.h5s drop.h5s');
  			}
  			return;
  		}
  		var isHandle, index, items = $(this).children(options.items);
  		var placeholder = $('<' + (/^ul|ol$/i.test(this.tagName) ? 'li' : 'div') + ' class="sortable-placeholder">');
  		items.find(options.handle).mousedown(function() {
  			isHandle = true;
  		}).mouseup(function() {
  			isHandle = false;
  		});
  		$(this).data('items', options.items)
  		placeholders = placeholders.add(placeholder);
  		if (options.connectWith) {
  			$(options.connectWith).add(this).data('connectWith', options.connectWith);
  		}
  		items.attr('draggable', 'true').on('dragstart.h5s', function(e) {
  			if (options.handle && !isHandle) {
  				return false;
  			}
  			isHandle = false;
  			var dt = e.originalEvent.dataTransfer;
  			dt.effectAllowed = 'move';
  			dt.setData('Text', 'dummy');
  			index = (dragging = $(this)).addClass('sortable-dragging').index();
  		}).on('dragend.h5s', function() {
  			if (!dragging) {
  				return;
  			}
  			dragging.removeClass('sortable-dragging').show();
  			placeholders.detach();
  			if (index != dragging.index()) {
  				dragging.parent().trigger('sortupdate', {item: dragging});
  			}
  			dragging = null;
  		}).not('a[href], img').on('selectstart.h5s', function() {
  			this.dragDrop && this.dragDrop();
  			return false;
  		}).end().add([this, placeholder]).on('dragover.h5s dragenter.h5s drop.h5s', function(e) {
  			if (!items.is(dragging) && options.connectWith !== $(dragging).parent().data('connectWith')) {
  				return true;
  			}
  			if (e.type == 'drop') {
  				e.stopPropagation();
  				placeholders.filter(':visible').after(dragging);
  				dragging.trigger('dragend.h5s');
  				return false;
  			}
  			e.preventDefault();
  			e.originalEvent.dataTransfer.dropEffect = 'move';
  			if (items.is(this)) {
  				if (options.forcePlaceholderSize) {
  					placeholder.height(dragging.outerHeight());
  				}
  				dragging.hide();
  				$(this)[placeholder.index() < $(this).index() ? 'after' : 'before'](placeholder);
  				placeholders.not(placeholder).detach();
  			} else if (!placeholders.is(this) && !$(this).children(options.items).length) {
  				placeholders.detach();
  				$(this).append(placeholder);
  			}
  			return false;
  		});
  	});
  };
  })(jQuery);
  

  /*
   * gistbook-view
   * -------------
   * The publicly exposed view from this library.
   * It is a composite view that renders the Gistbook.
   *
   */
  
  var GistbookView = Marionette.CompositeView.extend({
  
    // Create our collection from the gistbook's blocks
    initialize: function(options) {
      _.bindAll(this, 'resortByDom');
      var gistblocks = options.model.get('blocks');
      this.initialRender = false;
      this.collection = new Backbone.Collection(gistblocks);
      this.collection.uniqueId = _.uniqueId();
      this.cacheController = new CacheController({
        collection: this.collection
      });
      this.authorized = radio.reqres.request('global', 'authorized');
      this.gistbookCh = radio.channel(channelName(this.collection));
    },
  
    // Silently update the collection based on the new DOM indices
    resortByDom: function() {
      var newCollection = {};
      var newArray = [];
      var index, view;
  
      this.children.each(function(view, i) {
        index = this.ui.container.children().index(view.el);
        newCollection[index] = view.model;
        newArray = _.sortBy(newCollection, function(key, i) {
          return i;
        });
        view._index = index;
      }, this);
      
      this.collection.reset(newArray, {silent: true});
    },
  
    template: gistbookTemplates.gistbookView,
  
    ui: {
      container: '.gistbook-container'
    },
  
    childViewContainer: '.gistbook-container',
  
    // Never used; just here to prevent errors
    childView: Marionette.ItemView.extend({
      template: _.template('')
    }),
  
    className: 'gistbook',
  
    // Determine the view based on the authorization
    // and model info
    getChildView: function(model) {;
      var viewType = model.get('type');
      return this['_'+viewType+'View']();
    },
  
    // Make it sortable if we're authorized
    onRender: function() {
      this.initialRender = true;
      this._setUpSortable();
    },
  
    // Shut down sortable before we destroy the view
    onBeforeDestroy: function() {
      this.ui.container.sortable('destroy');
    },
  
    _setUpSortable: function() {
      if (this.authorized) {
        this.ui.container.sortable({
          handle: '.gistblock-move'
        });
        this.ui.container.on('sortupdate', _.bind(this.resortByDom, this));
      }
    },
    
    _textView: function() {
      if (this.authorized) {
        this.childViewOptions = {
          InertView: InertTextView
        };
        this.childViewOptions.initialMode = this.initialRender ? 'active' : 'inert';
        return ControlsWrapper;
      }
  
      else {
        this.childViewOptions = {};
        return InertTextView.extend({
          tagName: 'li'
        });
      }
    },
  
    _javascriptView: function() {
      if (this.authorized) {
        var CustomAceEditor = AceEditorView.extend({
          className: 'gistblock gistblock-javascript'
        });
        this.childViewOptions = {
          InertView: CustomAceEditor,
          editOptions: {
            edit: false,
            delete: true,
            move: true
          }
        };
        return ControlsWrapper;
      }
  
      else {
        this.childViewOptions = {
          readOnly: true,
          hideCursor: true,
          className: 'gistblock gistblock-javascript'
        };
        return AceEditorView.extend({
          tagName: 'li'
        });
      }
    }
  });
  

  
  // Generate a channel name from a collection or a model in a collection
  window.channelName = function( entity ) {
    entity = entity instanceof Backbone.Model ? entity.collection : entity;
    return 'gistbook-'+entity.uniqueId;
  };
  
  /*
   * cache-controller
   * ----------------
   * A Gistbook-View works with a cache of a gistbook, so that
   * user's changes aren't updated on the fly. Use the GistbookView API
   * to persist the changes to the original data.
   *
   */
  
  var CacheController = Marionette.Controller.extend({
  
    initialize: function(options) {
      _.bindAll(this, '_addBlock');
      this.collection = options.collection;
      this.gistbookCh = radio.channel(channelName(this.collection));
      this._configureListeners();
    },
  
    _configureListeners: function() {
      this.listenTo(this.gistbookCh.vent, 'add:block', this._addBlock);
    },
  
    _addBlock: function(type, model) {
      var index = this.collection.indexOf(model);
      if (index === -1) {
        return;
      }
  
      // Create a new block
      var newBlock = new Backbone.Model({
        type: type,
        source: ''
      });
      
      // Adds the block
      this.collection.add(newBlock, {
        at: index
      });
    }
  });
  

  /*
   * ace-editor-view
   * ---------------
   * A view for the ace editor. Used for both
   * inert and active views.
   *
   */
  
  var AceEditorView = Marionette.ItemView.extend({
    template: _.template('<div class="ace-wrapper"><div class="ace-editor"><%= source %></div></div>'),
  
    // Defaults for the view
    defaults: {
      readOnly: false,
      tabSize: 2,
      softTabs: true,
      highlightActiveLine: false,
      theme: 'tomorrow',
      mode: 'javascript',
      minLines: 5,
      maxLines: 20,
      hideCursor: false,
      showGutter: false
    },
  
    ui: {
      aceContainer: '.ace-editor'
    },
  
    // Merge the options
    initialize: function(options) {
      var validOptions = _.keys(this.defaults)
      _.extend(this, this.defaults, _.pick(options, validOptions));
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
  
  /*
   * text-edit-view
   * ---------------
   * Modify text based on a textarea
   *
   */
  
  var TextEditView = Marionette.ItemView.extend({
    template: _.template('<%= source %>'),
  
    tagName: 'textarea',
  
    className: 'gistbook-textarea',
  
    // Get the value of the element
    value: function() {
      return this.el.value;
    }
  });
  
  /*
   * menu-wrapper
   * ------------
   * A wrapper for an Inert View;
   * It provides controls for editing
   *
   */
  
  var MenuWrapper = Marionette.LayoutView.extend({
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
  
    // Where to render the inert view
    regions: {
      content: '.gistblock-content'
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
  
    getInertView: function() {
      return new this.InertView({
        model: this.model
      });
    },
  
    // Show the inert view after rendering
    onRender: function() {
      this._showMenu();
      var region = this.getRegion('content');
      var inertView = this.getInertView();
      region.show(inertView);
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
   * A wrapper for an editable View; it provides the controls to toggle
   * between source/preview, and the buttons to cancel/save the changes.
   *
   */
  
  var EditWrapper = Marionette.LayoutView.extend({
    template: gistbookTemplates.editWrapper,
  
    className: 'gistblock-editor',
  
    tagName: 'li',
  
    // Default values for options
    defaults: {
      // What the tab says that shows the source
      sourceTabText: 'Code',
      PreviewView: undefined,
      parent: undefined
    },
  
    // Store our options on the object itself.
    // Also set the initial mode to be code.
    initialize: function(options) {
      var validOptions = _.keys(this.defaults)
      _.extend(this, this.defaults, _.pick(options, validOptions));
  
      this.cache = this.model.toJSON();
  
      this.mode = 'code';
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
      this._updateCache();
      this.transitionUiToPreview();
      this.parent._updateCache();
      this.showPreview();
      this.mode = 'preview';
    },
  
    onCode: function() {
      if (this.mode === 'code') {
        return;
      }
      this.transitionUiToCode();
      this.mode = 'code';
      this.showEditor();
    },
  
    // Update the cache when the user clicks update,
    // only if you're in code mode
    onUpdate: function() {
      if (this.mode === 'preview') {
        return;
      }
      this._updateCache();
    },
  
    transitionUiToPreview: function() {
      this.ui.code.removeClass('active-tab');
      this.ui.preview.addClass('active-tab');
    },
  
    transitionUiToCode: function() {
      this.ui.preview.removeClass('active-tab');
      this.ui.code.addClass('active-tab');
    },
  
    getTextEditorView: function() {
      return new TextEditView({
        model: this.model
      });
    },
  
    getPreviewView: function() {
      return new this.PreviewView({
        model: this.model
      });
    },
  
    // Show the Ace Editor in our region; also set our cache
    showEditor: function() {
      var textEditorView = this.getTextEditorView();
      var region = this.getRegion('content');
      region.show(textEditorView);
      this._updateCache();
    },
  
    // The preview is just an inert math view
    showPreview: function() {
      this._updateCache();
      var region = this.getRegion('content');
      var previewView = this.getPreviewView();
      region.show(previewView);
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
  
    // Update the cache from the currentView
    _updateCache: function() {
      if (this.mode === 'preview') {
        console.log('Warning: cache updated on preview');
      }
      var region = this.getRegion('content');
      this.cache = region.currentView.value();
    },
  
    // Show or hide each menu item based on options
    _showMenu: function() {
      _.each(this.editOptions, function(val, key) {
        this.ui[key].toggleClass('active-option', val);
      }, this);
    }
  });
  
  /*
   * controls-wrapper
   * ----------------
   * Views that can be edited are wrapped in controls that appear on hover.
   * This includes the menu options to create new views above or below the view,
   * as well as the move, delete, and edit menu options. This is the view
   * wrapper that provides those tools.
   *
   */
  
  var ControlsWrapper = Marionette.LayoutView.extend({
    template: gistbookTemplates.controlsWrapper,
  
    className: 'controls-wrapper-view',
  
    tagName: 'li',
  
    defaults: {
      InertView: undefined,
      initialMode: 'inert',
      editOptions: {
        edit: true,
        delete: true,
        move: true
      }
    },
  
    regions: {
      wrapper: '.gistblock-wrapper'
    },
  
    ui: {
      addText: '.add-text',
      addJavascript: '.add-javascript'
    },
  
    triggers: {
      'click @ui.addText': 'add:text',
      'click @ui.addJavascript': 'add:javascript'
    },
  
    // Sets our options, binds callback context, and creates
    // a cached model for users to mess around with
    initialize: function(options) {
      var validOptions = _.keys(this.defaults)
      _.extend(this, this.defaults, _.pick(options, validOptions));
  
      _.bindAll(this,
        'onEdit', 'onDelete',
        'onCancel', 'onUpdate',
        'onAddText', 'onAddJavascript'
      );
  
      this._createCache();
      this.gistbookCh = radio.channel(channelName(this.model));
    },
  
    onEdit: function() {
      this.showActive();
    },
  
    // Refactor to use the channel
    onDelete: function() {
      this.model.collection.remove(this.model);
    },
  
    // When the user cancels editing, first reset the cache to match
    // the saved state. Then, show the preview
    onCancel: function() {
      this._resetCache();
      this.showInert();
    },
  
    onAddText: function() {
      this.gistbookCh.vent.trigger('add:block', 'text', this.model);
    },
  
    onAddJavascript: function() {
      this.gistbookCh.vent.trigger('add:block', 'javascript', this.model);
    },
  
    showInert: function() {
      this.stopListening();
      var menuWrapper = this.getMenuWrapper();
      this.getRegion('wrapper').show(menuWrapper);
      this.currentView = menuWrapper;
      this._configurePreviewListeners();
    },
  
    showActive: function() {
      this.stopListening();
      var region = this.getRegion('wrapper');
      var editWrapper = this.getEditWrapper();
      region.show(editWrapper);
      this.currentView = editWrapper;
      this._configureEditListeners();
    },
  
    // When the user updates, first update the cache with the value
    // from the AceEditor. Then persist those changes to the actual model.
    // Finally, take them to the preview view.
    onUpdate: function() {
      this._updateCache();
      this._saveCache();
      this.showInert();
    },
  
    // Show the edit view with the InertView as the display
    onRender: function() {
      this.initialMode === 'active' ? this.showActive() : this.showInert();
    },
  
    getMenuWrapper: function() {
      return new MenuWrapper({
        InertView: this.InertView,
        editOptions: this.editOptions,
        model: this.cachedModel
      });
    },
  
    getEditWrapper: function() {
      return new EditWrapper({
        PreviewView: this.InertView,
        model: this.cachedModel,
        aceEditorOptions: {
          minLines: 4
        },
        parent: this
      });
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
      this.model.set(this.cachedModel.toJSON());
    },
  
    // If the user changes the cache and wants to reset it,
    // call this
    _resetCache: function() {
      this.cachedModel.set(this.model.toJSON());
    },
  
    // Update the cache with the latest content of the text editor
    _updateCache: function() {
      var cachedSource = this.getRegion('wrapper').currentView.cache;
      this.cachedModel.set('source', cachedSource);
    },
  
    _configureEditListeners: function() {
      this.listenTo(this.currentView, 'cancel', this.onCancel);
      this.listenTo(this.currentView, 'update', this.onUpdate);
    },
  
    _configurePreviewListeners: function() {
      this.listenTo(this.currentView, 'edit', this.onEdit);
      this.listenTo(this.currentView, 'delete', this.onDelete);
    }
  });
  

  window.GistbookView = GistbookView;

})();
