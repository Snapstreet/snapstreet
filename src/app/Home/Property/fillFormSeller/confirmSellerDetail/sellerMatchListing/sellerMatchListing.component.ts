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
  propertyDetails = [];
  matchedProperties = [];
  unmatchedProperties = [];
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
  Property_Type: string;
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
  prceMathLogic = [];
  settwo = [];
  unmatchedPriceLogic = [];
  lookTown = [];
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
    });

    if (this.newUser == "false") {
      this.Look_postcode = this.Looking_postcode;
      this.Look_PropertyType = this.Property_Type;
      this.Look_Town = this.Looking_Town;
      this.Look_maxAmount = this.Max_Amount;
      this.Look_latitude = this.New_latitude;
      this.Look_longitude = this.New_longitude;
      console.log(this.Look_postcode + " " + this.Look_PropertyType + " " + this.Look_Town + " " + this.Look_maxAmount + " " + this.Look_latitude + " " + this.Look_longitude)
    }
    if (this.newUser == "true") {
      this.Look_postcode = this.stateService.listingSeller.Lookingpostcode.replace(/\s/g, "");
      this.Look_PropertyType = this.stateService.listingSeller.PropertyType;
      this.Look_Town = this.stateService.listingSeller.LookingTown;
      this.Look_maxAmount = this.stateService.listingSeller.MaxAmount.replace(/,/g, "");
      this.Look_latitude = this.stateService.listingSeller.latitude;
      this.Look_longitude = this.stateService.listingSeller.longitude;
      console.log(this.Look_postcode + " " + this.Look_PropertyType + " " + this.Look_Town + " " + this.Look_maxAmount + " " + this.Look_latitude + " " + this.Look_longitude)
    }






    // Fetch details
    this.SellermatchesService.getSellerProperties(this.uid).subscribe((ref) => {
      ref.forEach((Mean) => {
     
  

        //Min-MAx Amount Removed Comas and Formula
        this.maxAmount = this.Look_maxAmount.replace(/,/g, "");
         this.less = (this.maxAmount - (this.maxAmount * 3) / 100);
         this.more = (this.maxAmount * 1 + (this.maxAmount * 10) / 100 * 1);
         this.Look_minamount = Mean.data().MinAmount.replace(/,/g, "");
        this.Look_maxamount = Mean.data().MaxAmount.replace(/,/g, "");
        //Remove Postcode Spaces
  console.log(Mean.data().Lookingpostcode)
        
      
        
        //Result Set 1 Matches
        if (Mean.data().Lookingpostcode.replace(/\s/g, "") == this.Look_postcode &&
          Mean.data().PropertyType == this.Look_PropertyType &&
          this.maxAmount >= this.Look_minamount &&
          this.maxAmount <= this.Look_maxamount) {

          this.matchedProperties.push({
            detail: Mean.data(),
            propertyId: Mean.id,
          }); 
          console.log("Result Set 1")
        }


           //Result Set 1 Matches
           else if (Mean.data().Lookingpostcode.replace(/\s/g, "") == this.Look_postcode &&
           this.maxAmount != this.Look_minamount &&
           this.maxAmount != this.Look_maxamount &&
           this.maxAmount < this.Look_minamount &&
           this.maxAmount < this.Look_maxamount &&
           Mean.data().PropertyType == this.Look_PropertyType &&
           this.more >= this.Look_minamount
         ) {
 
           this.prceMathLogic.push({
             detail: Mean.data(),
             propertyId: Mean.id,
           });
           console.log("Result Set 1/2")
         }


     
        //Result Set 2 Matches
        

        else if (Mean.data().Lookingpostcode.replace(/\s/g, "") != this.Look_postcode &&
          Mean.data().PropertyType == this.Look_PropertyType &&
          this.maxAmount >= this.Look_minamount &&
          this.maxAmount <= this.Look_maxamount &&
          this.removespace.substring(0, 3) == this.listing.substring(0, 3))
           {
          this.settwo.push({
            detail: Mean.data(),
            propertyId: Mean.id,
          });
          console.log("result Set 2 Matches")
        }



    
        //No Matching Result Set 1
        else if (Mean.data().Lookingpostcode != this.Look_postcode &&
          Mean.data().PropertyType == this.Look_PropertyType &&
          this.more <= this.Look_minamount &&
          Mean.data().latitude &&
          Mean.data().longitude
        ) {

          this.distanceInKm = this.getDistanceFromLatLonInKm(
            this.New_latitude,
            this.Look_longitude,
            Mean.data().latitude,
            Mean.data().longitude
          );
          this.unmatchedProperties.push({
            detail: Mean.data(),
            propertyId: Mean.id,
            distance: this.distanceInKm,
          });
          console.log("Result Set No Matches 1")
        }
        
        //More tha Maxamount No Matching Result Set 1
        else if (Mean.data().Lookingpostcode.replace(/\s/g, "") != this.Look_postcode &&
          Mean.data().PropertyType == this.Look_PropertyType &&
          this.less >= this.Look_maxamount &&
          Mean.data().latitude &&
          Mean.data().longitude
        ) {

          this.distanceInKm = this.getDistanceFromLatLonInKm(
            this.New_latitude,
            this.Look_longitude,
            Mean.data().latitude,
            Mean.data().longitude
          );
          this.unmatchedPriceLogic.push({
            detail: Mean.data(),
            propertyId: Mean.id,
            distance: this.distanceInKm,
          });
          console.log("result Set Maxmount More than Min")
        }


         //Result Set-4 Other Matches
         else if (Mean.data().Lookingpostcode.replace(/\s/g, "") != this.Look_postcode &&
         Mean.data().PropertyType != this.Look_PropertyType &&
         Mean.data().LookingTown == this.Look_Town &&
         Mean.data().latitude &&
         Mean.data().longitude
       ) {
         console.log(Mean.data())
         this.distanceInKm = this.getDistanceFromLatLonInKm(
           this.New_latitude,
           this.Look_longitude,
           Mean.data().latitude,
           Mean.data().longitude
         );
       
         this.lookTown.push({
           detail: Mean.data(),
           propertyId: Mean.id,
           distance: this.distanceInKm,
         });
         console.log("Result Set 4")
       }

      })

      // this.unmatchedProperties.sort(this.compare);
      // this.noOfMatches = this.matchedProperties.length;
      // this.noOfUnmatched = this.unmatchedProperties.length;
      //console.log(this.matchedProperties[0]);

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
    this.matchedProperties.sort(function (a, b) {
      return b.MaxAmount - a.MaxAmount
    })
  }
  lowtohigh() {
    this.matchedProperties.sort(function (a, b) {
      return a.MaxAmount - b.MaxAmount
    })
  }
  roomshightolow() {
    this.matchedProperties.sort(function (a, b) {
      return a.Maxrooms - b.Maxrooms
    })
  }
  matchedsearch() {
    this.matchedProperties.sort(function (a, b) {
      return a.SearchRadius - b.SearchRadius
    })
  }


  //For unmatched
  unmatchedhightoLow() {
    this.unmatchedProperties.sort(function (a, b) {
      return b.detail.MaxAmount - a.detail.MaxAmount
    })
  }
  unmatchedlowtohigh() {
    this.unmatchedProperties.sort(function (a, b) {
      return a.detail.MaxAmount - b.detail.MaxAmount
    })
  }
  unmatchedroomshightolow() {
    this.unmatchedProperties.sort(function (a, b) {
      return a.detail.Maxrooms - b.detail.Maxrooms
    })
  }
  unmatchedmatchedsearch() {
    this.unmatchedProperties.sort(function (a, b) {
      return a.detail.SearchRadius - b.detail.SearchRadius
    })
  }
  unmatcheddistance() {
    this.unmatchedProperties.sort(function (a, b) {
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
