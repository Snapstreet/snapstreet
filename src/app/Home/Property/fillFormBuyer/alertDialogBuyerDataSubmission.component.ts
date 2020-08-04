import { Component, OnInit ,Inject } from '@angular/core';
import { VERSION, MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { StateServiceService } from "./../../../state-service.service";
import {listingBuyer} from "../../../Model/listingBuyer";
@Component({
  selector: 'app-alertDialogBuyerDataSubmission',
  templateUrl: './alertDialogBuyerDataSubmission.component.html'
})
export class AlertDialogBuyerDataSubmissionComponent implements OnInit {
  message: string = ""
  cancelButtonText = "Cancel"
  listingBuyer:any;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  private dialogRef: MatDialogRef<AlertDialogBuyerDataSubmissionComponent>,
  private stateService: StateServiceService,) { 
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
    this.dialogRef.updateSize('300vw','300vw')
  }

  ngOnInit() {
    this.listingBuyer = this.stateService.listingBuyer;
  }
  
  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}