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
	$scope.novo = $state.params.novo;	
		
	if($state.params.novo){
		$scope.borra1 = {};
		$scope.operacao = 'Novo';
	}else{
		if($state.params.perfil){
			$scope.operacao = 'Perfil';	
		}else{
			$scope.operacao = 'Editar';	
		}
		$scope.borra1 = $state.params.borra;		
		if(typeof $scope.borra1.data_nascimento != 'undefined') {
			$scope.borra1.data_nascimento = moment($scope.borra1.data_nascimento).toDate();
		}
	}

	
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

	function editarNome() {			
		var params = {  borra : $scope.borra1 };	
		var deffered  = $q.defer();	
		Restangular.all('editarBorraNome').post(JSON.stringify(params)).then(function(borra) {			
			if (borra.error) {
				 deffered.reject(borra.error);
			}else{
				deffered.resolve(borra);
				console.log(borra);
			}			
		});
		return deffered.promise;
	}

	function editatApelido() {			
		var params = {  borra : $scope.borra1 };	
		var deffered  = $q.defer();	
		Restangular.all('editarBorraApelido').post(JSON.stringify(params)).then(function(borra) {			
			if (borra.error) {
				 deffered.reject(borra.error);
			}else{
				deffered.resolve(borra);
				console.log(borra);
			}			
		});
		return deffered.promise;
	}

	function editarEmail() {			
		var params = {  borra : $scope.borra1 };	
		var deffered  = $q.defer();	
		Restangular.all('editarBorraEmail').post(JSON.stringify(params)).then(function(borra) {			
			if (borra.error) {
				 deffered.reject(borra.error);
			}else{
				deffered.resolve(borra);
				console.log(borra);
			}			
		});
		return deffered.promise;
	}

	function editarDataNascimento() {			
		var params = {  borra : $scope.borra1 };	
		var deffered  = $q.defer();	
		Restangular.all('editarBorraDataNascimento').post(JSON.stringify(params)).then(function(borra) {			
			if (borra.error) {
				 deffered.reject(borra.error);
			}else{
				deffered.resolve(borra);
				console.log(borra);
			}			
		});
		return deffered.promise;
	}
	
	$scope.salvarBorra = function(form) {
		var promises = [];	
		if($state.params.novo){
			promises.push(saveBorra());	
		}else{
			if(form.nome.$dirty){
				promises.push(editarNome());	
			}
			if(form.apelido.$dirty){
				promises.push(editatApelido());	
			}
			if(form.email.$dirty){
				promises.push(editarEmail());	
			}
			if(form.data_nascimento.$dirty){
				promises.push(editarDataNascimento());	
			}
		}		
		
		$q.all(promises).then(function(retorno) {
			console.log(retorno);
			if(retorno[0].type===1){
				//showErrorNotification(retorno[0].msg);
			}else{			
			$state.go('app.borras');					
			//showNotification();
			}			
		});
	};
	
	$scope.cancelar = function() {
		if($state.params.perfil){
			$state.go('app.profile', {novo: false, perfil: true, borra: $scope.borra1 });
		}else{
			$state.go('app.borras');
		}
		
	};	

});
