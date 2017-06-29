/* global angular, document, window */
'use strict';

angular.module('starter.dashboard', [])

.controller('DashboardCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicSideMenuDelegate, $rootScope) {
    
	$ionicSideMenuDelegate.canDragContent(true);	
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
    }, 100);

    // Set Ink
    ionicMaterialInk.displayEffect();
	
	var decoded = jwt_decode(localStorage.getItem("token"));	
	$scope.user = decoded.user;
	$rootScope.user = $scope.user
	console.log($scope.user);

});
