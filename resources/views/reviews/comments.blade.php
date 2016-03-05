<div class="panel panel-success fill">
  <div class="panel-heading">
    <h3 class="panel-title">Comments</h3>
  </div>
  <div class="panel-body">
      <ul class="comment-list">
          <li
          ng-repeat="comment in comments track by $index"
          ng-click="goToComment(comment)">@{{getFileName(comment.file_id);}} - @{{comment.content}}
          </li>
      </ul>
  </div>
</div>