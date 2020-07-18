import { Component, OnInit } from "@angular/core";
import { SellerSelectedPropertyDetailService } from "./sellerSelectedPropertyDetail.service";
import { StateServiceService } from "../../../../../.././state-service.service";
import { SellerMatchListingService } from "../sellerMatchListing.service";
import { SelectedPropertyDialogComponent } from "../../../../../.././Misc/selectedPropertyDialog/selectedPropertyDialog.component";
import {
  VERSION,
  MatDialogRef,
  MatDialog,
  MatSnackBar,
  MAT_DIALOG_DATA,
} from "@angular/material";
import { matchesSeller } from "../../../../../../Model/matchesSeller";
import { matchesBuyer } from "../../../../../../Model/matchesBuyer";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import {notification} from "../../../../../../Model/notification"
@Component({
  selector: "app-Propertydetails",
  templateUrl: "./sellerSelectedPropertyDetail.component.html",
  styleUrls: ["./sellerSelectedPropertyDetail.component.css"],
})
export class SellerSelectedPropertyComponent implements OnInit {
  user: any;
  uid: any;
  return: any;
  isLoggedIn: boolean;
  isLoading: boolean = false;
  property: any;
  version = VERSION;
  userData: any;
  matchesSeller: any;
  matchesBuyer: any;
  isSellerSelected: boolean = false;
  listingSeller: any;
  Buyerproperty: any;
  sub: any;
  LookingStreetname: string;
  Lookingpostcode: string;
  PropertyType: string;
  Conditions: string;
  ChainStatus: string;
  sellerproperty: any;
  sellerProperty: any;
  Firstname: string;
  Lastname: string;
  Email: string;
  DOB: any;
  FinancialPosition: string;
  SearchRadius: string;
  PriceRange: string;
  Validity: string;
  Type: string;
  Position: string;
  UserId: string;
  norooms: string;
  matchStatus: any;
  Roomsmax: string;
  ownership: string;
  Maxbathroom: string;
  Maxreception: string;
  features: string;
  overlay:boolean= false;
  title: any;
  unNamed: any;
  propertyId: string;
  datastored: boolean = false;
  express: boolean = true;
  propertyIdCheck: any;
  expressed: any;
  notification:notification;
  now: Date = new Date();
  constructor(
    private seller_Selected_propertydetail_Service: SellerSelectedPropertyDetailService,
    private stateService: StateServiceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private SellerMatchListingService: SellerMatchListingService,
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uid = this.user.uid;

    


    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      this.PriceRange = params.get("MaxAmount");
      this.Lookingpostcode = params.get("Lookingpostcode");
      this.LookingStreetname = params.get("LookingStreetname");
      this.Position = params.get("Position");
      this.PropertyType = params.get("PropertyType");
      this.Roomsmax = params.get("Roomsmax");
      this.ownership = params.get("Ownership");
      this.Conditions = params.get("Conditions");
      this.Maxbathroom = params.get("Maxbathroom");
      this.Maxreception = params.get("Maxreception");
      this.features = params.get("features");
      this.UserId = params.get("UserId").replace(/\s/g, "");
      this.FinancialPosition = params.get("FinancialPosition");
      //   this.ChainStatus = params.get("ChainStatus");
      // this.FinancialPosition = params.get("FinancialPosition");
      // this.SearchRadius = params.get("SearchRadius");
      // this.PriceRange = params.get("PriceRange");
      // this.Validity = params.get("Validity");
      // this.Type = params.get("Type");
      // this.Position = params.get("Position");
      this.propertyId = params.get("propertyId");
      this.expressed = params.get("expressed")
    });

   
    this.seller_Selected_propertydetail_Service.getUser(this.UserId).subscribe((dref) => {
        dref.forEach((element) => {
          if (this.UserId==element.data().uid) {
            this.title = element.data().title
            this.unNamed = element.data().Name
          }
        });
      });
      this.seller_Selected_propertydetail_Service.getExpressed(this.uid).subscribe((status)=>{
        status.forEach(elements =>{
      if(this.propertyId.trim()==elements.data().propertyId){
        this.datastored = true;
        this.express = false;
      }
      })
    
    });

  }

  //Create Database match Seller
  submitForm() {
    this.matchesSeller = {
      PriceRange: this.PriceRange,
      Lookingpostcode: this.Lookingpostcode,
      LookingStreetname: this.LookingStreetname ,
      Position:this.Position,
      PropertyType:this.PropertyType,
      Roomsmax:this.Roomsmax,
      Ownership:this.ownership,
      Conditions:this.Conditions,
     Maxbathroom:this.Maxbathroom,
     Maxreception:this.Maxreception ,
     features:this.features,
     FinancialPosition: this.FinancialPosition,
     UserId: this.UserId,
     matchStatus: "pending",
     Entry:"Seller"
   
   
    };
    console.log(this.UserId);
    this.isSellerSelected = true;
    this.return = this.seller_Selected_propertydetail_Service
      .matchesSellerCreate(this.uid, this.matchesSeller)
      .then((data) => {
        if (data == true) {
          this.isSellerSelected = false;
          this.overlay = false
        }
      });
    this.matchesBuyer = {
      Lookingpostcode: this.stateService.listingSeller.Lookingpostcode,
      Lookingstate: this.stateService.listingSeller.Lookingstate,
      LookingTown: this.stateService.listingSeller.LookingTown,
      Roomsmax: this.stateService.listingSeller.Maxrooms,
      PropertyCondition: this.stateService.listingSeller.PropertyCondition,
      MaxAmount: this.stateService.listingSeller.MaxAmount,
      LookingAddress: this.stateService.listingSeller.LookingAddress,
      ownership: this.stateService.listingSeller.ownership,
      PropertyType: this.stateService.listingSeller.PropertyType,
      features: this.stateService.listingSeller.features,
      UserId: this.stateService.listingSeller.UserId,
      matchStatus: "confirm_interest",
      Entry:"Seller"
    };

    console.log(this.UserId);
    this.isSellerSelected = true;
    this.return = this.seller_Selected_propertydetail_Service
      .matchesBuyerCreate(this.UserId, this.matchesBuyer)
      .then((data) => {
        if (data == true) {
          this.isSellerSelected = false;
          this.datastored = true;
          this.express = false;
          this.createSellerNotification()
        }
      });
      this.isSellerSelected = true;
      this.addToExpressCollection();
  
  }

  Overlayopen()
  {
    this.overlay = true
  }
  continueClose()
  {
    this.overlay = false
  }
  backClicked() {
    this._location.back();
  }
  addToExpressCollection() {
    this.return = this.seller_Selected_propertydetail_Service.ExpressInterest(
      this.uid,
      this.propertyId.trim()
    ).then((data) => {
      if (data == true) {
        this.isSellerSelected =false;
        this.datastored = true;
        this.express = false;
        this.backClicked();
      }
    });
  }
  createSellerNotification()
  {
    this.notification={
      time:this.now,
    viewed:"Confirmed",
    userId:this.uid,
    Type:"Seller_Confirmed",
    propertyId:this.propertyId.trim()
    }
    this.return = this.seller_Selected_propertydetail_Service
    .createNotification(this.UserId, this.notification)
      .then(data => {
      });
  }
}
