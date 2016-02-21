var reviewApp = angular.module('reviewApp', ['ngRoute', 'reviewServices']);

reviewApp.controller('reviewController',
['$scope', '$routeParams', '$location', '$window', '$http', 'Review',
function ($scope, $routeParams, $location, $window, $http, Review) {
    
  $scope.reviewId = '';
  
  var modal = angular.element("#new-review-modal")[0];
  
  $scope.newReview = () => {
      modal.style.display = 'block';
  };
  
  $scope.closeNewReviewModal = (event) => {
      modal.style.display = 'none';
  };
  
  var reviewId = null;
  var route = $location.absUrl();
  var matches = route.match(/\/reviews\/(\w+)/i);
  
  if (matches && matches.length > 1) {
        reviewId = matches[1];
        $scope.reviewId = reviewId;
      
        Review.get({reviewId: reviewId}, function(review) {

        });
  }
}]);
