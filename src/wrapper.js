// @include ../tmp/templates.js

(function() {

  var Radio = Backbone.Radio;

  // @include ../bower_components/html5sortable/jquery.sortable.js

  // @include resources/shim/merge-options.shim.js
  // @include resources/shim/radio.shim.js
  // @include resources/shim/to-json.shim.js
  // @include resources/util/string-util.js
  // @include resources/util/radio-util.js
  // @include resources/cache-manager/cache-manager.js

  // @include gistbook-view/gistbook-view.js
  // @include gistbook-view/managers/title-manager.js
  
  // @include child-views/title/display/display-title-view.js
  // @include child-views/title/edit/edit-title-view.js
  // @include child-views/blocks-view/blocks-view.js
  // @include child-views/ace-editor-view/ace-editor-view.js
  // @include child-views/text/display/display-text-view.js
  // @include child-views/text/edit/edit-text-view.js
  // @include child-views/wrappers/display/display-wrapper.js
  // @include child-views/wrappers/edit/edit-wrapper.js
  // @include child-views/controls-wrapper/controls-wrapper.js

  window.GistbookView = GistbookView;

})();
