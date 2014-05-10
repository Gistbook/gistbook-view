var GistbookView = Marionette.CompositeView.extend({

  // Create our collection from the gistbook's blocks
  initialize: function(options) {
    var gistblocks = options.model.get('blocks');
    this.collection = new Backbone.Collection(gistblocks);
    this.authorized = radio.reqres.request('global', 'authorized');
  },

  template: gistbookTemplates.gistbookView,

  ui: {
    container: '.gistbook-container'
  },

  itemViewContainer: '.gistbook-container',

  // Never used; just here to prevent errors
  itemView: Marionette.ItemView.extend({
    template: _.template('<div>hi</div>')
  }),

  className: 'gistbook',

  // Determine the view based on the authorization
  // and model info
  getItemView: function(model) {;
    var viewType = model.get('type');
    return this['_'+viewType+'View']();
  },

  _textView: function() {
    if (this.authorized) {
      this.itemViewOptions = {
        InertView: InertTextView
      };
      return ProcessedEditView;
    }

    else {
      this.itemViewOptions = {};
      return InertTextView.extend({
        tagName: 'li'
      });
    }

  },

  // Make it sortable if we're authorized
  onRender: function() {
    if (this.authorized) {
      this.ui.container.sortable({
        handle: '.gistblock-move'
      });
    }
  },

  _javascriptView: function() {
    if (this.authorized) {
      this.itemViewOptions = {
        className: 'gistblock gistblock-javascript'
      };
      return AceEditorView.extend({
        tagName: 'li'
      });
    }

    else {
      this.itemViewOptions = {
        readOnly: true,
        hideCursor: true,
        className: 'gistblock gistblock-javascript'
      };
      return AceEditorView.extend({
        tagName: 'li'
      });
    }
  },

  onBeforeClose: function() {
    // Shut down sortable
    this.ui.container.sortable('destroy');
  }
});
