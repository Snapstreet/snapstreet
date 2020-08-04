import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { notification } from "../../../Model/notification"
import { StateServiceService } from "../../../state-service.service";
import {SellerMatchesService} from "./seller-matches.service"
@Component({
  selector: 'app-seller-matches',
  templateUrl: './seller-matches.component.html',
  styleUrls: ['./seller-matches.component.css']
})
export class SellerMatchesComponent implements OnInit {
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

  Position: string;
  notification: notification;
  now: Date = new Date();
  UserId: string;
  matchesSeller: any;
  sellerProperty= [];
  overLay :boolean = false
  constructor(private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private SelectedMyMatchesService:SellerMatchesService ,
    private stateService: StateServiceService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uid = this.user.uid;
    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      this.Lookingpostcode = params.get("Lookingpostcode");
      this.ChainStatus = params.get("ChainStatus");
      this.Conditions = params.get("Conditions");
    
      this.Position = params.get("Position");
      this.MinAmount = params.get("MinAmount");
      this.MaxAmount = params.get("MaxAmount");
      this.Type = params.get("PropertyType");

      this.matchStatus = params.get("matchStatus");
      console.log( this.matchStatus)
      this.propertyId = params.get("propertyId");
      this.expressed = params.get("expressed");
      this.UserId = params.get("UserId")
      
   
    });
    this.SelectedMyMatchesService.getMatchesSellerProperties(this.UserId).then((res) => {
      res.forEach((element) => {
        this.sellerProperty.push(element.data());
         console.log(element.data())
      });
    
  
    });



  }
  backClicked() {
    this._location.back();
  }
  addToExpressCollection() {
    this.createSellerNotification();
    this.return = this.SelectedMyMatchesService.ExpressInterest(
      this.uid,
      this.propertyId.trim()
    ).then((data) => {
      if (data == true) {
      }
     
    
    });
  }
  createSellerNotification() {
  
    this.notification = {
      time: this.now,
      viewed: "Confirmed",
      userId: this.uid,
      Type: "Seller_Confirmed_my_activity",
      propertyId: this.propertyId.trim()
    }
    this.return = this.SelectedMyMatchesService
      .createNotification(this.UserId, this.notification)
      .then(data => {
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

