var reviewApp = angular.module('reviewApp', ['ngRoute', 'reviewServices']);

reviewApp.controller('reviewController',
['$scope', '$routeParams', '$location', '$window', '$http', '$compile', '$timeout', 'Review', 'Comment',
function ($scope, $routeParams, $location, $window, $http, $compile, $timeout, Review, Comment) {
    
  $scope.reviewId = '';
  
  var modal = angular.element("#new-review-modal")[0];
  var highlightLocations = [];
  
  $scope.newReview = function() {
      modal.style.display = 'block';
  };
  
  $scope.cancelPost = function(event) {
      var parent = $(event.target).parents(".file-comment")[0].parentElement;
      parent.lastChild.remove();
      var content = "";
      
      for (var i = 0; i < parent.childNodes.length; i++) {
          content += parent.childNodes[i].nodeValue;
      }
      
      var escaped = $("<div>").text(content).html();
      $(parent).replaceWith(escaped);
  };
  
  $scope.closeNewReviewModal = function(event) {
      modal.style.display = 'none';
  };
  
  $scope.goToComment = function (comment) {
      // $("#fileContents")[0].scrollTop = $("#c1456990502164").offset().top - 100;
      
      for (var i = 0; i < $scope.files.length; i++) {
          if ($scope.files[i].id == comment.file_id) {
              $scope.showFile($scope.files[i]);
          }
      }
      
      var a = 1 + 1;
      
  }
  
  $scope.handleMouseUp = function(event) {
      if (event.target.id != "file-contents") {
          return;
      }
      
      var sel = window.getSelection();
      if (!sel.isCollapsed) {
          var range = sel.getRangeAt(0);
          var startIndex = $scope.contents.indexOf(range.startContainer.textContent);
          var startOffset = range.startOffset;
          var endOffset = range.endOffset;
          var id = "c" + (new Date().getTime());
          sel.removeAllRanges();
          document.designMode = "on";
          sel.addRange(range);
          document.execCommand("HiliteColor", false, "yellow");
          sel.focusNode.parentNode.id = id;
          sel.removeAllRanges();
          document.designMode = "off";
          
          var tooltipElement = angular.element("#comment-new")[0];
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
  
  $scope.minimizeComment = function(event) {
      var commentElement = event.target.parentElement.parentElement;
      commentElement.style.display = "none";
      
      var highlightElement = commentElement.parentElement;
      highlightElement.onclick = $scope.maximizeComment;
      highlightElement.className = "pointer";
      highlightElement.title = "Click to show comment.";
  }
  
  $scope.maximizeComment = function(event) {
      if (! event.target.id) {
          return;
      }
      
      var element = $('#' + event.target.id);
      var commentElement = element.children(".file-comment")[0];
      commentElement.style.display = "block";
      element.unbind('onclick');
      element.removeClass("pointer");
      element.removeAttr("title");
  }
  
  $scope.savePost = function(event) {
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
  
  $scope.showComment = function(comment) {
        var range = document.createRange();
        var contentElement = angular.element("#file-contents")[0];
        var startNode = contentElement.childNodes[0];
        range.setStart(startNode, comment.start);
        range.setEnd(startNode, comment.end);
      
        var id = "c" + (new Date().getTime());
        var sel = window.getSelection();
        sel.removeAllRanges();
        document.designMode = "on";
        sel.addRange(range);
        document.execCommand("HiliteColor", false, "yellow");
        sel.focusNode.parentNode.id = id;
        sel.removeAllRanges();
        document.designMode = "off";

        var parentElement = angular.element("#" + id)[0];

        var tooltipElement = angular.element("#comment-saved")[0];
        var div = angular.copy(tooltipElement);
        div.style.left = parentElement.offsetLeft + 'px';
        div.style.top = parentElement.offsetTop + 23 + 'px';
        div.id = "";
        div.firstChild.textContent = comment.content;
        angular.element("#" + id).append($compile(div)($scope));
  }
  
  $scope.showComments = function() {
      var fileId = $scope.fileId;
      var fileComments = new Array();
      
      for (var i = 0; i < $scope.comments.length; i++) {
          if (fileId == $scope.comments[i].file_id) {
            fileComments.push($scope.comments[i]);  
          }
      }
      
      var sorted = fileComments.sort(function(a, b) { return a.end - b.end });
      
      for (var i = sorted.length - 1; i >= 0; i--) {
          $scope.showComment(sorted[i]);
      }
  };
  
  $scope.showFile = function(file, $event) {
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
      $scope.fileName = file.name;
      
      if ($event && $event.target) {
        var lis = angular.element('#file-list').children();
        
        for (var i = 0; i < lis.length; i++) {
            var className = lis[i].className.replace('file-list-selected', '');
            lis[i].className = className;
        }
        
        $event.target.className += " file-list-selected";        
      }
      
      $timeout($scope.showComments);
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
