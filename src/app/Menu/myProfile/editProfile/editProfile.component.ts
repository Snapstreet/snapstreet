import { Component, OnInit } from '@angular/core';
import{FormsService} from '../../../Home/Property/fillFormBuyer/fillFormBuyer.service';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import {EdiProfileComponent} from "./ediProfileSubmission.component"
import {
  VERSION,
  MatDialogRef,
  MatDialog,
  MatSnackBar,
  MAT_DIALOG_DATA,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatDialogConfig
} from "@angular/material";
import { FormControl, Validators, FormGroup } from "@angular/forms";


@Component({
  selector: 'app-editProfile',
  templateUrl: './editProfile.component.html',
  styleUrls: ['./editProfile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: any;
  return: any;
  uid:any;
  DOB:any;
  isLoading:boolean = false
  constructor(private fillFormsService:FormsService,
    private router:Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uid = this.user.uid;

    this.fillFormsService.getUser(this.uid).subscribe((ref) => {
      ref.forEach((element) => {
        if(element.data().uid == this.uid)
     {
     this.user.Name = element.data().Name
     this.user.Email = element.data().email
     this.user.Phone = element.data().Phone
     this.user.DOB = element.data().DOB.toDate() 
     this.user.Currentaddress = element.data().Currentaddress
     this.user.prefrence= element.data().prefrence

     }
      });
    });

}
emailFormControl = new FormControl("", [
  Validators.required,

]);

dobFormControl= new FormControl("", [
  Validators.required,

]);
phoneFormControl= new FormControl("", [
  Validators.required,
  Validators.minLength(10),
  Validators.maxLength(10),

]);
addressFormControl = new FormControl("", [
  Validators.required,

]);
userDetail(){
  if(this.user.Name == null)
  {
    const dialogRef = this.dialog.open(EdiProfileComponent, {
      data: { message: "Please fill username" }
    });
  }
  else if (this.user.Email == null)
  {
    const dialogRef = this.dialog.open(EdiProfileComponent, {
      data: { message: "Please fill email id" }
    });

  
  }
  else if(this.user.Phone == null)
  {
 
    const dialogRef = this.dialog.open(EdiProfileComponent, {
      data: { message: "Please fill phone number" }
    });
    this.phoneFormControl

  }
  else if(this.user.DOB == null)
  {
    const dialogRef = this.dialog.open(EdiProfileComponent, {
      data: { message: "Plaese fill date of birth" }
    });
    this.dobFormControl
  }
  else if(Math.floor(Math.abs(Date.now() - new Date(this.user.DOB).getTime()) / (1000 * 3600 * 24) / 365.25)
  < 18)
  {
    const dialogRef = this.dialog.open(EdiProfileComponent, {
      data: { message: "Age must be 18+" }
    });
  }
  else if(this.user.Currentaddress == null)
  {
    const dialogRef = this.dialog.open(EdiProfileComponent, {
      data: { message: "Please fill current address" }
    });
  
  }
  else if(this.user.prefrence == null)
  {
    const dialogRef = this.dialog.open(EdiProfileComponent, {
      data: { message: "Please choose your prefrences" }
    });
  }
  else{
this.isLoading = true
    this.return = this.fillFormsService.userupate(this.user)
    .then(data => {
   this.isLoading = false
   this.alert()
    });
  }
  }


  alert()
  {
    const dialogRef = this.dialog.open(EdiProfileComponent, {
      data: { message: "Your Profile has been updated" }
    });
  }
}