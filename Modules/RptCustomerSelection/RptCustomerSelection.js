var app = angular.module('RptCustomerSelectionModule', []);

app.service('RptCustomerSelectionService', function ($http, $location, $rootScope) {

  this.ShareObj = {};
  this.SerachCriteria = {};
  if ($location.absUrl().indexOf('FB') != -1) {

    this.AppUrl = "/FB/api/"

  }
  else {

    this.AppUrl = "/api/"
  }
  this.GetContestList = function () {

    return $http.get($rootScope.URL + '/api/Contest/GetContestList');
  };
  

  this.GetCustomerSelectionsForReport = function (data) {

    return $http.get($rootScope.URL + '/api/CustomerResponse/GetCustomerSelectionsForReport?contestId='+ data);
  };

});

app.controller('RptCustomerSelectionController', function ($scope, $http, $location, RptCustomerSelectionService,
  $rootScope, $uibModal, $filter) {
  $scope.ContestList = [];
  $scope.RptList = []; 
  $scope.MainGrid = true;
  $scope.ContestId = null;

  $scope.init = function () {    //Section Wise Doughnought
    $scope.ManageScreenView('Main');
    $scope.GetDataOnInit();
  };

  $scope.GetDataOnInit = function () {
    RptCustomerSelectionService.GetContestList().then(function (success) {
      
      $scope.ContestList = success.data;
    }, function (error) {
      console.log(error);
    });   
  }

  $scope.SearchData = function () {
    $scope.RptList = [];
    RptCustomerSelectionService.GetCustomerSelectionsForReport($scope.ContestId).then(function (success) {

      $scope.RptList = success.data;
    }, function (error) {
      console.log(error);
    });
  }

  $scope.OpenAddForm = function () {
    $scope.ManageScreenView('Add');
    $scope.InitializeObject();
  };  

  $scope.ManageScreenView = function (screenName) {
    if (screenName == 'Main') {
      $scope.MainGrid = true;     
    }
    else if (screenName == 'Add') {
      $scope.MainGrid = false;     
    }
    else if (screenName == 'Edit') {
      $scope.MainGrid = false;     
    }
    else if (screenName == 'UploadMobile') {
      $scope.MainGrid = false;     
    }
    else if (screenName == 'UploadDesktop') {
      $scope.MainGrid = false;    
    }
  };  

 
  $scope.init();

});
