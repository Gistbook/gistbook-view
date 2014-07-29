// Pick the keys from mergeOptions out of options and
// attach them directly to the instance
var mergeOptions = function(options, mergeOptions) {
  _.extend(this, _.pick(options, mergeOptions));
};

Marionette.View.prototype.mergeOptions = mergeOptions;
Marionette.Object.prototype.mergeOptions = mergeOptions;
