/* global angular, document, window */
'use strict';

angular.module('starter.profile', [])

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $rootScope,  $state) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 100);

    // Set Ink
    ionicMaterialInk.displayEffect();	
	

	//$scope.view = $state.params.view;

	if(typeof $state.params.view === 'undefined'){
			$state.go('borras');
	}


	
	
	if($state.params.view){
		$scope.user = $state.params.borra;
		$scope.operacao = 'Detalhes do Borra';
	
	} else {
		$scope.user = $rootScope.user;
		$scope.borra = $scope.user;
		$scope.operacao = 'Meu Perfil';	
	}
	
	
	$scope.cancelar = function() {
		$state.go('app.borras');
	};	

	
	$scope.editarBorra = function () {
		$state.go('app.borra', {novo: false, borra: $scope.user });
	};
	
});
