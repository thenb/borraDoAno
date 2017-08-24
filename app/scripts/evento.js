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
	var promisesInit = [];		

	console.log($state.params.novo);
	$scope.novo = $state.params.novo;	
		
	if($state.params.novo){
		$scope.evento1 = {};
		$scope.operacao = 'Novo';		
	}else{	
		$scope.operacao = 'Editar';	
		$scope.evento1 = $state.params.evento;
		
	}	
	
	function saveEvento() {
		$scope.evento1.id_borra_criador = $rootScope.user.id;	
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
	
	function saveBorraEvento(borra,id_evento) {
		var params = {  id_evento : id_evento, id_borra : borra.id   };	
		var deffered  = $q.defer();	
		Restangular.all('inserirBorraEvento').post(JSON.stringify(params)).then(function(evento) {			
			if (evento.error) {
				 deffered.reject(evento.error);
			}else{
				deffered.resolve(evento);
				console.log(evento);
			}			
		});
		return deffered.promise;
	}
	
	function getAllBorras() {
		var deffered  = $q.defer();		
		Restangular.one('/getAllBorras').getList().then(function(borras) {
			$scope.borras = borras;
			deffered.resolve(borras);
		});
		return deffered.promise;
	}	
	
	$scope.novoEvento = function(form) {
		var promises = [];	
		if($state.params.novo){			
			promises.push(saveEvento($scope.evento));		
		}else{
			//edicao dos campos			
		}		
		$q.all(promises).then(function(retorno) {
			console.log(retorno[0].insertId);					
			if($state.params.novo){	
				var promisseEventosBorra = [];	
				$scope.borras.map(function(borra){
					promisseEventosBorra.push(saveBorraEvento(borra,retorno[0].insertId));			
				});
				
				$q.all(promisseEventosBorra).then(function(retorno1) {
					if(retorno1.lenght==0){
						//showErrorNotification(retorno[0].msg);
					}else{			
						$state.go('app.events');
						console.log('Evento Criado com Sucesso')
						//showNotification();				
					}			
				});	
			}else{
				if(retorno.lenght==0){
					//showErrorNotification(retorno[0].msg);
				}else{			
					$state.go('app.events');
					console.log('Evento Criado com Sucesso')
					//showNotification();				
				}
			}			
		});
	};		
	
	$scope.cancelar = function() {
		if($state.params.novo){
			$state.go('app.events');		
		}else{
			$state.go('app.event_details', {evento: $scope.evento1 });		
		}
		
	};	
	
	promisesInit.push(getAllBorras());
	
	$q.all(promisesInit).then(
		function() {
			console.log('Evento Ctrl');
		}	
	);
	
	
	
	
});