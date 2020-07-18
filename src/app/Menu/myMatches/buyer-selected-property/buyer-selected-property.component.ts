import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { SelectedMyMatchesService } from "../my-matches-selected-details/selected-my-matches.service";
import { notification } from "../../../Model/notification"
import { BuyerSelectedPropertyService } from "./buyer-selected-property.service";
import { StateServiceService } from "../../../state-service.service"
@Component({
  selector: 'app-buyer-selected-property',
  templateUrl: './buyer-selected-property.component.html',
  styleUrls: ['./buyer-selected-property.component.css']
})
export class BuyerSelectedPropertyComponent implements OnInit {
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
  matchStatus: any;
  MaxAmount: string;
  propertyId: any;
  return: any;
  uid: any;
  user: any;
  expressed: string;
  Type: string;
  ChainStatus: string;
  Conditions: string;
  SearchRadius: string;
  Position: string;
  notification: notification;
  now: Date = new Date();
  UserId: string;
  matchesSeller: any;
  constructor(private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private SelectedMyMatchesService: SelectedMyMatchesService,
    private BuyerSelectedPropertyService: BuyerSelectedPropertyService,
    private stateService: StateServiceService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uid = this.user.uid;
    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      this.Lookingpostcode = params.get("Lookingpostcode");
      this.ChainStatus = params.get("ChainStatus");
      this.Conditions = params.get("Conditions");
      this.SearchRadius = params.get("SearchRadius");
      this.Position = params.get("Position");
      this.MinAmount = params.get("MinAmount");
      this.MaxAmount = params.get("MaxAmount");
      this.Type = params.get("PropertyType");
      this.matchStatus = params.get("matchStatus");
      this.propertyId = params.get("propertyId");
      this.expressed = params.get("expressed");
      this.UserId = params.get("UserId")
      console.log(this.UserId)
    });
  }
  backClicked() {
    this._location.back();
  }
  addToExpressCollection() {
    this.return = this.SelectedMyMatchesService.ExpressInterest(
      this.uid,
      this.propertyId.trim()
    ).then((data) => {
      if (data == true) {
      }
      this.createSellerNotification();
      this.createEntry()
      this._router.navigate(["/selectAgent/" + this.Lookingpostcode + "/" + this.Lookingstate + "/" + this.LookingAddress + "/" + this.norooms + "/" + this.PropertyCondition + "/" + this.MaxAmount + "/" +  this.PropertyType + "/" + this.ownership + "/" + this.features + "/" + this.propertyId + "/" + this.UserId ]);
    });
  }
  createSellerNotification() {
  
    this.notification = {
      time: this.now,
      viewed: "Confirmed",
      userId: this.uid,
      Type: "Buyer_Matches_Confirmed",
      propertyId: this.propertyId.trim()
    }
    this.return = this.SelectedMyMatchesService
      .createNotification(this.UserId, this.notification)
      .then(data => {
      });
  }

  createEntry() {
    this.matchesSeller = {
      Lookingpostcode:this.Lookingpostcode.trim(),
      ChainStatus:this.ChainStatus.trim(),
      Conditions:this.Conditions.trim(),
      SearchRadius:this.SearchRadius.trim(),
      Position:this.Position.trim(),
      MinAmount:this.MinAmount.trim(),
      MaxAmount:this.MaxAmount.trim(),
      Type: this.Type.trim(),
      UserId:this.UserId.trim(),
      matchStatuss:"confirm_interest",
      Entry: "Seller"
    };
    this.return = this.BuyerSelectedPropertyService.matchesSellerCreate(this.UserId,this.matchesSeller).then((data) => {
    
    });
  }

}
