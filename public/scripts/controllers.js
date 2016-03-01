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
  
  $scope.handleMouseUp = (event) => {
      if (event.target.id != "file-contents") {
          return;
      }
      
      var sel = window.getSelection();
      if (!sel.isCollapsed) {
          var range = sel.getRangeAt(0);
          sel.removeAllRanges();
          document.designMode = "on";
          sel.addRange(range);
          document.execCommand("HiliteColor", false, "yellow");
          sel.removeAllRanges();
          document.designMode = "off";
          
          var div = document.createElement('div');
          div.style.top = event.offsetY + 20 + 'px';
          div.style.left = event.offsetX - 30 + 'px';
          div.className = "file-comment";
          div.contentEditable = "true";
          angular.element("#file-contents").append(div);
          div.focus();
      }
  }
  
  $scope.showFile = (file, $event) => {
      var contents = file.contents;
      var lines = contents.split(/\r?\n|\n/g);
      var fileLines = [];
      
      for (var i = 0; i < lines.length; i++) {
          fileLines.push(i);
      }
      
      $scope.message = "";
      $scope.contents = contents;
      $scope.fileLines = fileLines;
      
      if ($event && $event.target) {
        var lis = angular.element('#file-list').children();
        
        for (var i = 0; i < lis.length; i++) {
            var className = lis[i].className.replace('file-list-selected', '');
            lis[i].className = className;
        }
          
        $event.target.className += " file-list-selected";        
      }
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
