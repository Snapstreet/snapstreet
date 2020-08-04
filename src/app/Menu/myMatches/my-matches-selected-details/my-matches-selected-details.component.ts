import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {SelectedMyMatchesService} from  "./selected-my-matches.service";
import { Location } from "@angular/common";
import {notification} from "../../../Model/notification"
@Component({
  selector: 'app-my-matches-selected-details',
  templateUrl: './my-matches-selected-details.component.html',
  styleUrls: ['./my-matches-selected-details.component.css']
})
export class MyMatchesSelectedDetailsComponent implements OnInit {
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
  constructor(
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private SelectedMyMatchesService : SelectedMyMatchesService,
    private _location: Location
  ) { 
    
  }

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
  }
  addToExpressCollection() {
    this.return = this.SelectedMyMatchesService.ExpressInterest(
      this.uid,
      this.propertyId.trim()
    ).then((data) => {
      if (data == true) {
        this.createSellerNotification()
        this._router.navigate(["/selectAgent/" + this.Lookingpostcode + "/" + this.Lookingstate + "/" + this.LookingAddress + "/" + this.norooms + "/" + this.PropertyCondition + "/" + this.MaxAmount + "/" +  this.PropertyType + "/" + this.ownership + "/" + this.features + "/" + this.propertyId + "/" + this.userId ]);
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
    Type:"Seller_Matches_Confirmed",
    propertyId:this.propertyId
    }
    this.return = this.SelectedMyMatchesService
    .createNotification(this.userId, this.notification)
      .then(data => {
      });
  }

}
