import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
@Component({
  selector: "app-my-matches-to-sell-selected-detail",
  templateUrl: "./my-matches-to-sell-selected-detail.component.html",
  styleUrls: ["./my-matches-to-sell-selected-detail.component.css"],
})
export class MyMatchesToSellSelectedDetailComponent implements OnInit {
  sub: any;
  Lookingpostcode: string;
  ChainStatus;
  FinancialPosition;
  Type;
  Position;
  SearchRadius;
  PriceRange;
  matchStatus: string;
  MaxAmount: any;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) {}

  ngOnInit() {
    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      this.Lookingpostcode = params.get("Lookingpostcode");
      // this.ChainStatus = params.get("ChainStatus");
      this.FinancialPosition = params.get("FinancialPosition");
      this.Type = params.get("PropertyType");
      this.Position = params.get("Position");
      this.matchStatus = params.get("matchStatus");
 

      
    });
  }
  backClicked() {
    this._location.back();
  }
}
