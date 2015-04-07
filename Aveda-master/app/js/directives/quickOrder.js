four51.app.directive('quickorder', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/controls/quickOrder.html',
        controller: ['$scope', 'ProductDisplayService', 'Order', 'Product', 'User', function($scope, ProductDisplayService, Order, Product, User) {
            $scope.LineItem = {};

            $scope.getEligibleProducts = function(input) {
                return Product.quick(input).then(function(products) {
                    return products;
                });
            };

            $scope.$watch('LineItem.Product.InteropID', function(id) {
                if (!id) return;
                ProductDisplayService.getProductAndVariant(id, null, function(product) {
                    $scope.LineItem.Product = product.product;
                    $scope.LineItem.Variant = product.variant;
                    ProductDisplayService.setNewLineItemScope($scope);
                    ProductDisplayService.setProductViewScope($scope);
                });
            });

            $scope.addToOrder = function() {
                $scope.currentOrder = $scope.currentOrder || {};
                $scope.currentOrder.LineItems = $scope.currentOrder.LineItems || [];

                $scope.currentOrder.LineItems.push($scope.LineItem);
                Order.save($scope.currentOrder,
                    function(o){
                        $scope.currentOrder = o;
                        $scope.user.CurrentOrderID = o.ID;
                        User.save($scope.user, function(user){
                            $scope.user = user;
                        });
                        $scope.quickAddMessage = "Item added to cart";
                        $scope.LineItem = {};
                    },
                    function(ex) {
                        $scope.addToOrderError = ex.Message;
                    }
                );
            };
        }]
    };
    return obj;
});