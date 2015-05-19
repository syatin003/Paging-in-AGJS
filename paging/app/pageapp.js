angular.module('app', ['ui.bootstrap']);
angular.module('app').controller('PaginationDemoCtrl', function ($scope, $http) {

    $scope.currentPage = 1;

    $scope.tracks = [];
    getData();


    function getData() {
        $http.get("https://ws.spotify.com/search/1/track.json?q=kaizers+orchestra&page=" + $scope.currentPage)
          .then(function (response) {
              $scope.totalItems = response.data.info.num_results
              angular.copy(response.data.tracks, $scope.tracks)


          });
    }

    //get another portions of data on page changed
    $scope.pageChanged = function () {
        getData();
    };


});
