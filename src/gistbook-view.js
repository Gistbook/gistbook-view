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
