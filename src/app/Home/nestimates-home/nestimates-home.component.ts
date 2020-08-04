import { Component, OnInit } from '@angular/core';
import { NestimatesHomeService } from "./nestimates-home.service";
import { MatDialog } from '@angular/material/dialog';
import { DeleteDataComponent } from "../../Menu/myListings/deleteData.component"
@Component({
  selector: 'app-nestimates-home',
  templateUrl: './nestimates-home.component.html',
  styleUrls: ['./nestimates-home.component.css']
})
export class NestimatesHomeComponent implements OnInit {

  uid: any;
  user: any;
  propertyDetails = [];
  propertyRequirementDetails = [];
  docid: any;
  docs: any;
  itemscollection: any;
  newUser: boolean = false
  constructor(private myrequirement_service: NestimatesHomeService, public dialog: MatDialog) { }

  ngOnInit() {
    // User ID
    // User ID
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uid = this.user.uid;
    this.getallitems()


  }
   

  








































  
 //Get All Matches Of User

  deleteOrder(sellid) {
    console.log(sellid)
    this.myrequirement_service.deleteCoffeeOrder(this.uid, sellid)
    const dialogRef = this.dialog.open(DeleteDataComponent);
    this.getallitems();
  }


  deletdeleteBuyer(buyid) {

    this.myrequirement_service.deleteBuyer(this.uid, buyid)

    const dialogRef = this.dialog.open(DeleteDataComponent);
    this.getallitems();
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


    });
  }
}
