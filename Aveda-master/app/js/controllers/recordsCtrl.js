four51.app.controller('RecordsCtrl', ['$scope', '$location', '$451', 'Records',
function ($scope, $location, $451, Records) {

    function initialize() {
        $scope.loadingProductIndicator = true;
        Records.getProduct('InteractionRecord', function(product) {
            $scope.product = product;
            $scope.records = [];
            angular.forEach(product.Variants, function(record) {
                Records.getRecord(product, record, function(r) {
                    $scope.records.push(r);
                });
            });
            $scope.loadingProductIndicator = false;
        });
    }
    initialize();

    $scope.showForm = false;
    $scope.createNew = function() {
        $scope.Variant = {};
        $scope.Variant.Specs = angular.copy($scope.product.Specs);
        $scope.Variant.Specs.Date.Value = new Date();
        $scope.showForm = true;
    };

    $scope.cancelForm = function() {
        $scope.showForm = false;
    };

    $scope.save = function() {
        Records.saveRecord($scope.Variant, $scope.product, function(record) {
            initialize();
            $scope.showForm = false;
        });
    };

    $scope.editRecord = function(record) {
        $scope.Variant = angular.copy(record);
        $scope.showForm = true;
    };

}]);