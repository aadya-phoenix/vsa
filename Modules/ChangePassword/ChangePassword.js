var app = angular.module('ChangePasswordModule', []);

app.service('ChangePasswordService', function ($http, $location, $rootScope) {

  this.ShareObj = {};
  this.SerachCriteria = {};
  if ($location.absUrl().indexOf('FB') != -1) {

    this.AppUrl = "/FB/api/"

  }
  else {

    this.AppUrl = "/api/"
  }
 

  

});

app.controller('ChangePasswordController', function ($scope, $http, $location, ChangePasswordService,
  $rootScope, $uibModal, $filter) {

  
  $scope.ContestList = [];
  $scope.ListTypeList = [];
  $scope.ChampionshipList = [];
  $scope.MainGrid = true;
  $scope.AddForm = false;
  $scope.EditForm = false;
  $scope.UploadMobileImage = false;
  $scope.UploadDesktopImage = false;

 
  $scope.init = function () {    //Section Wise Doughnought
    $scope.ManageScreenView('Main');
    $scope.InitializeObject();
  };

 


  $scope.AddData = function () {
    var isValid = $scope.ValidateItems();
    if (isValid) {
      $scope.userObj.UserId = $rootScope.session.Id;
      ChangePasswordService.ChangePassword($scope.userObj).then(function (success) {
        swal(success.data.Message);
        $scope.init();
      }, function (error) {
        console.log(error);
      });
    }
  };

  $scope.ManageScreenView = function (screenName) {
    if (screenName == 'Main') {
      $scope.MainGrid = true;      
    }
  };

  $scope.InitializeObject = function () {
    $scope.userObj = {
      UserId: null,
      CurrentPassword: null,
      NewPassword: null,
      ConfirmPassword:null,
    };
  };

  $scope.ValidateItems = function () {
    var isValid = true;
    if ($scope.userObj.CurrentPassword == null || $scope.userObj.CurrentPassword == '') {
      swal('Error', 'Please enter current password');
      isValid = false;
      return false;
    }
    if ($scope.userObj.NewPassword == null || $scope.userObj.NewPassword == '') {
      swal('Error', 'Please enter New password');
      isValid = false;
      return false;
    }
    if ($scope.userObj.ConfirmPassword == null || $scope.userObj.ConfirmPassword == '') {
      swal('Error', 'Please enter confirm password, Password should be atleast 8 characters long and should contain one number, one character and one special character');
      isValid = false;
      return false;
    }
    if ($scope.userObj.ConfirmPassword != $scope.userObj.NewPassword) {
      swal('Error', 'Please New & Confirm password should match');
      isValid = false;
      return false;
    }
  

    return isValid;

  };

  $scope.AddNewRow = function () {
    $scope.ListItem.push({
      ContestId: $scope.contestObj.Id,
      Amount: 0,
      UserId: $rootScope.session.Id
    });
  };

  $scope.RemoveRow = function (item) {
    $scope.ListItem.pop(item);
  };

  $scope.InsertAmount = function () {
    var IsSuccess = true;
    $scope.count = 1
    angular.forEach($scope.ListItem, function (value, key) {
      if (!value.Amount)
        IsSuccess = false;
      value.UserId = $rootScope.session.Id;
      value.Rank = $scope.count++;
    });
    if (!IsSuccess) {
      swal('Please Insert Winning Amount');
      return false;
    }

    ChangePasswordService.AddContestLeaderboardReward($scope.ListItem).then(function (success) {
      if (success.data.indexOf('Success') != -1) {
        swal(success.data);
        $scope.init();
      }
      else {

      }
    }, function (error) {
      console.log(error);
    });
  }

  $scope.init();

});
