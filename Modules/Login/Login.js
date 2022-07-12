var app = angular.module('LoginModule', ['ngLoadingSpinner', 'ui.bootstrap', 'ngLoadingSpinner', 'ngStorage']);
app.service('LoginService', function ($http, $location, $rootScope) {
  this.AppUrl = "";
  console.log($location.absUrl());
  if ($location.absUrl().indexOf('FB') != -1) {
    this.AppUrl = "/FB/api/"
  }
  else {
    this.AppUrl = "/api/"
  }
  //this.authenticateLogin = function (data) {
  //  return $http.post('http://localhost:44361/api/User/ValidateUserCredentials', data, {});
  //};


});

app.directive('numbersOnly', function () {
  return {
    require: 'ngModel',
    link: function (scope, element, attr, ngModelCtrl) {
      function fromUser(text) {
        if (text) {
          var transformedInput = text.replace(/[^0-9]/g, '');

          if (transformedInput !== text) {
            ngModelCtrl.$setViewValue(transformedInput);
            ngModelCtrl.$render();
          }
          return transformedInput;
        }
        return undefined;
      }
      ngModelCtrl.$parsers.push(fromUser);
    }
  };
});
app.factory('crypt', function () {
  return {
    hash: function (value) {
      //var str = JSON.stringify(value);
      return CryptoJS.SHA1(value).toString();
    }
  };
});
app.directive('fileModel', ['$parse', function ($parse) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var model = $parse(attrs.fileModel);
      var modelSetter = model.assign;

      element.bind('change', function () {
        scope.$apply(function () {
          modelSetter(scope, element[0].files[0]);
        });
      });
    }
  };
}]);

app.controller('LoginController', function ($scope, $http, $location, LoginService, $uibModal, crypt, $localStorage, $rootScope) {
  console.log("insoide LoginController");
  $rootScope.stopSpinner = true;

  $scope.UserInfo = {
    Username: null,
    Password: null,
    Role_Id: null,
    RoleName: 'Admin',
    RoleName: 'Vender',
    RefId: null
  };

  $scope.init = function () {
    $scope.UserInfo = {
      Username: null,
      Password: null,
    };
    sessionStorage.setItem("app", null);
    $scope.showForgotPassword = false;
  };


  $scope.ForgotPass = function () {

  }

  $scope.Login = function () {
    debugger

    $scope.UserInfo.RoleName = "Admin";

    sessionStorage.setItem("app", angular.toJson($scope.UserInfo));
    window.location = 'index.html#/';



  };


  $scope.init();
});
