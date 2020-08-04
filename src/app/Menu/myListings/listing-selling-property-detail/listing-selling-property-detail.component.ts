import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { Location } from "@angular/common";

@Component({
  selector: 'app-listing-selling-property-detail',
  templateUrl: './listing-selling-property-detail.component.html',
  styleUrls: ['./listing-selling-property-detail.component.css']
})
export class ListingSellingPropertyDetailComponent implements OnInit {
  Lookingpostcode: string;
  ChainStatus: string;
  FinancialPosition: string;
  Type: string;
  Position: string;

  MaxAmount: string;
  matchStatus: string;
  sub: any;
  MinAmount: string;
  Maxrooms: string;
  Maxreception: any;
  PropertyCondition: string;
  Maxbathrooms: string;

  constructor(private _Activatedroute: ActivatedRoute,
    private _router: Router,   private _location: Location) { }

  ngOnInit() {
    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      this.Lookingpostcode = params.get("Lookingpostcode");
      this.Type = params.get("PropertyType");
      this.MaxAmount = params.get("MaxAmount");
      this.Maxrooms = params.get("Maxrooms");
      this.Maxreception = params.get("Maxreception")
      this.PropertyCondition = params.get ("PropertyCondition")
      this.Maxbathrooms = params.get("Maxbathrooms")
    });
  }
  backClicked() {
    this._location.back();
  }
}
