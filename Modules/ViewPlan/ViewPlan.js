var app = angular.module('ViewPlanModule', []);

app.service('ContestService', function ($http, $location, $rootScope) {

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
 
  //this.GetContestList = function () {

  //  return $http.get($rootScope.URL + '/api/Contest/GetContestList');
  //};
  //this.AddContest = function (data) {

  //  return $http.post($rootScope.URL + '/api/Contest/AddContest', data, {});
  //};
  //this.EditContest = function (data) {

  //  return $http.post($rootScope.URL + '/api/Contest/EditContest', data, {});
  //};

  //this.SendContestEmail = function (data) {

  //  return $http.post($rootScope.URL + '/api/Contest/SendContestEmail', data, {});
  //};
  //this.DeleteContest = function (data) {

  //  return $http.post($rootScope.URL + '/api/Contest/DeleteContest', data, {});
  //};
  //this.AddContestLeaderboardReward = function (data) {

  //  return $http.post($rootScope.URL + '/api/ContestLeaderboardReward/AddContestLeaderboardReward', data, {});
  //};

  //this.GetContestLeaderboardSetup = function (Id) {

  //  return $http.get($rootScope.URL + '/api/ContestLeaderboardReward/GetContestLeaderboardSetup?contestId=' + Id);
  //};

  //this.GetListBasedOnType = function (listType) {
  //  return $http.get($rootScope.URL + '/api/ListType/GetListBasedOnType?listType=' + listType);
  //};

  //this.UploadContestImageCommand = function (fd) {
  //  return $http.post("/api/Contest/UploadContestImageCommand", fd, {
  //    transformRequest: angular.identity,
  //    //data: fd,
  //    dataType: "JSON",
  //    headers: { 'Content-Type': undefined }
  //  });
  //};

});

app.controller('ViewPlanController', function ($scope, $http, $location, ContestService,
  $rootScope, $uibModal, $filter) {
  $scope.myVar = true;
  $scope.myVar1 = false;
  $scope.myVar2 = false;
  $scope.ListItem = [
    {
      ContestId: null,
      Amount: null,
      UserId: null,
    }];
  $scope.ContestList = [];
  $scope.ListTypeList = [];
  $scope.ChampionshipList = [];
  //$scope.MainGrid = true;
  //$scope.AddForm = false;
  //$scope.EditForm = false;
  //$scope.UploadMobileImage = false;
  //$scope.UploadDesktopImage = false;

  
  $scope.contestObj = {
    Id: null,
    ChampionshipId: null,
    ContestName: null,
    ContextDescription: null,
    QualifyingDate: null,
    QualifyingTime: null,
    RaceDate: null,
    RaceTime:null,
    SubmissionDate: null,
    Locaton: null,
    PrizePool: null,
    EntryFee: null,
    UserId: null,
    BannerImageURL: null,
    Rank: null,
    Amount: null,
    IsQualifyingLocked: false,
    IsRaceLocked: false,
    RaceMode:null,
  };
  $scope.assign = function () {    //Section Wise Doughnought
    swal('View Plan Detail Assigend Succesfull');
  };
  $scope.submit = function () {    //Section Wise Doughnought
    swal('View Plan Detail submitted Succesfull');
  };

  //$scope.init = function () {    //Section Wise Doughnought
  //  $scope.ManageScreenView('Main');
  //  $scope.InitializeObject();
  //  $scope.GetDataOnInit();
  //};

  //$scope.GetDataOnInit = function () {
  //  ContestService.GetChampionshipList().then(function (success) {
  //    $scope.ChampionshipList = success.data;
  //  }, function (error) {
  //    console.log(error);
  //  });
  //  ContestService.GetContestList().then(function (success) {
  //    $scope.ContestList = success.data;
  //  }, function (error) {
  //    console.log(error);
  //  });
  //  ContestService.GetListBasedOnType('RaceMode').then(function (success) {
  //    $scope.ListTypeList = success.data;
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
  //  $scope.contestObj = item;
  //  $scope.contestObj.SubmissionDate = $filter('date')(item.QualifyingDate, 'dd MMM yyyy');
  //  $scope.contestObj.QualifyingDate = $filter('date')(item.QualifyingDate, 'dd MMM yyyy');
  //  $scope.contestObj.RaceDate = $filter('date')(item.RaceDate, 'dd MMM yyyy');
  //  $scope.contestObj.QualifyingTime = $filter('date')(item.QualifyingTime);
  //  $scope.contestObj.RaceTime = $filter('date')(item.RaceTime);
  //};

  //$scope.OpenMobileUploadForm = function (item) {
  //  $scope.ManageScreenView('UploadMobile');
  //  $scope.contestObj = item;
  //};

  //$scope.OpenBannerUploadForm = function (item) {
  //  $scope.ManageScreenView('UploadBanner');
  //  $scope.contestObj = item;
  //};

  //$scope.OpenAmountForm = function (item) {
  //  $scope.ListItem = [];
  //  $scope.ManageScreenView('WinningAmount');
  //  $scope.contestObj = item;
  //  $scope.GetContestLeaderboardSetup();
    
  //};

  //$scope.GetContestLeaderboardSetup = function () {
  //  ContestService.GetContestLeaderboardSetup($scope.contestObj.Id).then(function (success) {
  //    $scope.ListItem = success.data;
  //    for (var i = 0; i < $scope.ListItem.length; i++) {
  //      $scope.ListItem[i].UserId = $rootScope.session.Id;
  //    }
  //    if ($scope.ListItem.length == 0) {
  //      $scope.AddNewRow();
  //    }
  //  }, function (error) {
  //    console.log(error);
  //  });
  //}

  //$scope.OpenDesktopUploadForm = function (item) {
  //  $scope.ManageScreenView('UploadDesktop');
  //  $scope.contestObj = item;
  //};

  //$scope.AddData = function () {
  //  var isValid = $scope.ValidateItems();
  //  if (isValid) {
  //    $scope.contestObj.UserId = $rootScope.session.Id;
  //    $scope.contestObj.RaceTime = $filter('date')($scope.contestObj.RaceTime, 'HH:mm:ss');;
  //    $scope.contestObj.QualifyingTime = $filter('date')($scope.contestObj.QualifyingTime, 'HH:mm:ss')
  //    ContestService.AddContest($scope.contestObj).then(function (success) {
  //      swal(success.data);
  //      $scope.init();
  //    }, function (error) {
  //      console.log(error);
  //    });
  //  }
  //};

  //$scope.EditData = function (item) {
  //  var isValid = $scope.ValidateItems();
  //  if (isValid) {
  //    $scope.contestObj.UserId = $rootScope.session.Id;
  //    $scope.contestObj.RaceTime = $filter('date')($scope.contestObj.RaceTime, 'HH:mm:ss');;
  //    $scope.contestObj.QualifyingTime = $filter('date')($scope.contestObj.QualifyingTime, 'HH:mm:ss')
  //    ContestService.EditContest($scope.contestObj).then(function (success) {
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
  //        $scope.contestObj = item;
  //        $scope.contestObj.UserId = $rootScope.session.Id;
  //        ContestService.DeleteContest($scope.contestObj).then(function (success) {
  //          swal(success.data);
  //          $scope.init();
  //        }, function (error) {
  //          console.log(error);
  //        });
  //      }
  //    });

  //};

  //$scope.SendEmail = function (item) {
  //  swal({
  //    title: "Are you sure?",
  //    text: "Mmail would be sent to all users !",
  //    buttons: true,
  //    dangerMode: true,
  //  })
  //    .then((willDelete) => {
  //      if (willDelete) {
  //        $scope.contestObj = item;
  //        $scope.contestObj.UserId = $rootScope.session.Id;
  //        ContestService.SendContestEmail($scope.contestObj).then(function (success) {
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
  //      'Id': $scope.contestObj.Id,
  //      'ImageType':'Mobile',
  //      'ImagePath': null,
  //      'UserId': $rootScope.session.Id
  //    };
  //    fd.append('file', $scope.myFile);
  //    fd.append('data', angular.toJson(data));
  //    ContestService.UploadContestImageCommand(fd).then(function (success) {
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

  //$scope.UploadBannerLogo = function (item) {
  //  if ($scope.myFile != null) {
  //    var fd = new FormData();
  //    var data = {
  //      'Id': $scope.contestObj.Id,
  //      'ImageType': 'Banner',
  //      'ImagePath': null,
  //      'UserId': $rootScope.session.Id
  //    };
  //    fd.append('file', $scope.myFile);
  //    fd.append('data', angular.toJson(data));
  //    ContestService.UploadContestImageCommand(fd).then(function (success) {
  //      swal(success.data);
  //      $scope.init();
  //    }, function (error) {
  //      console.log(error);
  //    });
  //  }
  //  else {
  //    swal('Please select banner Image');
  //    return false;
  //  }
  //}

  //$scope.UploadDesktopLogo = function (item) {
  //  if ($scope.myFile != null) {
  //    var fd = new FormData();
  //    var data = {
  //      'Id': $scope.contestObj.Id,
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
  //    $scope.RemoveRow();
  //    $scope.UploadMobileImage = false;
  //    $scope.UploadBannerImage = false;
  //    $scope.AmountForm = false;
  //    $scope.UploadDesktopImage = false;
  //  }
  //  else if (screenName == 'Add') {
  //    $scope.MainGrid = false;
  //    $scope.AddForm = true;
  //    $scope.EditForm = false;
  //    $scope.UploadMobileImage = false;
  //    $scope.UploadBannerImage = false;
  //    $scope.AmountForm = false;
  //    $scope.UploadDesktopImage = false;
  //  }
  //  else if (screenName == 'Edit') {
  //    $scope.MainGrid = false;
  //    $scope.AddForm = false;
  //    $scope.EditForm = true;
  //    $scope.UploadMobileImage = false;
  //    $scope.UploadBannerImage = false;
  //    $scope.AmountForm = false;
  //    $scope.UploadDesktopImage = false;
  //  }
  //  else if (screenName == 'UploadMobile') {
  //    $scope.MainGrid = false;
  //    $scope.AddForm = false;
  //    $scope.EditForm = false;
  //    $scope.UploadMobileImage = true;
  //    $scope.UploadBannerImage = false;
  //    $scope.AmountForm = false;
  //    $scope.UploadDesktopImage = false;
  //  }
  //  else if (screenName == 'UploadBanner') {
  //    $scope.MainGrid = false;
  //    $scope.AddForm = false;
  //    $scope.EditForm = false;
  //    $scope.UploadMobileImage = false;
  //    $scope.UploadBannerImage = true;
  //    $scope.AmountForm = false;
  //    $scope.UploadDesktopImage = false;
  //  }
  //  else if (screenName == 'WinningAmount') {
  //    $scope.MainGrid = false;
  //    $scope.AddForm = false;
  //    $scope.EditForm = false;      
  //    $scope.UploadMobileImage = false;
  //    $scope.UploadBannerImage = false;
  //    $scope.AmountForm = true;
  //    $scope.UploadDesktopImage = false;
  //  }
  //  else if (screenName == 'UploadDesktop') {
  //    $scope.MainGrid = false;
  //    $scope.AddForm = false;
  //    $scope.EditForm = false;
  //    $scope.UploadMobileImage = false;
  //    $scope.UploadBannerImage = false;
  //    $scope.AmountForm = false;
  //    $scope.UploadDesktopImage = true;
  //  }
  //};

  //$scope.InitializeObject = function () {
  //  $scope.contestObj = {
  //    Id: null,
  //    ChampionshipId: null,
  //    ContestName: null,
  //    ContextDescription: null,
  //    QualifyingDate: null,
  //    QualifyingTime: null,
  //    RaceDate: null,
  //    RaceTime: null,
  //    SubmissionDate: null,
  //    Locaton: null,
  //    PrizePool: null,
  //    EntryFee: null,
  //    UserId: null,
  //    BannerImageURL: null,
  //    IsQualifyingLocked: false,
  //    IsRaceLocked: false,
  //    RaceMode: null,
  //  };
  //};

  //$scope.ValidateItems = function () {
  //  var isValid = true;
  //  if ($scope.contestObj.ChampionshipId == null || $scope.contestObj.ChampionshipId == '') {
  //    swal('Error', 'Please enter championship name');
  //    isValid = false;
  //    return false;
  //  }
  //  if ($scope.contestObj.ContestName == null || $scope.contestObj.ContestName == '') {
  //    swal('Error', 'Please enter contest name');
  //    isValid = false;
  //    return false;
  //  }
  //  if ($scope.contestObj.QualifyingDate == null || $scope.contestObj.QualifyingDate == '') {
  //    swal('Error', 'Please enter qualifying date');
  //    isValid = false;
  //    return false;
  //  }
  //  if ($scope.contestObj.QualifyingTime == null || $scope.contestObj.QualifyingTime == '') {
  //    swal('Error', 'Please enter qualifying time');
  //    isValid = false;
  //    return false;
  //  }
  //  if ($scope.contestObj.RaceDate == null || $scope.contestObj.RaceDate == '') {
  //    swal('Error', 'Please enter race date');
  //    isValid = false;
  //    return false;
  //  }
  //  if ($scope.contestObj.RaceTime == null || $scope.contestObj.RaceTime == '') {
  //    swal('Error', 'Please enter race time');
  //    isValid = false;
  //    return false;
  //  }
    
  //  if ($scope.contestObj.PrizePool == null || $scope.contestObj.PrizePool == '') {
  //    swal('Error', 'Please enter prize pool');
  //    isValid = false;
  //    return false;
  //  }

  //  if ($scope.contestObj.RaceMode == null || $scope.contestObj.RaceMode == '') {
  //    swal('Error', 'Please enter Race Mode');
  //    isValid = false;
  //    return false;
  //  }
   

  //  return isValid;

  //};

  //$scope.AddNewRow = function () {        
  //  $scope.ListItem.push({
  //    ContestId: $scope.contestObj.Id,
  //    Amount: 0,
  //    UserId: $rootScope.session.Id
  //  });    
  //};

  //$scope.RemoveRow = function (item) {
  //  $scope.ListItem.pop(item);
  //};

  //$scope.InsertAmount = function () {
  //  var IsSuccess = true;
  //  $scope.count = 1
  //  angular.forEach($scope.ListItem, function (value, key) {
  //    if (!value.Amount)
  //      IsSuccess = false;
  //    value.UserId = $rootScope.session.Id;
  //    value.Rank = $scope.count++;
  //  });
  //  if (!IsSuccess) {
  //    swal('Please Insert Winning Amount');
  //    return false;
  //  }
    
  //  ContestService.AddContestLeaderboardReward($scope.ListItem).then(function (success) {
  //    if (success.data.indexOf('Success') != -1) {
  //      swal(success.data);
  //      $scope.init();
  //    }
  //    else {

  //    }
  //  }, function (error) {
  //    console.log(error);
  //  });
  //}

  $scope.ViewPlan = function () {
    $scope.myVar = false;
    $scope.myVar1 = true;
    $scope.myVar2 = false;
  }
  $scope.Close = function () {
    $scope.myVar = true;
    $scope.myVar1 = false;
    $scope.myVar2 = false;
  }
  $scope.Asign = function () {
    $scope.myVar = false;
    $scope.myVar1 = false;
    $scope.myVar2 = true;
  }
  $scope.AsignClose = function () {
    $scope.myVar = true;
    $scope.myVar1 = false;
    $scope.myVar2 = false;
  }

  $scope.init();

});
