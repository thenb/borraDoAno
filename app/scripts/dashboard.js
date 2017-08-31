/* global angular, document, window */
'use strict';

angular.module('starter.dashboard', [])

.controller('DashboardCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicSideMenuDelegate, $rootScope, Restangular, $q, $state,) {
    
	$ionicSideMenuDelegate.canDragContent(true);	
	$scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

	var promises = [];    
	
	
    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 100);

    // Set Ink
    ionicMaterialInk.displayEffect();
	
	
	function getAllEventosAtivos() {
	var deffered  = $q.defer();		
	Restangular.one('/getAllEventosAtivos').getList().then(function(eventos) {
		eventos.map(function(item){
			item.data_inicio_string = moment(item.data_inicio).format('DD/MM/YYYY');
			item.data_fim_string = moment(item.data_fim).format('DD/MM/YYYY');
		});			
		console.log(eventos);
		$scope.eventos = eventos;
		deffered.resolve(eventos);
		//efeito();
	});
	return deffered.promise;
	}
	
	
	
	
	
	promises.push(getAllEventosAtivos());
	
	
	$q.all(promises).then(function() {			
			//efeito();
			//console.log($scope.borras.nome);
		}	
	);	
	
	
	
	
	
	
	
	
	
	var decoded = jwt_decode(localStorage.getItem("token"));
	//root scope user para virar global
	$rootScope.user = decoded.user;
	$scope.user = decoded.user;

});
