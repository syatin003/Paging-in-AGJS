
/// <reference path="app.js" />
/// <reference path="route.js" />
/// <reference path="Controller.js" />
/// <reference path="Service.js" />


app.controller("myCtrl", function ($scope, dataService) {
    $scope.totalItems = 0;
    $scope.currentPage = 1;
    $scope.recordsPerPage = 5;

    getData();

    $scope.pageChanged = function () {

        getData();
    };
    $scope.getData = function () {
        getData();
    }
    function getData() {

        var options = {
        };
        options.search = $scope.searching;
        options.currentPage = $scope.currentPage;
        options.recordsPerPage = $scope.recordsPerPage;

        dataService.getEmployees(options)
        .then(function (data) {
            $scope.employees = data.Employee;
            $scope.totalItems = data.recordCount;
            $scope.srec = ($scope.currentPage * $scope.recordsPerPage - $scope.recordsPerPage) + 1;
            $scope.erec = ($scope.srec + $scope.employees.length) - 1;
            $scope.numPages = Math.ceil($scope.totalItems / options.recordsPerPage);
        },
        function () {

            alert("error occurred: unable to get data");
        });

    }

    $scope.EditEmployee = function (employee) {

        var getData = angularService.getEmpById(employee.Id);
        getData.then(function (emp) {
            $scope.employee = emp.data;
            $scope.employeeId = employee.Id;
            $scope.employeeName = employee.Name;
            $scope.employeeEmail = employee.Email;
            $scope.employeeAge = employee.Age;

        }, function () {
            alert('Error in getting records');
        });
    }
})






.controller('ModalDemoCtrl', function ($scope, $modal, $log) {

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function (size) {

        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
})

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

