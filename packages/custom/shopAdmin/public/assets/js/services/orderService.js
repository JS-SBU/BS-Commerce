'use strict';

angular.module('mean.shopAdmin').factory('orderService', ['$resource', '$http',
    function($resource, $http) {
        return {
            getOrderEnums: function() {
              var ordersEnums = $resource('/api/auth/orders/enums', {});
              return ordersEnums.get({});
            },
            searchOrders: function(query) {
                var searchRequest = $resource('/api/auth/order', {}, {
                    'get': {method: 'GET'}
                });
                return searchRequest.get(query);
            },
            getOrderById: function(orderId) {
                var searchRequest = $resource('/api/auth/order/:orderId', {orderId: '@orderId'}, {
                    'get': {method: 'GET'}
                });
                return searchRequest.get({orderId: orderId});
            },
            updateOrder: function(order) {
                var searchRequest = $resource('/api/auth/order', {}, {
                    'put': {method: 'PUT'}
                });
                return searchRequest.put(order);
            },
            getOrderTotalsInfo: function() {
                var getOrderTotals = $resource('/api/auth/orderTotals', {}, {
                    'get': {method: 'GET', isArray: true}
                });
                return getOrderTotals.get({});
            }
        };
    }
]);