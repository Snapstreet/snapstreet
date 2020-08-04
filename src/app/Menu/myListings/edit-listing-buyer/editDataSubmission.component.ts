import { Component, OnInit ,Inject } from '@angular/core';
import { VERSION, MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Location } from "@angular/common";
@Component({
  selector: 'app-editDataSubmission',
  templateUrl: './editDataSubmission.component.html'
})
export class EditDataSubmissionComponent implements OnInit {
  message: string = ""
  cancelButtonText = "Cancel"
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private _location: Location,
  private dialogRef: MatDialogRef<EditDataSubmissionComponent>) { 
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
    this.dialogRef.updateSize('300vw','300vw')
  }

  ngOnInit() {
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
  backClicked() {
    this._location.back();
  }

}