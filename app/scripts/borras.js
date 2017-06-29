/* global angular, document, window */
'use strict';

angular.module('starter.borras', [])

.controller('BorrasCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $state) {
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

	
	$scope.novoBorra = function () {
		console.log('clicando');
		$state.go('app.borra', {novo: true, borra: null });
	};
	
	});
