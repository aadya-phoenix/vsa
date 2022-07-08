var app = angular.module('VendorMasterModule', []);

app.service('VendorMasterService', function ($http, $location, $rootScope) {

  this.ShareObj = {};
  this.SerachCriteria = {};
  if ($location.absUrl().indexOf('FB') != -1) {

    this.AppUrl = "/FB/api/"

  }
  else {

    this.AppUrl = "/api/"
  }
  //this.GetContestList = function () {

  //  return $http.get($rootScope.URL + '/api/Contest/GetContestList');
  //};
  //this.GetInfluencerList = function () {

  //  return $http.get($rootScope.URL + '/api/Influencer/GetInfluencerList');
  //};

  //this.GetInfluencerQuestionsForRace = function (id) {

  //  return $http.get($rootScope.URL + '/api/Influencer/GetInfluencerQuestionsForRace?influencerId=' + id);
  //};
  //this.GetInfluencerQuestionsForQualifying = function (id) {

  //  return $http.get($rootScope.URL + '/api/Influencer/GetInfluencerQuestionsForQualifying?influencerId=' + id);
  //};

  //this.AddInfluencer = function (data) {

  //  return $http.post($rootScope.URL + '/api/Influencer/AddInfluencer', data, {});
  //};
  //this.EditInfluencer = function (data) {

  //  return $http.post($rootScope.URL + '/api/Influencer/EditInfluencer', data, {});
  //};
  //this.GetDriverList = function () {

  //  return $http.get($rootScope.URL + '/api/Driver/GetDriverList');
  //};
  //this.GetTeamList = function () {

  //  return $http.get($rootScope.URL + '/api/Team/GetTeamList');
  //};

  //this.DeleteInfluencerDetail = function (id) {

  //  return $http.get($rootScope.URL + '/api/Influencer/DeleteInfluencerDetail?influencerId=' + id);
  //};

  //this.UpsertRaceInfluencerDetail = function (data) {

  //  return $http.post($rootScope.URL + '/api/Influencer/UpsertRaceInfluencerDetail', data, {});
  //};
  //this.UpsertQualifyingInfluencer = function (data) {

  //  return $http.post($rootScope.URL + '/api/Influencer/UpsertQualifyingInfluencer', data, {});
  //};
  //this.DeleteInfluencer = function (data) {

  //  return $http.post($rootScope.URL + '/api/Influencer/DeleteInfluencer', data, {});
  //};


  //this.UploadInfluencerImageCommand = function (fd) {
  //  return $http.post("/api/Influencer/UploadInfluencerImageCommand", fd, {
  //    transformRequest: angular.identity,
  //    //data: fd,
  //    dataType: "JSON",
  //    headers: { 'Content-Type': undefined }
  //  });
  //};

});

app.controller('VendorMasterController', function ($scope, $http, $location, VendorMasterService,
  $rootScope, $uibModal, $filter) {

  $scope.Vender = true;
  $scope.VenderDetail = false;

  $scope.DriverList = [];
  $scope.TeamList = [];
  $scope.ContestList = [];
  
  $scope.InfluencerList = [];  
  //$scope.MainGrid = true;
  //$scope.AddForm = false;
  //$scope.EditForm = false;
  //$scope.UploadMobileImage = false;
  //$scope.UploadDesktopImage = false;
  //$scope.RaceResultForm = false;
  //$scope.QualifyingResultForm = false;

  $scope.influencerObj = {
    Id: null,
    FirstName: null,
    LastName: null,
    ContestId: null,
    UserId: null,
  };
  $scope.RaceResultList = [{
    InfluencerId: null,
    QuestionHeaderId: null,
    QuestionText: null,
    ResponseId: null,
    ResponseText: null,
    DriverDDL: [],
    TeamDDL: [],
    QuestionType: null,
    UserId: null,
    Sequence: null
  }];

  $scope.QualifyingResultList = [{
    InfluencerId: null,
    QuestionHeaderId: null,
    QuestionText: null,
    ResponseId: null,
    ResponseText: null,
    DriverDDL: [],
    TeamDDL: [],
    QuestionType: null,
    UserId: null,
    Sequence: null
  }];

  //$scope.init = function () {    //Section Wise Doughnought
  //  $scope.ManageScreenView('Main');
  //  $scope.InitializeObject();
  //  $scope.GetDataOnInit();
  //};

  //$scope.GetDataOnInit = function () {
  //  InfluencerService.GetContestList().then(function (success) {
  //    $scope.ContestList = success.data;
  //  }, function (error) {
  //    console.log(error);
  //  });
  //  InfluencerService.GetInfluencerList().then(function (success) {
  //    $scope.InfluencerList = success.data;
  //  }, function (error) {
  //    console.log(error);
  //  });
  //  InfluencerService.GetDriverList().then(function (success) {
  //    $scope.DriverList = success.data;
  //  }, function (error) {
  //    console.log(error);
  //  });
  //  InfluencerService.GetTeamList().then(function (success) {
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
  //  $scope.influencerObj = item;
  //};

  //$scope.OpenMobileUploadForm = function (item) {
  //  $scope.ManageScreenView('UploadMobile');
  //  $scope.influencerObj = item;
  //};

  //$scope.OpenRaceResult = function (item) {
  //  $scope.ManageScreenView('RaceResult');
  //  $scope.GetRaceResult(item.Id);
  //};

  //$scope.OpenQualifyingResult = function (item) {
  //  $scope.ManageScreenView('QualifyingResult');
  //  $scope.GetQualifyingResult(item.Id);
  //};

  //$scope.GetRaceResult = function (id) {
  //  InfluencerService.GetInfluencerQuestionsForRace(id).then(function (success) {
  //    $scope.RaceResultList = success.data;
  //    for (var i = 0; i < $scope.RaceResultList.length; i++) {
  //      $scope.RaceResultList[i].DriverDDL = angular.copy($scope.DriverList);
  //      $scope.RaceResultList[i].TeamDDL = angular.copy($scope.TeamList);
  //      $scope.RaceResultList[i].UserId = $rootScope.session.Id;
  //    }
  //  }, function (error) {
  //    console.log(error);
  //  });
  //};

  //$scope.GetQualifyingResult = function (id) {
  //  InfluencerService.GetInfluencerQuestionsForQualifying(id).then(function (success) {
  //    $scope.QualifyingResultList = success.data;
  //    for (var i = 0; i < $scope.QualifyingResultList.length; i++) {
  //      $scope.QualifyingResultList[i].DriverDDL = angular.copy($scope.DriverList);
  //      $scope.QualifyingResultList[i].TeamDDL = angular.copy($scope.TeamList);
  //      $scope.QualifyingResultList[i].UserId = $rootScope.session.Id;
  //    }
  //  }, function (error) {
  //    console.log(error);
  //  });
  //};

  //$scope.UpdateRaceResult = function () {
  //  InfluencerService.UpsertRaceInfluencerDetail($scope.RaceResultList).then(function (success) {
  //    swal(success.data);
  //    $scope.init();
  //  }, function (error) {
  //    console.log(error);
  //  });
  //};

  //$scope.UpsertQualifyingInfluencer = function () {
  //  var isvalid = false;
  //  isvalid = $scope.ValidateDuplicate();
  //  if (isvalid) {
  //    InfluencerService.UpsertQualifyingInfluencer($scope.QualifyingResultList).then(function (success) {
  //      swal(success.data);
  //      $scope.init();
  //    }, function (error) {
  //      console.log(error);
  //    });
  //  }
  //};

  //$scope.ValidateDuplicate = function () {

  //  for (var i = 0; i < $scope.QualifyingResultList.length; i++) {
  //    var duplicateCount = 0;
  //    for (var j = 0; j < $scope.QualifyingResultList.length; j++) {
  //      if ($scope.DriverList[i].Id == $scope.QualifyingResultList[j].ResponseId) {
  //        duplicateCount++;
  //      }
  //    }
  //    if (duplicateCount > 1) {
  //      swal('Multiple results selected for Driver ');
  //      return false;
  //    }
  //  }
  //  return true;
  //}

  //$scope.OpenDesktopUploadForm = function (item) {
  //  $scope.ManageScreenView('UploadDesktop');
  //  $scope.influencerObj = item;
  //};

  //$scope.AddData = function () {
  //  var isValid = $scope.ValidateItems();
  //  if (isValid) {
  //    $scope.influencerObj.UserId = $rootScope.session.Id;
  //    InfluencerService.AddInfluencer($scope.influencerObj).then(function (success) {
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
  //        $scope.influencerObj = item;
  //        $scope.influencerObj.UserId = $rootScope.session.Id;
  //        InfluencerService.DeleteInfluencer($scope.influencerObj).then(function (success) {
  //          swal(success.data);
  //          $scope.init();
  //        }, function (error) {
  //          console.log(error);
  //        });
  //      }
  //    });

  //};

  //$scope.ClearResponses = function (item) {
  //  swal({
  //    title: "Are you sure?",
  //    text: "Once cleared, you will not be able to recover !",
  //    buttons: true,
  //    dangerMode: true,
  //  })
  //    .then((willDelete) => {
  //      if (willDelete) {
  //        $scope.influencerObj = item;
  //        $scope.influencerObj.UserId = $rootScope.session.Id;
  //        InfluencerService.DeleteInfluencerDetail(item.Id).then(function (success) {
  //          swal(success.data);
  //          $scope.init();
  //        }, function (error) {
  //          console.log(error);
  //        });
  //      }
  //    });

  //};
     
    

  //$scope.EditData = function (item) {
  //  var isValid = $scope.ValidateItems();
  //  if (isValid) {
  //    $scope.influencerObj.UserId = $rootScope.session.Id;
  //    InfluencerService.EditInfluencer($scope.influencerObj).then(function (success) {
  //      swal(success.data);
  //      $scope.init();
  //    }, function (error) {
  //      console.log(error);
  //    });
  //  }
  //};

  //$scope.UploadMobileLogo = function (item) {
  //  if ($scope.myFile != null) {
  //    var fd = new FormData();
  //    var data = {
  //      'Id': $scope.influencerObj.Id,
  //      'ImagePath': null,
  //      'UserId': $rootScope.session.Id
  //    };
  //    fd.append('file', $scope.myFile);
  //    fd.append('data', angular.toJson(data));
  //    InfluencerService.UploadInfluencerImageCommand(fd).then(function (success) {
  //      swal(success.data);
  //      $scope.init();
  //    }, function (error) {
  //      console.log(error);
  //    });
  //  }
  //  else {
  //    swal('Please select influencer Image');
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
  //    InfluencerService.UploadLogoImageCommand(fd).then(function (success) {
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
  //    $scope.RaceResultForm = false;
  //    $scope.QualifyingResultForm = false;
  //  }
  //  else if (screenName == 'Add') {
  //    $scope.MainGrid = false;
  //    $scope.AddForm = true;
  //    $scope.EditForm = false;
  //    $scope.UploadMobileImage = false;
  //    $scope.UploadDesktopImage = false;
  //    $scope.RaceResultForm = false;
  //    $scope.QualifyingResultForm = false;
  //  }
  //  else if (screenName == 'Edit') {
  //    $scope.MainGrid = false;
  //    $scope.AddForm = false;
  //    $scope.EditForm = true;
  //    $scope.UploadMobileImage = false;
  //    $scope.UploadDesktopImage = false;
  //    $scope.RaceResultForm = false;
  //    $scope.QualifyingResultForm = false;
  //  }
  //  else if (screenName == 'UploadMobile') {
  //    $scope.MainGrid = false;
  //    $scope.AddForm = false;
  //    $scope.EditForm = false;
  //    $scope.UploadMobileImage = true;
  //    $scope.UploadDesktopImage = false;
  //    $scope.RaceResultForm = false;
  //    $scope.QualifyingResultForm = false;
  //  }
  //  else if (screenName == 'RaceResult') {
  //    $scope.MainGrid = false;
  //    $scope.AddForm = false;
  //    $scope.EditForm = false;
  //    $scope.UploadMobileImage = false;
  //    $scope.UploadDesktopImage = false;
  //    $scope.RaceResultForm = true;
  //    $scope.QualifyingResultForm = false;
  //  }
  //  else if (screenName == 'QualifyingResult') {
  //    $scope.MainGrid = false;
  //    $scope.AddForm = false;
  //    $scope.EditForm = false;
  //    $scope.UploadMobileImage = false;
  //    $scope.UploadDesktopImage = false;
  //    $scope.RaceResultForm = false;
  //    $scope.QualifyingResultForm = true;
  //  }
  //};

  //$scope.InitializeObject = function () {
  //  $scope.influencerObj = {
  //    Id: null,
  //    FirstName: null,
  //    LastName: null,
  //    ContestId: null,
  //    UserId: null,
  //  };
  //};

  //$scope.ValidateItems = function () {
  //  var isValid = true;
  //  if ($scope.influencerObj.ContestId == null || $scope.influencerObj.ContestId == '') {
  //    swal('Error', 'Please enter Contest');
  //    isValid = false;
  //  }
  //  if ($scope.influencerObj.FirstName == null || $scope.influencerObj.FirstName == '') {
  //    swal('Error', 'Please enter first name');
  //    isValid = false;
  //  }
  //  if ($scope.influencerObj.LastName == null || $scope.influencerObj.LastName == '') {
  //    swal('Error', 'Please enter last name');
  //    isValid = false;
  //  }

  //  return isValid;

  //};

  $scope.AddVender = function () {
    $scope.Vender = false;
    $scope.VenderDetail = true;
  }
  $scope.Close = function () {
    $scope.Vender = true;
    $scope.VenderDetail = false;
  }

  $scope.init();

});
