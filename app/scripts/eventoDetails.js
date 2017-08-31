/* global angular, document, window */
'use strict';

angular.module('starter.eventodetails', [])
.controller('EventDetailsCtrl', function($scope, $stateParams, $ionicModal, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicLoading,  $q, Restangular, $state, $rootScope) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    /*$timeout(function() {
        ionicMaterialMotion.ripple({
            startVelocity: 10000
        });
    }, 100);*/
	
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
	
	$ionicModal.fromTemplateUrl('justificar', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modalJustificar = modal;
    });	
	
	$ionicModal.fromTemplateUrl('finalizar', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modalFinalizar = modal;
    });
	
	
	$scope.evento1 = $state.params.evento;
	var hoje = moment();
    var data_final = moment($scope.evento1.data_fim);
    var data_inicial = moment($scope.evento1.data_inicio);
	var promisseEvento = [];
	
	if (data_final >= hoje) {
		console.log('evento ativo');
		$scope.vencido = false;
	} else {
		console.log('evento vencido');
		$scope.vencido = true;
	}
	
	//iniciado?
	if (data_inicial >= hoje) {
		console.log('evento nao começou ainda');
		$scope.iniciado = false;
	} else {
		console.log('evento iniciado ou vencido');
		$scope.iniciado = true;
	}
	
	//finalizado?
	if ($rootScope.user.id == $scope.evento1.id_borra_criador && $scope.vencido) {
		console.log('Evento criado pelo mesmo Borra e está vencido');
		$scope.finalizado = true;
	} else {
		console.log('Evento criado por outro Borra ou ainda nao está vencido');
		$scope.finalizado = false;
	}
		
	//Posso editar?
	if ($rootScope.user.id == $scope.evento1.id_borra_criador && $scope.vencido == false && $scope.iniciado == false) {
		console.log('Posso Editar');
		$scope.editar_evento = true;
	} else {
		console.log('Não posso Editar');
		$scope.editar_evento = false;
	}	

	function confirmarPresenca(presenca, id_tipo_borrada) {		
		var params = {  id_evento : $scope.evento1.id, id_borra : $rootScope.user.id, id_tipo_borrada : id_tipo_borrada, presenca : presenca};			
		var deffered  = $q.defer();	
		
		if(presenca){
			//confirmou a presenca
			Restangular.all('confirmarPresenca').post(JSON.stringify(params)).then(function(evento) {			
				if (evento.error) {
					 deffered.reject(evento.error);
				}else{
					var params = { id_evento : $scope.evento1.id};			
					Restangular.all('getAllBorrasEvento').post(JSON.stringify(params)).then(function(participantes) {		
						$scope.participantes = participantes;
						deffered.resolve(participantes);
					});
				}			
			});		
		}else{
			//confirmou a borrada
			Restangular.all('confirmarBorrada').post(JSON.stringify(params)).then(function(evento) {			
				if (evento.error) {
					 deffered.reject(evento.error);
				}else{
					var params = { id_evento : $scope.evento1.id, id_tipo_borrada : id_tipo_borrada };			
						Restangular.all('getAllBorrasEvento').post(JSON.stringify(params)).then(function(participantes) {		
							$scope.participantes = participantes;
							deffered.resolve(participantes);
					});
				}			
			});				
		}
		
		return deffered.promise;
	}

	function borrei(id_borra) {		
		var params = {  id_borra : id_borra, id_tipo_borrada : 1};			
		var deffered  = $q.defer();
		Restangular.all('confirmarBorrada').post(JSON.stringify(params)).then(function(evento) {			
			if (evento.error) {
				 deffered.reject(evento.error);
			}else{
				var params = { id_evento : $scope.evento1.id};			
				Restangular.all('getAllBorrasEvento').post(JSON.stringify(params)).then(function(participantes) {		
					$scope.participantes = participantes;
					deffered.resolve(participantes);
				});
			}			
		});		
		return deffered.promise;
	}	
	
	function pontuarBorra(borra) {		
		var params = {  id_borra : borra.id, id_origem: $scope.evento1.id, id_tipo_pontuacao: 2,  id_tipo_borrada : borra.id_tipo_borrada};			
		var deffered  = $q.defer();
		Restangular.all('salvarPontuacao').post(JSON.stringify(params)).then(function(evento) {			
			if (evento.error) {
				 deffered.reject(evento.error);
			}else{
				deffered.resolve(evento);
			}			
		});		
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
		console.log('confirmou');
		var promises = [];
		promises.push(confirmarPresenca(true, null));	

		$q.all(promises).then(function() {
			console.log('salvou a confirmacao');			
		});		
	};
	
	$scope.cancelar = function() {
		$state.go('app.events');		
	};
	
	$scope.hideModalJustificar = function() {
		$scope.modalJustificar.hide();
		
	};
	
	$scope.hideModalFinalizar = function(participantes) {
		var promisesFinalizar = [];
		participantes.map(function(item){
			console.log(item);
			if(item.id_tipo_borrada != null){
				promisesFinalizar.push(pontuarBorra(item));
			}				
		});	
		
		$q.all(promisesFinalizar).then(function() {
			$scope.modalFinalizar.hide();
		});
		
		
	};    		
	
	$scope.justificarModal = function () {
		$scope.modalJustificar.show();
    };
	
	$scope.finalizarModal = function () {
		$scope.modalFinalizar.show();
    };
	
	$scope.justificar = function (id_tipo_borrada) {
		console.log(id_tipo_borrada);
		var promises = [];
		promises.push(confirmarPresenca(false, id_tipo_borrada));
		$q.all(promises).then(function() {
			$scope.modalJustificar.hide();
			$state.go('app.event_details');
		});
	};

	$scope.borrar = function (id_borra) {
		var promises = [];
		promises.push(borrei(id_borra));
		$q.all(promises).then(function() {
			console.log('salvou a denuncia');
		});
	};	
	
	$scope.editarEvento = function () {
		console.log('clicando');
		$state.go('app.event', {novo: false, evento: $scope.evento1 });
	};
	
	promisseEvento.push(getAllBorraEvento());
	promisseEvento.push(getAllTipoBorrada());
	
	
	$q.all(promisseEvento).then(
		function() {
			console.log('Carregou tudo');
			console.log($rootScope.user);
			console.log($scope.participantes);
			console.log($scope.borradas);
		}	
	);
	
	
});
