/* global angular, document, window */
'use strict';

angular.module('starter.login', [])
.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, $ionicSideMenuDelegate, Restangular, $q, $window, $state) {
    
	$ionicSideMenuDelegate.canDragContent(false);
	$scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
	
	$scope.user = {};

	var lembrou = window.localStorage.getItem("lembrar");

	
	if(lembrou=='true'){
		lembrou = true;
	} else {
		lembrou = false;
	}
	
	if(lembrou){
		if(typeof window.localStorage.getItem("apelido")!='undefined'){
			$scope.user.apelido = window.localStorage.getItem("apelido")
		}
		if(typeof window.localStorage.getItem("senha")!='undefined'){
			$scope.user.senha = window.localStorage.getItem("senha")
		}
		  $scope.user.lembrar = true;
	} else {		
		$scope.user.apelido = "";
		$scope.user.senha = "";
		$scope.user.lembrar = false;
	}	
	
	function login() {			
		var params = {  user : $scope.user };	
		var deffered  = $q.defer();	
		Restangular.all('doLogin').post(JSON.stringify(params)).then(function(tkn) {			
			if (tkn.error) {
				 deffered.reject(tkn.error);
			}else{
				deffered.resolve(tkn);
				localStorage.setItem("token", tkn.token);
			}			
		});
		return deffered.promise;

	}	
	
	
	$scope.doLogin = function() {
		var promises = [];	

	}	
	
	$scope.doLogin = function() {
		var promises = [];
		$scope.showError = false;

		promises.push(login());	
		$q.all(promises).then(function(retorno) {
			console.log(retorno);
			if(retorno[0].type === 1){
				$scope.showError = true;
				$scope.msgError = retorno[0].msg;
			} else {
				if(!$scope.user.lembrar){
					window.localStorage.setItem("apelido", {});
					window.localStorage.setItem("senha", {});
					window.localStorage.setItem("lembrar", false);
				} else {
					window.localStorage.setItem("apelido", $scope.user.apelido);
					window.localStorage.setItem("senha", $scope.user.senha);
					window.localStorage.setItem("lembrar", $scope.user.lembrar);
				}				
			$state.go('app.dashboard');				
			}			
		});
	};
	
	console.log('Token:'+ window.localStorage.getItem("token"));

	
	
});