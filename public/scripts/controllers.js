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
  
  $scope.createReview = (event) => {
      var f = angular.element("#fileToUpload")[0].files[0];
      var r = new FileReader();
      r.onloadend = (e) => {
          var data = e.target.result;
          var fd = new FormData();
          fd.append('review_name', $scope.reviewName);
          fd.append('file', data);
          fd.append('file_name', f.name);
          $http.post('/reviews', fd, {
              transformRequest: angular.identity,
              headers: {'Content-Type': undefined }
          })
          .success(function(data){
              var reviewId = data.reviewId;
              $window.location = '/reviews/' + reviewId;
          })
          .error(function(data) {
              console.log('error');
          })
      };
      
      r.readAsDataURL(f);
  }

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
