/*
 * string-util
 * -----------
 * Self-explanatory, I guess.
 *
 */

var stringUtil = {

  // Capitalize the first letter of a string
  capitalize: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

};
