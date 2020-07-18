import { Component, OnInit } from '@angular/core';
import { SelectAgentService } from './select-agent.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { notification } from "../../../Model/notification";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import {SelectedMyMatchesService} from "../my-matches-selected-details/selected-my-matches.service"
@Component({
  selector: 'app-select-agent',
  templateUrl: './select-agent.component.html',
  styleUrls: ['./select-agent.component.css']
})
export class SelectAgentComponent implements OnInit {
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

  constructor(public AgentService: SelectAgentService, private _Activatedroute: ActivatedRoute,
    private _location: Location, private _router: Router, private SelectedMyMatchesService:SelectedMyMatchesService) { }

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
      this.propertyId = params.get("propertyId");
      this.UserId = params.get("userId")
   
    });
    this.AgentService.getAgent(this.uid).subscribe((ref) => {
      ref.forEach(elements => {
        this.agents.push(elements.data())
      })
    })
  }
  Acceptterms() {
    this.accepted = true;
    this.disable = false
  }
  uncheckterms() {
    this.accepted = false;
    this.disable = true
  }
  addToExpressCollection() {
    this.return = this.AgentService.ExpressInterest(
      this.uid,
      this.propertyId.trim()
    ).then((data) => {
      if (data == true) {
        this.createSellerNotification();
        this.createEntry()

      }
    });
  }
  backClicked() {
    this._location.back();
  }
  createSellerNotification() {
console.log(this.UserId)
    this.notification = {
      time: this.now,
      viewed: "Confirmed",
      userId: this.uid,
      Type: "Agent_Matches_Confirmed",
      propertyId: this.propertyId.trim()
    }
    this.return = this.AgentService
      .createNotification(this.UserId, this.notification)
      .then(data => {
this.createEntry()
this._router.navigate(["/mymatches"]);
      });
  }
  createEntry() {
    this.matchesSeller = {
      Lookingpostcode: this.Lookingpostcode,
      Lookingstate: this.Lookingstate,
      LookingAddress: this.LookingAddress,
      Roomsmax: this.norooms,
      PropertyCondition: this.PropertyCondition,
      MaxAmount: this.MaxAmount,
      PropertyType: this.PropertyType,
      ownership: this.ownership,
      features: this.features,
      UserId: this.UserId,
      matchStatu: "confirm_interest",
    };
    this.return = this.AgentService.matchesSellerCreate(this.UserId, this.matchesSeller).then((data) => {

    });
  }
}
