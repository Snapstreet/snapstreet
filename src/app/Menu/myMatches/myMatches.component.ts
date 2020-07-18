import { Component, OnInit } from "@angular/core";
import { MyMatchesService } from "./myMatches.service";
import { StateServiceService } from "./../../state-service.service";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-myMatches",
  templateUrl: "./myMatches.component.html",
  styleUrls: ["./myMatches.component.css"],
})
export class MyMatchesComponent implements OnInit {
  uid: any;
  user: any;
  propertyDetails = [];
  propertyBuyer = [];
  matchedProperties: any;
  property: any;
  UserId: any;
  sub: any;
  Lookingpostcode: string;
  LookingAddress: string;
  norooms: string;
  PropertyCondition: string;
  MinAmount: string;
  buyerProperty :any= [];
  sellerProperty :any = [];
  return: Promise<void>;
  distinctExpressedUid=[];
  expressed: any;
  propertyId: any;
  propertyLength: any;
  sellerLength: any;
  constructor(
    private MatchesService: MyMatchesService,
    private stateService: StateServiceService,
    private _Activatedroute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    if(this.user != null)
    {
    this.uid = this.user.uid;
    }
    
    
    // Fetch details Seller
    this.MatchesService.getMatchesSellerProperties(this.uid).then((res) => {
      res.forEach((element) => {
        this.sellerProperty.push({detail:element.data(),
          propertyId:element.id});

      
          this.propertyLength  = this.sellerProperty.length
      });
    
      if(this.propertyLength>0)
      {
      this.getExpressedListingIds();

      }      
  
    });

    // Fetch details Seller
    this.MatchesService.getMatchesBuyerProperties(this.uid).then((res) => {
      res.forEach((element) => {
       
        this.buyerProperty.push({detail:element.data(),
        propertyId:element.id});
        
        this.sellerLength =this.buyerProperty.length

      });
      if(this.sellerLength>0)
      {
      this.getExpressedListingIds();
      }
    });
    
  }


  getExpressedListingIds() {
    this.MatchesService.ExpressInterest(this.uid).subscribe((ref) => {
      ref.forEach((item) => {
        if (this.distinctExpressedUid.indexOf(item.data().propertyId) === -1) {
          this.distinctExpressedUid.push(item.data().propertyId);
        }
      });
   
    });
  }


  checkExpressForValue(uid) {
    if (this.distinctExpressedUid.includes(uid)) {
      this.expressed =true
      return true;
    } else {
      this.expressed = false
      false;
    }
  }
}