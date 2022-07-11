var app = angular.module('AuditModule', []);

app.service('AuditService', function ($http, $location, $rootScope) {

  this.ShareObj = {};
  this.SerachCriteria = {};
  if ($location.absUrl().indexOf('FB') != -1) {

    this.AppUrl = "/FB/api/"

  }
  else {

    this.AppUrl = "/api/"
  }
  //this.GetAllCustomerLeagues = function () {

  //  return $http.get($rootScope.URL + '/api/LeagueHeader/GetAllCustomerLeagues');
  //};

  //this.DeleteLeagueHeader = function (data) {

  //  return $http.post($rootScope.URL + '/api/LeagueHeader/DeleteLeagueHeader', data, {});
  //};


});

app.controller('AuditController', function ($scope, $http, $location, AuditService,
  $rootScope, $uibModal, $filter) {

  $scope.Auditarea = true;
  $scope.AuditareaDetail = false;

  $scope.LeagueList = [];
  $scope.ChampionshipList = [];
  $scope.MainGrid = true;
  $scope.AddForm = false;
  $scope.EditForm = false;
  $scope.UploadMobileImage = false;
  $scope.UploadDesktopImage = false;


  //$scope.init = function () {    //Section Wise Doughnought
  //  $scope.ManageScreenView('Main');
  //  $scope.InitializeObject();
  //  $scope.GetDataOnInit();
  //};

  //$scope.GetDataOnInit = function () {
  //  LeagueHeaderService.GetAllCustomerLeagues().then(function (success) {
  //    $scope.LeagueList = success.data;
  //  }, function (error) {
  //    console.log(error);
  //  });

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

  //        LeagueHeaderService.DeleteLeagueHeader(item).then(function (success) {
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
  //  };
  //};
  $scope.Save = function () {
    new swal("Audit Area Deatils Saved Successfully");
  };

  $scope.AddAuditArea = function () {
    $scope.Auditarea = false;
    $scope.AuditareaDetail = true;
  };
  $scope.Close = function () {
    $scope.Auditarea = true;
    $scope.AuditareaDetail = false;
  };


  $scope.init();

});
