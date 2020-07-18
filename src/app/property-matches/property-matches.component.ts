import { Component, OnInit } from "@angular/core";
import { MatchesService } from "../Home/Property/fillFormBuyer/confirmBuyerDetail/buyerMatchListing/buyerMatchListing.service";
import { StateServiceService } from "../state-service.service";
import { listingBuyer } from "../Model/listingBuyer";
import { Sort } from "@angular/material/sort";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

import { param } from "jquery";



@Component({
  selector: 'app-property-matches',
  templateUrl: './property-matches.component.html',
  styleUrls: ['./property-matches.component.css']
})
export class PropertyMatchesComponent implements OnInit {

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
  Lookingpostcode: string;
  PropertyType: string;
  LookingTown: string;
  MinAmount: string;
  MaxAmount: string;
  latitude: any;
  longitude: string;
  constructor(
    private MatchesService: MatchesService,
    private stateService: StateServiceService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uid = this.user.uid;
    this.sub = this.route.paramMap.subscribe((params) => {
      this.Lookingpostcode= params.get("Lookingpostcode").trim();
      this.PropertyType= params.get("PropertyType").trim();
      this.LookingTown = params.get("LookingTown").trim();
      this.MinAmount = params.get("MinAmount").trim();
      this.MaxAmount = params.get("MaxAmount").trim();
      this.latitude = params.get("latitude")
      this.longitude = params.get("longitude")
console.log(this.Lookingpostcode + " " + this.PropertyType + " " + this.LookingTown + " " + this.MinAmount + " " + this.MaxAmount)
    })
    
    // Fetch details
    this.MatchesService.getSellerProperties(this.uid).subscribe((ref) => {
      ref.forEach((item) => {

        //Price Formula
        this.maxAmount = item.data().MaxAmount.replace(/,/g, "");
        console.log(this.maxAmount)
        this.less = (this.maxAmount - (this.maxAmount * 3) / 100);
        this.more = (this.maxAmount * 1 + (this.maxAmount * 10) / 100 * 1);
        //Remove Postcode Spaces
        this.removespace = this.Lookingpostcode.replace(/\s/g, "")
        this.listing = this.Lookingpostcode.replace(/\s/g, "")
        this.amount = item.data().MaxAmount.replace(/,/g, "")




        //Result Set 1 Matches
        if (item.data().Lookingpostcode.replace(/\s/g, "") == this.Lookingpostcode.replace(/\s/g, "") &&
          item.data().PropertyType == this.PropertyType &&
          this.maxAmount >= this.MinAmount.replace(/,/g, "") &&
          this.maxAmount <= this.MaxAmount.replace(/,/g, "") ) {

          this.matchedProperties.push({
            detail: item.data(),
            propertyId: item.id,
          }); //Use this object to populate html
          console.log("Result Set 1")
        }


        //Result Set 1 Matches
      else if (item.data().Lookingpostcode == this.Lookingpostcode &&
      this.maxAmount != this.MinAmount.replace(/,/g, "") &&
      this.maxAmount != this.MaxAmount.replace(/,/g, "")  &&
      this.maxAmount < this.MinAmount.replace(/,/g, "") &&
      this.maxAmount < this.MaxAmount.replace(/,/g, "")  &&
          item.data().PropertyType == this.PropertyType &&
          this.more >= this.MinAmount.replace(/,/g, "")
        ) {

          this.prceMathLogic.push({
            detail: item.data(),
            propertyId: item.id,
          });
          console.log("Result Set 1/2")
        }

        

        //Result Set 2 Matches
     else if (item.data().Lookingpostcode.replace(/\s/g, "") != this.Lookingpostcode.replace(/\s/g, "") &&
          item.data().PropertyType == this.PropertyType &&
          this.maxAmount >= this.MinAmount.replace(/,/g, "") &&
          this.maxAmount <= this.MaxAmount.replace(/,/g, "") &&
          this.removespace.substring(0, 3) == this.listing.substring(0, 3)) {
          this.settwo.push({
            detail: item.data(),
            propertyId: item.id,
          }); 
          console.log("result Set 2 Matches")
        }
   

        //No Matching Result Set 1
       else if (item.data().Lookingpostcode != this.Lookingpostcode &&
          item.data().PropertyType == this.PropertyType &&
          this.more <= this.MinAmount.replace(/,/g, "") &&
          item.data().latitude &&
          item.data().longitude
        ) {
        
          this.distanceInKm = this.getDistanceFromLatLonInKm(
            this.latitude,
            this.longitude,
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
        else  if (item.data().Lookingpostcode != this.Lookingpostcode &&
          item.data().PropertyType == this.PropertyType &&
          this.less >= this.MaxAmount.replace(/,/g, "") &&
          item.data().latitude &&
          item.data().longitude
        ) {
        
          this.distanceInKm = this.getDistanceFromLatLonInKm(
            this.latitude,
            this.longitude,
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
      else if (item.data().Lookingpostcode != this.Lookingpostcode &&
          item.data().PropertyType != this.PropertyType &&
          item.data().LookingTown == this.LookingTown &&
          item.data().latitude &&
          item.data().longitude
        ) {
          this.distanceInKm = this.getDistanceFromLatLonInKm(
            this.latitude,
            this.longitude,
            item.data().latitude,
            item.data().longitude
          );
          console.log(this.latitude + this.longitude)
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
