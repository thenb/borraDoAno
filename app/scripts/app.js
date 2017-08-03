// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.login','starter.borra','starter.ionic','starter.borradetails','starter.borras',
'starter.dashboard','starter.evento','starter.eventodetails', 'starter.eventos','starter.justificar','starter.profile',
'ionic-material', 'ionMdInput', 'restangular'])

.run(function($ionicPlatform, $rootScope) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
	$rootScope.user = {};
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, RestangularProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider
	.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })
    		
	
    .state('app.borras', {
		cache: false,
        url: '/borras',
        views: {
            'menuContent': {
                templateUrl: 'templates/borras.html',
                controller: 'BorrasCtrl'
            },
            'fabContent': {
				template: '<button id="fab-event" class="button button-fab button-fab-bottom-right button-energized-900" ng-click="novoBorra()"><i class="icon ion-plus"></i></button>',
                controller: 'BorrasCtrl'
            }
        }
    })	
	
    .state('app.borra', {
		cache: false,
        url: '/borra',
        views: {
            'menuContent': {
                templateUrl: 'templates/borra.html',
                controller: 'BorraCtrl'
            },
            'fabContent': {
				template: '',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        },
		params: {novo: null, borra: null }	
    })	   
	
	.state('app.profile', {
		cache: false,		
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900" ng-click="editarBorra()"><i class="icon ion-edit"></i></button>',
                controller: 'ProfileCtrl'
            }
        },
		params: {view: null, borra: null}	
    })

   .state('app.events', {
        cache: false,
		url: '/events',
        views: {
            'menuContent': {
                templateUrl: 'templates/events.html',
                controller: 'EventsCtrl'
            },
            'fabContent': {
				template: '<button id="fab-event" class="button button-fab button-fab-bottom-right button-energized-900" ng-click="novoEvento()"><i class="icon ion-plus"></i></button>',
                controller: 'EventsCtrl'
                }
        }
    })

    .state('app.event', {
        cache: false,
		url: '/event',
        views: {
            'menuContent': {
                templateUrl: 'templates/event.html',
                controller: 'EventCtrl'
            },
            'fabContent': {
				template: '',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        },
		params: {novo: null, evento: null }
    })
   
   
    .state('app.event_details', {
		cache: false,
        url: '/event_details',
        views: {
            'menuContent': {
                templateUrl: 'templates/event_details.html',
                controller: 'EventDetailsCtrl'
            },
            'fabContent': {
                template: '<button id="fab-event" class="button button-fab button-fab-bottom-right button-energized-900" ng-click="editarEvento()"><i class="icon ion-edit"></i></button>',
                controller: 'EventDetailsCtrl'
                }

           },
		   params: {view: null, evento: null}	
    })

    	
	
    .state('app.justify', {
		cache: false,		
        url: '/justify',
        views: {
            'menuContent': {
                templateUrl: 'templates/justify.html',
                controller: 'JustifyCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }

            }
        }
    })	
	
    .state('app.login', {
		cache: false,		
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })   
	
    .state('app.dashboard', {
		cache: false,		
        url: '/dashboard',
        views: {
            'menuContent': {
                templateUrl: 'templates/dashboard.html',
                controller: 'DashboardCtrl'
            },
            'fabContent': {
                //template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900" ui-sref="app.borra"><i class="icon ion-edit"></i></button>',
                template: '',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })	

	
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
	
	RestangularProvider.setBaseUrl('https://borra.herokuapp.com/');
});