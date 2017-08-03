/* global angular, document, window */
'use strict';

angular.module('starter.eventodetails', [])
.controller('EventDetailsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicLoading,  $q, Restangular, $state, $rootScope) {
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
	$scope.borrou = false;
	var promisseEvento = [];	
	

	function confirmarPresenca(presenca, id_tipo_borrada) {		
		
		var params = {  id_evento : $scope.evento1.id, id_borra : $rootScope.user.id, id_tipo_borrada : id_tipo_borrada, presenca : presenca};			
		var deffered  = $q.defer();	
		
		if(presenca){
			//confirmou a presenca
			Restangular.all('confirmarPresenca').post(JSON.stringify(params)).then(function(evento) {			
			if (evento.error) {
				 deffered.reject(evento.error);
			}else{
				deffered.resolve(evento);
				console.log(evento);
			}			
			});		
		}else{
			//confirmou a borrada
			Restangular.all('confirmarBorrada').post(JSON.stringify(params)).then(function(evento) {			
			if (evento.error) {
				 deffered.reject(evento.error);
			}else{
				deffered.resolve(evento);
				console.log(evento);
			}			
			});				
		}		
		return deffered.promise;
	}
	
	function getAllBorraEvento() {
		var deffered  = $q.defer();	
		console.log($scope.evento1.id);
		var params = { id_evento : $scope.evento1.id};			
		Restangular.all('getAllBorrasEvento').post(JSON.stringify(params)).then(function(participantes) {		
			$scope.participantes = participantes;
			deffered.resolve(participantes);
		});
		return deffered.promise;
	}
	
	function getAllTipoBorrada() {
		var deffered  = $q.defer();		
		Restangular.one('/getAllTipoBorrada').getList().then(function(borradas) {
			$scope.borradas = borradas;
			deffered.resolve($scope.borradas);
		});
		return deffered.promise;
	}
	
	
	$scope.confirmar = function () {
		var promises = [];
		promises.push(confirmarPresenca(true, null));	

		$q.all(promises).then(function() {
			console.log('salvou a confirmacao');
		});		
	};
	
	$scope.cancelar = function() {
		$state.go('app.events');
	};
	
	$scope.borrar = function () {
		$scope.borrou = true;		
	};
	
	$scope.justificar = function (id_tipo_borrada) {
		var promises = [];
		promises.push(confirmarPresenca(true, id_tipo_borrada));
		$q.all(promises).then(function() {
			console.log('salvou a borrada');
		});
	};	
	
	$scope.editarEvento = function () {
		console.log('clicando');
		$state.go('app.event', {novo: false, evento: null });
	};
	
	promisseEvento.push(getAllBorraEvento());
	promisseEvento.push(getAllTipoBorrada());
	
	$q.all(promisseEvento).then(
		function() {
			console.log('Carregou tudo');
			console.log($scope.participantes);
			console.log($scope.borradas);
		}	
	);
	
	
});
