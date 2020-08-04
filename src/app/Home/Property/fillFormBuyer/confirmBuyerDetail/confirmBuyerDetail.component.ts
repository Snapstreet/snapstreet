import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormsService } from "../fillFormBuyer.service";
import { AuthService } from "./../../../../auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { StateServiceService } from "./../../../../state-service.service";
import { listingBuyer } from "../../../../Model/listingBuyer";
import {User } from "../../../../shared/services/user";
import {
  VERSION,
  MatDialogRef,
  MatDialog,
  MatSnackBar,
  MAT_DIALOG_DATA
} from "@angular/material";
import { AlertDialogBuyerDataSubmissionComponent } from "./alertDialogBuyerDataSubmission.component";
import { Location } from "@angular/common";
import { Config, HttpService } from "../../../../http.service";
import { Observable, onErrorResumeNext } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { switchMap } from "rxjs/operators";
import { map, startWith, take } from "rxjs/operators";
import {BuyerdetailService} from './confirmBuyerDetail.service'
import{notification} from '../../../../Model/notification';

@Component({
  selector: "app-confirmBuyerDetail",
  templateUrl: "./confirmBuyerDetail.component.html",
  styleUrls: ["./confirmBuyerDetail.component.css"]
})
export class ConfirmBuyerDetailComponent implements OnInit {
  return: any;
  userData: any;
  isLoggedIn: boolean;
  isLoading: boolean = false;
  listingBuyer: listingBuyer;
  notification:notification
  selectedIndex = 0;
  version = VERSION;
  config: Config;
  maxNumberOfTabs = 2;
  Needsmodernisation = String;
  routerExtensions: any;
  getLat: any;
  data: any;
  isBuyer: boolean = false;
  Seller: any;
  postcodeCoordinates: any;
  Date = new Date();
  user: any;
  buyerUser: any;
  users: any;

  equals(objOne, objTwo) {
    if (typeof objOne !== "undefined" && typeof objTwo !== "undefined") {
      return objOne.id === objTwo.id;
    }
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private formsService: FormsService,
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    private stateService: StateServiceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private _location: Location,
    private postcodeService: HttpService,
private BuyerdetailService : BuyerdetailService
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uid = this.user.uid;

    this.BuyerdetailService.getUser(this.uid).subscribe((ref) => {
      ref.forEach((element) => {
        if(element.data().uid == this.uid)
     {
     this.user.Name = element.data().Name
     this.user.Email = element.data().email
     this.user.DOB = element.data().DOB.toDate() 
     this.user.Phone = element.data().Phone
     this.user.title = element.data().title
   
     }
      });
    });
    // Auth
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem("user", JSON.stringify(this.userData));
        this.LoggedIn();
      } else {
        localStorage.setItem("user", null);
        this.LoggedOut();
      } 
    });
    this.listingBuyer = this.stateService.listingBuyer;

      //Lookup Declared Function
      this.postcodeService
        .getLat(this.listingBuyer.Lookingpostcode.replace(/\s/g, ""))
        .subscribe(data => {
          this.postcodeCoordinates = data;
          (this.listingBuyer.longitude = this.postcodeCoordinates.result.longitude),
            (this.listingBuyer.latitude = this.postcodeCoordinates.result.latitude),
            (this.listingBuyer.UserId = this.userData.uid),
            (this.isBuyer = true);
            this.isBuyer = false;
            console.log(this.listingBuyer.longitude + " "  + this.listingBuyer.latitude)
        });
   
    



   
  }
  uid(uid: any) {
    throw new Error("Method not implemented.");
  }

  submitForm() {

    this.listingBuyer.UserId = this.userData.uid;
    this.isLoading = true;
    this.listingBuyer.username =  this.user.Name
  this.listingBuyer.usertitle = this.user.title
  this.lookuplatlong()
  this.listingBuyer.longitude
  this.listingBuyer.latitude
    this.return = this.formsService
      .createCustomer(this.userData.uid, this.listingBuyer)
      .then(data => {
        if (data == true) {
          this.isLoading = false;
          const dialogRef = this.dialog.open(
            AlertDialogBuyerDataSubmissionComponent,
            {
              data: {
                message: "HelloWorld",
                buttonText: {
                  cancel: "Done"
                }
              }
            }
          );
        }
      });

  }

  private LoggedIn() {
    this.isLoggedIn = true;
  }
  private LoggedOut() {
    this.isLoggedIn = false;
  }

  backClicked() {
    this._location.back();
  }
  Lat() {
    this.listingBuyer.latitude = this.data;
  }
  userDetail(){
    console.log(this.user)
      this.return = this.formsService.createUserCustomer(this.user)
      .then(data => {
     
      });
    }
    

    lookuplatlong()
    {
  
      //Lookup Declared Function
      this.postcodeService
        .getLat(this.listingBuyer.Lookingpostcode.replace(/\s/g, ""))
        .subscribe(data => {
          this.postcodeCoordinates = data;
          (this.listingBuyer.longitude = this.postcodeCoordinates.result.longitude),
            (this.listingBuyer.latitude = this.postcodeCoordinates.result.latitude),
            (this.listingBuyer.UserId = this.userData.uid),
            (this.isBuyer = true);
            this.isBuyer = false;
        });
   
    }
}
