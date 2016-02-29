<div class="panel panel-info fill">
  <div class="panel-heading">
    <h3 class="panel-title">Files</h3>
  </div>
  <div class="panel-body">
    <ul class="file-list" id="file-list">
       <li
         ng-repeat="file in files"
         ng-click="showFile(file, $event)"
         ng-class="{'file-list-selected': $first}">@{{file.name}}</li> 
    </ul>
  </div>
</div>