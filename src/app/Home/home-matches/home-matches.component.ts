import { Component, OnInit } from "@angular/core";
import { MatchesService } from "../Property/fillFormBuyer/confirmBuyerDetail/buyerMatchListing/buyerMatchListing.service";
import { StateServiceService } from "../../state-service.service";
import { listingBuyer } from "../../Model/listingBuyer";
import { Sort } from "@angular/material/sort";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { HomeMatchesService } from "./home-matches.service";
import { SellerMatchListingService } from "../Property/fillFormSeller/confirmSellerDetail/sellerMatchListing/sellerMatchListing.service"
@Component({
  selector: 'app-home-matches',
  templateUrl: './home-matches.component.html',
  styleUrls: ['./home-matches.component.css']
})
export class HomeMatchesComponent implements OnInit {
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
  Property_For: string;
  Look_PropertyFor: string;
  LookingStreetname: string;
  Conditions: string;
  FinancialPosition: string;

  Validity: any;
  Position: string;
  UserId: string;
  ChainStatus: string;
  Look_Streetname: string;
  Look_chainstatus: string;
  Look_condition: string;
  Look_Position: string;

  Look_Validity: any;
  Look_UserId: string;
  Look_FinancialPosition: any;
  getList: boolean = false
  propertyRequirementDetails = [];
  Look_maxAmount: any;

  Look_PropertyType: any;
  Look_postcode: any;
  noOfMatches: number;
  noOfUnmatched: number;
  buyer: boolean = false;
  seller: boolean = false
  Look_state: any;
  Look_rooms: any;
  Look_Propertycondition: any;
  Look_Address: any;
  Look_ownership: any;
  Look_features: any;
  Look_userId: string;
  Look_Maxbathrooms: number;
  Look_Maxreceptions: any;
  Look_Maxrooms: number;
  test: any
  PropertyFor: any;
  Streetname: any;
  condition: any;
  sellermatchedProperties = []
  sellerprceMathLogic = []
  sellersettwo = []
  sellerunmatchedProperties = []
  sellerlookTown = []
  Nestimate: boolean = true
  sellerVal: any;
  buyerVal: any;
  MatchesItem: number;
  buyerItems: boolean = false
  sellerItem: boolean = false;
  sellerunmatchedPropertiesFirst = [];
  sellerunmatchedPriceLogic = []
  unmatchedallProperty =[]
  unmatchedchecked;
  constructor(private MatchesService: MatchesService,
    private stateService: StateServiceService,
    private route: ActivatedRoute,
    private myrequirement_service: HomeMatchesService,
    private SellermatchesService: SellerMatchListingService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uid = this.user.uid;


    this.getallitems()


  }

  checkvalue() {

  }


  getDetails(Lookingpostcode, PropertyFor, PropertyType, MinAmount, MaxAmount, LookingTown, latitude, longitude, Streetname, condition, ChainStatus, FinancialPosition,  Validity, Position, UserId) {
    this.buyer = true
    this.seller = false
    this.getList = false
    this.isLoading = true
    // Fetch details
    this.MatchesService.getSellerProperties(this.uid).subscribe((ref) => {
      ref.forEach((item) => {
        this.buyer = true
        this.seller = false

        this.Look_postcodes = Lookingpostcode.replace(/\s/g, "");
        this.Look_PropertyFor = PropertyFor;
        this.Look_propertytype = PropertyType;
        this.Look_minamount = MinAmount.replace(/,/g, "");
        var Look_minamount = parseInt(this.Look_minamount);
        this.Look_maxamount = MaxAmount.replace(/,/g, "");
        var Look_maxamount = parseInt(this.Look_maxamount)
        this.LookingTown = LookingTown;
        this.Look_latitude = latitude;
        this.Look_longitude = longitude;
        this.Look_Streetname = Streetname;
        this.Look_condition = condition;
        this.Look_chainstatus = ChainStatus;
        this.Look_FinancialPosition = FinancialPosition;
        this.Look_Validity = Validity;
        this.Look_Position = Position;
        this.Look_UserId = UserId
        //Price Formula
        this.maxAmount = item.data().MaxAmount.replace(/,/g, "");
        var maxAmount = parseInt(this.maxAmount)

        this.less = (Look_minamount - (Look_minamount * 10) / 100);
        var less = parseInt(this.less)
        this.more = (Look_maxamount * 1 + (Look_maxamount * 3) / 100 * 1);
        var more = parseInt(this.more)

        //Remove Postcode Spaces
        this.removespace = item.data().Lookingpostcode.replace(/\s/g, "")
        this.listing = this.Look_postcodes
        this.amount = item.data().MaxAmount.replace(/,/g, "")
        this.isLoading = false
        this.buyer = true

        //- Same postcode only Matches price criteria (min reduce 3% max +10%) - Same property type

        if (item.data().Lookingpostcode.replace(/\s/g, "") == this.Look_postcodes &&
          item.data().PropertyFor == this.Look_PropertyFor &&
          item.data().PropertyType == this.Look_propertytype &&
          less <= maxAmount &&
          more >= maxAmount &&
          item.data().latitude &&
          item.data().longitude) {

          this.distanceInKm = this.getDistanceFromLatLonInKm(
            this.Look_latitude,
            this.Look_longitude,
            item.data().latitude,
            item.data().longitude
          );
          this.matchedProperties.push({
            detail: item.data(),
            propertyId: item.id,
            distance: this.distanceInKm * 0.6214,
          }); //Use this object to populate html
     
        }









        // POSTCODE MATCH - FIRST 5 LETTERS ONLY- Matches price criteria (min reduce 3% max +10%)- Same property type
        if (item.data().Lookingpostcode.replace(/\s/g, "") != this.Look_postcodes &&
          item.data().PropertyFor == this.Look_PropertyFor &&
          item.data().PropertyType == this.Look_propertytype &&
          this.removespace.substring(0, 5) == this.listing.substring(0, 5) &&
          less <= maxAmount &&
          more >= maxAmount &&
          item.data().latitude &&
          item.data().longitude
        ) {

          this.distanceInKm = this.getDistanceFromLatLonInKm(
            this.Look_latitude,
            this.Look_longitude,
            item.data().latitude,
            item.data().longitude
          );

          this.unmatchedProperties.push({
            detail: item.data(),
            propertyId: item.id,
            distance: this.distanceInKm * 0.6214,
          });
       
        }



        //POSTCODE MATCH - FIRST 3 LETTERS ONLY- Matches price criteria (min reduce 3% max +10%)-Same property type
        if (item.data().Lookingpostcode.replace(/\s/g, "") != this.Look_postcodes &&
          item.data().PropertyFor == this.Look_PropertyFor &&
          item.data().PropertyType == this.Look_propertytype &&
          this.removespace.substring(0, 5) != this.listing.substring(0, 5) &&
          this.removespace.substring(0, 3) == this.listing.substring(0, 3) &&
          less <= maxAmount &&
          more >= maxAmount &&
          item.data().latitude &&
          item.data().longitude
        ) {

          this.distanceInKm = this.getDistanceFromLatLonInKm(
            this.Look_latitude,
            this.Look_longitude,
            item.data().latitude,
            item.data().longitude
          );

          this.unmatchedPriceLogic.push({
            detail: item.data(),
            propertyId: item.id,
            distance: this.distanceInKm * 0.6214,
          });
          this.unmatchedchecked = this.unmatchedPriceLogic 
          
        }

        //POSTCODE MATCH - FIRST 3 LETTERS ONLY- Matches price criteria (min reduce 3% max +10%)- ALL property types
        if (item.data().Lookingpostcode.replace(/\s/g, "") != this.Look_postcodes &&
          item.data().PropertyFor == this.Look_PropertyFor &&
          item.data().PropertyType != this.Look_propertytype &&
          this.removespace.substring(0, 5) != this.listing.substring(0, 5) &&
          this.removespace.substring(0, 3) == this.listing.substring(0, 3) &&
          less <= maxAmount  &&
          more >= maxAmount  &&
          item.data().latitude &&
          item.data().longitude
        ) {

          this.distanceInKm = this.getDistanceFromLatLonInKm(
            this.Look_latitude,
            this.Look_longitude,
            item.data().latitude,
            item.data().longitude
          );

          this.unmatchedallProperty.push({
            detail: item.data(),
            propertyId: item.id,
            distance: this.distanceInKm * 0.6214,
          });
         
        }









        //- All other properties - Nationwide
        else if (item.data().Lookingpostcode.replace(/\s/g, "") != this.Look_postcodes &&
          item.data().PropertyType != this.Look_propertytype &&
          item.data().PropertyFor == this.Look_PropertyFor &&
          this.removespace.substring(0, 5) != this.listing.substring(0, 5) &&
          this.removespace.substring(0, 3) != this.listing.substring(0, 3) &&
          item.data().latitude &&
          item.data().longitude
        ) {

          this.distanceInKm = this.getDistanceFromLatLonInKm(
            this.Look_latitude,
            this.Look_longitude,
            item.data().latitude,
            item.data().longitude
          );
          this.lookTown.push({
            detail: item.data(),
            propertyId: item.id,
            distance: this.distanceInKm * 1 /1.609344,
          });
     

        }





      });
      this.unmatchedProperties.sort(this.compare);
    });
    this.getExpressedListingIds();
  }


  getSellerDetails(Lookingpostcode, PropertyFor, PropertyType, MaxAmount, LookingTown, Lookingstate, Maxbathrooms, PropertyCondition, LookingAddress, ownership, features, UserId, Maxreception, Maxrooms, latitude, longitude) {
    this.buyer = false
    this.seller = true

    this.Look_postcode = Lookingpostcode.replace(/\s/g, "");
    this.Look_PropertyFor = PropertyFor;
    this.Look_PropertyType = PropertyType;
    this.Look_maxAmount = MaxAmount.replace(/,/g, "");
    var Look_maxAmount = parseInt(this.Look_maxAmount)
    this.Look_Town = LookingTown;

    this.Look_state = Lookingstate;
    this.Look_rooms = Maxrooms
    this.Look_Propertycondition = PropertyCondition;
    this.Look_Address = LookingAddress;
    this.Look_ownership = ownership
    this.Look_features = features;
    this.Look_userId = UserId;
    this.Look_Maxbathrooms = Maxbathrooms
    this.Look_Maxreceptions = Maxreception;
    this.Look_Maxrooms = Maxrooms;
    this.Look_longitude = longitude;
    this.Look_latitude = latitude;
    this.getList = true
    this.isLoading = true


    this.SellermatchesService.getSellerProperties(this.uid).subscribe((ref) => {
      ref.forEach((Mean) => {
        //Min-MAx Amount Removed Comas and Formula
        this.maxAmount = this.Look_maxAmount.replace(/,/g, "");
        var maxAmount = parseInt(this.maxAmount)

        this.Look_minamount = Mean.data().MinAmount.replace(/,/g, "");
        var Look_minamount = parseInt(this.Look_minamount)
        this.Look_maxamount = Mean.data().MaxAmount.replace(/,/g, "");
        var Look_maxamount = parseInt(this.Look_maxamount)

        this.less = (Look_minamount - (Look_minamount * 10) / 100);
        var less = parseInt(this.less)

        this.more = (Look_maxamount * 1 + (Look_maxamount * 3) / 100 * 1);
        var more = parseInt(this.more)

        //Remove Postcode Spaces

        this.removespace = Mean.data().Lookingpostcode.replace(/\s/g, "")
        this.listing = this.Look_postcode



        this.isLoading = false


        //- Same postcode only- Matches price criteria (min reduce 3% max +10%)- Same property type
        if (Mean.data().Lookingpostcode.replace(/\s/g, "") == this.Look_postcode &&
          Mean.data().PropertyFor == this.Look_PropertyFor &&
          Mean.data().PropertyType == this.Look_PropertyType &&
          less <= maxAmount &&
          more >= maxAmount) {
          this.sellermatchedProperties.push({
            detail: Mean.data(),
            propertyId: Mean.id,
          });

        }










        //No Matching Result Set 1

        // POSTCODE MATCH - FIRST 5 LETTERS ONLY- Matches price criteria (min reduce 3% max +10%)- Same property type
        if (Mean.data().Lookingpostcode.replace(/\s/g, "") != this.Look_postcode &&
          Mean.data().PropertyType == this.Look_PropertyType &&
          Mean.data().PropertyFor == this.Look_PropertyFor &&
          less <= maxAmount &&
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
            distance: this.distanceInKm * 1 /1.609344,
          });
        }

        // POSTCODE MATCH - FIRST 3 LETTERS ONLY- Matches price criteria (min reduce 3% max +10%)- Same property type
        if (Mean.data().Lookingpostcode.replace(/\s/g, "") != this.Look_postcode &&
          Mean.data().PropertyType == this.Look_PropertyType &&
          Mean.data().PropertyFor == this.Look_PropertyFor &&
          less <= maxAmount &&
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
          less <= maxAmount &&
          more >= maxAmount &&
          this.removespace.substring(0, 5) != this.listing.substring(0, 5) &&
          this.removespace.substring(0, 3) == this.listing.substring(0, 3) &&
          Mean.data().PropertyFor == this.Look_PropertyFor &&
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
            distance: this.distanceInKm * 1 /1.609344,
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
            distance: this.distanceInKm * 1 /1.609344,
          });
       
        }

      })

      this.unmatchedProperties.sort(this.compare);
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
    this.isThanku = false;
  }

  hightoLow() {
    this.matchedProperties.sort(function (a, b) {
      return b.MaxAmount - a.MaxAmount;
    });
  }
  lowtohigh() {
    console.log("test")
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



























  getallitems() {

    // Fetch details
    this.myrequirement_service.getBuyerRequirement(this.uid).then(res => {
      res.forEach(element => {
        this.propertyRequirementDetails.push({ data: element.data(), id: element.id });

      });
    });

    this.myrequirement_service.getSellerProperties(this.uid).then(res => {
      res.forEach(element => {
        // this.docid = element.id
        this.propertyDetails.push({ seller: element.data(), sellerId: element.id })
      });

      this.MatchesItem = this.propertyRequirementDetails.length + this.propertyDetails.length
      if (this.MatchesItem < 2) {
        if (this.propertyRequirementDetails.length > this.propertyDetails.length) {
          this.buyer = true
          this.seller = false
          this.buyerItems = true
          this.buyerVal = this.propertyRequirementDetails[0].data.Lookingpostcode;
          const Lookingpostcode = this.propertyRequirementDetails[0].data.Lookingpostcode;
          const MinAmount = this.propertyRequirementDetails[0].data.MinAmount;
          const MaxAmount = this.propertyRequirementDetails[0].data.MaxAmount;
          const PropertyFor = this.propertyRequirementDetails[0].data.PropertyFor;
          const PropertyType = this.propertyRequirementDetails[0].data.PropertyType;
          const LookingTown = this.propertyRequirementDetails[0].data.LookingTown;
          const latitude = this.propertyRequirementDetails[0].data.latitude;
          const longitude = this.propertyRequirementDetails[0].data.longitude;
          const Streetname = this.propertyRequirementDetails[0].data.LookingStreetname;
          const condition = this.propertyRequirementDetails[0].data.Conditions;
          const ChainStatus = this.propertyRequirementDetails[0].data.ChainStatus;
          const FinancialPosition = this.propertyRequirementDetails[0].data.FinancialPosition;
 
          const Validity = this.propertyRequirementDetails[0].data.Validity;
          const Position = this.propertyRequirementDetails[0].data.Position;
          const UserId = this.propertyRequirementDetails[0].data.UserId;

          this.getDetails(Lookingpostcode, PropertyFor, PropertyType, MinAmount, MaxAmount, LookingTown, latitude, longitude, Streetname, condition, ChainStatus, FinancialPosition, Validity, Position, UserId);
        }
        else {


          this.seller = true
          this.buyer = false
          this.sellerItem = true
          this.sellerVal = this.propertyDetails[0].seller.Lookingpostcode
          const Lookingpostcode = this.propertyDetails[0].seller.Lookingpostcode;
          const PropertyFor = this.propertyDetails[0].seller.PropertyFor;
          const PropertyType = this.propertyDetails[0].seller.PropertyType;
          const MaxAmount = this.propertyDetails[0].seller.MaxAmount;
          const LookingTown = this.propertyDetails[0].seller.LookingTown;
          const Lookingstate = this.propertyDetails[0].seller.Lookingstate;
          const Maxbathrooms = this.propertyDetails[0].seller.Maxbathrooms
          const PropertyCondition = this.propertyDetails[0].seller.PropertyCondition
          const LookingAddress = this.propertyDetails[0].seller.LookingAddress
          const ownership = this.propertyDetails[0].seller.ownership
          const features = this.propertyDetails[0].seller.features
          const UserId = this.propertyDetails[0].seller.UserId;
          const Maxreception = this.propertyDetails[0].seller.Maxreception
          const Maxrooms = this.propertyDetails[0].seller.Maxrooms;
          const latitude = this.propertyDetails[0].seller.latitude;
          const longitude = this.propertyDetails[0].seller.longitude
          this.getSellerDetails(Lookingpostcode, PropertyFor, PropertyType, MaxAmount, LookingTown, Lookingstate, Maxbathrooms, PropertyCondition, LookingAddress, ownership, features, UserId, Maxreception, Maxrooms, latitude, longitude)
        }


      }
      else if (this.MatchesItem > 1) {
        if (this.propertyRequirementDetails.length > this.propertyDetails.length) {
          this.buyer = true
          this.buyerVal = this.propertyRequirementDetails[0].data.Lookingpostcode;
          this.test = this.buyerVal
          const Lookingpostcode = this.propertyRequirementDetails[0].data.Lookingpostcode;
          const MinAmount = this.propertyRequirementDetails[0].data.MinAmount;
          const MaxAmount = this.propertyRequirementDetails[0].data.MaxAmount;
          const PropertyFor = this.propertyRequirementDetails[0].data.PropertyFor;
          const PropertyType = this.propertyRequirementDetails[0].data.PropertyType;
          const LookingTown = this.propertyRequirementDetails[0].data.LookingTown;
          const latitude = this.propertyRequirementDetails[0].data.latitude;
          const longitude = this.propertyRequirementDetails[0].data.longitude;
          const Streetname = this.propertyRequirementDetails[0].data.LookingStreetname;
          const condition = this.propertyRequirementDetails[0].data.Conditions;
          const ChainStatus = this.propertyRequirementDetails[0].data.ChainStatus;
          const FinancialPosition = this.propertyRequirementDetails[0].data.FinancialPosition;
   
          const Validity = this.propertyRequirementDetails[0].data.Validity;
          const Position = this.propertyRequirementDetails[0].data.Position;
          const UserId = this.propertyRequirementDetails[0].data.UserId;
          this.getDetails(Lookingpostcode, PropertyFor, PropertyType, MinAmount, MaxAmount, LookingTown, latitude, longitude, Streetname, condition, ChainStatus, FinancialPosition,  Validity, Position, UserId);
        }
        else {

          this.seller = true

          this.sellerVal = this.propertyDetails[0].seller.Lookingpostcode
          this.test = this.sellerVal
          const Lookingpostcode = this.propertyDetails[0].seller.Lookingpostcode;
          const PropertyFor = this.propertyDetails[0].seller.PropertyFor;
          const PropertyType = this.propertyDetails[0].seller.PropertyType;
          const MaxAmount = this.propertyDetails[0].seller.MaxAmount;
          const LookingTown = this.propertyDetails[0].seller.LookingTown;
          const Lookingstate = this.propertyDetails[0].seller.Lookingstate;
          const Maxbathrooms = this.propertyDetails[0].seller.Maxbathrooms
          const PropertyCondition = this.propertyDetails[0].seller.PropertyCondition
          const LookingAddress = this.propertyDetails[0].seller.LookingAddress
          const ownership = this.propertyDetails[0].seller.ownership
          const features = this.propertyDetails[0].seller.features
          const UserId = this.propertyDetails[0].seller.UserId;
          const Maxreception = this.propertyDetails[0].seller.Maxreception
          const Maxrooms = this.propertyDetails[0].seller.Maxrooms;
          const latitude = this.propertyDetails[0].seller.latitude;
          const longitude = this.propertyDetails[0].seller.longitude

          this.getSellerDetails(Lookingpostcode, PropertyFor, PropertyType, MaxAmount, LookingTown, Lookingstate, Maxbathrooms, PropertyCondition, LookingAddress, ownership, features, UserId, Maxreception, Maxrooms, latitude, longitude)
        }
      }









    });
  }
}