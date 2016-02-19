var reviewApp = angular.module('reviewApp', ['ngRoute', 'reviewServices']);

reviewApp.controller('reviewController',
['$scope', '$routeParams', '$location', '$window', 'Review',
function ($scope, $routeParams, $location, $window, Review) {
    
  $scope.message = "hi";
  $scope.route = $location.absUrl();
  
  var modal = angular.element("#new-review-modal")[0];
  
  Review.get({reviewId: 'joemama'}, function(review) {
     // alert('hello'); 
  });
  
  $scope.newReview = () => {
      modal.style.display = 'block';
  };
  
  $scope.closeNewReviewModal = (event) => {
      modal.style.display = 'none';
  };
  
}]);
