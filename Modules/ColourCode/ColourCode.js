var app = angular.module('ColourCodeModule', []);

app.service('ColourCodeService', function ($http, $location, $rootScope) {

  this.ShareObj = {};
  this.SerachCriteria = {};
  if ($location.absUrl().indexOf('FB') != -1) {

    this.AppUrl = "/FB/api/"

  }
  else {

    this.AppUrl = "/api/"
  }
  this.GetListBasedOnType = function () {

    return $http.get($rootScope.URL + '/api/ListType/GetListBasedOnType?listType=Colour');
  };

  this.AddListType = function (data) {

    return $http.post($rootScope.URL + '/api/ListType/AddListType', data, {});
  };
  this.EditListType = function (data) {

    return $http.post($rootScope.URL + '/api/ListType/EditListType', data, {});
  };

  this.DeleteListType = function (item) {

    return $http.post($rootScope.URL + '/api/ListType/DeleteListType', item, {});
  };


});

app.controller('ColourCodeController', function ($scope, $http, $location, ColourCodeService,
  $rootScope, $uibModal, $filter) {
  $scope.ListType = [];
  
  $scope.MainGrid = true;
  $scope.AddForm = false;
  $scope.EditForm = false;
  $scope.UploadMobileImage = false;
  $scope.UploadDesktopImage = false;

  $scope.listTypeObj = {
    Id: null,
    ListTypeName: 'Colour',
    ListTypeText: null,
    ListTypeValue: null,
    Sequence: null,
  };

  $scope.init = function () {    //Section Wise Doughnought
    $scope.ManageScreenView('Main');
    $scope.InitializeObject();
    $scope.GetDataOnInit();
  };

  $scope.GetDataOnInit = function () {
    ColourCodeService.GetListBasedOnType().then(function (success) {
      $scope.ListType = success.data;
    }, function (error) {
      console.log(error);
    });
  }

  $scope.OpenAddForm = function () {
    $scope.ManageScreenView('Add');
    $scope.InitializeObject();
  };

  $scope.OpenEditForm = function (item) {
    $scope.ManageScreenView('Edit');
    $scope.listTypeObj = item;
  };

 

  $scope.AddData = function () {
    var isValid = $scope.ValidateItems();
    if (isValid) {
      
      ColourCodeService.AddListType($scope.listTypeObj).then(function (success) {
        swal(success.data);
        $scope.init();
      }, function (error) {
        console.log(error);
      });
    }
  };

  $scope.EditData = function (item) {
    var isValid = $scope.ValidateItems();
    if (isValid) {
     
      ColourCodeService.EditListType($scope.listTypeObj).then(function (success) {
        swal(success.data);
        $scope.init();
      }, function (error) {
        console.log(error);
      });
    }
  };
  $scope.DeleteItem = function (item) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover !",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          $scope.listTypeObj = item;
          ColourCodeService.DeleteListType($scope.listTypeObj).then(function (success) {
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
      $scope.UploadMobileImage = false;
      $scope.UploadDesktopImage = false;
    }
    else if (screenName == 'Add') {
      $scope.MainGrid = false;
      $scope.AddForm = true;
      $scope.EditForm = false;
      $scope.UploadMobileImage = false;
      $scope.UploadDesktopImage = false;
    }
    else if (screenName == 'Edit') {
      $scope.MainGrid = false;
      $scope.AddForm = false;
      $scope.EditForm = true;
      $scope.UploadMobileImage = false;
      $scope.UploadDesktopImage = false;
    }
    else if (screenName == 'UploadMobile') {
      $scope.MainGrid = false;
      $scope.AddForm = false;
      $scope.EditForm = false;
      $scope.UploadMobileImage = true;
      $scope.UploadDesktopImage = false;
    }
    else if (screenName == 'UploadDesktop') {
      $scope.MainGrid = false;
      $scope.AddForm = false;
      $scope.EditForm = false;
      $scope.UploadMobileImage = false;
      $scope.UploadDesktopImage = true;
    }
  };

  $scope.InitializeObject = function () {
    $scope.listTypeObj = {
      Id: null,
      ListTypeName: 'Colour',
      ListTypeText: null,
      ListTypeValue: null,
      Sequence: null,
    };

  };

  $scope.ValidateItems = function () {
    var isValid = true;
    if ($scope.listTypeObj.ListTypeText == null || $scope.listTypeObj.ListTypeText == '') {
      swal('Error', 'Please enter colour name');
      isValid = false;
    }
    if ($scope.listTypeObj.ListTypeValue == null || $scope.listTypeObj.ListTypeValue == '') {
      swal('Error', 'Please enter colour code');
      isValid = false;
    }
    if ($scope.listTypeObj.Sequence == null || $scope.listTypeObj.Sequence == '') {
      swal('Error', 'Please enter display order');
      isValid = false;
    }

    return isValid;

  };

  $scope.init();

});
