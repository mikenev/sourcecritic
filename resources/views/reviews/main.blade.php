<div class="panel panel-primary fill">
  <div class="panel-heading">
    <h3 class="panel-title">File Contents: @{{fileName}}</h3>
  </div>
  <div class="panel-body" id="fileContents" ng-mouseup="handleMouseUp($event)">
    @{{message}}
    <div class="line-number-column" ng-if="fileLines">
        <span ng-repeat="line in fileLines">@{{line}}<br /></span>
    </div>
    <div class="file-content-column" id="file-contents" ng-if="contents" ng-bind="contents"></div>
  </div>
</div>

<div id="comment-new" class="file-comment">&nbsp;<div contentEditable="false">
        <a href="#" ng-click="savePost($event)">Save</a>
        <a href="#" ng-click="cancelPost($event)">Cancel</a>
    </div>
</div>

<div id="comment-saved" class="file-comment">&nbsp;<div contentEditable="false">
        <a href="#" ng-click="minimizeComment($event)" class="comment-button">Hide</a>
    </div>
</div>