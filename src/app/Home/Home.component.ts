import { Component, OnInit } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { AuthService } from ".././auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {HttpService} from '../http.service';
import {MyMatchesService} from "../Menu/myMatches/myMatches.service"
export class home{
  value:any;
}
@Component({
  selector: "app-Home",
  templateUrl: "./Home.component.html",
  styleUrls: ["./Home.component.css", "./../common.css"]
})

export class HomeComponent implements OnInit {
  selectedIndex = 0;
  maxNumberOfTabs = 2;
  isLoggedIn: Boolean = true;
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
  buyerProperty :any= [];
  sellerProperty :any = [];
  propertyLength: any;
  sellerLength: any;
  uid: string;
  checkMatches:boolean = false;

  public get user(): firebase.User {
    return this._user;
  }
  public set user(value: firebase.User) {
    this._user = value;
  }

  constructor(
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    private Router:Router,
    private HttpService:HttpService,
    private MatchesService:MyMatchesService
  ) {}

  ngOnInit() {
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
        this.LoggedIn();
    
      } else {
        localStorage.setItem("user", null);
        JSON.parse(localStorage.getItem("user"));
        this.LoggedOut();
        this.checkMatches = false
      }
    });
    
 
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
    });
  }

  signIn(email, pass) {
    this.isLoading = true;

    this.authService.SignIn(email, pass).then(data => {
      this.isLoading = false;
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
    this.Router.navigate(["/fillFormBuyer/:Currentpostcode/:CurrentTown/:Currentstate/:Currentcountry/:Lookingpostcode/:LookingStreetname/:LookingTown/:Lookingstate/:Country/:FinancialPosition/:SearchRadius/:PropertyType/:Roommin/:Roomsmax/:MinAmount/:MaxAmount/:Validity/:Minbathroom/:Maxbathroom/:Minreception/:Maxreception/:Conditions/:Ownership/:CurrentAddress"]);
     }
   if(value == this.home2)
     {
     this.Router.navigate(["/fillformseller/:Lookingpostcode/:LookingAddress/:LookingTown/:Lookingstate/:PropertyType/:Maxrooms/:MaxAmount/:ownership/:Maxbathrooms/:Maxreception/:PropertyCondition/:features/:Country"]);
     }
   console.log(home)
 
  }
 
}
