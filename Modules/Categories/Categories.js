var app = angular.module('CategoriesModule', []);

app.service('CustomerService', function ($http, $location, $rootScope) {

  this.ShareObj = {};
  this.SerachCriteria = {};
  if ($location.absUrl().indexOf('FB') != -1) {

    this.AppUrl = "/FB/api/"

  }
  else {

    this.AppUrl = "/api/"
  }
  this.GetAllCustomers = function () {

    return $http.get($rootScope.URL + '/api/Customer/GetAllCustomers');
  };
  
  this.DeleteCustomer = function (data) {

    return $http.post($rootScope.URL + '/api/Customer/DeleteCustomer', data, {});
  };
  

});

app.controller('CategoriesController', function ($scope, $http, $location, CustomerService,
  $rootScope, $uibModal, $filter) {

 
  $scope.CustomerList = [];
  $scope.ChampionshipList = [];
  $scope.MainGrid = true;
  $scope.AddForm = false;
  $scope.EditForm = false;
  $scope.UploadMobileImage = false;
  $scope.UploadDesktopImage = false;  


  $scope.init = function () {    //Section Wise Doughnought
    $scope.ManageScreenView('Main');
    $scope.InitializeObject();
    $scope.GetDataOnInit();
  };

  $scope.GetDataOnInit = function () {
    CustomerService.GetAllCustomers().then(function (success) {
      $scope.CustomerList = success.data;
    }, function (error) {
      console.log(error);
    });
   
  }



  $scope.DeleteItem = function (item) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover !",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
         
          CustomerService.DeleteCustomer(item).then(function (success) {
            swal(success.data);
            $scope.init();
          }, function (error) {
            console.log(error);
          });
        }
      });

  };


  $scope.ManageScreenView = function (screenName) {
    if (screenName == 'Main') {
      $scope.MainGrid = true;
      $scope.AddForm = false;
      $scope.EditForm = false;      
    }

  };

  $scope.InitializeObject = function () {
    $scope.contestObj = {
      Id: null,
      ChampionshipId: null,
      ContestName: null,
      ContextDescription: null,
      QualifyingDate: null,
      QualifyingTime: null,
      RaceDate: null,
      RaceTime: null,
      SubmissionDate: null,
      Locaton: null,
      PrizePool: null,
      EntryFee: null,
      UserId: null,
      BannerImageURL: null,
      IsQualifyingLocked: false,
      IsRaceLocked: false,
    };
  };


  $scope.init();

});
