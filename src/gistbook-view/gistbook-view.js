/*
 * gistbook-view
 * -------------
 * The publicly exposed view from this library.
 * It is a composite view that renders the Gistbook.
 *
 */

var GistbookView = Marionette.CompositeView.extend({
  template: gistbookTemplates.gistbookView,

  ui: {
    container: '.gistbook-container'
  },

  className: 'gistbook',

  childViewContainer: '.gistbook-container',

  // Unfortunately, it's never used. It's only here to prevent errors
  childView: Marionette.ItemView,

  // Create our collection from the gistbook's blocks
  initialize: function(options) {
    _.bindAll(this, '_resortByDom');
    var gistblocks = options.model.get('blocks');
    this.initialRender = false;
    this.collection = new Backbone.Collection(gistblocks);
    this.collection.uniqueId = _.uniqueId();
    this.cacheManager = new CacheManager({
      collection: this.collection
    });
    this.authorized = Radio.request('auth', 'authorized');
    this.gistbookCh = radioUtil.entityChannel(this.collection);
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
    this.ui.container.sortable('destroy');
  },

  _generatorMethodName: function(viewType) {
    return '_get' + stringUtil.capitalize(viewType) + 'View';
  },

  _setUpSortable: function() {
    if (!this.authorized) { return; }
    
    this.ui.container.sortable({
      handle: '.gistblock-move'
    });
    this.ui.container.on('sortupdate', _.bind(this._resortByDom, this));
  },
  
  _getTextView: function(model) {
    if (this.authorized) {
      this._registerDisplayView(model, InertTextView);
      var initialMode = this.initialRender ? 'active' : 'inert';
      this.childViewOptions = {
        initialMode: initialMode
      };
      return ControlsWrapper;
    }

    else {
      this.childViewOptions = {};
      return InertTextView.extend({
        tagName: 'li'
      });
    }
  },

  _getJavascriptView: function(model) {
    if (this.authorized) {
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
      index = this.ui.container.children().index(view.el);
      newCollection[index] = view.model;
      newArray = _.sortBy(newCollection, function(key, i) {
        return i;
      });
      view._index = index;
    }, this);
    
    this.collection.reset(newArray, {silent: true});
  },
});
