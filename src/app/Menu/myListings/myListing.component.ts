import { Component, OnInit } from "@angular/core";
import { MyListingService } from "./myListing.service";
import {MatDialog} from '@angular/material/dialog';
import {DeleteDataComponent} from "./deleteData.component"
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
  sellId: any;
  listingLength: any;
  constructor(private myrequirement_service: MyListingService,public dialog: MatDialog) {}

  ngOnInit() {
    // User ID
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uid = this.user.uid;


    this.getallitems()


 

  }


  deleteOrder(sellid)
  

  {
    console.log(sellid)
    this.myrequirement_service.deleteCoffeeOrder(this.uid,sellid)
    const dialogRef = this.dialog.open(DeleteDataComponent);
    this.getallitems();
  }
 

  deletdeleteBuyer(buyid)
  {

    this.myrequirement_service.deleteBuyer(this.uid,buyid)
   
    const dialogRef = this.dialog.open(DeleteDataComponent);
    this.getallitems();
  }

  getallitems()
  {

    // Fetch details
    this.myrequirement_service.getBuyerRequirement(this.uid).then(res => {
      res.forEach(element => {
        this.propertyRequirementDetails.push({data: element.data(),id: element.id});
       
      });
    });

    this.myrequirement_service.getSellerProperties(this.uid).then(res => {
      res.forEach(element => {
        // this.docid = element.id
        this.propertyDetails.push({seller: element.data(),sellerId: element.id})
      });
   
      this.listingLength = this.propertyDetails.length + this.propertyRequirementDetails.length
      console.log(this.listingLength)
    });


  }
}
