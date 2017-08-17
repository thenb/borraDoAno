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
	
	if($state.params.perfil){
		$scope.operacao = 'Meu Perfil';	
		$scope.user = $rootScope.user;
		$scope.borra = $scope.user;	
	}else{
		$scope.operacao = 'Detalhes Borra';	
		$scope.borra = $state.params.borra;	
	}		
	
	
	$scope.cancelar = function() {
		if($state.params.perfil){
			$state.go('app.dashboard');
		}else{
			$state.go('app.borras');
		}
		
	};
	
	$scope.editarBorra = function () {
		if($state.params.perfil){
			$state.go('app.borra', {novo: false, perfil: true, borra: $scope.borra });
		}else{
			$state.go('app.borra', {novo: false, perfil: false, borra: $state.params.borra });
		}
		
	};
	
});
