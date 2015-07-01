'use strict';

angular.module('mean.shopProduct').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('products-details', {
      url: '/products/:sku',
      parent:'master',
      controller: 'ShopProductController',
      templateUrl: 'shopProduct/views/product-details.html'
    });
  }
]);