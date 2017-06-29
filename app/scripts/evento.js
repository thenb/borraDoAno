/* global angular, document, window */
'use strict';

angular.module('starter.evento', [])

.controller('EventCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $q, Restangular, $rootScope) {
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
	
	$scope.evento = {};
	$scope.user = $rootScope.user;
	
	function saveEvento() {			
		var params = {  evento : $scope.evento, id_borra_criador: $scope.user.id };	
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
	
	
	$scope.novoEvento = function() {
		var promises = [];	
		promises.push(saveEvento($scope.evento));	
		$q.all(promises).then(function(retorno) {
			console.log(retorno);
			if(retorno[0].type===1){
				//showErrorNotification(retorno[0].msg);
			}else{			
			$state.go('app.eventos');
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