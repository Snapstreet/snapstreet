import { Component, OnInit ,Inject } from '@angular/core';
import { VERSION, MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-alertDialogBuyerDataSubmission',
  templateUrl: './alertDialogBuyerDataSubmission.component.html'
})
export class AlertDialogBuyerDataSubmissionComponent implements OnInit {
  message: string = ""
  cancelButtonText = "Cancel"
  newUser:boolean = true
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  private dialogRef: MatDialogRef<AlertDialogBuyerDataSubmissionComponent>) { 
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

}