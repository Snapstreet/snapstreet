import { Component, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { AuthService } from "../../auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {HttpService} from '../../http.service';
import {MyMatchesService} from "../../Menu/myMatches/myMatches.service";
import {NestimatesHomeService}  from "../nestimates-home/nestimates-home.service";
import {HomeMatchesService} from "../home-matches/home-matches.service"
export class home{
  value:any;
}
@Component({
  selector: 'app-clickhome',
  templateUrl: './clickhome.component.html',
  styleUrls: ['./clickhome.component.css']
})
export class ClickhomeComponent implements OnInit {
  selectedIndex = 0;
  maxNumberOfTabs = 2;
  isLoggedIn: Boolean = false;
  userData: any;
  boolean: boolean;
  isLoading: boolean = false;
  cookie:boolean =true;
 owner:any;
 seeker:any;
value:any
  private _user: firebase.User;
  home: any;
  home2: any;
  Policy: void;
  checkPolicy: any;
  propertyRequirementDetails:any= [];
  propertyDetails:any = [];
  propertyLength: any;
  sellerLength: any;
  uid: string;
  checkMatches:boolean = false;
  checkNumberNestimates : any;
  buyerPoperty: any;
  sellerProperty: any;
  appMatches:boolean = false
  Componame;


  public get user(): firebase.User {
    return this._user;
  }
  public set user(value: firebase.User) {
    this._user = value;
  }
  constructor(   public authService: AuthService,
    public afAuth: AngularFireAuth,
    private Router:Router,
    private HttpService:HttpService,
    private MatchesService:MyMatchesService,
    private myrequirement_service: NestimatesHomeService,) { }

    ngOnInit() {
      this.Componame = this.constructor.name
      this.user = JSON.parse(localStorage.getItem("user"));
      if(this.user != null)
      {
      this.uid = this.user.uid;
      }
     
      this.checkPolicy = JSON.parse(localStorage.getItem("Policy"));
      if(this.checkPolicy==false)
      {
        this.cookie = false
      }
  
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          localStorage.setItem("user", JSON.stringify(this.userData));
          this.isLoggedIn = true
    
        } else {
          localStorage.setItem("user", null);
          JSON.parse(localStorage.getItem("user"));
          this.LoggedOut();
          this.isLoggedIn = false
         
        }
      });
  
     console.log(this.constructor.name)
  
    
    }
  
    private LoggedIn() {
      this.isLoggedIn = true;
      this.cookie=false;
    }
    private LoggedOut() {
      this.isLoggedIn = false;
    }
  
    facebookLogin() {
      this.isLoading = true;
  
      this.authService.FacebookAuth().then(data => {
        this.isLoading = false;
      });
    }
  
    googleLogin() {
      this.isLoading = true;
  
      this.authService.GoogleAuth().then(data => {
        this.isLoading = false;
        this.isLoggedIn = true;
      });
    }
  
    signIn(email, pass) {
      this.isLoading = true;
  
      this.authService.SignIn(email, pass).then(data => {
        this.isLoading = false;
        this.isLoggedIn = true;
      });
    }
  
  
    closeCookie()
    {
      this.cookie = false
      this.Policy=localStorage.setItem("Policy", JSON.stringify(this.cookie))
    }
  
    homeradio(value)
    {
     if(value ==this.home)
      {
      this.Router.navigate(["/fillFormBuyer/:Currentpostcode/:CurrentTown/:Currentstate/:Currentcountry/:Lookingpostcode/:LookingStreetname/:LookingTown/:Lookingstate/:Country/:FinancialPosition/:PropertyType/:Roommin/:Roomsmax/:MinAmount/:MaxAmount/:Validity/:Minbathroom/:Maxbathroom/:Minreception/:Maxreception/:Conditions/:Ownership/:CurrentAddress"]);
       }
     if(value == this.home2)
       {
       this.Router.navigate(["/fillformseller/:Lookingpostcode/:LookingAddress/:LookingTown/:Lookingstate/:PropertyType/:Maxrooms/:MaxAmount/:ownership/:Maxbathrooms/:Maxreception/:PropertyCondition/:Country"]);
       }
     console.log(home)
   
    }
    getallitems()
     {
   
       // Fetch details
       this.myrequirement_service.getBuyerRequirement(this.uid).then(res => {
         res.forEach(element => {
           this.propertyRequirementDetails.push({data: element.data(),id: element.id});
          
         });
         this.buyerPoperty = this.propertyRequirementDetails.length
         console.log()
         //this.checkNumberNestimates = this.propertyRequirementDetails.length + this.propertyDetails.length
     
       });
   
       this.myrequirement_service.getSellerProperties(this.uid).then(res => {
         res.forEach(element => {
           this.propertyDetails.push({seller: element.data(),sellerId: element.id})
           
         });
         this.sellerProperty = this.propertyDetails.length
         
         this.checkNumberNestimates = this.sellerProperty + this.buyerPoperty
         console.log(this.checkNumberNestimates)
         if(this.checkNumberNestimates > 0)
         {
           this.appMatches = true
           this.isLoggedIn = true
         }
         else
         {
           this.isLoggedIn = false
         }
    
        });
       
      }
  }
  
