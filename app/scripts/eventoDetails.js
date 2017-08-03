/* global angular, document, window */
'use strict';

angular.module('starter.eventodetails', [])
.controller('EventDetailsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicLoading,  $state) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    $timeout(function() {
        ionicMaterialMotion.ripple({
            startVelocity: 10000
        });
    }, 100);
	
    $scope.loading = function() {
        $ionicLoading.show({
            template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
        });

        // For example's sake, hide the sheet after two seconds
        $timeout(function() {
            $ionicLoading.hide();
        }, 2000);
    };
	
    // Activate ink for controller
    ionicMaterialInk.displayEffect();	
	
	
	console.log($state.params.evento);
	$scope.evento1 = $state.params.evento;
	
	
	
	
	$scope.editarEvento = function () {
		console.log('clicando');
		$state.go('app.event', {novo: false, evento: null });
	};
	

})
;
