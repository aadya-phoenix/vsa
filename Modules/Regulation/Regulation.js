var app = angular.module('RegulationModule', []);

app.service('RegulationService', function ($http, $location, $rootScope) {

  this.ShareObj = {};
  this.SerachCriteria = {};
  if ($location.absUrl().indexOf('FB') != -1) {

    this.AppUrl = "/FB/api/"

  }
  else {

    this.AppUrl = "/api/"
  }
  //this.GetBannerList = function () {

  //  return $http.get($rootScope.URL + '/api/Banner/GetBannerList');
  //};  


  //this.UpsertBanner = function (fd) {
  //  return $http.post("/api/Banner/UpsertBanner", fd, {
  //    transformRequest: angular.identity,
  //    //data: fd,
  //    dataType: "JSON",
  //    headers: { 'Content-Type': undefined }
  //  });
  //};

});

app.controller('RegulationController', function ($scope, $http, $location, RegulationService,
  $rootScope, $uibModal, $filter) {

  $scope.Regulation = true;
  $scope.RegulationDetail = false;

  $scope.TeamList = [];
  $scope.DriverList = [];
  $scope.ChampionshipList = [];
  $scope.MainGrid = true;
  $scope.AddForm = false;
  $scope.EditForm = false;
  $scope.UploadMobileImage = false;
  $scope.UploadDesktopImage = false;

  $scope.bannerObj = {
    Id: null,
    BannerType: null,
    BannerImage: null,
    BannerUrl: null,  
    UserId: null,
  };

  //$scope.init = function () {    //Section Wise Doughnought
  //  $scope.ManageScreenView('Main');
  //  $scope.InitializeObject();
  //  $scope.GetDataOnInit();
  //};

  //$scope.GetDataOnInit = function () {
  //  BannerService.GetBannerList().then(function (success) {
  //    $scope.BannerList = success.data;
  //  }, function (error) {
  //    console.log(error);
  //  });
    
  //}

  //$scope.OpenEditForm = function (item) {
  //  $scope.ManageScreenView('Edit');
  //  $scope.bannerObj = item;
  //};
 

  //$scope.EditData = function (item) {
  //  var isValid = $scope.ValidateItems();
  //  if (isValid) {
  //    $scope.bannerObj.UserId = $rootScope.session.Id;
  //    var fd = new FormData();    
  //    fd.append('file', $scope.myFile);
  //    fd.append('data', angular.toJson($scope.bannerObj));
  //    BannerService.UpsertBanner(fd).then(function (success) {
  //      swal(success.data);
  //      $scope.init();
  //    }, function (error) {
  //      console.log(error);
  //    });
  //  }
  //};

 

  

  //$scope.ManageScreenView = function (screenName) {
  //  if (screenName == 'Main') {
  //    $scope.MainGrid = true;
  //    $scope.AddForm = false;
  //    $scope.EditForm = false;
  //    $scope.UploadMobileImage = false;
  //    $scope.UploadDesktopImage = false;
  //  }
  //  else if (screenName == 'Add') {
  //    $scope.MainGrid = false;
  //    $scope.AddForm = true;
  //    $scope.EditForm = false;
  //    $scope.UploadMobileImage = false;
  //    $scope.UploadDesktopImage = false;
  //  }
  //  else if (screenName == 'Edit') {
  //    $scope.MainGrid = false;
  //    $scope.AddForm = false;
  //    $scope.EditForm = true;
  //    $scope.UploadMobileImage = false;
  //    $scope.UploadDesktopImage = false;
  //  }
  //  else if (screenName == 'UploadMobile') {
  //    $scope.MainGrid = false;
  //    $scope.AddForm = false;
  //    $scope.EditForm = false;
  //    $scope.UploadMobileImage = true;
  //    $scope.UploadDesktopImage = false;
  //  }
  //  else if (screenName == 'UploadDesktop') {
  //    $scope.MainGrid = false;
  //    $scope.AddForm = false;
  //    $scope.EditForm = false;
  //    $scope.UploadMobileImage = false;
  //    $scope.UploadDesktopImage = true;
  //  }
  //};

  //$scope.InitializeObject = function () {
  //  $scope.driverObj = {
  //    Id: null,
  //    DriverName: null,
  //    Description: null,
  //    ChampionshipId: null,
  //    UserId: null,
  //    SeedPosition: null,
  //    IsAvailableForQualifying: null

  //  };
  //};

  //$scope.ValidateItems = function () {
  //  var isValid = true;
  //  if ($scope.bannerObj.BannerUrl == null || $scope.bannerObj.ChampionshipId == '') {
  //    swal('Error', 'Please enter banner URL');
  //    isValid = false;
  //    return false;
  //  }
   

  //  return isValid;

  //};

  $scope.AddRegulation = function () {
    $scope.Regulation = false;
    $scope.RegulationDetail = true;
  };
  $scope.Close = function () {
    $scope.Regulation = true;
    $scope.RegulationDetail = false;
  }

  $scope.init();

});
