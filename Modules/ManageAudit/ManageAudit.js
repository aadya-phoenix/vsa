var app = angular.module('ManageAuditModule', []);

app.service('ManageAuditService', function ($http, $location, $rootScope) {

  this.ShareObj = {};
  this.SerachCriteria = {};
  if ($location.absUrl().indexOf('FB') != -1) {

    this.AppUrl = "/FB/api/"

  }
  else {

    this.AppUrl = "/api/"
  }
  //this.GetStickerList = function () {

  //  return $http.get($rootScope.URL + '/api/ListType/GetStickerList');
  //};

  //this.DeleteListType = function (item) {

  //  return $http.post($rootScope.URL + '/api/ListType/DeleteListType', item, {});
  //};
  

  //this.UploadStickerImageCommand = function (fd) {
  //  return $http.post("/api/ListType/UploadStickerImageCommand", fd, {
  //    transformRequest: angular.identity,
  //    //data: fd,
  //    dataType: "JSON",
  //    headers: { 'Content-Type': undefined }
  //  });
  //};

});

app.controller('ManageAuditController', function ($scope, $http, $location, ManageAuditService,
  $rootScope, $uibModal, $filter) {

  $scope.Auditarea = true;
  $scope.Auditarea1 = false;
  $scope.Auditarea2 = false;
  $scope.Auditarea3 = false;

  $scope.ListType = [];
  $scope.DriverList = [];
  $scope.ChampionshipList = [];
  //$scope.MainGrid = true;
  //$scope.AddForm = false;
  //$scope.EditForm = false;
  //$scope.UploadMobileImage = false;
  //$scope.UploadDesktopImage = false;

  $scope.listTypeObj = {
    Id: null,
    ImageName: null,    
    UserId: null,
  };

  //$scope.init = function () {    //Section Wise Doughnought
  //  $scope.ManageScreenView('Main');
  //  $scope.InitializeObject();
  //  $scope.GetDataOnInit();
  //};

  //$scope.GetDataOnInit = function () {
  //  StickerService.GetStickerList().then(function (success) {
  //    $scope.ListType = success.data;
  //  }, function (error) {
  //    console.log(error);
  //  });
    
  //}


  //$scope.OpenMobileUploadForm = function (item) {
  //  $scope.InitializeObject();
  //  $scope.ManageScreenView('UploadMobile');
  //  $scope.listTypeObj = item;
  //};


  //$scope.UploadMobileLogo = function (item) {
  //  if ($scope.myFile != null) {
  //    var fd = new FormData();
  //    var data = {
  //      'Id': $scope.listTypeObj.Id,
  //      'ImageName': null,
  //      'UserId': $rootScope.session.Id
  //    };
  //    fd.append('file', $scope.myFile);
  //    fd.append('data', angular.toJson(data));
  //    StickerService.UploadStickerImageCommand(fd).then(function (success) {
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

  //$scope.DeleteItem = function (item) {
  //  swal({
  //    title: "Are you sure?",
  //    text: "Once deleted, you will not be able to recover !",
  //    buttons: true,
  //    dangerMode: true,
  //  })
  //    .then((willDelete) => {
  //      if (willDelete) {
          
  //        StickerService.DeleteListType(item).then(function (success) {
  //          swal(success.data);
  //          $scope.init();
  //        }, function (error) {
  //          console.log(error);
  //        });
  //      }
  //    });

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
  //  $scope.listTypeObj = {
  //    Id: null,
  //    ImageName: null,
  //    UserId: null,
  //  };
  //};

  $scope.AddAuditArea = function () {
    $scope.Auditarea = false;
    $scope.Auditarea1 = true;
    $scope.Auditarea2 = false;
    $scope.Auditarea3 = false;
  };
  $scope.Next = function () {
    $scope.Auditarea = false;
    $scope.Auditarea1 = false;
    $scope.Auditarea2 = true;
    $scope.Auditarea3 = false;
  }
  $scope.Page3 = function () {
    $scope.Auditarea = false;
    $scope.Auditarea1 = false;
    $scope.Auditarea2 = false;
    $scope.Auditarea3 = true;
  }
 
  $scope.init();

});
