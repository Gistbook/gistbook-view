// An example gistbook file
(function() {

  var gistbook = {
    title: 'Lesson 1: Pythagorean Theorem',

    blocks: [
     {
        type: 'text',
        source: 'Welcome to Gistbook!\n\nHover over these sections to see the menu options.\n\nThere are also menu options between the blocks to create a new block.'
      },
      {
        type: 'text',
        source: '## Pythagorean Theorem\n\nThe pythagorean theorem calculates the hypotenuse of a triangle.\n\n'+
        '$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$\n\n'+
        'It can be calculated in Javascript with a simple function.'
      },
      {
        type: 'javascript',
        source: 'var norm = function(a, b) {\n  var obj = {\n  name: "james",\n  affil: true\n};'
      },
      {
        type: 'text',
        source: 'Lala more text.'
      }
    ],
    resources: [
      'http://www.whatever.com/marionette.com'
    ]
  };

  window.gistbook = gistbook;

})();
