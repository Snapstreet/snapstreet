import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { Location } from "@angular/common";
@Component({
  selector: 'app-listing-property-detail',
  templateUrl: './listing-property-detail.component.html',
  styleUrls: ['./listing-property-detail.component.css']
})
export class ListingPropertyDetailComponent implements OnInit {
  Lookingpostcode: string;
  ChainStatus: string;
  FinancialPosition: string;
  Type: string;
  Position: string;

  MaxAmount: string;
  matchStatus: string;
  sub: any;
  MinAmount: string;

  constructor(   private _Activatedroute: ActivatedRoute,
    private _router: Router,   private _location: Location) { }

  ngOnInit() {
    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      this.Lookingpostcode = params.get("Lookingpostcode");
      this.ChainStatus = params.get("ChainStatus");
      this.FinancialPosition = params.get("FinancialPosition");
      this.Type = params.get("PropertyType");
      this.Position = params.get("Position");

      this.MaxAmount = params.get("MaxAmount")
      this.MinAmount = params.get ("MinAmount")
    });
  }
  
  backClicked() {
    this._location.back();
  }
}
