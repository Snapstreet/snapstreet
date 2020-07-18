import { Component, OnInit } from "@angular/core";
import { SelectedpropertydetailService } from "./buyerSelectedPropertyDetail.service";
import { StateServiceService } from "../../../../../.././state-service.service";
import { MatchesService } from "../buyerMatchListing.service";
import { SelectedPropertyDialogComponent } from "../../../../../.././Misc/selectedPropertyDialog/selectedPropertyDialog.component";
import {
  VERSION,
  MatDialogRef, 
  MatDialog,
  MatSnackBar,
  MAT_DIALOG_DATA,
} from "@angular/material";
import { matchesBuyer } from "../../../../../../Model/matchesBuyer";
import { Router, ActivatedRoute } from "@angular/router";
import { getAllJSDocTagsOfKind } from "typescript";
import { matchesSeller } from "../../../../../../Model/matchesSeller";
import { HttpService } from "../../../../../../http.service";
import { Location } from "@angular/common";
import {notification} from "../../../../../../Model/notification"
@Component({
  selector: "app-buyerSelectedPropertyDetail",
  templateUrl: "./buyerSelectedPropertyDetail.component.html",
  styleUrls: ["./buyerSelectedPropertyDetail.component.css"],
})
export class BuyerSelectedPropertyDetailComponent implements OnInit {
  user: any;
  uid: any;
  return: any;
  isLoggedIn: boolean;
  isLoading: boolean = false;
  property: any;
  version = VERSION;
  userData: any;
  matchesBuyer: any;
  isBuyerSelected: boolean = false;
  listingSeller: any;
  sub;
  Lookingpostcode: string;
  Lookingstate: string;
  LookingTown: string;
  norooms: string;
  PropertyCondition: string;
  MaxAmount: string;
  ownership: string;
  LookingStreetname: string;
  matchesSeller: any;
  PropertyType: any;
  features: string;
  userId: string;
  Firstname: string;
  Lasttname: string;
  Email: string;
  DOB: any;
  ChainStatus: string;
  FinancialPosition: string;
  SearchRadius: string;
  Validity: string;
  Condition: string;
  type: string;
  Position: string;
  Aplicablefeatures: string;
  UserId: any;
  LookingAddress: string;
  Lastname: any;
  MinAmount: any;
  matchesStatusPending: any;
  matchesStatusConfirmInterest: any;
  matchStatus: any;
  Maxbathrooms: string;
  Maxrooms: string;
  Maxreception: string;
  overlay: boolean = false;
  title: any;
  unNamed: any;
  datastored: boolean = false;
  express: boolean = true;
  expressInterest: any;
  Match: any;
  propertyId;
  expressed: string;
  notification:notification
  now: Date = new Date();
  constructor(
    private Selected_propertydetail_Service: SelectedpropertydetailService,
    private stateService: StateServiceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private MatchesService: MatchesService,
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private HttpService: HttpService,
    private _location: Location
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uid = this.user.uid;

    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      this.Lookingpostcode = params.get("Lookingpostcode");
      this.Lookingstate = params.get("Lookingstate");
      this.LookingTown = params.get("LookingTown");
      this.norooms = params.get("norooms");
      this.PropertyCondition = params.get("PropertyCondition");
      this.MaxAmount = params.get("MaxAmount");
      this.LookingAddress = params.get("LookingAddress");
      this.ownership = params.get("ownership");
      this.PropertyType = params.get("PropertyType").replace(/\s/g, "");
      this.features = params.get("features");
      this.UserId = params.get("UserId").replace(/\s/g, "");
      this.MinAmount = params.get("MinAmount");
      this.Maxbathrooms = params.get("Maxbathrooms");
      this.Maxrooms = params.get("Maxrooms");
      this.Maxreception = params.get("Maxreception");
      this.propertyId = params.get("propertyId");
      this.expressed = params.get("expressed")
      console.log(this.UserId)

     

    });
  

    this.Selected_propertydetail_Service.getUser(this.UserId).subscribe(
      (dref) => {
        dref.forEach((element) => {
          if (this.UserId == element.data().uid) {
            this.title = element.data().title;
            this.unNamed = element.data().Name;
          }
        });
      }
    );

 
    this.Selected_propertydetail_Service.getExpressed(this.uid).subscribe((status)=>{
      status.forEach(elements =>{
        
    if(this.propertyId.trim()==elements.data().propertyId){
      this.datastored = true;
      this.express = false;
    }
    })
  });
    
  }

  //Create Database BuyerMatches
  submitForm() {
    this.matchesBuyer = {
      Lookingpostcode: this.Lookingpostcode.trim(),
      Lookingstate: this.Lookingstate.trim(),
      LookingTown: this.LookingTown.trim(),
      PropertyCondition: this.PropertyCondition.trim(),
      MaxAmount: this.MaxAmount.trim(),
      LookingAddress: this.LookingAddress.trim(),
      ownership: this.ownership.trim(),
      PropertyType: this.PropertyType.trim(),
      features: this.features.trim(),
      UserId: this.UserId.trim(),
      MinAmount: this.MinAmount.trim(),
      Maxbathrooms: this.Maxbathrooms.trim(),
      Maxrooms: this.Maxrooms.trim(),
      Maxreception: this.Maxreception.trim(),
      matchStatus: "pending",
      Entry:"Buyer"
    };
    this.isBuyerSelected = true;
    this.return = this.Selected_propertydetail_Service.matchesBuyerCreate(
      this.uid,
      this.matchesBuyer
    ).then((data) => {
      if (data == true) {
        this.isBuyerSelected = false;
        this.overlay = false;
      }
    });
    this.matchesSeller = {
     LookingStreetname: this.stateService.listingBuyer.LookingStreetname,
      Lookingpostcode: this.stateService.listingBuyer.Lookingpostcode,
      PropertyType: this.stateService.listingBuyer.PropertyType,
      Conditions: this.stateService.listingBuyer.Conditions,
      ChainStatus: this.stateService.listingBuyer.ChainStatus,
      FinancialPosition: this.stateService.listingBuyer.FinancialPosition,
      SearchRadius: this.stateService.listingBuyer.SearchRadius,
      MinAmount: this.stateService.listingBuyer.MinAmount,
      MaxAmount: this.stateService.listingBuyer.MaxAmount,
      Validity: this.stateService.listingBuyer.Validity,
      Type: this.stateService.listingBuyer.Type,
      Position: this.stateService.listingBuyer.Position,
      UserId: this.stateService.listingBuyer.UserId,
      matchStatus: "confirm_interest",
      Entry:"Buyer"

    };
    
    this.isBuyerSelected = true;
    this.return = this.Selected_propertydetail_Service.matchesSellerCreate(
      this.UserId,
      this.matchesSeller
    ).then((data) => {
      if (data == true) {
        this.isBuyerSelected = false;
        this.datastored = true;
        this.express = false;
        this.createSellerNotification();
      }
    });
    this.isBuyerSelected = true;
   
    this.addToExpressCollection();
  }

  addToExpressCollection() {
    this.return = this.Selected_propertydetail_Service.ExpressInterest(
      this.uid,
      this.propertyId.trim()
    ).then((data) => {
      if (data == true) {
        this.isBuyerSelected = false;
        this.datastored = true;
        this.express = false;
        this.backClicked();
      }
    });
  }

  Overlayopen() {
    this.overlay = true;
  }
  continueClose() {
    this.overlay = false;
  }
  // register() {
  //   this.HttpService.sentEmail(
  //     "http://localhost:3000/sendmail",
  //     this.user
  //   ).subscribe(
  //     (data) => {
  //       let res: any = data;
  //     },
  //     (err) => {
  //       console.log(err);
  //     },
  //     () => {}
  //   );
  // }
  backClicked() {
    this._location.back();
  }
  createSellerNotification()
  {
    this.notification={
      time:this.now,
    viewed:"Confirmed",
    userId:this.uid,
    Type:"Buyer_Confirmed",
    propertyId:this.propertyId.trim()
    }
    this.return = this.Selected_propertydetail_Service
    .createNotification(this.UserId, this.notification)
      .then(data => {
      });
  }
}
