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
