var reviewApp = angular.module('reviewApp', ['ngRoute', 'reviewServices']);

reviewApp.controller('reviewController',
['$scope', '$routeParams', '$location', 'Review',
function ($scope, $routeParams, $location, Review) {
  $scope.message = "hi";
  $scope.route = $location.absUrl();
  
  Review.get({reviewId: 'joemama'}, function(review) {
     // alert('hello'); 
  });
  
  $scope.newReview = () => {
      alert('create a new review');
  };
  
}]);
