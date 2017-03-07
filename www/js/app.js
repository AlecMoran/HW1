
var quizApp = angular.module('quizApp', ['ionic'])

  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: "/home",
        templateUrl: "templates/home.html",
        controller: "homeCtrl"
      })
      .state('imageQuestion', {
        url: "/imageQuestion",
        templateUrl: "templates/imageQuestion.html",
        controller: "imageQuestionCtrl",
        params: {'score': null}
      })
      .state('textQuestion', {
        url: "/textQuestion",
        templateUrl: "templates/textQuestion.html",
        controller: "textQuestionCtrl",
        params: {'score': null}
      })
      .state('results', {
        url: "/results",
        templateUrl: "templates/results.html",
        controller: "resultsCtrl",
        params: {'score': null}
      });

    $urlRouterProvider.otherwise("/home");

  });

quizApp.controller('homeCtrl', function($scope, $state) {
  $scope.onStart = function () {
    $state.go("imageQuestion", {score: 0})
  };
});

quizApp.controller('imageQuestionCtrl', function($scope, $ionicModal, $ionicLoading, $state, $stateParams) {
  $scope.onSelect = function (choice) {
    $state.go("textQuestion", {score: $stateParams.score + choice})
  };
});

quizApp.controller('textQuestionCtrl', function($scope, $ionicModal, $ionicLoading, $state, $stateParams) {
  $scope.onNext = function () {
    var correct = 0;
    if($scope.textAnswer.toString() == "honorificabilitudinitatibus") {
      correct = 1;
    }
    $state.go("results", {score: $stateParams.score + correct});
    $scope.textAnswer = "";
  };
});

quizApp.controller('resultsCtrl', function($scope, $ionicModal, $ionicLoading, $state, $stateParams) {
  $scope.final = $stateParams.score;
  $scope.onDone = function () {
    $state.go("home")
  };
});
