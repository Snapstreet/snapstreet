import { Component, OnInit } from '@angular/core';
import {MatchesBuyerService} from "./matches-buyer.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { notification } from "../../../Model/notification"

@Component({
  selector: 'app-matches-buyer',
  templateUrl: './matches-buyer.component.html',
  styleUrls: ['./matches-buyer.component.css']
})
export class MatchesBuyerComponent implements OnInit {
  Lookingpostcode: any;
  Lookingstate: any;
  LookingAddress: any;
  norooms: any;
  PropertyCondition: any;
  MinAmount: any;
  sub: any;
  PropertyType: string;
  ownership: string;
  features: string;
  matchStatus:any;
  MaxAmount: string;
  propertyId: any;
  return: any;
  uid: any;
  user: any;
  expressed: string;
  userId: string;
  notification:notification;
  now: Date = new Date();
  sellerProperty: any;
  sellerPropertys = [];
  matchesSeller: any;
  overLay:boolean = false
  constructor(private MatchesBuyerService:MatchesBuyerService,
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private _location: Location,
 
    
    ) { }

  ngOnInit() {
    
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uid = this.user.uid;
    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      this.Lookingpostcode = params.get("Lookingpostcode");
      this.Lookingstate = params.get("Lookingstate");
      this.LookingAddress = params.get("LookingAddress");
      this.norooms = params.get("Roomsmax");
      this.PropertyCondition = params.get("PropertyCondition");
      this.MaxAmount = params.get("MaxAmount");    
      this.PropertyType = params.get("PropertyType");
      this.ownership = params.get("ownership");
      this.features = params.get("features");
      this.matchStatus = params.get("matchStatus");
      this.propertyId = params.get("propertyId");
      this.expressed = params.get ("expressed");
      this.userId = params.get("UserId")
      console.log(this.userId)
    });

    
    this.MatchesBuyerService.getMatchesSellerProperties(this.userId).then((res) => {
      res.forEach((element) => {
        console.log(element.data())
        this.sellerProperty = (element.data());
      });
    });
   
     
  }
  addToExpressCollection() {
    this.return = this.MatchesBuyerService.ExpressInterest(
      this.uid,
      this.propertyId.trim()
    ).then((data) => {
      if (data == true) {
        this.createSellerNotification();
        this.createOther()
        this.backClicked();
      }
    });
  }
  backClicked() {
    this._location.back();
  }
  createSellerNotification()
  {
    this.notification={
      time:this.now,
    viewed:"Confirmed",
    userId:this.uid,
    Type:"Buyer_Confirmed_my_activity",
    propertyId:this.propertyId
    }
    this.return = this.MatchesBuyerService
    .createNotification(this.userId, this.notification)
      .then(data => {
      });
  }
  createOther()
  {
    this.matchesSeller = {
    
Conditions: this.sellerProperty.Conditions,
FinancialPosition: this.sellerProperty.FinancialPosition,
LookingStreetname: this.sellerProperty.LookingStreetname,           
Lookingpostcode: this.sellerProperty.Lookingpostcode,              
MaxAmount: this.sellerProperty.MaxAmount,  
Maxbathroom: this.sellerProperty.Maxbathroom,
Maxreception: this.sellerProperty.Maxreception,
MinAmount: this.sellerProperty.MinAmount,
Ownership: this.sellerProperty.Ownership,
Position: this.sellerProperty.Position,
PropertyType: this.sellerProperty.PropertyType,
Roomsmax: this.sellerProperty.Roomsmax,
UserId: this.sellerProperty.UserId,
features: this.sellerProperty.features,          
matchStatus: "confirm_interest"
  
    };
    this.return = this.MatchesBuyerService
      .matchesBuyerCreate(this.userId, this.matchesSeller)
      .then((data) => {
        if (data == true) {
        }
      });
  }

  backOverlay()
  {
    this.overLay = false
  }
  connfirmOverLay()
  {
    this.overLay = true
  }
}
