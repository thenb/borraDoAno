/* global angular, document, window */
'use strict';

angular.module('starter.evento', [])

.controller('EventCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $q, Restangular, $rootScope, $state) {
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
	
	$scope.evento1 = {};
	
	console.log($rootScope.user);
	
	$scope.novo = $state.params.novo;
	
	if(typeof $state.params.novo === 'undefined'){
			$state.go('eventos');
	}
		
	if($state.params.novo){
		$scope.evento1 = {};
		$scope.operacao = 'Novo';		
	}else{	
		$scope.operacao = 'Editar';	
		$scope.evento1 = $state.params.evento;
	}	
	
	function saveEvento() {
		$scope.evento1.id_borra_criador = $rootScope.user.id;	
		console.log('entrou')
		var params = {  evento : $scope.evento1 };	
		var deffered  = $q.defer();	
		Restangular.all('saveEvento').post(JSON.stringify(params)).then(function(evento) {			
			if (evento.error) {
				 deffered.reject(evento.error);
			}else{
				deffered.resolve(evento);
				console.log(evento);
			}			
		});
		return deffered.promise;
	}	
	
	$scope.novoEvento = function(form) {
		var promises = [];	
		if($state.params.novo){
			promises.push(saveEvento($scope.evento));
		}else{
			
		}	1	
		
		$q.all(promises).then(function(retorno) {
			console.log(retorno);
			
			
			if(retorno.lenght==0){
				//showErrorNotification(retorno[0].msg);
			}else{			
			$state.go('app.events');
			console.log('Evento Criado com Sucesso')
			//showNotification();				
			}			
		});
	};	
	
	
	$scope.cancelar = function() {
		$state.go('app.eventos');
	};
})
;