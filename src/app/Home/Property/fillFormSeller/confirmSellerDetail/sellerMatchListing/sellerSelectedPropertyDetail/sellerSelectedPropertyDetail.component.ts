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
import { notification } from "../../../../../../Model/notification"
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
  overlay: boolean = false;
  title: any;
  unNamed: any;
  propertyId: string;
  datastored: boolean = false;
  express: boolean = true;
  propertyIdCheck: any;
  expressed: any;
  notification: notification;
  now: Date = new Date();
  Look_State: string;
  Look_rooms: string;
  Look_Propertycondition: string;
  Look_Address: string;
  Look_ownership: string;
  Look_features: string;
  Look_userId: string;
  Look_postcode: any;
  Look_PropertyType: string;
  Look_maxAmount: string;
  Look_Town: string;
  MinAmount: string;
  Look_Maxreceptions: string;
  Look_Maxbathrooms: string;
  Look_Maxrooms: string;
  PropertyFor: string;
  Look_Propertyfor: string;
  constructor(
    private seller_Selected_propertydetail_Service: SellerSelectedPropertyDetailService,
    private stateService: StateServiceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private SellerMatchListingService: SellerMatchListingService,
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uid = this.user.uid;




    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      this.PriceRange = params.get("MaxAmount");
      this.MinAmount = params.get("MinAmount");
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
   
    
       this.ChainStatus = params.get("ChainStatus");
       console.log(this.ChainStatus)
      // this.FinancialPosition = params.get("FinancialPosition");

      // this.PriceRange = params.get("PriceRange");
      // this.Validity = params.get("Validity");
      // this.Type = params.get("Type");
      // this.Position = params.get("Position");
      this.propertyId = params.get("propertyId");
      this.expressed = params.get("expressed");
      this.PropertyFor = params.get("PropertyFor")

      //SelectedSeller Params
      this.Look_State = params.get("Look_state");
      this.Look_rooms = params.get("Look_rooms");
      this.Look_Propertycondition = params.get("Look_Propertycondition");
      this.Look_Address = params.get("Look_Address");
      this.Look_ownership = params.get("Look_ownership");
      this.Look_features = params.get("Look_features");
      this.Look_userId = params.get("Look_userId");
      this.Look_postcode = params.get("Look_postcode");
      this.Look_PropertyType = params.get("Look_PropertyType");
      this.Look_maxAmount = params.get("Look_maxAmount");
      this.Look_Town = params.get("Look_Town");
      this.Look_Address = params.get("Look_Address");
      this.Look_Maxbathrooms = params.get("Look_Maxbathrooms");
      
      this.Look_Maxreceptions  = params.get("Look_Maxreceptions");
      this.Look_ownership  = params.get("Look_ownership");
  this.Look_Maxrooms  = params.get("Look_Maxrooms")
  this.Look_Propertyfor = params.get("Look_PropertyFor")
      
      console.log(this.Look_Maxrooms)
    });


    this.seller_Selected_propertydetail_Service.getUser(this.UserId).subscribe((dref) => {
      dref.forEach((element) => {
        if (this.UserId == element.data().uid) {
          this.title = element.data().title
          this.unNamed = element.data().Name
        }
      });
    });
    this.seller_Selected_propertydetail_Service.getExpressed(this.uid).subscribe((status) => {
      status.forEach(elements => {
        if (this.propertyId.trim() == elements.data().propertyId) {
          this.datastored = true;
          this.express = false;
        }
      })

    });

  }

  //Create Database match Seller
  submitForm() {
    this.matchesSeller = {
      MinAmount: this.MinAmount,
      MaxAmount: this.PriceRange,
      Lookingpostcode: this.Lookingpostcode,
      LookingStreetname: this.LookingStreetname,
      Position: this.Position,
      PropertyType: this.PropertyType,
      Roomsmax: this.Roomsmax,
      Ownership: this.ownership,
      Conditions: this.Conditions,
      Maxbathroom: this.Maxbathroom,
      Maxreception: this.Maxreception,
      features: this.features,
      FinancialPosition: this.FinancialPosition,
      UserId: this.UserId,
      ChainStatus: this.ChainStatus,
      PropertyFor:this.PropertyFor,
  
      matchStatus: "pending",
      Entry: "Seller"


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
      Lookingpostcode: this.Look_postcode,
      Lookingstate: this.Look_State,
      LookingTown: this.Look_Town,
      PropertyCondition: this.Look_Propertycondition,
      MaxAmount: this.Look_maxAmount,
      LookingAddress: this.Look_Address,
      ownership: this.Look_ownership,
      PropertyType: this.Look_PropertyType,
      features: this.Look_features,
      UserId: this.Look_userId,
      Maxbathrooms:this.Look_Maxbathrooms,
      Maxreception:this.Look_Maxreceptions,
      Maxrooms:this.Look_Maxrooms,
      Roomsmax:this.Look_Maxrooms,
      PropertyFor:this.Look_Propertyfor,
      matchStatus: "confirm_interest",
      Entry: "Seller"
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

  Overlayopen() {
    this.overlay = true
  }
  continueClose() {
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
        this.isSellerSelected = false;
        this.datastored = true;
        this.express = false;
        this.backClicked();
      }
    });
  }
  createSellerNotification() {
    this.notification = {
      time: this.now,
      viewed: "Confirmed",
      userId: this.uid,
      Type: "Seller_Confirmed_my_nestimate",
      propertyId: this.propertyId.trim()
    }
    this.return = this.seller_Selected_propertydetail_Service
      .createNotification(this.UserId, this.notification)
      .then(data => {
      });
  }
}
