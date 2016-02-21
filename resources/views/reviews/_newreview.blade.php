<div class="modal" id="new-review-modal">
  <div class="modal-dialog">
    <div class="modal-content">
        <form method="post" action="/api/reviews" enctype="multipart/form-data">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="closeNewReviewModal($event)">×</button>
                <h4 class="modal-title">Create a new review</h4>
            </div>
            <div class="modal-body">
                <input type="text" name="review_name" placeholder="Review Name" />
                <input type="file" name="file" id="fileToUpload" />
            </div>
            <div class="modal-footer">
                {{ csrf_field() }}
                <button type="button" class="btn btn-default" data-dismiss="modal" ng-click="closeNewReviewModal($event)">Close</button>
                <input type="submit" class="btn btn-primary" value="Create review" />
            </div>
        </form>
    </div>
  </div>
</div>