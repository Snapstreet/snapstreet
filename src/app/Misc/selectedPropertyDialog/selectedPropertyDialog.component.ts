import { Component, OnInit, Inject } from "@angular/core";
import {
  VERSION,
  MatDialogRef,
  MatDialog,
  MatSnackBar,
  MAT_DIALOG_DATA
} from "@angular/material";
import { Location } from "@angular/common";

@Component({
  selector: "app-selectePpropertyDialog",
  templateUrl: "./selectedPropertyDialog.component.html"
})
export class SelectedPropertyDialogComponent {
  message: string = "";
  cancelButtonText = "Cancel";
  data: any;

  constructor(
    //  @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<SelectedPropertyDialogComponent>,
    private _location: Location
  ) {
    this.dialogRef.updateSize("300vw", "300vw");
  }
  ngOnInit() {}
  onConfirmClick() {
    this.dialogRef.close(true);
    // Add match DB details
    // Get seller ID for property

    // Get seller ID by using snapshot.getRef().getParent()
    // Create new DB entry in collection sellerMatches with seller ID as doc ID and then child collection as initiated / offered
    // Create a record in buyerMatches with buyer ID as doc ID and child ID as initiated / offered
  }
  backClicked() {
    this._location.back();
  }
}
