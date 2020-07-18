import { Component, OnInit } from "@angular/core";
import { MatchesService } from "./buyerMatchListing.service";
import { StateServiceService } from "../../.././../.././state-service.service";
import { listingBuyer } from "../../../../../Model/listingBuyer";
import { Sort } from "@angular/material/sort";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
@Component({
  selector: "app-buyerMatchListing",
  templateUrl: "./buyerMatchListing.component.html",
  styleUrls: ["./buyerMatchListing.component.css"],
})
export class BuyerMatcheListingComponent implements OnInit {
  return: any;
  userData: any;
  isLoggedIn: boolean;
  isLoading: boolean = false;
  user: any;
  uid: any;
  propertyDetails = [];
  matchedProperties = [];
  unmatchedProperties = [];
  prceMathLogic = [];
  settwo = [];
  unmatchedPriceLogic = [];
  lookTown = [];
  distanceInKm;
  listingBuyer: listingBuyer = new listingBuyer();
  isThanku: boolean = true;
  Names: any;
  title: any;
  unNamed: any;
  more: any;
  morePrice: any;
  less: any;
  distinctExpressedUid = [];
  expressed: boolean;
  amount: any;
  removespace: any;
  listing: any;
  minAmount: any;
  maxAmount: any;
  sub: any;
  Lookingpostcode: any;
  PropertyType: any;
  LookingTown: any;
  MinAmount: any;
  MaxAmount: any;
  latitude: any;
  longitude: any;
  newUser: any;
  Lookpostcode: string;
  Looking_postcode: any;
  Property_Type: any;
  Max_Amount: any;
  Min_Amount: any;
  Looking_Town: any;
  New_longitude: any;
  New_latitude: any;

  Look_postcodes: any
  Look_propertytype: any;
  Look_minamount: any;
  Look_maxamount: any;
  Look_longitude: any;
  Look_latitude: any;
  Look_Town: any;

  constructor(
    private MatchesService: MatchesService,
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
      this.Min_Amount = params.get("MinAmount").replace(/,/g, "");
      this.Max_Amount = params.get("MaxAmount").replace(/,/g, "");
      this.New_latitude = params.get("latitude");
      this.New_longitude = params.get("longitude");
      this.newUser = params.get("newUser");
    });
   
    
   
    if (this.newUser == "false") {
      this.Look_postcodes = this.Looking_postcode;
      this.Look_propertytype = this.Property_Type;
      this.Look_Town = this.Looking_Town;
      this.Look_minamount = this.Min_Amount;
      this.Look_maxamount = this.Max_Amount;
      this.Look_latitude = this.New_latitude;
      this.Look_longitude = this.New_longitude;
      
    }

    if (this.newUser == "true") {
      
      this.Look_postcodes = this.stateService.listingBuyer.Lookingpostcode.replace(/\s/g, "");
      this.Look_propertytype = this.stateService.listingBuyer.PropertyType;
      this.Look_Town = this.stateService.listingBuyer.LookingTown;
      this.Look_minamount = this.stateService.listingBuyer.MinAmount.replace(/,/g, "");
      this.Look_maxamount = this.stateService.listingBuyer.MaxAmount.replace(/,/g, "");
      this.Look_latitude = this.stateService.listingBuyer.latitude;
      this.Look_longitude = this.stateService.listingBuyer.longitude;

      console.log(this.Look_propertytype  + " " + this.Look_Town + " " +  this.Look_minamount + " " + this.Look_maxamount + " " + this.Look_latitude + " " + this.Look_longitude)
    }



    // Fetch details
    this.MatchesService.getSellerProperties(this.uid).subscribe((ref) => {
      ref.forEach((item) => {
        console.log(item.data());
        //Price Formula
        this.maxAmount = item.data().MaxAmount.replace(/,/g, "");
        this.less = (this.maxAmount - (this.maxAmount * 3) / 100);
        this.more = (this.maxAmount * 1 + (this.maxAmount * 10) / 100 * 1);

 
        //Remove Postcode Spaces
        this.removespace = item.data().Lookingpostcode.replace(/\s/g, "")
        this.listing = this.Look_postcodes
        this.amount = item.data().MaxAmount.replace(/,/g, "")



        //Result Set 1 Matches
        if (item.data().Lookingpostcode.replace(/\s/g, "") == this.Look_postcodes &&
          item.data().PropertyType == this.Look_propertytype &&
          this.maxAmount >= this.Look_minamount &&
          this.maxAmount <= this.Look_maxamount) {

          this.matchedProperties.push({
            detail: item.data(),
            propertyId: item.id,
          }); //Use this object to populate html
          console.log("Result Set 1")
        }


        //Result Set 1 Matches
        else if (item.data().Lookingpostcode.replace(/\s/g, "") == this.Look_postcodes &&
          this.maxAmount != this.Look_minamount &&
          this.maxAmount != this.Look_maxamount &&
          this.maxAmount < this.Look_minamount &&
          this.maxAmount < this.Look_maxamount &&
          item.data().PropertyType == this.Look_propertytype &&
          this.more >= this.Look_minamount
        ) {

          this.prceMathLogic.push({
            detail: item.data(),
            propertyId: item.id,
          });
          console.log("Result Set 1/2")
        }

        //Result Set 2 Matches
        

        else if (item.data().Lookingpostcode.replace(/\s/g, "") != this.Look_postcodes &&
          item.data().PropertyType == this.Look_propertytype &&
          this.maxAmount >= this.Look_minamount &&
          this.maxAmount <= this.Look_maxamount &&
          this.removespace.substring(0, 3) == this.listing.substring(0, 3))
           {
        
          this.settwo.push({
            detail: item.data(),
            propertyId: item.id,
          });
          console.log("result Set 2 Matches")
        }


        //No Matching Result Set 1
        else if (item.data().Lookingpostcode != this.Look_postcodes &&
          item.data().PropertyType == this.Look_propertytype &&
          this.more <= this.Look_minamount &&
          item.data().latitude &&
          item.data().longitude
        ) {

          this.distanceInKm = this.getDistanceFromLatLonInKm(
            this.New_latitude,
            this.Look_longitude,
            item.data().latitude,
            item.data().longitude
          );
          this.unmatchedProperties.push({
            detail: item.data(),
            propertyId: item.id,
            distance: this.distanceInKm,
          });
          console.log("Result Set No Matches 1")
        }


        //More tha Maxamount No Matching Result Set 1
        else if (item.data().Lookingpostcode.replace(/\s/g, "") != this.Look_postcodes &&
          item.data().PropertyType == this.Look_propertytype &&
          this.less >= this.Look_maxamount &&
          item.data().latitude &&
          item.data().longitude
        ) {

          this.distanceInKm = this.getDistanceFromLatLonInKm(
            this.New_latitude,
            this.Look_longitude,
            item.data().latitude,
            item.data().longitude
          );
          this.unmatchedPriceLogic.push({
            detail: item.data(),
            propertyId: item.id,
            distance: this.distanceInKm,
          });
          console.log("result Set Maxmount More than Min")
        }






        //Result Set-4 Other Matches
        else if (item.data().Lookingpostcode.replace(/\s/g, "") != this.Look_postcodes &&
          item.data().PropertyType != this.Look_propertytype &&
          item.data().LookingTown == this.Look_Town &&
          item.data().latitude &&
          item.data().longitude
        ) {
          console.log(item.data())
          this.distanceInKm = this.getDistanceFromLatLonInKm(
            this.New_latitude,
            this.Look_longitude,
            item.data().latitude,
            item.data().longitude
          );
          console.log(this.listingBuyer.latitude + this.listingBuyer.longitude)
          this.lookTown.push({
            detail: item.data(),
            propertyId: item.id,
            distance: this.distanceInKm,
          });
          console.log("Result Set 4")
        }




      });
      this.unmatchedProperties.sort(this.compare);
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
    this.isThanku = false;
  }

  hightoLow() {
    this.matchedProperties.sort(function (a, b) {
      return b.MaxAmount - a.MaxAmount;
    });
  }
  lowtohigh() {
    this.matchedProperties.sort(function (a, b) {
      return a.MaxAmount - b.MaxAmount;
    });
  }
  roomshightolow() {
    this.matchedProperties.sort(function (a, b) {
      return a.Maxrooms - b.Maxrooms;
    });
  }
  //For unmatched
  unmatchedhightoLow() {
    this.unmatchedProperties.sort(function (a, b) {
      return b.detail.MaxAmount - a.detail.MaxAmount;
    });
  }
  unmatchedlowtohigh() {
    this.unmatchedProperties.sort(function (a, b) {
      return a.detail.MaxAmount - b.detail.MaxAmount;
    });
  }
  unmatchedroomshightolow() {
    this.unmatchedProperties.sort(function (a, b) {
      return a.detail.Maxrooms - b.detail.Maxrooms;
    });
  }
  unmatchedDistance() {
    this.unmatchedProperties.sort(function (a, b) {
      return a.distance - b.distance;
    });
  }

  getExpressedListingIds() {
    this.MatchesService.ExpressInterest(this.uid).subscribe((ref) => {
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
