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
  
  $scope.showFile = (file) => {
      var container = angular.element("#fileContents")[0];
      container.textContent = file.contents;
  }
  
  var reviewId = null;
  var route = $location.absUrl();
  var matches = route.match(/\/reviews\/(\w+)/i);
  
  if (matches && matches.length > 1) {
        reviewId = matches[1];
        $scope.reviewId = reviewId;
        $scope.message = "Retrieving your review. Please wait.";
      
        Review.get({reviewId: reviewId}, function(review) {
            $scope.files = review.files;
            $scope.reviewName = review.name;
            
            if (review.files && review.files.length > 0) {
                $scope.showFile(review.files[0]);
            }
        });
  } else {
      $scope.message = "Nothing to show. Please create a review.";
  }
}]);
