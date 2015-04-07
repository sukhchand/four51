four51.app.directive('shortcartview', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/shortCartView.html',
	    controller: ['$scope', 'Order', 'User', function($scope, Order, User) {
		    $scope.removeLineItem = remove;
		    $scope.cancelOrder = cancel;

		    function remove(lineitem) {
			    if (confirm('Are you sure you wish to remove this item from your cart?') == true) {
				    Order.deletelineitem($scope.currentOrder.ID, lineitem.ID,
					    function(order) {
						    $scope.currentOrder = order;
						    if (!order) {
							    $scope.user.CurrentOrderID = null;
							    User.save($scope.user, function(){ });
						    }
					    },
					    function (ex) {
						    $scope.errorMessage = ex.Message;
					    }
				    );
			    }
		    }

		    function cancel() {
			    if (confirm('Are you sure you wish to cancel your order?') == true) {
				    Order.delete($scope.currentOrder,
					    function(){
						    $scope.currentOrder = null;
						    $scope.user.CurrentOrderID = null;
						    User.save($scope.user, function(){ });
						    $scope.actionMessage = 'Your Changes Have Been Saved!';
					    },
					    function(ex) {
						    $scope.actionMessage = 'An error occurred: ' + ex.Message;
					    }
				    );
			    }
		    }
	    }]
    };
    return obj;
});

four51.app.directive('cartmessage', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/messages/viewCart.html'
	};
	return obj;
});