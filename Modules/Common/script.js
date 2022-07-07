var app = angular.module('homeApp', ['ui.bootstrap', 'ngLoadingSpinner', '720kb.datepicker',
  'angularUtils.directives.dirPagination', 'ngAnimate', 'ngRoute', 'chart.js',
  'angular.morris-chart', 'HorseModule', 'DashboardController','CreatePlanModule',
  'ckeditor', 'TeamModule', 'ViewPlanModule', 'PendingPlanModule', 'EmployeeMasterModule', ,
  'StickerModule', 'ColourCodeModule', 'VendorMasterModule', 'TnCModule', 'PPModule', 'FAQModule',
  'RptCustomerSelectionModule', 'GameRuleModule', 'CategoriesModule', 'AuditModule', 'ForgotPasswordModule', 'WelcomeEmailModule'
  , 'ContestEmailModule', 'PickSaveModule', 'RegulationModule','ChangePasswordModule']);

app.factory('httpRequestInterceptor', function () {
  return {
    request: function (config) {
      var session = angular.fromJson(sessionStorage.getItem("app")) || {};
      console.log(session);
      // config.headers['Authorization'] = session.userAuthKey;
      if (session != null) {
        return config;
      }
      sessionStorage.setItem("app", null);
      //window.location.assign('./login.html');
      //console.log(config);
      return;
    },

    responseError: function (response) {
      if (response.status === 403 || response.status === 400) {
        var data = {};
        sessionStorage.setItem("app", null);
        // window.location.assign('./login.html');
      }
    }
  };
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

app.filter('showTimeSpan', function () {
    return function (timeObj, format) {
      return moment(timeObj, "HH:mm").format(format);
    };
  });

app.config(function ($routeProvider, $httpProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'Modules/Dashboard/Dashboard.html',
      controller: 'DashboardController'
    })
    
    .when('/team/', {
      templateUrl: 'Modules/Team/Team.html',
      controller: 'TeamController'
    })
    .when('/CreatePlan/', {
      templateUrl: 'Modules/CreatePlan/CreatePlan.html',
      controller: 'CreatePlanController'
    })
    .when('/ViewPlan/', {
      templateUrl: 'Modules/ViewPlan/ViewPlan.html',
      controller: 'ViewPlanController'
    })
    .when('/Horse/', {
      templateUrl: 'Modules/Horse/Horse.html',
      controller: 'HorseController'
    })
    .when('/PendingPlan/', {
      templateUrl: 'Modules/PendingPlan/PendingPlan.html',
      controller: 'PendingPlanModule'
    })
    .when('/EmployeeMaster/', {
      templateUrl: 'Modules/EmployeeMaster/EmployeeMaster.html',
      controller: 'EmployeeMasterController'
    })
   
    .when('/sticker/', {
      templateUrl: 'Modules/Sticker/Sticker.html',
      controller: 'StickerController'
    })
    .when('/colour/', {
      templateUrl: 'Modules/ColourCode/ColourCode.html',
      controller: 'ColourCodeController'
    })
    .when('/VendorMaster/', {
      templateUrl: 'Modules/VendorMaster/VendorMaster.html',
      controller: 'VendorMasterController'
    })
    .when('/tnc/', {
      templateUrl: 'Modules/TnC/TnC.html',
      controller: 'TnCController'
    })
    .when('/pp/', {
      templateUrl: 'Modules/PrivacyPolicy/PrivacyPolicy.html',
      controller: 'PPController'
    })
    .when('/faq/', {
      templateUrl: 'Modules/FAQ/FAQ.html',
      controller: 'FAQController'
    })
    .when('/rptCustomerReport/', {
      templateUrl: 'Modules/RptCustomerSelection/RptCustomerSelection.html',
      controller: 'RptCustomerSelectionController'
    })
    .when('/gamerule/', {
      templateUrl: 'Modules/GameRule/GameRule.html',
      controller: 'GameRuleController'
    })
    .when('/Categories/', {
      templateUrl: 'Modules/Categories/Categories.html',
      controller: 'CategoriesController'
    })
    .when('/Audit/', {
      templateUrl: 'Modules/Audit/Audit.html',
      controller: 'AuditController'
    })
    .when('/fp/', {
      templateUrl: 'Modules/ForgotPassword/ForgotPassword.html',
      controller: 'ForgotPasswordController'
    })
    .when('/welcomeEmail/', {
      templateUrl: 'Modules/WelcomeEmail/WelcomeEmail.html',
      controller: 'WelcomeEmailController'
    })
    .when('/contestEmail/', {
      templateUrl: 'Modules/ContestEmail/ContestEmail.html',
      controller: 'ContestEmailController'
    })
    .when('/pickSaveEmail/', {
      templateUrl: 'Modules/PickSaveEmail/PickSaveEmail.html',
      controller: 'PickSaveController'
    })
    .when('/Regulation/', {
      templateUrl: 'Modules/Regulation/Regulation.html',
      controller: 'RegulationController'
    })
    .when('/changePassword/', {
      templateUrl: 'Modules/ChangePassword/ChangePassword.html',
      controller: 'HomeController'
    })
    .otherwise({
      redirectTo: "/"
    });

  $locationProvider.hashPrefix('');
  //$httpProvider.interceptors.push('httpRequestInterceptor');
});
app.filter('reverse', function () {
  return function (items) {
    return items.slice().reverse();
  };
});

app.service('HomeService', function ($http, $location, $rootScope) {

  this.AppUrl = "";
  

  console.log($location.absUrl());

  if ($location.absUrl().indexOf('FB') != -1) {

    this.AppUrl = "/FB/api/"

  }
  else {

    this.AppUrl = "/api/"
  }

  this.ChangePassword = function (data) {

    return $http.post($rootScope.URL + '/api/User/ChangePassword', data, {});
  };


});



app.controller('HomeController', function ($scope, HomeService, $http, $rootScope, $window, $location) {

  $scope.userObj = {
    UserId: null,
    CurrentPassword: null,
    NewPassword: null,
    ConfirmPassword: null,
  };

  $scope.MainGrid = true;

  $scope.InitializeObject = function () {
    $scope.userObj = {
      UserId: null,
      CurrentPassword: null,
      NewPassword: null,
      ConfirmPassword: null,
    };
  };

  $rootScope.stopSpinner = true;
  console.log("homecontroller ");
  $rootScope.URL = "http://localhost:44361/";

  $scope.init = function () {
    $scope.InitializeObject();
    $rootScope.session = angular.fromJson(sessionStorage.getItem("app"));
    console.log($rootScope.session);
  };

  $scope.signout = function () {
    // debugger
    var data = {};
    sessionStorage.setItem("app", angular.toJson(data));
    $rootScope.session = {};
    window.location = './login.html';
    console.log(window.location);
  };


  $scope.ChangePassword = function () {
    var isValid = $scope.ValidateItems();
    if (isValid) {
      $scope.userObj.UserId = $rootScope.session.Id;
      HomeService.ChangePassword($scope.userObj).then(function (success) {
        swal({
          title: "Password Updated",
          text: success.data.Message +" Please login again to continue",
          buttons: true,
          dangerMode: true,
        })
          .then((willDelete) => {
            if (willDelete) {
              $scope.signout();
            }
            else {
              $scope.signout();
            }
          });
       
      }, function (error) {
        console.log(error);
      });
    }
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
    if ($scope.userObj.CurrentPassword == $scope.userObj.NewPassword) {
      swal('Error', 'Please Current & Confirm password cannot be same');
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
  $scope.init();

});
