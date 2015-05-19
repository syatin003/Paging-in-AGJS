

app.service('angularService', function ($http) {
    //get all employe

    //this.getAllEmp = function () {
    //    return $http.get("Home/getAll");
    //};

    this.getEmpById = function (empId) {
        var resonse = $http({
            method: "post",
            url: "Home/getById",
            params: {
                id: JSON.stringify(empId)
            }
        });
        return response;
    }

})

.factory("dataService", ["$http", "$q", function($http, $q) {
 
    return {
        getEmployees: _getEmployees
    };
    function _getEmployees(options) {
        var deferred = $q.defer();
        $http.get("Home/GetEmployeee?search=" + options.search + "&" + "currentPage=" + options.currentPage + "&" + "recordsPerPage=" + options.recordsPerPage)
            .then(function (result) {
                deferred.resolve(result.data);
            },
                function() {
                    deferred.reject();
                });
 
        return deferred.promise;
    };
}])