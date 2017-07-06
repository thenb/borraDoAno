/* global angular, document, window */
'use strict';

angular.module('starter.eventos', [])


.controller('EventsCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,  $state) {
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
	
	$scope.novoEvento = function () {
		console.log('clicando');
		$state.go('app.event', {novo: true, evento: null });
	};
	
});
