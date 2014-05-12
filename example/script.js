// An example file uses the compiler
(function() {

  Backbone.Wreqr.radio.reqres.setHandler('global', 'authorized', function() {
    return true;
  });

  // Set up a region to display the Gistbook within
  var region = new Marionette.Region({
    el: '.gistbook-location'
  });

  // Get our gistbook in Backbone form
  var gistbook = new Backbone.Model(window.gistbook);

  // Get our view
  var GistbookView = window.GistbookView;

  window.gistbookView = new GistbookView({model:gistbook});

  // Show the gistbook
  region.show(window.gistbookView);

})();
