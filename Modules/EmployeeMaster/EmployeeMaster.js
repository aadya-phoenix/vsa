var app = angular.module('EmployeeMasterModule', []);

app.service('ContestResultService', function ($http, $location, $rootScope) {

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

  this.GetContestList = function () {

    return $http.get($rootScope.URL + '/api/Contest/GetContestList');
  };
  this.AddContest = function (data) {

    return $http.post($rootScope.URL + '/api/Contest/AddContest', data, {});
  };
  this.EditContest = function (data) {

    return $http.post($rootScope.URL + '/api/Contest/EditContest', data, {});
  };
  this.AddContestLeaderboardReward = function (data) {

    return $http.post($rootScope.URL + '/api/ContestLeaderboardReward/AddContestLeaderboardReward', data, {});
  };
  this.UpsertCustomerScore = function (id) {

    return $http.get($rootScope.URL + '/api/CustomerScore/UpsertCustomerScore?contestId=' + id);
  };

  this.DeleteContestResult = function (id,userId) {

    return $http.get($rootScope.URL + '/api/ContestResult/DeleteContestResult?contestId=' + id + '&userId=' + userId);
  };


  this.GetContestLeaderboardSetup = function (Id) {

    return $http.get($rootScope.URL + '/api/ContestLeaderboardReward/GetContestLeaderboardSetup?contestId=' + Id);
  };
  this.GetDriverList = function () {

    return $http.get($rootScope.URL + '/api/Driver/GetDriverList');
  };
  this.GetTeamList = function () {

    return $http.get($rootScope.URL + '/api/Team/GetTeamList');
  };
  this.GetContestReward = function (data) {

    return $http.post($rootScope.URL + '/api/ContestResult/GetContestReward', data, {});
  };

  this.GetContestQuestionResults = function (data) {

    return $http.get($rootScope.URL + '/api/ContestResult/GetContestQuestionResults?contestId=' + data);
  };
  this.UpsertContestResult = function (data) {

    return $http.post($rootScope.URL + '/api/ContestResult/UpsertContestResult', data, {});
  };
  this.UpsertRaceContestResult = function (data) {

    return $http.post($rootScope.URL + '/api/ContestResult/UpsertRaceContestResult', data, {});
  };

  this.UpsertInfluencerScore = function (data) {

    return $http.get($rootScope.URL + '/api/CustomerScore/UpsertInfluencerScore?contestId=' + data);
  };

  this.UploadContestImageCommand = function (fd) {
    return $http.post("/api/Contest/UploadContestImageCommand", fd, {
      transformRequest: angular.identity,
      //data: fd,
      dataType: "JSON",
      headers: { 'Content-Type': undefined }
    });
  };

});

app.controller('ContestResultController', function ($scope, $http, $location, ContestResultService,
  $rootScope, $uibModal, $filter) {

  
  $scope.DriverList = [];
  $scope.TeamList = [];
  $scope.ContestList = [];
  $scope.MainGrid = true;
  $scope.QualifyingResultForm = false;
  $scope.RaceResultForm = false;
  $scope.ResultList = [{
    ContestId: null,
    DriverId: null,
    ResultType: null,
    Rank: null,
    UserId: null,
    DriverDDL: [],
    TeamDDL: []
  }];

  $scope.RaceResultList = [{
    ContestId: null,
    QuestionId: null,
    QuestionText:null,
    DriverId: null,
    TeamId: null,
    ResponseText: null,   
    DriverDDL: [],
    TeamDDL: [],
    QuestionType:null,
    UserId: null,
  }];

  $scope.contestObj = {
    Id: null,
    ChampionshipId: null,
    ContestName: null,
    ContextDescription: null,
    QualifyingDate: null,
    RaceDate: null,
    SubmissionDate: null,
    Locaton: null,
    PrizePool: null,
    EntryFee: null,
    UserId: null,
    BannerImageURL: null,
    Rank: null,
    Amount: null
  };


  $scope.init = function () {    //Section Wise Doughnought
    $scope.ManageScreenView('Main');
    $scope.InitializeObject();
    $scope.GetDataOnInit();
  };

  $scope.GetDataOnInit = function () {    
    ContestResultService.GetContestList().then(function (success) {
      $scope.ContestList = success.data;
    }, function (error) {
      console.log(error);
    });
    ContestResultService.GetDriverList().then(function (success) {
      $scope.DriverList = success.data;
    }, function (error) {
      console.log(error);
    });
    ContestResultService.GetTeamList().then(function (success) {
      $scope.TeamList = success.data;
    }, function (error) {
      console.log(error);
    });
  }

  $scope.OpenResultForm = function (item,type) {

    $scope.InitializeObject();
    $scope.contestObj = item;
    
    if (type == 'Qualifying') {
      $scope.GetContestResult($scope.contestObj.Id, type);
      $scope.ManageScreenView('Qualifying');
    }
    else {
      $scope.ManageScreenView('Race');
      $scope.GetContestRaceResult($scope.contestObj.Id, type);
    }
  };

  $scope.GetContestResult = function (id, resultType) {
    var obj = {
      ContestId: id,
      ResultType: resultType
    }
    ContestResultService.GetContestReward(obj).then(function (success) {
      $scope.ResultList = success.data;
      for (var i = 0; i < $scope.ResultList.length; i++) {
        $scope.ResultList[i].DriverDDL = angular.copy($scope.DriverList);
        $scope.ResultList[i].UserId = $rootScope.session.Id;
      }
    }, function (error) {
      console.log(error);
    });
  };

  $scope.GetContestRaceResult = function (id, resultType) {
   
    ContestResultService.GetContestQuestionResults(id).then(function (success) {
      $scope.RaceResultList = success.data;
      for (var i = 0; i < $scope.RaceResultList.length; i++) {
        $scope.RaceResultList[i].DriverDDL = angular.copy($scope.DriverList);
        $scope.RaceResultList[i].TeamDDL = angular.copy($scope.TeamList);
        $scope.RaceResultList[i].UserId = $rootScope.session.Id;
      }
    }, function (error) {
      console.log(error);
    });
  };

  $scope.DeleteContestResult = function (id) {
    ContestResultService.DeleteContestResult(id, $rootScope.session.Id).then(function (success) {
      swal(success.data);
      $scope.init();
    }, function (error) {
      console.log(error);
    });

  }


  $scope.UpdateResult = function () {
    var isValid = $scope.ValidateDuplicate();
    if (isValid) {     
      ContestResultService.UpsertContestResult($scope.ResultList).then(function (success) {
        swal(success.data);
        $scope.init();
      }, function (error) {
        console.log(error);
      });
    }
  };

  $scope.UpdateRaceResult = function () {
    var isValid = true;
    if (isValid) {
      ContestResultService.UpsertRaceContestResult($scope.RaceResultList).then(function (success) {
        swal(success.data);
        $scope.init();
      }, function (error) {
        console.log(error);
      });
    }
  };

  $scope.GenerateResult = function (id) {
  
    ContestResultService.UpsertCustomerScore(id).then(function (success) {
        swal(success.data);
        $scope.init();
      }, function (error) {
        console.log(error);
      });
    
  };

  $scope.GenerateInfluencerResult = function (id) {

    ContestResultService.UpsertInfluencerScore(id).then(function (success) {
      swal(success.data);
      $scope.init();
    }, function (error) {
      console.log(error);
    });

  };

  $scope.ValidateDuplicate = function () {
    
    for (var i = 0; i < $scope.DriverList.length; i++) {
      var duplicateCount = 0;
      for (var j = 0; j < $scope.ResultList.length; j++) {
        if ($scope.DriverList[i].Id == $scope.ResultList[j].DriverId) {
          duplicateCount++;
        }
      }
      if (duplicateCount > 1) {
        swal('Multiple Ranks selected for Driver ' + $scope.DriverList[i].DriverName);
        return false;
      }
    }
    return true;
  }

  $scope.ManageScreenView = function (screenName) {
    if (screenName == 'Main') {
      $scope.MainGrid = true;
      $scope.QualifyingResultForm = false;
      $scope.RaceResultForm = false;

    }
    else if (screenName == 'Qualifying') {
      $scope.MainGrid = false;
      $scope.QualifyingResultForm = true;
      $scope.RaceResultForm = false;

    }
    else {
      $scope.MainGrid = false;
      $scope.QualifyingResultForm = false;
      $scope.RaceResultForm = true;
    }
   
  };

  $scope.InitializeObject = function () {
    $scope.contestObj = {
      Id: null,
      ChampionshipId: null,
      ContestName: null,
      ContextDescription: null,
      QualifyingDate: null,
      RaceDate: null,
      SubmissionDate: null,
      Locaton: null,
      PrizePool: null,
      EntryFee: null,
      UserId: null,
      BannerImageURL: null,
    };
    $scope.ResultList = [{
      ContestId: null,
      DriverId: null,
      ResultType: null,
      Rank: null,
      UserId: null,
      DriverDDL: []
    }];
    $scope.RaceResultList = [{
      ContestId: null,
      QuestionId: null,
      QuestionText: null,
      DriverId: null,
      TeamId: null,
      ResponseText: null,
      DriverDDL: [],
      TeamDDL: [],
      QuestionType: null,
      UserId: null,
    }];
  };

   $scope.init();

});
