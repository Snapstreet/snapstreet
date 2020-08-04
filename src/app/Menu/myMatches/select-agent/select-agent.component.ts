import { Component, OnInit } from '@angular/core';
import { SelectAgentService } from './select-agent.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { notification } from "../../../Model/notification";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { SelectedMyMatchesService } from "../my-matches-selected-details/selected-my-matches.service";
import { agentBuyer }  from "../../../Model/agentBuyer";


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
  sellerProperty= [];
  matchesBuyer: any;
  seller_Selected_propertydetail_Service: any;
  isSellerSelected: boolean;
  datastored: boolean;
  express: boolean;
  Amount: any;
  sellerPropertyLookingAddress: any;
  sellerPropertyLookingTown: any;
  sellerPropertyLookingpostcode: any;
  sellerPropertyLookingstate: any;
  sellerPropertyMaxAmount: any;
  sellerPropertyMaxbathrooms: any;
  sellerPropertyMaxreception: any;
  sellerPropertyMaxrooms;
  sellerPropertyPropertyCondition: any;
  sellerPropertyPropertyType: any;
  sellerPropertyUserId: any;
  sellerPropertyfeatures: any;
  sellerPropertyownership: any;
  testagents = [];
  agentBuyer:any;
  ChainStatus: string;
  Conditions: string;

  Type: any;
  agentSeller: any
  
  constructor(public AgentService: SelectAgentService, private _Activatedroute: ActivatedRoute,
    private _location: Location, private _router: Router, private SelectedMyMatchesService: SelectedMyMatchesService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uid = this.user.uid;

    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      this.Lookingpostcode = params.get("Lookingpostcode").trim();
      this.ChainStatus = params.get("ChainStatus");
      this.norooms = params.get("Roomsmax");
      this.PropertyCondition = params.get("PropertyCondition");
      this.Conditions = params.get("Conditions");
 
      this.MinAmount = params.get("MinAmount");
      this.Type  = params.get("Type");
      this.MaxAmount= params.get("MaxAmount");
      this.propertyId = params.get("propertyId");
      this.UserId = params.get("UserId");
   

    });
    this.AgentService.getAgent(this.uid).subscribe((ref) => {
      ref.forEach(elements => {
        this.agents.push(elements.data())
        this.testagents.push(elements.data().uid)
 

       
      })
   
    })

    this.AgentService.getMatchesSellerProperties(this.UserId).then((res) => {
      res.forEach((element) => {
        this.sellerProperty.push(element.data());

   
  if(this.Lookingpostcode == element.data().Lookingpostcode.replace(/\s/g, "") &&  this.Type.replace(/\s/g, "")  == element.data().PropertyType)
  {

     this.sellerPropertyLookingAddress =  element.data().LookingAddress.trim()
     this.sellerPropertyLookingTown = element.data().LookingTown.replace(/\s/g, "")
     this.sellerPropertyLookingpostcode = element.data().Lookingpostcode.replace(/\s/g, "")
     this.sellerPropertyLookingstate = element.data().Lookingstate.replace(/\s/g, "")
     this.sellerPropertyMaxAmount = element.data().MaxAmount.replace(/\s/g, "")
     this.sellerPropertyMaxbathrooms =  element.data().Maxbathrooms.replace(/\s/g, "")
     this.sellerPropertyMaxreception = element.data().Maxreception.replace(/\s/g, "")
     this.sellerPropertyMaxrooms = element.data().Maxrooms
     this.sellerPropertyPropertyCondition = element.data().PropertyCondition.replace(/\s/g, "")
     this.sellerPropertyPropertyType =   element.data().PropertyType
     this.sellerPropertyUserId  = element.data().UserId
     this.sellerPropertyfeatures = element.data().features.replace(/\s/g, "")
     this.sellerPropertyownership  = element.data().ownership.replace(/\s/g, "")
  }
      });


    });
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
   
        this._router.navigate(["/mymatches"]);
      });
  }
  createBuyerEntry(agentuid) {

  //this.agentBuyerEntry(agentuid)
  //this.agentSellerEntry(agentuid)

 console.log(this.sellerPropertyMaxrooms)
    this.matchesBuyer = {
      LookingAddress: this.sellerPropertyLookingAddress,
      LookingTown:  this.sellerPropertyLookingTown,
      Lookingpostcode: this.sellerPropertyLookingpostcode,
      Lookingstate: this.sellerPropertyLookingstate,
      MaxAmount: this.sellerPropertyMaxAmount,
      Maxbathrooms: this.sellerPropertyMaxbathrooms,
      Maxbathroom: this.sellerPropertyMaxbathrooms,
      Maxreception: this.sellerPropertyMaxreception,
      Roomsmax: this.sellerPropertyMaxrooms,
      PropertyCondition: this.sellerPropertyPropertyCondition,
      PropertyType: this.sellerPropertyPropertyType,
      UserId: this.sellerPropertyUserId,
      features: this.sellerPropertyfeatures,
      matchStatus: "confirmed",
      ownership: this.sellerPropertyownership, 
    };
    this._router.navigate(["/mymatches"]);
    this.return = this.AgentService
      .matchesBuyerCreate(this.UserId, this.matchesBuyer)
      .then((data) => {
        if (data == true) {
        }
      });
  }

   agentBuyerEntry(agentuid)
   {
    this.agentBuyer ={
      Lookinpostcode:this.Lookingpostcode,
      ChainStatus:this.ChainStatus,
      Roomsmax:this.norooms,
      PropertyCondition:this.PropertyCondition,
      Conditions:this.Conditions,

      MinAmount:this.MinAmount,
      type:this.Type,
      MaxAmount:this.MaxAmount,      
      UserId :this.UserId,
      uid:agentuid

    };
    this.return = this.AgentService.matchesAgentBuyerCreate(agentuid,this.agentBuyer).then((buyer)=>{
console.log(buyer)

    })
   }
   agentSellerEntry(agentuid)
   {
     console.log(this.sellerPropertyMaxrooms)
    this.agentSeller ={
      LookingAddress: this.sellerPropertyLookingAddress,
      LookingTown:  this.sellerPropertyLookingTown,
      Lookingpostcode: this.sellerPropertyLookingpostcode,
      Lookingstate: this.sellerPropertyLookingstate,
      MaxAmount: this.sellerPropertyMaxAmount,
      Maxbathrooms: this.sellerPropertyMaxbathrooms,
      Maxbathroom: this.sellerPropertyMaxbathrooms,
      Maxreception: this.sellerPropertyMaxreception,
      Roomsmax: this.sellerPropertyMaxrooms,
      PropertyCondition: this.sellerPropertyPropertyCondition,
      PropertyType: this.sellerPropertyPropertyType,
      UserId: this.sellerPropertyUserId,
      features: this.sellerPropertyfeatures,
      ownership: this.sellerPropertyownership, 
     uid:agentuid
    };
    this.return = this.AgentService.matchesAgentSellerCreate(agentuid,this.agentSeller).then((seller)=>{
console.log(seller)

    })
   }
}
