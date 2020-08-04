import { Component, OnInit } from '@angular/core';
import {SelecteddetailareaService } from "./selecteddetailarea.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
@Component({
  selector: 'app-selecteddetailarea',
  templateUrl: './selecteddetailarea.component.html',
  styleUrls: ['./selecteddetailarea.component.css']
})
export class SelecteddetailareaComponent implements OnInit {
  sub: any;
  Minamount: string;
  MaxAmount: string;
  ChainStatus: string;
  Conditions: string;
  Lookinpostcode: string;


  constructor(public SelecteddetailareaService:SelecteddetailareaService,private route: ActivatedRoute,private _location: Location) { }

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe((params) => {
     
      this.Minamount = params.get("MinAmount");
      this.MaxAmount  = params.get("MaxAmount");
      this.ChainStatus = params.get("ChainStatus");
      this.Conditions  = params.get("Conditions");
      this.Lookinpostcode = params.get("Lookinpostcode");

    });
  }
  backClicked() {
    this._location.back();
  }
}
