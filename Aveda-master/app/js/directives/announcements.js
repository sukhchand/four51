four51.app.factory('Alerts', ['$q', '$resource', '$451', function($q, $resource, $451) {
    var _cacheName = '451Cache.Alerts.' + $451.apiName;

    var _get = function() {
        var alerts = store.get(_cacheName);
        if (alerts) {
            var deferred = $q.defer();
            deferred.resolve(alerts);
            return deferred.promise;
        }
        else {
            var call =  $resource($451.api('user')).get().$promise.then(function(u) {
                var alerts = [];
                angular.forEach(u.CustomFields, function(f) {
                    if (f.Name.indexOf('Alert.') > -1) {
                        var date = new Date(f.Label);
                        alerts.push({
                            'Body': f.DefaultValue,
                            'Date': date || null,
                            'Recent': ((Date.parse(date) + 604800000) - new Date().getTime()) > 0 // one week
                        });
                    }
                });

                alerts.sort(function(a,b) {
                    if (a.Date < b.Date)
                        return 1;
                    if (a.Date > b.Date)
                        return -1;
                    return 0;
                });

                store.set(_cacheName, alerts);
                return alerts;
            });
            return call;
        }
    };

    return {
        getAlerts: _get
    };
}]);

four51.app.directive('announcements', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/controls/announcementsView.html',
        controller: ['$scope', 'Alerts', function($scope, Alerts) {
            Alerts.getAlerts().then(function(alerts) {
                $scope.alerts = alerts;
            });
        }]
    };
    return obj;
});