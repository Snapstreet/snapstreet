import { Component,  OnInit, Inject} from '@angular/core';

import { VERSION, MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'app-formdialog',
  templateUrl: './alertFormdialog.component.html',
  styleUrls: ['./alertFormdialog.component.css']
})
export class  AltertFormDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<AltertFormDialogComponent>) {
      this.dialogRef.updateSize('300vw','300vw')
     }
    
  ngOnInit() {
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
