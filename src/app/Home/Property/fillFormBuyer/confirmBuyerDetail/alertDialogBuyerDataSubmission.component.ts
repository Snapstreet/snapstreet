import { Component, OnInit ,Inject } from '@angular/core';
import { VERSION, MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { StateServiceService } from "../../.././../state-service.service";
@Component({
  selector: 'app-alertDialogBuyerDataSubmission',
  templateUrl: './alertDialogBuyerDataSubmission.component.html'
})
export class AlertDialogBuyerDataSubmissionComponent implements OnInit {
  message: string = ""
  cancelButtonText = "Cancel"
  newUser:boolean = true;
  Look_postcodes: any
  Look_propertytype: any;
  Look_minamount: any;
  Look_maxamount: any;
  Look_longitude: any;
  Look_latitude: any;
  Look_Town: any;
  Property_For: string;
  Look_PropertyFor: string;
  LookingStreetname: string;
  Conditions: string;
  FinancialPosition: string;
  Validity: any;
  Position: string;
  UserId: string;
  ChainStatus: string;
  Look_Streetname: string;
  Look_chainstatus: string;
  Look_condition: string;
  Look_Position: string;

  Look_Validity: any;
  Look_UserId: string;
  Look_FinancialPosition: any;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  private dialogRef: MatDialogRef<AlertDialogBuyerDataSubmissionComponent>,private stateService:StateServiceService) { 
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



