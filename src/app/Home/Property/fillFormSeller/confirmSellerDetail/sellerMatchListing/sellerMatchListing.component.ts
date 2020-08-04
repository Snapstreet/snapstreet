import { Component, OnInit } from "@angular/core";
import { SellerMatchListingService } from "./sellerMatchListing.service";
import { StateServiceService } from "../../../../../state-service.service";
import { ShortNamePipe } from '../../../../../short-name.pipe';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
@Component({
  selector: "app-sellerMatchListing",
  templateUrl: "./sellerMatchListing.component.html",
  styleUrls: ["./sellerMatchListing.component.css"]
})
export class SellerMatchListingComponent implements OnInit {
  return: any;
  userData: any;
  isLoggedIn: boolean;
  isLoading: boolean = false;
  user: any;
  uid: any;
  sellerpropertyDetails = [];
  sellermatchedProperties = [];
  sellerunmatchedProperties = [];
  distanceInKm;
  listingSeller: any;
  noOfMatches: any;
  noOfUnmatched: any;
  isThanku: boolean = true;
  userName: any;
  name: any;
  match: any;
  users: any;
  Names: any;
  unNamed: any;
  title: any;
  hello: boolean = false;
  sort: any;
  drop: any;
  country: any;
  low: any;
  high: any;
  unMatched: any;
  distinctExpressedUid = [];
  less: any;
  more: any;
  expressed: any;
  removesDataSpace: any;
  removesSellerSpace: any;
  minAmount: any;
  maxAmount: any;
  removePostcodeSpace: any;
  removePostcodeStateSpace: any;
  stateMaxAmount: any;
  sub: any;
  newUser: string;
  New_latitude: string;
  New_longitude: string;
  Max_Amount: string;
  Looking_Town: string;
  Property_Type: any;
  Looking_postcode: string;

  Look_postcode: any;
  Look_latitude: any;
  Look_longitude: any;
  Look_maxAmount: any;
  Look_PropertyType: any;
  Look_Town: any;
  removespace: any;
  listing: any;
  amount: any;
  Look_minamount: any;
  Look_maxamount: any;
  sellerprceMathLogic = [];
  sellersettwo = [];
  sellerunmatchedPriceLogic = [];
  sellerlookTown = [];
  Property_For:any;
  Look_PropertyFor:any;
  Look_state: string;
  Look_rooms: string;
  Look_Propertycondition: any;
  Look_Address: string;
  Look_ownership: string;
  Look_features: string;
  Look_userId: string;
  New_state: string;
  New_rooms: string;
  New_Propertycondition: string;
  New_Address: string;
  New_ownership: string;
  New_features: string;
  New_userId: string;
  New_Maxbathrooms: string;
  New_Maxreception: string;
  Look_Maxbathrooms: string;
  Look_Maxreceptions: string;
  New_Maxrooms:any;
  Look_Maxrooms: number;
  sellerunmatchedPropertiesFirst = [];
  constructor(
    private SellermatchesService: SellerMatchListingService,
    private stateService: StateServiceService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uid = this.user.uid;

    this.sub = this.route.paramMap.subscribe((params) => {
      this.Looking_postcode = params.get("Lookingpostcode").replace(/\s/g, "");
      this.Property_Type = params.get("PropertyType");
      this.Looking_Town = params.get("LookingTown");
      this.Max_Amount = params.get("MaxAmount").replace(/,/g, "");
      this.New_latitude = params.get("latitude");
      this.New_longitude = params.get("longitude");
      this.newUser = params.get("newUser");
      this.Property_For = params.get("PropertyFor");

      //Seller Params
      this.New_state = params.get("Lookingstate");
      this.New_rooms = params.get("Maxrooms");
      this.New_Propertycondition = params.get("PropertyCondition");
      this.New_Address = params.get("LookingAddress");
      this.New_ownership = params.get("ownership");
      this.New_features = params.get("features");
      this.New_userId = params.get("UserId");
      this.New_Maxbathrooms = params.get("Maxbathrooms");
      this.New_Maxreception = params.get("Maxreception");
      this.New_ownership = params.get("ownership");
      this.New_Maxrooms = params.get("Maxrooms");
    });






    if (this.newUser == "false") {
     
      this.Look_postcode = this.Looking_postcode.replace(/\s/g, "") ;
    
      this.Look_PropertyType = this.Property_Type;
      this.Look_Town = this.Looking_Town;
      this.Look_maxAmount = this.Max_Amount;
      var Look_maxAmount = parseInt(this.Look_maxAmount)
      this.Look_latitude = this.New_latitude;
      this.Look_longitude = this.New_longitude;
      this.Look_PropertyFor = this.Property_For;
      this.Look_state = this.New_state;
      this.Look_rooms = this.New_rooms;
      this.Look_Propertycondition = this.New_Propertycondition;
      this.Look_Address = this.New_Address;
      this.Look_ownership = this.New_ownership;
      this.Look_features = this.New_features;
      this.Look_userId = this.New_userId;
      this.Look_Maxbathrooms = this.New_Maxbathrooms;
      this.Look_Maxreceptions = this.New_Maxreception;
      this.Look_ownership = this.New_ownership;
      this.Look_Maxrooms = this.New_Maxrooms;
      console.log(this.Look_Maxrooms)
      
    }
    if (this.newUser == "true") {
      this.Look_postcode = this.stateService.listingSeller.Lookingpostcode.replace(/\s/g, "");
      this.Look_PropertyType = this.stateService.listingSeller.PropertyType;
      this.Look_Town = this.stateService.listingSeller.LookingTown;
      this.Look_maxAmount = this.stateService.listingSeller.MaxAmount.replace(/,/g, "");
      var Look_maxAmount = parseInt(this.Look_maxAmount)
      this.Look_latitude = this.stateService.listingSeller.latitude;
      this.Look_longitude = this.stateService.listingSeller.longitude;
      this.Look_PropertyFor = this.stateService.listingSeller.PropertyFor;
      this.Look_state = this.stateService.listingSeller.Lookingstate;
      this.Look_rooms = this.stateService.listingSeller.Maxrooms
      this.Look_Propertycondition = this.stateService.listingSeller.PropertyCondition;
      this.Look_Address = this.stateService.listingSeller.LookingAddress
      this.Look_ownership = this.stateService.listingSeller.ownership
      this.Look_features = this.stateService.listingSeller.features
      this.Look_userId = this.stateService.listingSeller.UserId;
      this.Look_Maxbathrooms = this.stateService.listingSeller.Maxbathrooms
      this.Look_Maxreceptions = this.stateService.listingSeller.Maxreception;
      this.Look_ownership = this.stateService.listingSeller.ownership;
      this.Look_Maxrooms = this.stateService.listingSeller.Maxrooms
     
    }






    // Fetch details
    this.SellermatchesService.getSellerProperties(this.uid).subscribe((ref) => {
      ref.forEach((Mean) => {
     
  

        //Min-MAx Amount Removed Comas and Formula
        this.maxAmount = this.Look_maxAmount.replace(/,/g, "");
        var maxAmount = parseInt(this.maxAmount)
       
         this.Look_minamount = Mean.data().MinAmount.replace(/,/g, "");
         var Look_minamount = parseInt(this.Look_minamount)
        this.Look_maxamount = Mean.data().MaxAmount.replace(/,/g, "");
        var Look_maxamount = parseInt(this.Look_maxamount)

        this.less = (Look_minamount- (Look_minamount * 10) / 100);
        var less = parseInt(this.less)

        this.more = (Look_maxamount * 1 + (Look_maxamount * 3) / 100 * 1);
        var more = parseInt(this.more)

        //Remove Postcode Spaces
        this.removespace = Mean.data().Lookingpostcode.replace(/\s/g, "")
        this.listing = this.Look_postcode
   
   
      
        
        //- Same postcode only- Matches price criteria (min reduce 3% max +10%)- Same property type
        if (Mean.data().Lookingpostcode.replace(/\s/g, "") == this.Look_postcode &&
          Mean.data().PropertyFor == this.Look_PropertyFor &&
          Mean.data().PropertyType == this.Look_PropertyType &&
          less <= maxAmount  &&
          more >= maxAmount ) {
          this.sellermatchedProperties.push({
            detail: Mean.data(),
            propertyId: Mean.id,
          }); 

        }



         
  


     
        // POSTCODE MATCH - FIRST 5 LETTERS ONLY- Matches price criteria (min reduce 3% max +10%)- Same property type
         if  (Mean.data().Lookingpostcode.replace(/\s/g, "") != this.Look_postcode &&
           this.Look_PropertyFor == Mean.data().PropertyFor  &&
          Mean.data().PropertyType == this.Look_PropertyType &&
          less <= maxAmount  &&
          more >= maxAmount &&
          this.removespace.substring(0, 5) == this.listing.substring(0, 5) &&
          Mean.data().latitude &&
          Mean.data().longitude
        ) {
      

          this.distanceInKm = this.getDistanceFromLatLonInKm(
            this.Look_latitude,
            this.Look_longitude,
            Mean.data().latitude,
            Mean.data().longitude
          );

          this.sellerunmatchedProperties.push({
            detail: Mean.data(),
            propertyId: Mean.id,
            distance: this.distanceInKm * 0.6214,
          });
        }


           // POSTCODE MATCH - FIRST 3 LETTERS ONLY- Matches price criteria (min reduce 3% max +10%)- Same property type
         if (Mean.data().Lookingpostcode.replace(/\s/g, "") != this.Look_postcode &&
           Mean.data().PropertyType == this.Look_PropertyType &&
           Mean.data().PropertyFor == this.Look_PropertyFor &&
           less <= maxAmount  &&
           more >= maxAmount &&
           this.removespace.substring(0, 5) != this.listing.substring(0, 5) &&
           this.removespace.substring(0, 3) == this.listing.substring(0, 3) 
         ) {
           this.sellerunmatchedPropertiesFirst.push({
             detail: Mean.data(),
             propertyId: Mean.id,
           });
         }
 





        
        //- POSTCODE MATCH - FIRST 3 LETTERS ONLY- Matches price criteria (min reduce 3% max +10%)- ALL property types
        if (Mean.data().Lookingpostcode.replace(/\s/g, "") != this.Look_postcode &&
        Mean.data().PropertyType != this.Look_PropertyType &&
        Mean.data().PropertyFor == this.Look_PropertyFor &&
        less <= maxAmount  &&
        more >= maxAmount &&
        this.removespace.substring(0, 5) != this.listing.substring(0, 5) &&
        this.removespace.substring(0, 3) == this.listing.substring(0, 3) &&
          Mean.data().latitude &&
          Mean.data().longitude
        ) {

          this.distanceInKm = this.getDistanceFromLatLonInKm(
            this.Look_latitude,
            this.Look_longitude,
            Mean.data().latitude,
            Mean.data().longitude
          );
          this.sellerunmatchedPriceLogic.push({
            detail: Mean.data(),
            propertyId: Mean.id,
            distance: this.distanceInKm * 0.6214,
          });
        }


         //All other properties - Nationwide
          if (Mean.data().Lookingpostcode.replace(/\s/g, "") != this.Look_postcode &&
         Mean.data().PropertyFor == this.Look_PropertyFor &&
         this.removespace.substring(0, 5) != this.listing.substring(0, 5) &&
         this.removespace.substring(0, 3) != this.listing.substring(0, 3) &&
         Mean.data().latitude &&
         Mean.data().longitude
       ) {
     
         this.distanceInKm = this.getDistanceFromLatLonInKm(
          this.Look_latitude,
           this.Look_longitude,
           Mean.data().latitude,
           Mean.data().longitude
         );
       
         this.sellerlookTown.push({
           detail: Mean.data(),
           propertyId: Mean.id,
           distance: this.distanceInKm * 0.6214,
         });
       }

      })

       this.sellerunmatchedProperties.sort(this.compare);
       this.noOfMatches = this.sellermatchedProperties.length;
       this.noOfUnmatched = this.sellerunmatchedProperties.length;


    });
    this.getExpressedListingIds();
  }

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
      Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  compare(a, b) {
    const distA = a.distance;
    const distB = b.distance;

    let comparison = 0;
    if (distA > distB) {
      comparison = 1;
    } else if (distA < distB) {
      comparison = -1;
    }
    return comparison;
  }
  closeThank() {
    this.isThanku = false
  }
  getShortName(fullName) {
    return fullName.split(' ').map(n => n[0]).join('');
  }
  test(value) {
    if (value == this.sort.low) {
      this.hello = true
    }

  }

  hightoLow() {
    this. sellermatchedProperties.sort(function (a, b) {
      return b.MaxAmount - a.MaxAmount
    })
  }
  lowtohigh() {
    this. sellermatchedProperties.sort(function (a, b) {
      return a.MaxAmount - b.MaxAmount
    })
  }
  roomshightolow() {
    this. sellermatchedProperties.sort(function (a, b) {
      return a.Maxrooms - b.Maxrooms
    })
  }



  //For unmatched
  unmatchedhightoLow() {
    this. sellerunmatchedProperties.sort(function (a, b) {
      return b.detail.MaxAmount - a.detail.MaxAmount
    })
  }
  unmatchedlowtohigh() {
    this. sellerunmatchedProperties.sort(function (a, b) {
      return a.detail.MaxAmount - b.detail.MaxAmount
    })
  }
  unmatchedroomshightolow() {
    this. sellerunmatchedProperties.sort(function (a, b) {
      return a.detail.Maxrooms - b.detail.Maxrooms
    })
  }

  unmatcheddistance() {
    this. sellerunmatchedProperties.sort(function (a, b) {
      return a.distance - b.distance
    })
  }

  getExpressedListingIds() {
    this.SellermatchesService.ExpressInterest(this.uid).subscribe((ref) => {
      ref.forEach((item) => {
        if (this.distinctExpressedUid.indexOf(item.data().propertyId) === -1) {
          this.distinctExpressedUid.push(item.data().propertyId);
        }
      });

      console.log(this.distinctExpressedUid);
    });
  }

  checkExpressForValue(uid) {
    if (this.distinctExpressedUid.includes(uid)) {
      this.expressed = true
      return true;
    } else {
      this.expressed = false
      false;
    }
  }


}
