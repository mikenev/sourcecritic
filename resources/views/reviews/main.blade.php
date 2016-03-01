<div class="panel panel-primary fill">
  <div class="panel-heading">
    <h3 class="panel-title">File Contents</h3>
  </div>
  <div class="panel-body" id="fileContents" ng-mouseup="handleMouseUp($event)">
    @{{message}}
    <div class="line-number-column" ng-if="fileLines">
        <span ng-repeat="line in fileLines track by $index">@{{$index}}<br /></span>
    </div>
    <div class="file-content-column" id="file-contents" ng-if="contents" ng-bind="contents"></div>
  </div>
</div>