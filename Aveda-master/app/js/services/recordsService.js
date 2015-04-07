four51.app.factory('Records', ['$resource', '$451', 'Security', 'Product', 'Variant', function($resource, $451, Security, Product, Variant) {
    var variantCache = [], productCache = [], criteriaCache;
    function _then(fn, data, count) {
        if (angular.isFunction(fn))
            fn(data, count);
    }

    function _extend(product) {

    }

    var _getProduct = function(productID, success) {
        Product.get(productID, function(product) {
            _extend(product);
            _then(success, product);
        });
    };

    var _saveRecord = function(variant, product, success) {
        variant.ProductInteropID = product.InteropID;
        Variant.save(variant, function(v) {
            _then(success, v);
        });
    };

    var _getRecord = function(product, record, success) {
        Variant.get({VariantInteropID: record.InteropID, ProductInteropID: product.InteropID }, function(record) {
            _then(success, record);
        });
    };

    return {
        getProduct: _getProduct,
        saveRecord: _saveRecord,
        getRecord: _getRecord
    }
}]);
