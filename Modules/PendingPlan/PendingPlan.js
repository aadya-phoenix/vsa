var app = angular.module('PendingPlanModule', []);

app.service('QuestionHeaderService', function ($http, $location, $rootScope) {

  this.ShareObj = {};
  this.SerachCriteria = {};
  if ($location.absUrl().indexOf('FB') != -1) {

    this.AppUrl = "/FB/api/"

  }
  else {

    this.AppUrl = "/api/"
  }
  this.GetQuestionHeader = function (id) {

    return $http.get($rootScope.URL + '/api/QuestionHeader/GetQuestionHeaderForContest?contestId=' + id);
  };

  this.GetContestList = function () {

    return $http.get($rootScope.URL + '/api/Contest/GetContestList');
  };

  this.GetListBasedOnType = function (data) {

    return $http.get($rootScope.URL + '/api/ListType/GetListBasedOnType?listType=' + data);
  };
  this.AddQuestionHeader = function (data) {

    return $http.post($rootScope.URL + '/api/QuestionHeader/AddQuestionHeader', data, {});
  };
  this.DeleteQuestionHeader = function (data) {

    return $http.post($rootScope.URL + '/api/QuestionHeader/DeleteQuestionHeader', data, {});
  };
  this.UpsertQuestionDetail = function (data) {

    return $http.post($rootScope.URL + '/api/QuestionDetail/UpsertQuestionDetail', data, {});
  };
  this.UpdateQuestionHeader = function (data) {

    return $http.post($rootScope.URL + '/api/QuestionHeader/UpdateQuestionHeader', data, {});
  };
  this.DeleteQuestionHeader = function (data) {

    return $http.post($rootScope.URL + '/api/QuestionHeader/DeleteQuestionHeader', data, {});
  };

  this.UploadQuestionHeaderImageCommand = function (fd) {
    return $http.post("/api/QuestionHeader/UploadQuestionHeaderImageCommand", fd, {
      transformRequest: angular.identity,
      //data: fd,
      dataType: "JSON",
      headers: { 'Content-Type': undefined }
    });
  };

  this.GetTeamList = function () {

    return $http.get($rootScope.URL + '/api/Team/GetTeamList');
  };

  this.GetDriverList = function () {

    return $http.get($rootScope.URL + '/api/Driver/GetDriverList');
  };

  this.GetQuestionDetailsBasdOnId = function (id) {

    return $http.get($rootScope.URL + '/api/QuestionDetail/GetQuestionDetailsBasdOnId?questionHeaderId='+id);
  };

});

app.controller('PendingPlanController', function ($scope, $http, $location, QuestionHeaderService,
  $rootScope, $uibModal, $filter) {
  $scope.pendiview = true;
  $scope.ListType = [];
  $scope.DriverDDLList = [];
  $scope.TeamDDLList = [];
  $scope.ContestList = [];
  $scope.QuetsionList = [];
  $scope.MainGridContest = true;
  $scope.MainGrid = false;
  $scope.AddForm = false;
  $scope.EditForm = false;
  $scope.OptionForm = false;
  $scope.UploadMobileImage = false;
  $scope.UploadDesktopImage = false;
  $scope.QuestionHeaderId = null;
  $scope.OptionType = null;

  $scope.questionHeaderObj = {
    Id: null,
    ContestId: null,
    QuestionTypeId: null,
    Sequence: null,
    QuestionText: null,
    QuestionSubText:null,
    QuestionPoints: null,
    UserId: null,
    BannerUrl: null
  };
  $scope.Accept = function () {    //Section Wise Doughnought
    swal('Pending Plan Details accepted succesfully');
  };
  $scope.Reject = function () {    //Section Wise Doughnought
    swal('Pending Plan Details rejected');
  };
  $scope.DriverList = [
    {
      QuestionHeaderId: null,
      OptionType: null,
      OptionText:null,
      DriverDataList: [],
      OptionId: null,
      IsAnswer: null,
      UserId:null,
    }
  ]

  $scope.YesNoList = [
    {
      QuestionHeaderId: null,
      OptionType: null,
      OptionText: null,      
      OptionId: null,
      IsAnswer: null,
      UserId: null,
    }
  ]
  $scope.TeamList = [
    {
      QuestionHeaderId: null,
      OptionType: null,
      OptionText: null,
      TeamDataList: [],
      OptionId: null,
      IsAnswer: null,
      UserId: null,
    }
  ]

  $scope.init = function () {    //Section Wise Doughnought
    $scope.ManageScreenView('MainContest');
    $scope.InitializeObject();
    $scope.GetDataOnInit();
  };

  $scope.OpenQuestion = function (item) {
    $scope.ManageScreenView('Main');
    QuestionHeaderService.GetQuestionHeader(item.Id).then(function (success) {
      $scope.QuetsionList = success.data;
    }, function (error) {
      console.log(error);
    });

  };

  $scope.GetDataOnInit = function () {
   
    QuestionHeaderService.GetContestList().then(function (success) {
      $scope.ContestList = success.data;
    }, function (error) {
      console.log(error);
    });
    QuestionHeaderService.GetListBasedOnType('QuestionType').then(function (success) {
      $scope.ListType = success.data;
    }, function (error) {
      console.log(error);
    });
    QuestionHeaderService.GetDriverList().then(function (success) {
      $scope.DriverList[0].DriverDataList = angular.copy(success.data);
      $scope.DriverDDLList = success.data;
    }, function (error) {
      console.log(error);
    });
    QuestionHeaderService.GetTeamList().then(function (success) {      
      $scope.TeamDDLList = success.data;
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
    $scope.questionHeaderObj = item;
  };

  $scope.OpenMobileUploadForm = function (item) {
    $scope.ManageScreenView('UploadMobile');
    $scope.questionHeaderObj = item;
  };

  $scope.OpenBannerUploadForm = function (item) {
    $scope.ManageScreenView('UploadBanner');
    $scope.questionHeaderObj = item;
  };

  $scope.OpenAmountForm = function (item) {
    $scope.ManageScreenView('WinningAmount');
    $scope.questionHeaderObj = item;
  };

  $scope.OpenDesktopUploadForm = function (item) {
    $scope.ManageScreenView('UploadDesktop');
    $scope.questionHeaderObj = item;
  };

  $scope.AddData = function () {
    var isValid = $scope.ValidateItems();
    if (isValid) {
      $scope.questionHeaderObj.UserId = $rootScope.session.Id;
      QuestionHeaderService.AddQuestionHeader($scope.questionHeaderObj).then(function (success) {
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
      $scope.questionHeaderObj.UserId = $rootScope.session.Id;
      QuestionHeaderService.UpdateQuestionHeader($scope.questionHeaderObj).then(function (success) {
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
          $scope.questionHeaderObj = item;
          $scope.questionHeaderObj.UserId = $rootScope.session.Id;
          QuestionHeaderService.DeleteQuestionHeader($scope.questionHeaderObj).then(function (success) {
            swal(success.data);
            $scope.init();
          }, function (error) {
            console.log(error);
          });
        }
      });

  };

  $scope.RemoveBanner = function (item) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover !",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          var fd = new FormData();
          var data = {
            'Id': item.Id,
            'ImageType': 'Banner',
            'ImagePath': null,
            'UserId': $rootScope.session.Id
          };
          fd.append('file', $scope.myFile);
          fd.append('data', angular.toJson(data));
          QuestionHeaderService.UploadQuestionHeaderImageCommand(fd).then(function (success) {
            swal(success.data);
            $scope.init();
          }, function (error) {
            console.log(error);
          });
        }
      });

  };

  $scope.UploadMobileLogo = function () {
    if ($scope.myFile != null) {
      var fd = new FormData();
      var data = {
        'Id': $scope.questionHeaderObj.Id,
        'ImageType': 'Image',
        'ImagePath': null,
        'UserId': $rootScope.session.Id
      };
      fd.append('file', $scope.myFile);
      fd.append('data', angular.toJson(data));
      QuestionHeaderService.UploadQuestionHeaderImageCommand(fd).then(function (success) {
        swal(success.data);
        $scope.init();
      }, function (error) {
        console.log(error);
      });
    }
    else {
      swal('Please select question Image');
      return false;
    }
  }

  $scope.OpenOptionForm = function(item)
  {
    $scope.ManageScreenView('Options');
    $scope.DriverOption = false;
    $scope.TeamOption = false;
    $scope.QuestionHeaderId = item.Id;
    $scope.OptionType = item.QuestionType;
    $scope.QuestionText = item.QuestionText;
    $scope.GetQuestionDetails(item.Id, item.QuestionType);
    if (item.QuestionType == 'MultiDriver') {
      $scope.DriverOption = true;
      $scope.TeamOption = false;
      $scope.YesNoOption = false;
    }
    else if (item.QuestionType == 'MultiTeams') {
      $scope.DriverOption = false;
      $scope.TeamOption = true;
      $scope.YesNoOption = false;
    }
    else if (item.QuestionType == 'Yes/No') {
      $scope.DriverOption = false;
      $scope.TeamOption = false;
      $scope.YesNoOption = true;
    }
  };

  $scope.GetQuestionDetails = function (id,type) {
    QuestionHeaderService.GetQuestionDetailsBasdOnId(id).then(function (success) {
      if (type == 'MultiDriver') {
        $scope.DriverList = success.data;
        for (var i = 0; i < $scope.DriverList.length; i++) {
          $scope.DriverList[i].DriverDataList = angular.copy($scope.DriverDDLList);
          $scope.DriverList[i].UserId = $rootScope.session.Id
        }
        if ($scope.DriverList.length == 0) {
          $scope.DriverList = [
            {
              QuestionHeaderId: $scope.QuestionHeaderId,
              OptionType: $scope.OptionType,
              OptionText: null,
              OptionId: null,
              DriverDataList: angular.copy($scope.DriverDDLList),
              IsAnswer: null,
              UserId: $rootScope.session.Id
            }
          ];
        }
      }
      if (type == 'MultiTeams') {
        $scope.TeamList = success.data;
        for (var i = 0; i < $scope.TeamList.length; i++) {
          $scope.TeamList[i].TeamDataList = angular.copy($scope.TeamDDLList);
          $scope.TeamList[i].UserId = $rootScope.session.Id;
        }
        if ($scope.TeamList.length == 0) {
          $scope.TeamList = [
            {
              QuestionHeaderId: $scope.QuestionHeaderId,
              OptionType: $scope.OptionType,
              OptionText: null,
              TeamDataList: angular.copy($scope.TeamDDLList),
              OptionId: null,
              IsAnswer: null,
              UserId: $rootScope.session.Id
            }
          ];
        }
      }
      if (type == 'Yes/No') {
        $scope.YesNoList = success.data;
        for (var i = 0; i < $scope.YesNoList.length; i++) {         
          $scope.YesNoList[i].UserId = $rootScope.session.Id;
        }
      }
    }, function (error) {
      console.log(error);
    });

  };

  $scope.AddDriverRow = function () {
    $scope.DriverList.push({
      QuestionHeaderId: $scope.QuestionHeaderId,
      OptionType: $scope.OptionType,
      OptionText: null,
      OptionId: null,
      DriverDataList: angular.copy($scope.DriverDDLList),
      IsAnswer: null,
      UserId: $rootScope.session.Id
    });    
  };

  $scope.AddTeamRow = function () {
    $scope.TeamList.push({
      QuestionHeaderId: $scope.QuestionHeaderId,
      OptionType: $scope.OptionType,
      OptionText: null,
      TeamDataList: angular.copy($scope.TeamDDLList),
      OptionId: null,
      IsAnswer: null,
      UserId: $rootScope.session.Id
    });
  };

  $scope.RemoveDriverRow = function (item) {
    $scope.DriverList.pop(item);
  };

  $scope.RemoveTeamRow = function (item) {
    $scope.TeamList.pop(item);
  };

  $scope.SaveDriverOption = function () {
    if ($scope.ValidateOption($scope.OptionType)) {
      QuestionHeaderService.UpsertQuestionDetail($scope.DriverList).then(function (success) {
        swal(success.data);
        $scope.init();
      }, function (error) {
        console.log(error);
      });
    }
  }

  $scope.SaveTeamOption = function () {
    if ($scope.ValidateOption($scope.OptionType)) {
      QuestionHeaderService.UpsertQuestionDetail($scope.TeamList).then(function (success) {
        swal(success.data);
        $scope.init();
      }, function (error) {
        console.log(error);
      });
    }
  }

  $scope.SaveYesNoOption = function () {
    QuestionHeaderService.UpsertQuestionDetail($scope.YesNoList).then(function (success) {
      swal(success.data);
      $scope.init();
    }, function (error) {
      console.log(error);
    });
  }

  $scope.UploadDesktopLogo = function (item) {
    if ($scope.myFile != null) {
      var fd = new FormData();
      var data = {
        'Id': $scope.questionHeaderObj.Id,
        'ImageType': 'Banner',
        'ImagePath': null,
        'UserId': $rootScope.session.Id
      };
      fd.append('file', $scope.myFile);
      fd.append('data', angular.toJson(data));
      QuestionHeaderService.UploadQuestionHeaderImageCommand(fd).then(function (success) {
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
    if (screenName == 'MainContest') {
      $scope.MainGridContest = true;
      $scope.MainGrid = false;
      $scope.AddForm = false;
      $scope.EditForm = false;
      $scope.UploadMobileImage = false;
      $scope.UploadBannerImage = false;
      $scope.OptionForm = false;
      $scope.UploadDesktopImage = false;
    }
    else if (screenName == 'Main') {
      $scope.MainGridContest = false;
      $scope.MainGrid = true;
      $scope.AddForm = false;
      $scope.EditForm = false;      
      $scope.UploadMobileImage = false;
      $scope.UploadBannerImage = false;
      $scope.OptionForm = false;
      $scope.UploadDesktopImage = false;
    }
    else if (screenName == 'Add') {
      $scope.MainGridContest = false;
      $scope.MainGrid = false;
      $scope.AddForm = true;
      $scope.EditForm = false;
      $scope.UploadMobileImage = false;
      $scope.UploadBannerImage = false;
      $scope.OptionForm = false;
      $scope.UploadDesktopImage = false;
    }
    else if (screenName == 'Edit') {
      $scope.MainGridContest = false;
      $scope.MainGrid = false;
      $scope.AddForm = false;
      $scope.EditForm = true;
      $scope.UploadMobileImage = false;
      $scope.UploadBannerImage = false;
      $scope.OptionForm = false;
      $scope.UploadDesktopImage = false;
    }
    else if (screenName == 'UploadMobile') {
      $scope.MainGridContest = false;
      $scope.MainGrid = false;
      $scope.AddForm = false;
      $scope.EditForm = false;
      $scope.UploadMobileImage = true;
      $scope.UploadBannerImage = false;
      $scope.OptionForm = false;
      $scope.UploadDesktopImage = false;
    }
    else if (screenName == 'UploadBanner') {
      $scope.MainGridContest = false;
      $scope.MainGrid = false;
      $scope.AddForm = false;
      $scope.EditForm = false;
      $scope.UploadMobileImage = false;
      $scope.UploadBannerImage = true;
      $scope.AmountForm = false;
      $scope.UploadDesktopImage = false;
    }
    else if (screenName == 'Options') {
      $scope.MainGridContest = false;
      $scope.MainGrid = false;
      $scope.AddForm = false;
      $scope.EditForm = false;     
      $scope.UploadMobileImage = false;
      $scope.UploadBannerImage = false;
      $scope.OptionForm = true;
      $scope.UploadDesktopImage = false;
    }
    else if (screenName == 'UploadDesktop') {
      $scope.MainGridContest = false;
      $scope.MainGrid = false;
      $scope.AddForm = false;
      $scope.EditForm = false;
      $scope.UploadMobileImage = false;
      $scope.UploadBannerImage = false;
      $scope.AmountForm = false;
      $scope.UploadDesktopImage = true;
    }
  };

  $scope.InitializeObject = function () {
    $scope.questionHeaderObj = {
      Id: null,
      ContestId: null,
      QuestionTypeId: null,
      Sequence: null,
      QuestionText: null,
      QuestionSubText: null,
      QuestionPoints:null,
      UserId: null,
      BannerUrl: null
    };
  };

  $scope.ValidateItems = function () {
    var isValid = true;
    if ($scope.questionHeaderObj.ContestId == null || $scope.questionHeaderObj.ContestId == '') {
      swal('Error', 'Please enter contest name');
      isValid = false;
      return false;
    }
    if ($scope.questionHeaderObj.QuestionTypeId == null || $scope.questionHeaderObj.QuestionTypeId == '') {
      swal('Error', 'Please enter question type name');
      isValid = false;
      return false;
    }
    if ($scope.questionHeaderObj.QuestionText == null || $scope.questionHeaderObj.QuestionText == '') {
      swal('Error', 'Please enter question');
      isValid = false;
      return false;
    }
  
    if ($scope.questionHeaderObj.QuestionPoints == null || $scope.questionHeaderObj.QuestionPoints == '') {
      swal('Error', 'Please enter question points');
      isValid = false;
      return false;
    }
    if ($scope.questionHeaderObj.Sequence == null || $scope.questionHeaderObj.Sequence == '') {
      swal('Error', 'Please enter Sequence');
      isValid = false;
      return false;
    }
    

    return isValid;

  };

  $scope.ValidateOption = function (type) {
    var isValid = true;
    if (type == 'MultiDriver') {
      for (var i = 0; i < $scope.DriverList.length; i++) {
        if ($scope.DriverList[i].OptionId == "" || $scope.DriverList[i].OptionId == null) {
          swal('Please select drivers for all the rows');
          isValid = false;
          return false;
        }
      }
    }
    else if (type == 'MultiTeams') {
      for (var i = 0; i < $scope.TeamList.length; i++) {
        if ($scope.TeamList[i].OptionId == "" || $scope.TeamList[i].OptionId == null) {
          swal('Please select teams for all the rows');
          isValid = false;
          return false;
        }
      }

    }
    return isValid;

  };

  $scope.init();

});
