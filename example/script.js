// An example file uses the compiler
(function() {

  Backbone.Wreqr.radio.reqres.setHandler('global', 'authorized', function() {
    return true;
  });

  // Get our gistbook
  var gistbook = window.gistbook;

  var gistblocks = new Backbone.Collection(gistbook.blocks);

  // Get our view
  var GistbookView = window.GistbookView;

  // Set up a region to display the Gistbook within
  var region = new Marionette.Region({
    el: '.gistbook-container'
  });

  // Show the gistbook
  region.show(new GistbookView({collection:gistblocks}));

})();
