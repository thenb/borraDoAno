/* global angular, document, window */
'use strict';

angular.module('starter.login', [])
.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, $ionicSideMenuDelegate, Restangular, $q, $window) {
    
	$ionicSideMenuDelegate.canDragContent(false);
	$scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
	
	function login(user) {			
		var params = {  user : user };	
		var deffered  = $q.defer();	
		Restangular.all('saveEvento').post(JSON.stringify(params)).then(function(user) {			
			if (user.error) {
				 deffered.reject(user.error);
			}else{
				deffered.resolve(user);
				console.log(user)		;		
				//$window.sessionStorage.token = user.token;
				localStorage.setItem("token", user.token);
			}			
		});
		return deffered.promise;
	}
	
	
	
	$scope.doLogin = function(user) {
		var promises = [];	
		promises.push(login(user));	
		$q.all(promises).then(function(retorno) {
			console.log(retorno);
			if(retorno[0].type===1){
				showErrorNotification(retorno[0].msg);
			}else{
			$window.location.href = 'template.html';
			showNotification();				
			}			
		});
	};
	
});
