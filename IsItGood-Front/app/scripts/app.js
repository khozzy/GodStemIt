'use strict';

// App libraries
var app = angular.module('myApp', [
  'angular-loading-bar',
  'frapontillo.gage'
]);

app.controller('PredictionController',function($scope, $http){
  $scope.sentence = 'Wpisz tutaj jakieś głupie zdanie...';

  $scope.title = "Prawdopodobieństwo";
  $scope.titleFontColor = '#D1E2E5';
  $scope.valueFontColor = '#D1E2E5';
  $scope.min = 50;
  $scope.max = 100;
  $scope.valueMinFontSize = undefined;
  $scope.titleMinFontSize = undefined;
  $scope.labelMinFontSize = undefined;
  $scope.minLabelMinFontSize = undefined;
  $scope.maxLabelMinFontSize = undefined;
  $scope.hideValue = false;
  $scope.hideMinMax = false;
  $scope.hideInnerShadow = false;
  $scope.width = undefined;
  $scope.height = undefined;
  $scope.relativeGaugeSize = undefined;
  $scope.gaugeWidthScale = 0.5;
  $scope.gaugeColor = '#D1E2E5';
  $scope.showInnerShadow = true;
  $scope.shadowOpacity = 0.5;
  $scope.shadowSize = 3;
  $scope.shadowVerticalOffset = 10;
  $scope.levelColors = ['#00FFF2', '#668C54', '#FFAF2E', '#FF2EF1'];
  $scope.customSectors = [
      {
          color: "#ff0000",
          lo: 50,
          hi: 60
      },
      {
          color: "#ffff00",
          lo: 60,
          hi: 80
      },
      {
          color: "#00ff00",
          lo: 80,
          hi: 100
      }
  ];
  $scope.noGradient = false;
  $scope.label = 'pewności predykcji';
  $scope.labelFontColor = '#D1E2E5';
  $scope.startAnimationTime = 0;
  $scope.startAnimationType = undefined;
  $scope.refreshAnimationTime = undefined;
  $scope.refreshAnimationType = undefined;
  $scope.donut = undefined
  $scope.donutAngle = 90;
  $scope.counter = true;
  $scope.decimals = 2;
  $scope.symbol = '%';
  $scope.formatNumber = true;
  $scope.humanFriendly = true;
  $scope.humanFriendlyDecimal = true;
  $scope.textRenderer = function (value) {
      return value;
  };

  $scope.wipe = function() {
    $scope.sentence = '';
    $scope.mood = '-';
    $scope.prob = 0;
    $scope.errorHappend = false;
    $scope.successfulRequest = null;
  }

  $scope.predict = function() {
    console.log("Calling prediction for: " + $scope.sentence)

    $http({
      url: 'http://localhost:8080/predict',
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      data: JSON.stringify({original: $scope.sentence})
    }).success(function(data) {
      var positiveness = data['posProb'];
      var probability = 0.5 + Math.abs(0.5 - positiveness);

      console.log("rec: " + data['posProb'])
      console.log("prob: " + probability)

      $scope.prob = probability * 100;
      $scope.value = Math.round($scope.prob * 100) / 100;
      $scope.successfulRequest = true;

      if (positiveness < 0.5) {
        $scope.mood = "NEGATYWNIE";
        $scope.moodclass = "fa-thumbs-o-down";
        $scope.color = '#AA4439';
      } else {
        $scope.mood = "POZYTYWNIE"
        $scope.moodclass = "fa-thumbs-o-up";
        $scope.color = '#2B803E';
      }
    }).error(function(data) {
      $scope.successfulRequest = false;
      $scope.errorHappend = true;
    })

  }

});
