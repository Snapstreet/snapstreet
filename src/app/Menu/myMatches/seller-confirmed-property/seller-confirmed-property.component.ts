import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { Location } from "@angular/common";
import {notification} from "../../../Model/notification";
import {SellerConfirmedPropertyService} from "./seller-confirmed-property.service"
@Component({
  selector: 'app-seller-confirmed-property',
  templateUrl: './seller-confirmed-property.component.html',
  styleUrls: ['./seller-confirmed-property.component.css']
})
export class SellerConfirmedPropertyComponent implements OnInit {
  color = 'accent';
  checked = true;
  disabled = false;
  accepted: boolean = false
  user: any;
  uid: any;
  disable: boolean = true
  agents = [];
  notification: notification;
  now: Date = new Date();
  return: any
  propertyId: any;
  sub: any;
  UserId: any;
  matchesSeller: any;
  Lookingpostcode: any;
  Lookingstate: any;
  LookingAddress: any;
  norooms: any;
  PropertyCondition: any;
  MinAmount: any;
  PropertyType: any;
  ownership: any;
  features: any;
  matchStatus: any;
  MaxAmount: any;
  expressed: any;
  userId: any;
  matchStatu: string;
  constructor(
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private SellerConfirmedPropertyService:SellerConfirmedPropertyService
  ) { 
    
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uid = this.user.uid;
    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      this.LookingAddress = params.get("LookingAddress");
      this.Lookingpostcode = params.get("Lookingpostcode");
      this.Lookingstate = params.get("Lookingstate");
      this.MaxAmount = params.get("MaxAmount");
      this.PropertyCondition = params.get("PropertyCondition");
      this.PropertyType = params.get("PropertyType");
      this.UserId = params.get("UserId")
      this.matchStatu = params.get("matchStatu")
      this.ownership = params.get("ownership");
      this.propertyId = params.get("propertyId");
      this.expressed = params.get("expressed")

   
    });
  }
  
  backClicked() {
    this._location.back();
  }
  
  addToExpressCollection() {
    this.return = this.SellerConfirmedPropertyService.ExpressInterest(
      this.uid,
      this.propertyId.trim()
    ).then((data) => {
      if (data == true) {
        this._router.navigate(["/mymatches"]);
      }
    });
  }
}
