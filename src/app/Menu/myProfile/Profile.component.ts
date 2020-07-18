<<<<<<< HEAD
import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { FormsService } from "../../Home/Property/fillFormBuyer/fillFormBuyer.service";
import { listingBuyer } from "../../Model/listingBuyer";
import {HttpService} from '../../http.service'

@Component({
  selector: "app-profile",
  templateUrl: "./Profile.component.html",
  styleUrls: ["./Profile.component.css", "./../../common.css"]
})
export class MyProfileComponent implements OnInit {
  listingBuyer: listingBuyer;
  user: any;
  items: Observable<any[]>;
  username: any;
  useremail: any;
  users: any;
  Name:any;
  uid:any;
  Address:any
  constructor(private fillFormsService: FormsService,
    private HttpService:HttpService) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uid = this.user.uid;

    this.fillFormsService.getUser(this.uid).subscribe((ref) => {
      ref.forEach((element) => {
        if(element.data().uid == this.uid)
     {
     this.user.Name = element.data().Name
     this.user.Email = element.data().email
     this.user.Phone = element.data().Phone
     this.user.DOB = element.data().DOB.toDate() 
     this.user.Phone = element.data().Phone
     this.user.Address = element.data().Currentaddress
      console.log(element.data().Name)
     }
      });
    });



  }
  
}
=======
import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { FormsService } from "../../Home/Property/fillFormBuyer/fillFormBuyer.service";
import { listingBuyer } from "../../Model/listingBuyer";
import {HttpService} from '../../http.service'

@Component({
  selector: "app-profile",
  templateUrl: "./Profile.component.html",
  styleUrls: ["./Profile.component.css", "./../../common.css"]
})
export class MyProfileComponent implements OnInit {
  listingBuyer: listingBuyer;
  user: any;
  items: Observable<any[]>;
  username: any;
  useremail: any;
  users: any;
  Name:any;
  uid:any;
  Address:any
  constructor(private fillFormsService: FormsService,
    private HttpService:HttpService) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uid = this.user.uid;

    this.fillFormsService.getUser(this.uid).subscribe((ref) => {
      ref.forEach((element) => {
        if(element.data().uid == this.uid)
     {
     this.user.Name = element.data().Name
     this.user.Email = element.data().email
     this.user.Phone = element.data().Phone
     this.user.DOB = element.data().DOB.toDate() 
     this.user.Phone = element.data().Phone
     this.user.Address = element.data().Currentaddress
      console.log(element.data().Name)
     }
      });
    });



  }
  
}
>>>>>>> 651bfc8cf0ef365f0c06fc4dd4780533889dee96
