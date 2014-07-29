this["gistbookTemplates"] = this["gistbookTemplates"] || {};

this["gistbookTemplates"]["aceEditorView"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="ace-wrapper">\n  <div class="ace-editor">' +
__e( source ) +
'</div>\n</div>\n';

}
return __p
};

this["gistbookTemplates"]["displayTitleView"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h1>\n  ' +
__e( title ) +
'\n</h1>\n<a href=\'#\' class=\'gistbook-title-edit\'>\n  – Edit\n</a>\n';

}
return __p
};

this["gistbookTemplates"]["editTitleView"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<input type=\'text\' value=\'' +
__e( title ) +
'\'>\n<button>Save</button> or <a href=\'#\'>Cancel</a>\n';

}
return __p
};

this["gistbookTemplates"]["controlsWrapper"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'gistbook-row-controls\'>\n  <hr>\n  <ul>\n    <li>\n      <a href=\'#\' class=\'add-text\'>\n        <span class="fa-stack">\n          <i class="fa fa-circle fa-stack-2x"></i>\n          <i class="fa fa-font fa-stack-1x"></i>\n        </span>\n      </a>\n    </li>\n    <li>\n      <a href=\'#\' class=\'add-javascript\'>\n        <span class="fa-stack">\n          <i class="fa fa-circle fa-stack-2x"></i>\n          <i class="fa fa-code fa-stack-1x"></i>\n        </span>\n      </a>\n    </li>\n  </ul>\n</div>\n<div class=\'gistblock-wrapper\'>\n</div>\n';

}
return __p
};

this["gistbookTemplates"]["displayWrapper"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<a href=\'#\' class=\'gistblock-move\'><i class=\'fa fa-bars\'></i></a>\n<a href=\'#\' class=\'gistblock-edit\'><i class=\'fa fa-pencil\'></i></a>\n<a href=\'#\' class=\'gistblock-delete\'><i class=\'fa fa-trash-o\'></i></a>\n<div class=\'gistblock-content\'></div>\n';

}
return __p
};

this["gistbookTemplates"]["editWrapper"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<ul>\n  <li><a href=\'#\' class=\'gistblock-write active-tab\'>' +
((__t = ( sourceTabText )) == null ? '' : __t) +
'</a></li>\n  <li><a href=\'#\' class=\'gistblock-preview\'>Preview</a></li>\n</ul>\n<div class=\'gistblock-content\'></div>\n<div class=\'button-container\'>\n  <button class=\'gistblock-cancel\'>Cancel</button>\n  <button class=\'gistblock-update blue\'>Update</button>\n</div>\n';

}
return __p
};

this["gistbookTemplates"]["gistbookView"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'gistbook-header\'></div>\n<ul class=\'gistbook-container\'></ul>\n';

}
return __p
};

(function() {

  var Radio = Backbone.Radio;

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
  

  // Pick the keys from mergeOptions out of options and
  // attach them directly to the instance
  var mergeOptions = function(options, mergeOptions) {
    _.extend(this, _.pick(options, mergeOptions));
  };
  
  Marionette.View.prototype.mergeOptions = mergeOptions;
  Marionette.Object.prototype.mergeOptions = mergeOptions;
  
  /*
   * radio-shim
   * ----------
   * Safely use Backbone.Radio in place of Wreqr.
   *
   */
  
  Marionette.Application.prototype._initChannel = function () {
    this.channelName = _.result(this, 'channelName') || 'global';
    this.channel = _.result(this, 'channel') || Radio.channel(this.channelName);
  }
  
  /*
   * to-json shim
   * ------------
   * Marionette v2.x Views use toJSON for serialization. Tsk tsk.
   * This fixes that misuse of toJSON.
   *
   */
  
  
  Marionette.View.prototype.serializeModel = function(model) {
    model = model || this.model;
    return _.clone(model.attributes);
  };
  
  Marionette.ItemView.prototype.serializeCollection = function() {
    return collection.map(function(model){ return this.serializeModel(model); }, this);
  };
  
  /*
   * string-util
   * -----------
   * Self-explanatory, I guess.
   *
   */
  
  var stringUtil = {
  
    // Capitalize the first letter of a string
    capitalize: function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  
  };
  
  /*
   * radio-util
   * ----------
   * Utility methods for Backbone.Radio
   *
   */
  
  var radioUtil = {
  
    // Generate a unique channel name from an entity
    entityChannelName: function(entity) {
      entity._uniqueId = entity._uniqueId || _.uniqueId();
      return 'gistbook-' + entity._uniqueId;
    },
  
    // Get the channel from an entity
    entityChannel: function(entity) {
      return Radio.channel(radioUtil.entityChannelName(entity));
    }
  };
  
  /*
   * cache-manager
   * -------------
   * A Gistbook-View works with a cache of a gistbook, so that
   * user's changes aren't updated on the fly. Use the GistbookView API
   * to persist the changes to the original data.
   *
   */
  
  var CacheManager = Marionette.Object.extend({
  
    initialize: function(options) {
      _.bindAll(this, '_addBlock');
      this.collection = options.collection;
      this.gistbookCh = radioUtil.entityChannel(this.collection);
      this._configureListeners();
    },
  
    _configureListeners: function() {
      this.listenTo(this.gistbookCh, 'add:block', this._addBlock);
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
   * gistbook-view
   * -------------
   * The publicly exposed view from this library.
   * It is a LayoutView that renders the Gistbook.
   *
   */
  
  var GistbookView = Marionette.LayoutView.extend({
    template: gistbookTemplates.gistbookView,
  
    ui: {
      container: '.gistbook-container',
      header: '.gistbook-header'
    },
  
    regions: {
      blocks: '.gistbook-container',
      header: '.gistbook-header'
    },
  
    className: 'gistbook',
  
    // Create our collection from the gistbook's blocks
    initialize: function(options) {
      this._createCollection();
  
      this.titleManager = new TitleManager({
        region: this.getRegion('header'),
        model: this.model
      });
    },
  
    getBlocksView: function() {
      return new BlocksView({
        collection: this.collection
      });
    },
  
    onRender: function() {
      this.getRegion('blocks').show(this.getBlocksView());
      this.titleManager.showDisplayTitleView();
    },
  
    onBeforeDestroy: function() {
      this.titleManager.destroy();
  
      delete this.collection;
      delete this.titleManager;
    },
  
    _createCollection: function() {
      var gistblocks = this.model.get('blocks');
      this.collection = new Backbone.Collection(gistblocks);
    }
  });
  
  /*
   * title-manager
   * -------------
   * This is the manager for the titles. The Gistbook has the
   * region, but it doesn't need to manage the going-ons
   * within that Region. That'd be messy.
   *
   */
  
  var TitleManager = Marionette.Object.extend({
    titleManagerOptions: ['region', 'model'],
  
    initialize: function(options) {
      _.bindAll(this, '_editHeader');
      this.mergeOptions(options, this.titleManagerOptions);
    },
  
    getDisplayTitleView: function() {
      return new DisplayTitleView({
        model: this.model,
        editable: Radio.request('auth', 'authorized')
      });
    },
  
    getEditTitleView: function() {
      return new EditTitleView({
        model: this.model
      });
    },
  
    showDisplayTitleView: function() {
      this.stopListening();
      var displayTitleView = this.getDisplayTitleView();
      this.region.show(displayTitleView);
      this._setDisplayListeners(displayTitleView);
    },
  
    showEditTitleView: function() {
      this.stopListening();
      var editTitleView = this.getEditTitleView();
      this.region.show(editTitleView);
      this._setEditListeners(editTitleView);
    },
  
    _setDisplayListeners: function(displayTitleView) {
      this.listenToOnce(displayTitleView, 'edit', this._editHeader);
    },
  
    _setEditListeners: function(editTitleView) {
      this.listenToOnce(editTitleView, 'save', this._displayHeader);
      this.listenToOnce(editTitleView, 'cancel', this._displayHeader);
    },
  
    _editHeader: function() {
      this.showEditTitleView();
    },
  
    _displayHeader: function() {
      this.showDisplayTitleView();
    },
  
    onBeforeDestroy: function() {
      delete this.region;
      delete this.model;
    }
  });
  
  
  /*
   * display-title-view
   * ------------------
   * The display view for the title.
   *
   */
  
  var DisplayTitleView = Marionette.ItemView.extend({
    template: gistbookTemplates.displayTitleView,
  
    className: 'display-title-view',
  
    ui: {
      edit: '.gistbook-title-edit'
    },
  
    triggers: {
      'click @ui.edit': 'edit'
    },
  
    editable: false,
  
    displayTitleViewOptions: ['editable'],
  
    initialize: function(options) {
      this.mergeOptions(options, this.displayTitleViewOptions);
      this._setClass();
    },
  
    // Sets whether the view is editable or not.
    _setClass: function() {
      this.$el.toggleClass('editable', this.editable);
    }
  });
  
  /*
   * edit-header-view
   * ----------------
   * The edit view for the title.
   *
   */
  
  var EditTitleView = Marionette.ItemView.extend({
    template: gistbookTemplates.editTitleView,
  
    className: 'edit-title-view',
  
    ui: {
      input: 'input',
      save: 'button',
      cancel: 'a'
    },
  
    events: {
      'keypress input': 'onKeypress'
    },
  
    triggers: {
      'click @ui.save': 'save',
      'click @ui.cancel': 'cancel'
    },
  
    onSave: function() {
      var newTitle = this.ui.input.val();
      this.model.set('title', newTitle);
    },
  
    onKeypress: function(e) {
      if (e.keyCode !== 13) {
        return;
      }
      this.triggerMethod('save');
    }
  });
  
  /*
   * blocks-view
   * -----------
   * Renders gistblocks
   *
   */
  
  var BlocksView = Marionette.CollectionView.extend({
    initialize: function() {
      _.bindAll(this, '_resortByDom');
      this.initialRender = false;
      this.cacheManager = new CacheManager({
        collection: this.collection
      });
      this.authorized = Radio.request('auth', 'authorized');
    },
  
    // Determine the view based on the authorization
    // and model info
    getChildView: function(model) {;
      var generatorMethod = this._generatorMethodName(model.get('type'));
      return this[generatorMethod](model);
    },
  
    // Make it sortable if we're authorized
    onRender: function() {
      this.initialRender = true;
      this._setUpSortable();
    },
  
    // Shut down sortable before we destroy the view
    onBeforeDestroy: function() {
      this.$el.sortable('destroy');
    },
  
    _generatorMethodName: function(viewType) {
      return '_get' + stringUtil.capitalize(viewType) + 'View';
    },
  
    _setUpSortable: function() {
      if (!this.authorized) { return; }
      
      this.$el.sortable({
        handle: '.gistblock-move'
      });
  
      this.$el.on('sortupdate', this._resortByDom);
    },
    
    _getTextView: function(model) {
      return this.authorized ? this._authTextView(model) : this._unauthTextView(model);
    },
  
    _authTextView: function(model) {
      this._registerDisplayView(model, DisplayTextView);
      var initialMode = this.initialRender ? 'edit' : 'display';
      this.childViewOptions = {
        initialMode: initialMode
      };
      return ControlsWrapper;
    },
  
    _unauthTextView: function(model) {
      this.childViewOptions = {};
      return DisplayTextView.extend({
        tagName: 'li'
      });
    },
  
    _getJavascriptView: function(model) {
      return this.authorized ? this._authJavascriptView(model) : this._unauthJavascriptView(model);
    },
  
    _authJavascriptView: function(model) {
      var CustomAceEditor = AceEditorView.extend({
        className: 'gistblock gistblock-javascript'
      });
      this._registerDisplayView(model, CustomAceEditor);
      this.childViewOptions = {
        editOptions: {
          edit: false,
          move: true,
          delete: true
        }
      };
      return ControlsWrapper;
    },
  
    _unauthJavascriptView: function(model) {
      this.childViewOptions = {
        readOnly: true,
        hideCursor: true,
        className: 'gistblock gistblock-javascript'
      };
      return AceEditorView.extend({
        tagName: 'li'
      });
    },
  
    // Register the DisplayView for a particular Gistblock on that block's Channel
    _registerDisplayView: function(model, ViewClass) {
      radioUtil.entityChannel(model).reply('displayView', function(options) {
        return new ViewClass(options);
      });
    },
  
    // Silently update the collection based on the new DOM indices.
    // This code is terrible. Marionette needs a better way to
    // handle manually resorts out-of-the-box.
    _resortByDom: function() {
      var newCollection = {};
      var newArray = [];
      var index, view;
  
      this.children.each(function(view, i) {
        index = this.$el.children().index(view.el);
        newCollection[index] = view.model;
        newArray = _.sortBy(newCollection, function(key, i) {
          return i;
        });
        view._index = index;
      }, this);
      
      this.collection.reset(newArray, {silent: true});
    }
  });
  
  /*
   * ace-editor-view
   * ---------------
   * A view for the ace editor. Used for both
   * display and edit views.
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
  
  /*
   * text-edit-view
   * --------------
   * Modify text based on a textarea
   *
   */
  
  var EditTextView = Marionette.ItemView.extend({
    template: _.template('<%- source %>'),
  
    tagName: 'textarea',
  
    className: 'gistbook-textarea',
  
    // Get the value of the element
    value: function() {
      return this.el.value;
    }
  });
  
  /*
   * display-wrapper
   * ---------------
   * A wrapper for display views that provide the controls
   * to edit the view
   *
   */
  
  var DisplayWrapper = Marionette.LayoutView.extend({
    template: gistbookTemplates.displayWrapper,
  
    className: 'gistblock-menu',
  
    menuWrapperOptions: [
      'blockChannel',
      'editOptions'
    ],
  
    editOptions: {
      edit: true,
      delete: true,
      move: true
    },
  
    // Where to render the view
    regions: {
      content: '.gistblock-content'
    },
  
    // Where to put the view, and the 3 menu options
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
      this.mergeOptions(options, this.menuWrapperOptions);
    },
  
    getDisplayView: function() {
      return this.blockChannel.request('displayView', {
        model: this.model
      });
    },
  
    // Show the inert view after rendering
    onRender: function() {
      this._showMenu();
      var region = this.getRegion('content');
      var displayView = this.getDisplayView();
      region.show(displayView);
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
      sourceTabText: 'Write',
      PreviewView: undefined,
      blockChannel: undefined
    },
  
    sourceTabText: 'Write',
  
    editWrapperOptions: [
      'sourceTabText',
      'PreviewView',
      'blockChannel'
    ],
  
    // Store our options on the object itself.
    // Also set the initial mode to be code.
    initialize: function(options) {
      this.mergeOptions(options, this.editWrapperOptions);
  
      this.cache = this.model.toJSON();
  
      this.mode = 'write';
    },
  
    serializeData: function() {
      var data = Marionette.ItemView.prototype.serializeData.call(this);
      data.sourceTabText = this.sourceTabText;
      return data;
    },
  
    // Where to put the view, and the 3 menu options
    ui: {
      content: '.gistblock-content',
      write:   '.gistblock-write',
      preview: '.gistblock-preview',
      cancel:  '.gistblock-cancel',
      update:  '.gistblock-update'
    },
  
    // Respond to clicks; the parent view is listening
    triggers: {
      'click @ui.write':   'write',
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
      this._setCache();
      this.transitionUiToPreview();
      this.triggerMethod('updateCache');
      this.showPreview();
      this.mode = 'preview';
    },
  
    onWrite: function() {
      if (this.mode === 'write') {
        return;
      }
      this.transitionUiToCode();
      this.mode = 'write';
      this.showEditor();
    },
  
    // Update the cache when the user clicks update,
    // only if you're in code mode
    onUpdate: function() {
      if (this.mode === 'preview') {
        return;
      }
      this._setCache();
    },
  
    transitionUiToPreview: function() {
      this.ui.write.removeClass('active-tab');
      this.ui.preview.addClass('active-tab');
    },
  
    transitionUiToCode: function() {
      this.ui.preview.removeClass('active-tab');
      this.ui.write.addClass('active-tab');
    },
  
    getEditTextView: function() {
      return new EditTextView({
        model: this.model
      });
    },
  
    getPreviewView: function() {
      return this.blockChannel.request('displayView', {
        model: this.model
      });
    },
  
    // Show the Ace Editor in our region; also set our cache
    showEditor: function() {
      var textEditorView = this.getEditTextView();
      var region = this.getRegion('content');
      region.show(textEditorView);
      this._setCache();
    },
  
    // The preview is just an inert math view
    showPreview: function() {
      this._setCache();
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
  
    // Set the cache from the value in the currentView
    _setCache: function() {
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
   * This is the highest-level view wrapper that wraps both
   * the Display and Edit Wrappers.
   * It also manages shared cached data between the Display
   * and Edit modes.
   *
   */
  
  var ControlsWrapper = Marionette.LayoutView.extend({
    template: gistbookTemplates.controlsWrapper,
  
    className: 'controls-wrapper-view',
  
    tagName: 'li',
  
    initialMode: 'display',
  
    editOptions: {
      edit: true,
      delete: true,
      move: true
    },
  
    controlsWrapperOptions: [
      'editOptions',
      'initialMode'
    ],
  
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
      this.mergeOptions(options, this.controlsWrapperOptions);
  
      _.bindAll(this,
        'onEdit', 'onDelete',
        'onCancel', 'onUpdate',
        'onAddText', 'onAddJavascript'
      );
  
      this._createCache();
      this.gistbookCh = radioUtil.entityChannel(this.model.collection);
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
      this.showDisplay();
    },
  
    onAddText: function() {
      this.gistbookCh.trigger('add:block', 'text', this.model);
    },
  
    onAddJavascript: function() {
      this.gistbookCh.trigger('add:block', 'javascript', this.model);
    },
  
    showDisplay: function() {
      this.stopListening();
      var displayWrapper = this.getDisplayWrapper();
      this.getRegion('wrapper').show(displayWrapper);
      this.currentView = displayWrapper;
      this._configurePreviewListeners();
    },
  
    showActive: function() {
      this.stopListening();
      var editWrapper = this.getEditWrapper();
      this.getRegion('wrapper').show(editWrapper);
      this.currentView = editWrapper;
      this._configureEditListeners();
    },
  
    // When the user updates, first update the cache with the value
    // from the AceEditor. Then persist those changes to the actual model.
    // Finally, take them to the preview view.
    onUpdate: function() {
      this._updateCache();
      this._saveCache();
      this.showDisplay();
    },
  
    // Determine which view to show
    onRender: function() {
      this.initialMode === 'edit' ? this.showActive() : this.showDisplay();
    },
  
    getDisplayWrapper: function() {
      return new DisplayWrapper({
        editOptions: this.editOptions,
        model: this.cachedModel,
        blockChannel: radioUtil.entityChannel(this.model)
      });
    },
  
    getEditWrapper: function() {
      return new EditWrapper({
        model: this.cachedModel,
        blockChannel: radioUtil.entityChannel(this.model),
        aceEditorOptions: {
          minLines: 4
        }
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
  
    // Update the cache with the latest content of the text editor. Only
    // makes sense to be called when the currentView is the cache
    _updateCache: function() {
      var cachedSource = this.getRegion('wrapper').currentView.cache;
      this.cachedModel.set('source', cachedSource);
    },
  
    _configureEditListeners: function() {
      this.listenTo(this.currentView, 'cancel', this.onCancel);
      this.listenTo(this.currentView, 'update', this.onUpdate);
      this.listenTo(this.currentView, 'updateCache', this._updateCache);
    },
  
    _configurePreviewListeners: function() {
      this.listenTo(this.currentView, 'edit', this.onEdit);
      this.listenTo(this.currentView, 'delete', this.onDelete);
    }
  });
  

  window.GistbookView = GistbookView;

})();
