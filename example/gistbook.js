// An example gistbook file
(function() {

  var gistbook = {

    blocks: [
      {
        type: 'math',
        source: 'x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.'
      },
      {
        type: 'math',
        source: 'asdasf'
      },
      {
        type: 'javascript',
        source: 'var x = true;\nvar obj = {\n  name: "james",\n  affil: true\n};'
      },
      {
        type: 'markdown',
        source: '## hello\nJames ~~is~~ is not `cool`\n\n```\nvar a = true;\n```\nThis is **bold**, this is *italic*, this _too_'
      }
    ],
    resources: [
      'http://www.whatever.com/marionette.com'
    ]

  };

  window.gistbook = gistbook;

})();
