import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { SelectedMyMatchesService } from "../my-matches-selected-details/selected-my-matches.service";
import { notification } from "../../../Model/notification"

import { StateServiceService } from "../../../state-service.service"
@Component({
  selector: 'app-buyer-confirmed-selected-matches',
  templateUrl: './buyer-confirmed-selected-matches.component.html',
  styleUrls: ['./buyer-confirmed-selected-matches.component.css']
})
export class BuyerConfirmedSelectedMatchesComponent implements OnInit {
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
    private stateService: StateServiceService) { }

  ngOnInit() {this.user = JSON.parse(localStorage.getItem("user"));
  this.uid = this.user.uid;
  this.sub = this._Activatedroute.paramMap.subscribe((params) => {
    this.Lookingpostcode = params.get("Lookingpostcode");
    this.MaxAmount = params.get("MaxAmount");
   this.ChainStatus = params.get("ChainStatus");
   this.Conditions = params.get("Conditions");
   this.SearchRadius = params.get("SearchRadius");
    this.Position = params.get("Position");
    // this.MinAmount = params.get("MinAmount");
  
     this.Type = params.get("Type");
    // this.matchStatus = params.get("matchStatus");
     this.propertyId = params.get("propertyId");
     this.expressed = params.get("expressed");
     this.UserId = params.get("UserId")

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
    this.backClicked();
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




}
