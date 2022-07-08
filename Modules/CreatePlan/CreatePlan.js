var app = angular.module('CreatePlanModule', []);

app.service('CreatePlanService', function ($http, $location, $rootScope) {

  this.ShareObj = {};
  this.SerachCriteria = {};
  if ($location.absUrl().indexOf('FB') != -1) {

    this.AppUrl = "/FB/api/"

  }
  else {

    this.AppUrl = "/api/"
  }
  //this.GetChampionshipList = function () {

  //  return $http.get($rootScope.URL + '/api/Championship/GetChampionshipList');
  //};
  //this.GetTeamList = function () {

  //  return $http.get($rootScope.URL + '/api/Team/GetTeamList');
  //};
  //this.GetDriverList = function () {

  //  return $http.get($rootScope.URL + '/api/Driver/GetDriverList');
  //};
  //this.AddDriver = function (data) {

  //  return $http.post($rootScope.URL + '/api/Driver/AddDriver', data, {});
  //};
  //this.EditDriver = function (data) {

  //  return $http.post($rootScope.URL + '/api/Driver/EditDriver', data, {});
  //};

  //this.DeleteDriver = function (data) {

  //  return $http.post($rootScope.URL + '/api/Driver/DeleteDriver', data, {});
  //};


  //this.UploadDriverImageCommand = function (fd) {
  //  return $http.post("/api/Driver/UploadDriverImageCommand", fd, {
  //    transformRequest: angular.identity,
  //    //data: fd,
  //    dataType: "JSON",
  //    headers: { 'Content-Type': undefined }
  //  });
  //};

});

app.controller('CreatePlanController', function ($scope, $http, $location, CreatePlanService,
  $rootScope, $uibModal, $filter) {

  $scope.Plan = true;

  $scope.TeamList = [];
  $scope.DriverList = [];
  $scope.ChampionshipList = [];
  //$scope.MainGrid = true;
  //$scope.AddForm = false;
  //$scope.EditForm = false;
  //$scope.UploadMobileImage = false;
  //$scope.UploadDesktopImage = false;

  $scope.driverObj = {
    Id: null,
    DriverName: null,
    Description: null,
    ChampionshipId: null,
    TeamId: null,
    UserId: null,
    SeedPosition: null,
    IsAvailableForQualifying:null

  };

  //$scope.init = function () {    //Section Wise Doughnought
  //  $scope.ManageScreenView('Main');
   
  //};
  //$scope.AddData = function () {    //Section Wise Doughnought
  //  swal('Create Plan Details Added Succesfull');
  //};
  //$scope.GetDataOnInit = function () {
  //  DriverService.GetChampionshipList().then(function (success) {
  //    $scope.ChampionshipList = success.data;
  //  }, function (error) {
  //    console.log(error);
  //  });
  //  DriverService.GetDriverList().then(function (success) {
  //    $scope.DriverList = success.data;
  //  }, function (error) {
  //    console.log(error);
  //  });
  //  DriverService.GetTeamList().then(function (success) {
  //    $scope.TeamList = success.data;
  //  }, function (error) {
  //    console.log(error);
  //  });
  //}

  //$scope.OpenAddForm = function () {
  //  $scope.ManageScreenView('Add');
  //  $scope.InitializeObject();
  //};

  //$scope.OpenEditForm = function (item) {
  //  $scope.ManageScreenView('Edit');
  //  $scope.driverObj = item;
  //};

  //$scope.OpenMobileUploadForm = function (item) {
  //  $scope.ManageScreenView('UploadMobile');
  //  $scope.driverObj = item;
  //};

  //$scope.OpenDesktopUploadForm = function (item) {
  //  $scope.ManageScreenView('UploadDesktop');
  //  $scope.driverObj = item;
  //};

 

  //$scope.EditData = function (item) {
  //  var isValid = $scope.ValidateItems();
  //  if (isValid) {
  //    $scope.driverObj.UserId = $rootScope.session.Id;
  //    DriverService.EditDriver($scope.driverObj).then(function (success) {
  //      swal(success.data);
  //      $scope.init();
  //    }, function (error) {
  //      console.log(error);
  //    });
  //  }
  //};

  //$scope.DeleteItem = function (item) {
  //  swal({
  //    title: "Are you sure?",
  //    text: "Once deleted, you will not be able to recover !",
  //    buttons: true,
  //    dangerMode: true,
  //  })
  //    .then((willDelete) => {
  //      if (willDelete) {
  //        $scope.driverObj = item;
  //        $scope.driverObj.UserId = $rootScope.session.Id;
  //        DriverService.DeleteDriver($scope.driverObj).then(function (success) {
  //          swal(success.data);
  //          $scope.init();
  //        }, function (error) {
  //          console.log(error);
  //        });
  //      }
  //    });

  //};

  //$scope.UploadMobileLogo = function (item) {

  //  if ($scope.myFile != null) {
  //    var fd = new FormData();
  //    var data = {
  //      'Id': $scope.driverObj.Id,
  //      'DriverImage': null,
  //      'UserId': $rootScope.session.Id
  //    };
  //    fd.append('file', $scope.myFile);
  //    fd.append('data', angular.toJson(data));
  //    DriverService.UploadDriverImageCommand(fd).then(function (success) {
  //      swal(success.data);
  //      $scope.init();
  //    }, function (error) {
  //      console.log(error);
  //    });
  //  }
  //  else {
  //    swal('Please select logo Image');
  //    return false;
  //  }
  //}

  //$scope.UploadDesktopLogo = function (item) {
  //  if ($scope.myFile != null) {
  //    var fd = new FormData();
  //    var data = {
  //      'Id': $scope.championshipObj.Id,
  //      'ImageType': 'Desktop',
  //      'ImagePath': null,
  //      'UserId': $rootScope.session.Id
  //    };
  //    fd.append('file', $scope.myFile);
  //    fd.append('data', angular.toJson(data));
  //    DriverService.UploadLogoImageCommand(fd).then(function (success) {
  //      swal(success.data);
  //      $scope.init();
  //    }, function (error) {
  //      console.log(error);
  //    });
  //  }
  //  else {
  //    swal('Please select logo Image');
  //    return false;
  //  }
  //}

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
  //  if ($scope.driverObj.ChampionshipId == null || $scope.driverObj.ChampionshipId == '') {
  //    swal('Error', 'Please enter championship name');
  //    isValid = false;
  //    return false;
  //  }
  //  if ($scope.driverObj.TeamId == null || $scope.driverObj.TeamId == '') {
  //    swal('Error', 'Please enter team name');
  //    isValid = false;
  //    return false;
  //  }
  //  if ($scope.driverObj.DriverName == null || $scope.driverObj.DriverName == '') {
  //    swal('Error', 'Please enter driver name');
  //    isValid = false;
  //    return false;
  //  }

  //  return isValid;

  //};
  $scope.Create = function () {
    new swal("Plan Created Successfully");
  };

  $scope.Back = function () {
    $scope.Plan = false;
  };

  $scope.init();

});
