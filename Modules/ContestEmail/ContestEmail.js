var app = angular.module('ContestEmailModule', []);

app.service('ContestEmailService', function ($http, $location, $rootScope) {

  this.ShareObj = {};
  this.SerachCriteria = {};
  if ($location.absUrl().indexOf('FB') != -1) {

    this.AppUrl = "/FB/api/"

  }
  else {

    this.AppUrl = "/api/"
  }
  this.GetHorseList = function () {

    return $http.get($rootScope.URL + '/api/Horse/GetHorseList');
  };
  this.GetStaticContent = function (item) {

    return $http.get($rootScope.URL + '/api/StaticContent/GetStaticContent?contentType=' + item);
  };
  this.UpsertStaticContent = function (data) {

    return $http.post($rootScope.URL + '/api/StaticContent/UpsertStaticContent', data, {});
  };

});

app.controller('ContestEmailController', function ($scope, $http, $location, ContestEmailService,
  $rootScope, $uibModal, $filter) {
  $scope.TnC = {};
  $scope.options = {
    language: 'en',
    allowedContent: false,
    entities: false,
    removeButtons: 'Image'
  };

  $scope.init = function () {    //Section Wise Doughnought
    $scope.options = {
      language: 'en',
      allowedContent: false,
      entities: false,
      removeButtons: 'Image'
    };
    $scope.GetDataOnInit();

  };

  $scope.GetDataOnInit = function () {
    ContestEmailService.GetStaticContent('ContestEmail').then(function (success) {
      $scope.Content = success.data;
    }, function (error) {
      console.log(error);
    });

  }

  $scope.UpdateRule = function () {
    $scope.Content.DataType = 'ContestEmail';
    ContestEmailService.UpsertStaticContent($scope.Content).then(function (success) {
      swal(success.data);
    }, function (error) {
      console.log(error);
    });

  }



  $scope.init();

});
