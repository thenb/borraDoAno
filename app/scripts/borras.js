/* global angular, document, window */
'use strict';

angular.module('starter.borras', [])

.controller('BorrasCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, Restangular, $q, $state) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab('right');
	
	var promises = [];

   /* $timeout(function() {
        ionicMaterialMotion.ripple({
            selector: '.animate-ripple .list'
        });
    }, 100);
	*/
    
	// Activate ink for controller
    ionicMaterialInk.displayEffect();

	
	$scope.novoBorra = function () {
		console.log('clicando');
		$state.go('app.borra', {novo: true, borra: null });
	};
	

	
	$scope.verBorra = function (borra) {
		console.log('ver borra');
		$state.go('app.profile', { view: true, borra: borra });
	};	
	
	

	function getAllBorras() {
		var deffered  = $q.defer();		
		Restangular.one('/getAllBorras').getList().then(function(borras) {
			$scope.borras = borras;
			deffered.resolve(borras);
		});
		return deffered.promise;
	}	
	
	
	function init() {
		console.log($scope.borras);
        document.getElementsByTagName('ion-list')[0].className += ' animate-ripple';
        setTimeout(function() {
            ionicMaterialMotion.ripple();
        }, 200);
	}
	
	
	promises.push(getAllBorras());
	
	
	$q.all(promises).then(function() {
			init();
			//console.log($scope.borras.nome);
		}
	);
	
	
});
	