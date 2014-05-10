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
