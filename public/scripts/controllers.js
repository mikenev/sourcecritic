var reviewApp = angular.module('reviewApp', ['ngRoute', 'reviewServices']);

reviewApp.controller('reviewController',
['$scope', '$routeParams', '$location', '$window', '$http', '$compile', 'Review', 'Comment',
function ($scope, $routeParams, $location, $window, $http, $compile, Review, Comment) {
    
  $scope.reviewId = '';
  
  var modal = angular.element("#new-review-modal")[0];
  var highlightLocations = [];
  
  $scope.newReview = () => {
      modal.style.display = 'block';
  };
  
  $scope.cancelPost = (event) => {
      var parent = $(event.target).parents(".file-comment")[0].parentElement;
      parent.lastChild.remove();
      var content = "";
      
      for (var i = 0; i < parent.childNodes.length; i++) {
          content += parent.childNodes[i].nodeValue;
      }
      
      var escaped = $("<div>").text(content).html();
      $(parent).replaceWith(escaped);
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
          var startIndex = $scope.contents.indexOf(range.startContainer.textContent);
          var startOffset = range.startOffset;
          var endOffset = range.endOffset;
          var id = new Date().getTime();
          sel.removeAllRanges();
          document.designMode = "on";
          sel.addRange(range);
          document.execCommand("HiliteColor", false, "yellow");
          sel.focusNode.parentNode.id = id;
          sel.removeAllRanges();
          document.designMode = "off";
          
          var tooltipElement = angular.element("#comment-tooltip")[0];
          var div = angular.copy(tooltipElement);
          div.style.top = event.offsetY + 20 + 'px';
          div.style.left = event.offsetX - 30 + 'px';
          div.id = "";
          div.contentEditable = "true";
          angular.element("#" + id).append($compile(div)($scope));
          div.focus();
          
          var highlight = {
              start: startIndex + startOffset,
              end: startIndex + endOffset,
              id: id
          }
          
          highlightLocations.push(highlight);
      }
  }
  
  $scope.savePost = (event) => {
      if (! $scope.fileId) {
          return;
      }
      
      var highlight = null;
      var comment = event.target.parentNode.parentNode.firstChild.textContent;
      var parent = $(event.target).parents(".file-comment")[0].parentElement;
      var id = parent.id;
      
      for (var i = 0; i < highlightLocations.length; i++) {
          if (highlightLocations[i].id == id) {
              highlight = highlightLocations[i];
              break;
          }
      }
      
      Comment.save(
          {
              reviewId: $scope.reviewId,
              fileId: $scope.fileId,
              start: highlight.start,
              end: highlight.end,
              content: comment
          },
          function (result) {
              var a = result;
              
          });
  };
  
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
      $scope.fileId = file.id;
      
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
            $scope.comments = review.comments;
            $scope.reviewName = review.name;
            
            if (review.files && review.files.length > 0) {
                $scope.showFile(review.files[0]);
            }
        });
  } else {
      $scope.message = "Nothing to show. Please create a review.";
  }
  
  
}]);
