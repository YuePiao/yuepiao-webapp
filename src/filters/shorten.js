import Vue from 'vue'

Vue.filter('shorten' , function(input) {
  return input.substring(0,10);
});
