<<<<<<< HEAD
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

userDetail(){
this.isLoading = true
    this.return = this.fillFormsService.userupate(this.user)
    .then(data => {
   this.isLoading = false
   this.alert()
    });
  }


  alert()
  {
    const dialogRef = this.dialog.open(EdiProfileComponent, {
      data: { message: "Please fill Listing Buyer" }
    });
  }
=======
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

userDetail(){
this.isLoading = true
    this.return = this.fillFormsService.userupate(this.user)
    .then(data => {
   this.isLoading = false
   this.alert()
    });
  }


  alert()
  {
    const dialogRef = this.dialog.open(EdiProfileComponent, {
      data: { message: "Please fill Listing Buyer" }
    });
  }
>>>>>>> 651bfc8cf0ef365f0c06fc4dd4780533889dee96
}