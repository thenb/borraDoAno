/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('BorrasCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab('right');
	

    $timeout(function() {
        ionicMaterialMotion.ripple({
            selector: '.animate-ripple .item'
        });
    }, 100);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

;
