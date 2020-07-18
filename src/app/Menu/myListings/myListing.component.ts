import { Component, OnInit } from "@angular/core";
import { MyListingService } from "./myListing.service";

@Component({
  selector: "app-myListing",
  templateUrl: "./myListing.component.html",
  styleUrls: ["./myListing.component.css"]
})
export class MyListingComponent implements OnInit {
  uid: any;
  user: any;
  propertyDetails = [];
  propertyRequirementDetails=[];
  docid:any;
  docs: any;
  itemscollection: any;
  newUser:boolean = false
  constructor(private myrequirement_service: MyListingService) {}

  ngOnInit() {
    // User ID
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uid = this.user.uid;


    

    // Fetch details
    this.myrequirement_service.getBuyerRequirement(this.uid).then(res => {
      res.forEach(element => {
        this.docid = element.id
        this.propertyRequirementDetails.push(element.data());
      });
   
    });

    this.myrequirement_service.getSellerProperties(this.uid).then(res => {
      res.forEach(element => {
        this.docid = element.id
        this.propertyDetails.push(element.data())
      });
    
    });

 

  }
}
