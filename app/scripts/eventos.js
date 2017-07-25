/* global angular, document, window */
'use strict';

angular.module('starter.eventos', [])


.controller('EventsCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,Restangular, $q, $state, $rootScope) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab('right');
	
	var promises = [];    

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
	$scope.tipoBusca = '0';
	
	$scope.novoEvento = function () {
		console.log('clicando');
		$state.go('app.event', {novo: true, evento: null });
	};	

	function efeito() {
        document.getElementsByTagName('ion-list')[0].className += ' animate-ripple';
        setTimeout(function() {
            ionicMaterialMotion.ripple();
        }, 0);
	}	
	
	function getAllEventosAtivos() {		
		var deffered  = $q.defer();		
		Restangular.one('/getAllEventosAtivos').getList().then(function(eventos) {
			eventos.map(function(item){
				item.data_inicio = moment(new Date(item.data_inicio)).format('DD/MM/YYYY, hh:mm:ss');
				item.data_fim = moment(new Date(item.data_inicio)).format('DD/MM/YYYY, hh:mm:ss');
			});			
			console.log(eventos);
			$scope.eventos = eventos;
			deffered.resolve(eventos);
			efeito();
		});
		return deffered.promise;
	}
	
	function getAllEventosAnteriores() {		
		var deffered  = $q.defer();		
		Restangular.one('/getAllEventosAnteriores').getList().then(function(eventos) {
			eventos.map(function(item){
				item.data_inicio = moment(new Date(item.data_inicio)).format('DD/MM/YYYY, hh:mm:ss');
				item.data_fim = moment(new Date(item.data_inicio)).format('DD/MM/YYYY, hh:mm:ss');
			});			
			
			$scope.eventos = eventos;
			deffered.resolve(eventos);
			efeito();
		});
		return deffered.promise;
	}
	
	function getAllMyEventos() {		
		var deffered  = $q.defer();	
		var params = {  id_borra_criador : $rootScope.user.id};		
		Restangular.all('getAllMyEventos').post(JSON.stringify(params)).then(function(eventos) {			
			eventos.map(function(item){
				item.data_inicio = moment(new Date(item.data_inicio)).format('DD/MM/YYYY, hh:mm:ss');
				item.data_fim = moment(new Date(item.data_inicio)).format('DD/MM/YYYY, hh:mm:ss');
			});			
			
			$scope.eventos = eventos;
			deffered.resolve(eventos);
			efeito();
		});
		return deffered.promise;		
	}
	
	function getAllPontByIdEspec() {			
		
	}
	
	
	
	$scope.changeBuscaEventos = function(tipoBusca) {
		if(tipoBusca==0){
			getAllEventosAtivos();
		}
		if(tipoBusca==1){
			getAllEventosAnteriores();
		}
		if(tipoBusca==2){
			getAllMyEventos();
		}
	};	
	
	
	promises.push(getAllEventosAtivos());
	
	
	$q.all(promises).then(function() {			
			efeito();
			//console.log($scope.borras.nome);
		}	
	);
	
});
