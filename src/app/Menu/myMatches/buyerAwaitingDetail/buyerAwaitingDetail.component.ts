import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {SelectedMyMatchesService} from  "../my-matches-selected-details/selected-my-matches.service";
import { Location } from "@angular/common";
@Component({
  selector: 'app-buyerAwaitingDetail',
  templateUrl: './buyerAwaitingDetail.component.html',
  styleUrls: ['./buyerAwaitingDetail.component.css']
})
export class BuyerAwaitingDetailComponent implements OnInit {
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

  constructor( private _Activatedroute: ActivatedRoute,
    private _router: Router,private SelectedMyMatchesService : SelectedMyMatchesService,
    private _location: Location) { }

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
      this.expressed = params.get ("expressed")
  
    });
  }
  backClicked() {
    this._location.back();
  }
}
