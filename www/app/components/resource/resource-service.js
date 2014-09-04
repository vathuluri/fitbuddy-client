angular.module('mobile.resource.services')

.constant('SERVER_URL', 'http://testrpg.azurewebsites.net/')

.factory('authHttpInterceptor', ['localStorageService', function(localStorageService) {
 return {
   'request': function(config) {
     config.headers = config.headers || {};
     // do some API key setting
     // Add json web token
     if(localStorageService.get('fitbit-token')){
       config.headers.Authorization = 'Bearer ' + localStorageService.get('fitbit-token');
     }
     return config;
   }
 };
}])

.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('authHttpInterceptor');
}])

.factory('CheckUsername', ['$resource', 'SERVER_URL', function($resource, SERVER_URL) {
  return $resource(SERVER_URL + '/api/users/check/:username', {username: '@username'});
}])

.factory('Refresh', ['$resource', 'SERVER_URL', function($resource, SERVER_URL) {
  return $resource(SERVER_URL + '/fitbit/refresh/:id', {id: '@id'});
}])

.factory('Settings', ['$resource', 'SERVER_URL', function($resource, SERVER_URL) {
  return $resource(SERVER_URL + '/settings/:id', {id: '@id'});
}])

.factory('User', ['$resource', 'SERVER_URL', function($resource, SERVER_URL) {
  return $resource(SERVER_URL + '/api/users/:id', {id : '@id'}, {
    update: { method: 'PUT' }
  });
}])

// get fitbit data based off of a date range
.factory('DatesData', ['$resource', 'SERVER_URL', function($resource, SERVER_URL) {
  return $resource(SERVER_URL + '/fitbit/daterange/:id/:type/:activity/:startDate/:endDate',
    {id: '@id', type: '@type', activity: '@activity', startDate: '@startDate', endDate: '@endDate'} );
}])

// get fitbit data based off of a time range
.factory('NewTimesData', ['$resource', 'SERVER_URL', function($resource, SERVER_URL) {
  return $resource(SERVER_URL + '/fitbit/new/timerange/:id/:activity/:startDate/:startTime/:endTime',
    {id: '@id', activity: '@activity', startDate: '@startDate', startTime: '@startTime', endTime: '@endTime'} );
}])

// OLD RESOURCE WE NEVER USE BECAUSE WE CHANGE IT--LEAVING IT HERE TO REMEMBER FOR BACKWARDS COMPATIABILITY
.factory('TimesData', ['$resource', 'SERVER_URL', function($resource, SERVER_URL) {
  return $resource(SERVER_URL + '/fitbit/timerange/:id/:activity/:startDate/:endDate/:startTime/:endTime',
    {id: '@id', activity: '@activity', startDate: '@startDate', endDate: '@endDate', startTime: '@startTime', endTime: '@endTime'} );
}])


.factory('Shop', ['$resource', 'SERVER_URL', function($resource, SERVER_URL) {
  return $resource(SERVER_URL + '/api/items/:id', {id : '@id'});
}])

.factory('Battle', ['$resource', 'SERVER_URL', function($resource, SERVER_URL) {
  return $resource(SERVER_URL + '/api/battles/:id', {id : '@id'});
}])

.factory('SoloMissions',['$resource', 'SERVER_URL', function($resource, SERVER_URL) {
  return $resource(SERVER_URL + '/api/solos/:id', {id : '@id'});
}])

.factory('Quests',['$resource', 'SERVER_URL', function($resource, SERVER_URL) {
  return $resource(SERVER_URL + '/api/quests/:id', {id : '@id'});
}])

.factory('VersusMissions',['$resource', 'SERVER_URL', function($resource, SERVER_URL) {
  return $resource(SERVER_URL + '/api/groups/:id', {id : '@id'});
}])

.factory('RandomUser',['$resource', 'SERVER_URL', function($resource, SERVER_URL) {
  return $resource(SERVER_URL + '/api/users/random/:id/:level',
    {id : '@id', level: '@level'});
}])

.factory('UserSearch',['$resource', 'SERVER_URL', function($resource, SERVER_URL) {
  return $resource(SERVER_URL + '/api/users/search/:username', {username : '@username'});
}])

.factory('Leaderboard',['$resource', 'SERVER_URL', function($resource, SERVER_URL) {
  return $resource(SERVER_URL + '/api/users/leaderboard');
}])

.factory('Feedback',['$resource', 'SERVER_URL', function($resource, SERVER_URL) {
  return $resource(SERVER_URL + '/feedback/:id', {id : '@id'});
}]);
