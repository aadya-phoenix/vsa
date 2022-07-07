var app = angular.module('TeamModule', []);

app.service('TeamService', function ($http, $location, $rootScope) {

  this.ShareObj = {};
  this.SerachCriteria = {};
  if ($location.absUrl().indexOf('FB') != -1) {

    this.AppUrl = "/FB/api/"

  }
  else {

    this.AppUrl = "/api/"
  }
  this.GetChampionshipList = function () {

    return $http.get($rootScope.URL + '/api/Championship/GetChampionshipList');
  };
  this.GetTeamList = function () {

    return $http.get($rootScope.URL + '/api/Team/GetTeamList');
  };
  this.AddTeam = function (data) {

    return $http.post($rootScope.URL + '/api/Team/AddTeam', data, {});
  };
  this.EditTeam = function (data) {

    return $http.post($rootScope.URL + '/api/Team/EditTeam', data, {});
  };

  this.DeleteTeam = function (data) {

    return $http.post($rootScope.URL + '/api/Team/DeleteTeam', data, {});
  };



  this.UploadTeamLogoCommand = function (fd) {
    return $http.post("/api/Team/UploadTeamLogoCommand", fd, {
      transformRequest: angular.identity,
      //data: fd,
      dataType: "JSON",
      headers: { 'Content-Type': undefined }
    });
  };

});

app.controller('TeamController', function ($scope, $http, $location, TeamService,
  $rootScope, $uibModal, $filter) {
  $scope.TeamList = [];
  $scope.ChampionshipList = [];
  $scope.MainGrid = true;
  $scope.AddForm = false;
  $scope.EditForm = false;
  $scope.UploadMobileImage = false;
  $scope.UploadDesktopImage = false;

  $scope.teamObj = {
    Id: null,
    TeamName: null,   
    ChampionshipId: null,
    UserId: null,
  };

  $scope.init = function () {    //Section Wise Doughnought
    $scope.ManageScreenView('Main');
    $scope.InitializeObject();
    $scope.GetDataOnInit();
  };

  $scope.GetDataOnInit = function () {
    TeamService.GetChampionshipList().then(function (success) {
      $scope.ChampionshipList = success.data;
    }, function (error) {
      console.log(error);
    });
    TeamService.GetTeamList().then(function (success) {
      $scope.TeamList = success.data;
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
    $scope.teamObj = item;
  };

  $scope.OpenMobileUploadForm = function (item) {
    $scope.ManageScreenView('UploadMobile');
    $scope.teamObj = item;
  };

  $scope.OpenDesktopUploadForm = function (item) {
    $scope.ManageScreenView('UploadDesktop');
    $scope.team = item;
  };

  $scope.AddData = function () {
    var isValid = $scope.ValidateItems();
    if (isValid) {
      $scope.teamObj.UserId = $rootScope.session.Id;
      TeamService.AddTeam($scope.teamObj).then(function (success) {
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
      $scope.teamObj.UserId = $rootScope.session.Id;
      TeamService.EditTeam($scope.teamObj).then(function (success) {
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
          $scope.teamObj = item;
          $scope.teamObj.UserId = $rootScope.session.Id;
          TeamService.DeleteTeam($scope.teamObj).then(function (success) {
            swal(success.data);
            $scope.init();
          }, function (error) {
            console.log(error);
          });
        }
      });

  };

  $scope.UploadMobileLogo = function (item) {
    if ($scope.myFile != null) {
      var fd = new FormData();
      var data = {
        'Id': $scope.teamObj.Id,
        'TeamLogo': null,
        'UserId': $rootScope.session.Id
      };
      fd.append('file', $scope.myFile);
      fd.append('data', angular.toJson(data));
      TeamService.UploadTeamLogoCommand(fd).then(function (success) {
        swal(success.data);
        $scope.init();
      }, function (error) {
        console.log(error);
      });
    }
    else {
      swal('Please select logo Image');
      return false;
    }
  }

  $scope.UploadDesktopLogo = function (item) {
    if ($scope.myFile != null) {
      var fd = new FormData();
      var data = {
        'Id': $scope.championshipObj.Id,
        'ImageType': 'Desktop',
        'ImagePath': null,
        'UserId': $rootScope.session.Id
      };
      fd.append('file', $scope.myFile);
      fd.append('data', angular.toJson(data));
      DriverService.UploadLogoImageCommand(fd).then(function (success) {
        swal(success.data);
        $scope.init();
      }, function (error) {
        console.log(error);
      });
    }
    else {
      swal('Please select logo Image');
      return false;
    }
  }

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
    $scope.teamObj = {
      Id: null,
      TeamName: null,
      ChampionshipId: null,
      UserId: null,
    };
  };

  $scope.ValidateItems = function () {
    var isValid = true;
    if ($scope.teamObj.ChampionshipId == null || $scope.teamObj.ChampionshipId == '') {
      swal('Error', 'Please enter championship name');
      isValid = false;
      return false;
    }
    if ($scope.teamObj.TeamName == null || $scope.teamObj.TeamName == '') {
      swal('Error', 'Please enter team name');
      isValid = false;
      return false;
    }

    return isValid;

  };

  $scope.init();

});
