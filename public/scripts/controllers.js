var reviewApp = angular.module('reviewApp', ['reviewServices']);

reviewApp.controller('reviewController', ['$scope', 'Review', function ($scope, Review) {
  $scope.message = "hi";
  
  Review.get({phoneId: 'joemama'}, function(review) {
     alert('hello'); 
  });
  
  $scope.newReview = () => {
      alert('create a new review');
  };
  
}]);
