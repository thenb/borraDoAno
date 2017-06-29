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
			if(retorno[0].type===1){
				$scope.showError = true;
				$scope.msgError = retorno[0].msg;
			}else{
			$state.go('app.dashboard');				
			}			
		});
	};
	
});
