/* global angular, document, window */
'use strict';

angular.module('starter.borra', [])


.controller('BorraCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, Restangular, $q, $state, $rootScope) {

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
    }, 300);


    // Set Ink
    ionicMaterialInk.displayEffect();
	
	$scope.borra1 = {};
	console.log($scope.borra1);
	console.log($state.params.novo);
	$scope.novo = $state.params.novo;
	if(typeof $state.params.novo === 'undefined'){
			$state.go('borras');
	}
		
	if($state.params.novo){
		$scope.borra1 = {};
		$scope.operacao = 'Novo';		
	}else{	
		$scope.operacao = 'Editar';	
		$scope.borra1 = $state.params.borra;						
	}
	console.log($scope.borra1);
	
	function saveBorra() {			
		var params = {  borra : $scope.borra1 };	
		var deffered  = $q.defer();	
		Restangular.all('saveBorra').post(JSON.stringify(params)).then(function(borra) {			
			if (borra.error) {
				 deffered.reject(borra.error);
			}else{
				deffered.resolve(borra);
				console.log(borra);
			}			
		});
		return deffered.promise;
	}	
	
	$scope.novoBorra = function() {
		var promises = [];	
		promises.push(saveBorra());	
		$q.all(promises).then(function(retorno) {
			console.log(retorno);
			if(retorno[0].type===1){
				//showErrorNotification(retorno[0].msg);
			}else{			
			$state.go('app.borras');
			console.log('Borra Criado com Sucesso')
			//showNotification();				
			}			
		});
	};
	
	$scope.cancelar = function() {
		$state.go('app.borras');
	};	

});
