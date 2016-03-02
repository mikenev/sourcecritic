var reviewServices = angular.module('reviewServices', ['ngResource']);

reviewServices.factory('Review', ['$resource',
  function($resource){
    return $resource('/api/reviews/:reviewId', {}, {
      query: {method:'GET', params:{reviewId:'none'}, isArray:true}
    });
  }]);
  
reviewServices.factory('Comment', ['$resource',
  function($resource){
    return $resource('/api/reviews/comments', {}, {
      save: {method:'POST', params:{reviewId:'none'}, isArray:false}
    });
}]);