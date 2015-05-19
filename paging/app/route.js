
app.config(function ($routeProvider) {

    $routeProvider.when("/getAll", {
        templateUrl: "Home/getAllEmployee",
        controller: "myCtrl"
        //caseInsensitiveMatch: true
    })
    .when("/getById", {
        templateUrl: "Home/getById",
        controller: "myCtrl"
        //caseInsensitiveMatch: true
    })
  .otherwise("/getAll");
    //$routeProvider.otherwise({
    //    redirectTo: "/getAll"
    //});
});

