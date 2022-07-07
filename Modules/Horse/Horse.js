var app = angular.module('HorseModule', []);

app.service('HorseService', function ($http, $location, $rootScope) {

  this.ShareObj = {};
  this.SerachCriteria = {};
  if ($location.absUrl().indexOf('FB') != -1) {

    this.AppUrl = "/FB/api/"

  }
  else {

    this.AppUrl = "/api/"
  }
  this.GetHorseList = function () {

    return $http.get($rootScope.URL+'/api/Horse/GetHorseList');
  };
  this.GetGameList = function () {

    return $http.get($rootScope.URL + '/api/Game/GetGameList');
  };
  this.HorseInsertCommand = function (data) {

    return $http.post($rootScope.URL +'/api/Horse/HorseInsertCommand', data, {});
  };
  this.UpdateHorseCommand = function (data) {

    return $http.post($rootScope.URL + '/api/Horse/UpdateHorseCommand', data, {});
  };

  this.DeleteHorseCommand = function (data) {

    return $http.post($rootScope.URL + '/api/Horse/DeleteHorseCommand', data, {});
  };
  this.UploadHorseImageCommand = function (fd) {
    return $http.post("/api/Horse/UploadHorseImageCommand", fd, {
      transformRequest: angular.identity,
      //data: fd,
      dataType: "JSON",
      headers: { 'Content-Type': undefined }
    });
  };

});

app.controller('HorseController', function ($scope, $http, $location, HorseService,
  $rootScope, $uibModal, $filter, SweetAlert) {
  $scope.HorseData = [];
  $scope.GameList = [];
  $scope.MainGrid = true;
  $scope.AddHorse = false;
  $scope.EditHorse = false;
  $scope.UploadImage = false;
  $scope.horseObj = {
    Game_Id: null,
    HorseName: null,
    JockeyName: null,
    JockeyStats: null,
    TrainerName: null,
    Last5Finishes: null,
    Comments: null,
    Odds: null,
    HorseImage: null,
    Seed: null,
    Sequence: null,
    Pair: null,
    Round: null,
    BetAmount: null,
    ButtonText: null,
    RedirectLink: null,
    CreatedBy: null,
    ModifiedBy:null
  };

  $scope.init = function () {    //Section Wise Doughnought
    $scope.ManageScreenView('Main');
    $scope.InitializeObject();
    $scope.GetDataOnInit();    
  };

  $scope.GetDataOnInit = function () {
    HorseService.GetGameList().then(function (success) {
      $scope.GameList = success.data;
    }, function (error) {
      console.log(error);
    });
    HorseService.GetHorseList().then(function (success) {
      $scope.HorseData = success.data;
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
    $scope.horseObj = item;
  };

  $scope.OpenUploadForm = function (item) {
    $scope.ManageScreenView('Upload');
    $scope.horseObj = item;
  };

  $scope.AddHorseData = function () {
    var isValid = $scope.ValidateItems();
    if (isValid) {
      $scope.horseObj.CreatedBy = $rootScope.session.Id;
      HorseService.HorseInsertCommand($scope.horseObj).then(function (success) {
        SweetAlert.info(success.data);
        $scope.init();
      }, function (error) {
        console.log(error);
      });
    }
  };

  $scope.EditHorseData = function (item) {
    var isValid = $scope.ValidateItems();
    if (isValid) {
      $scope.horseObj.ModifiedBy = $rootScope.session.Id;
      HorseService.UpdateHorseCommand($scope.horseObj).then(function (success) {
        SweetAlert.info(success.data);
        $scope.init();
      }, function (error) {
        console.log(error);
      });
    }
  };

  $scope.DeleteHorseData = function (item) {
    $scope.horseObj = item;
    $scope.horseObj.ModifiedBy = $rootScope.session.Id;
    HorseService.DeleteHorseCommand($scope.horseObj).then(function (success) {
      SweetAlert.info(success.data);
      $scope.init();
    }, function (error) {
      console.log(error);
    });
  };

  $scope.UploadHorseImage = function (item) {
    if ($scope.myFile != null) {
      var fd = new FormData();
      var data = {
        'Id': $scope.horseObj.Id,
        'HorseImage': null,
        'CreatedBy': $rootScope.session.Id
      };
      fd.append('file', $scope.myFile);
      fd.append('data', angular.toJson(data));
      HorseService.UploadHorseImageCommand(fd).then(function (success) {
        SweetAlert.info(success.data);
        $scope.init();
      }, function (error) {
        console.log(error);
      });
    }
    else {
      SweetAlert.info('Please select Horse Image');
      return false;
    }
  }

  $scope.ManageScreenView = function (screenName) {
    if (screenName == 'Main') {
      $scope.MainGrid = true;
      $scope.AddHorse = false;
      $scope.EditHorse = false;
      $scope.UploadImage = false;
    }
    else if (screenName == 'Add') {
      $scope.MainGrid = false;
      $scope.AddHorse = true;
      $scope.EditHorse = false;
      $scope.UploadImage = false;
    }
    else if (screenName == 'Edit') {
      $scope.MainGrid = false;
      $scope.AddHorse = false;
      $scope.EditHorse = true;
      $scope.UploadImage = false;
    }
    else if (screenName == 'Upload') {
      $scope.MainGrid = false;
      $scope.AddHorse = false;
      $scope.EditHorse = false;
      $scope.UploadImage = true;
    }
  };

  $scope.InitializeObject = function () {
    $scope.horseObj = {
      Game_Id: null,
      HorseName: null,
      JockeyName: null,
      JockeyStats: null,
      TrainerName: null,
      Last5Finishes: null,
      Comments: null,
      Odds: null,
      HorseImage: null,
      Seed: null,
      Sequence: null,
      Pair: null,
      Round: null,
      BetAmount: null,
      ButtonText: null,
      RedirectLink: null,
      CreatedBy: null,
    };
  };

  $scope.ValidateItems = function () {
    var isValid = true;
    if ($scope.horseObj.Game_Id == null || $scope.horseObj.Game_Id == '') {
      SweetAlert.info('Please select Game');
      isValid=false;
    }
    if ($scope.horseObj.HorseName == null || $scope.horseObj.HorseName == '') {
      SweetAlert.info('Please enter horse name');
      isValid = false;
    }
    if ($scope.horseObj.JockeyName == null || $scope.horseObj.JockeyName == '') {
      SweetAlert.info('Please enter jockey name');
      isValid = false;
    }
    if ($scope.horseObj.JockeyStats == null || $scope.horseObj.JockeyStats == '') {
      SweetAlert.info('Please enter jockey stats');
      isValid = false;
    }
    if ($scope.horseObj.TrainerName == null || $scope.horseObj.TrainerName == '') {
      SweetAlert.info('Please enter trainer name');
      isValid = false;
    }
    if ($scope.horseObj.Odds == null || $scope.horseObj.Odds == '') {
      SweetAlert.info('Please enter Odds');
      isValid = false;
    }
    if ($scope.horseObj.Seed == null || $scope.horseObj.Seed == '') {
      SweetAlert.info('Please enter seed');
      isValid = false;
    }
    if ($scope.horseObj.Sequence == null || $scope.horseObj.Sequence == '') {
      SweetAlert.info('Please enter sequence');
      isValid = false;
    }
    if ($scope.horseObj.Pair == null || $scope.horseObj.Pair == '') {
      SweetAlert.info('Please enter pair');
      isValid = false;
    }
    if ($scope.horseObj.Round == null || $scope.horseObj.Round == '') {
      SweetAlert.info('Please enter round');
      isValid = false;
    }
    if ($scope.horseObj.BetAmount == null || $scope.horseObj.BetAmount == '') {
      SweetAlert.info('Please enter bet amount');
      isValid = false;
    }
    if ($scope.horseObj.ButtonText == null || $scope.horseObj.ButtonText == '') {
      SweetAlert.info('Please enter button text');
      isValid = false;

    }
    if ($scope.horseObj.RedirectLink == null || $scope.horseObj.RedirectLink == '') {
      SweetAlert.info('Please enter horse name');
      isValid = false;
    }
    return isValid;

  };

  $scope.init();

});
