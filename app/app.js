'use strict';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDcv_1e_IxWrpYcXuryOd1Cvt5myas8KtA",
    authDomain: "angularjs-register-b30d5.firebaseapp.com",
    databaseURL: "https://angularjs-register-b30d5.firebaseio.com",
    storageBucket: "angularjs-register-b30d5.appspot.com",
    messagingSenderId: "555620813017"
  };
  firebase.initializeApp(config);


// Declare app level module which depends on views, and components
angular.module('mycontact', [
  'ngRoute',
  'firebase',
  'mycontact.contact'
]).
config(['$routeProvider', function($routeProvider) {

	
  $routeProvider.otherwise({redirectTo: '/contact'});
}]);
