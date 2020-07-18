import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { SellerformService } from "../fillFormSeller.service";
import { AuthService } from "../../../../auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { StateServiceService } from "../../../../state-service.service";
import { listingSeller } from "../../../../Model/listingSeller";
 import {user} from "../../../../Model/user";
import {
  VERSION,
  MatDialogRef,
  MatDialog,
  MatSnackBar,
  MAT_DIALOG_DATA
} from "@angular/material";
import { AlertDialogComponent } from "./alertDialogSellerDataSubmission.component";
import { Location } from "@angular/common";
import { Config, HttpService } from "../../../../http.service";
import {ConfirmsellerDetailService} from  "./confirmseller-detail.service"
import{notification} from '../../../../Model/notification';

@Component({
  selector: "app-confirmSellerDetail",
  templateUrl: "./confirmSellerDetail.component.html",
  styleUrls: ["./confirmSellerDetail.component.css"]
})
export class ConfirmSellerDetailComponent  implements OnInit {
  return: any;
  userData: any;
  isLoggedIn: boolean;
  isLoading: boolean = false;  
  listingSeller: listingSeller;
  notification:notification;
  sellerUser:user;
  version = VERSION;
  isBuyer: boolean = false;
  result: any;
  postcodeCoordinates: any;
  user: any;
  uid: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private SellerformService: SellerformService,
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    private stateService: StateServiceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private _location: Location,
    private postcodeService: HttpService,
    private  ConfirmsellerDetailService: ConfirmsellerDetailService,
    private router:Router,
   
  
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uid = this.user.uid;

    this.ConfirmsellerDetailService.getUser(this.uid).subscribe((ref) => {
      ref.forEach((element) => {
        


        if(element.data().uid == this.uid)
     {
     this.user.Name = element.data().Name
     this.user.Email = element.data().email
     this.user.DOB = element.data().DOB.toDate() 
     this.user.Phone = element.data().Phone
     this.user.Currentpostcode=element.data().Currentpostcode
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
    this.listingSeller = this.stateService.listingSeller;
   
    //For Seller
    this.postcodeService.getLat(this.listingSeller.Lookingpostcode).subscribe(data => {
      this.postcodeCoordinates = data;
      (this.listingSeller.longitude = this.postcodeCoordinates.result.longitude),
      (this.listingSeller.latitude = this.postcodeCoordinates.result.latitude),
      (this.listingSeller.UserId = this.userData.uid),
      (this.isBuyer = true);
      this.isBuyer = false;
    });
  }

  submitForm() {
    this.listingSeller.UserId = this.userData.uid
    this.isLoading = true;
    this.listingSeller.username =  this.user.Name
  this.listingSeller.usertitle = this.user.title
    this.return = this.SellerformService.createCustomer(
      this.userData.uid,
      this.listingSeller
    ).then(data => {
      if (data == true) {
        this.isLoading = false;
        const dialogRef = this.dialog.open(AlertDialogComponent, {
          data: {
            message: "HelloWorld",
            buttonText: {
              cancel: "Done"
            }
          }
        });
      }
    });
    // this.notification={
    //   time:new Date(),
    //   viewed:"no"
    // }
  
    // this.return = this.SellerformService
    // .notificationCustomer(this.userData.uid,this.notification).then(data=>
      
    //   {
    //     console.log("notification" + data)
    //   });
  }

  private LoggedIn() {
    this.isLoggedIn = true;
  }
  private LoggedOut() {
    this.isLoggedIn = false;
  }
  backClicked() {
    this._location.getState();   
  }
}
