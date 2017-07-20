/* global angular, document, window */
'use strict';

angular.module('starter.eventos', [])


.controller('EventsCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,Restangular, $q, $state) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab('right');
	
	var promises = [];    

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
	
	$scope.novoEvento = function () {
		console.log('clicando');
		$state.go('app.event', {novo: true, evento: null });
	};
	
	function getAllEventos() {		
		var deffered  = $q.defer();		
		Restangular.one('/getAllEventos').getList().then(function(eventos) {
			eventos.map(function(item){
				item.data_inicio = moment(item.data_inicio).format('DD/MM/YYYY, hh:mm:ss');
				item.data_fim = moment(item.data_inicio).format('DD/MM/YYYY, hh:mm:ss');
			});			
			
			$scope.eventos = eventos;
			deffered.resolve(eventos);
		});
		return deffered.promise;
	}
	
	function init() {
        document.getElementsByTagName('ion-list')[0].className += ' animate-ripple';
        setTimeout(function() {
            ionicMaterialMotion.ripple();
        }, 200);
	}
	
	promises.push(getAllEventos());
	
	
	$q.all(promises).then(function() {			
			init();
			//console.log($scope.borras.nome);
		}	
	);
	
});
