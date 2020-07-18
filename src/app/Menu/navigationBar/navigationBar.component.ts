
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../.././auth.service";
import { FormControl, Validators } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

import * as firebase from "firebase";
import { StateServiceService } from "./../../state-service.service";
import { MyMatchesService } from "../myMatches/myMatches.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormsService } from "../../Home/Property/fillFormBuyer/fillFormBuyer.service";
import { User } from "../../shared/services/user";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from '@angular/forms';
import { couldStartTrivia } from "typescript";
@Component({
  selector: "app-nav",
  templateUrl: "./navigationBar.component.html",
  styleUrls: ["./navigationBar.component.css"]
})
export class NavigationBarComponent implements OnInit {
  uid: any;
  notificationoverlay: boolean = false;
  isLoggedIn: Boolean = true;
  userData: any;
  boolean: boolean;
  propertyDetails = [];
  propertyBuyer = [];
  matchedProperties: any;
  property: any;
  buyerProperty = [];
  sellerProperty = [];
  noBuyerMatches: any;
  noSellerOfMatche: any;
  matchStatus: any;
  matches: any;
  open: Boolean = true;
  close: Boolean = false;
  menuItem: Boolean = false;
  navLink: Boolean = true;
  plusMenu: boolean = false;
  plusOpenMenu: boolean = true;
  plusclose: boolean = false;
  navLogin: boolean = false;
  newUser: boolean = false;
  isLoading: boolean = false;
  return: any;
  user: any;
  useremail: any;
  DOB: string;
  age: any;
  formVar: FormGroup;
  Name: any;
  users: any;
  displayName: any;
  name: any;
  email: any;
  password: any;
  notification:any;
  confirmInterest=[];
 
  constructor(
    public authService: AuthService,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth,
    private MatchesService: MyMatchesService,
    private stateService: StateServiceService,
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private FormsService: FormsService,
    private fb: FormBuilder

  ) {
    this.formVar = this.fb.group({
      Name: '',
      email: '',
      password: ''
    });
  }

  ngOnInit() {
    this.users = JSON.parse(localStorage.getItem("user"));
    if(this.users!=null)
    {
      this.uid = this.users.uid;
    }
   
  
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem("user", JSON.stringify(this.userData));
        this.LoggedIn();

      }
      else {
        localStorage.setItem("user", null);
        JSON.parse(localStorage.getItem("user"));
        this.LoggedOut();
      }
    });

  }

  private LoggedIn() {

    this.isLoggedIn = true;
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uid = this.user.uid;
    this.getMatchCases() 
    this.navLogin = false;
  }
  private LoggedOut() {
    this.isLoggedIn = false;
    this.navLogin = false;
  }
getMatchCases() {
    // Fetch details Seller
    this.MatchesService.getMatchesSellerProperties(this.uid).then((res) => {
      res.forEach((element) => {
        if (element.data().matchStatus == 'confirm_interest') {
          this.sellerProperty.push(element.data())
         
        }
      });

      this.noSellerOfMatche = this.sellerProperty.length;
      this.matches = this.buyerProperty.length + this.sellerProperty.length
    
    });

    // Fetch details Seller
    this.MatchesService.getMatchesBuyerProperties(this.uid).then((res) => {
      res.forEach((element) => {
        
          this.buyerProperty.push(element.data());
        
      });

      this.noBuyerMatches = this.buyerProperty.length;
      this.matches = this.buyerProperty.length + this.sellerProperty.length
    

    });

 

  }

getNotification()
{
  this.MatchesService.getnotifications(this.uid).subscribe((ref) => {
    ref.forEach((item) => {
    this.confirmInterest.push(item.data())

    });

    this.notification = this.confirmInterest.length
   console.log(this.notification)
  });
}


  openMenu() {
    this.open = false;
    this.close = true;
    this.menuItem = true;
    this.plusCloseMenu()
  }
  closeMenu() {
    this.open = true;
    this.close = false;
    this.menuItem = false;
    this.navLogin = false;
    this.notificationoverlay = false
  }
  Itemmenu() {
    this.navLink = false;
    this.close = false;
    this.open = true;
    this.menuItem = false;
  }


  plusmenu() {
    this.plusMenu = true;
    this.plusclose = true;
    this.plusOpenMenu = false;
    this.closeMenu()
  }
  plusCloseMenu() {
    this.plusMenu = false;
    this.plusclose = false;
    this.plusOpenMenu = true;
  }
  plusMenuContainer() {
    this.plusMenu = false;
    this.plusclose = false;
    this.plusOpenMenu = true;
  }
  openLogIn() {
    this.navLogin = true;
  }
  facebookLogin() {
    this.isLoading = true;

    this.authService.FacebookAuth().then(data => {
      this.isLoading = false;
    });
  }
  //SignIn Google
  googleLogin() {
    this.isLoading = true;
    this.authService.GoogleAuth().then(data => {
      this.isLoading = false;
    });
  }


  //Signup Google
  googleSignup() {
    this.isLoading = true;
    this.authService.GoogleAuthSignup().then(data => {
      this.isLoading = false;
    });
  }



  signIn(email, pass) {
    this.isLoading = true;
    this.authService.SignIn(email, pass).then(data => {
      this.isLoading = false;
    });

  }



  NewUser() {
    this.newUser = true;
  }

  OldUser() {
    this.newUser = false;
  }
  newclose() {
    this.newUser = false;
    this.newUser = false;
    this.navLogin = false;
  }

  signUp(displayName, email, pass) {
 
    this.authService.SignUp(email, pass).then(data => {
      this.user.Name = displayName
      this.user.DOB = null
      this.user.Phone = null
      this.isLoading = true;
      this.return = this.FormsService.createUserCustomer(this.user)
        .then(data => {
          
          if (this.user != null) {
            this.isLoading = false;
           }
           else
           {
             this.isLoading =false
           }
        });
    });
  }


  userNew() {
    this.user.DOB = null
    this.user.Phone = null
    this.user.displayName
    this.return = this.FormsService.createUserCustomer(this.user)
      .then(data => {
        console.log(data);
      });
  }
  keyDownFunction(event) {
    if (event.keyCode == 13) {
      this.signUp(this.name, this.email, this.password);
    }
  }
  keyDownSign(events) {
    if (events.keyCode == 13) {
      this.signIn(this.email, this.password);
    }
  }
  save() {
    this.signIn(this.email, this.password);
  }


  notificationoverlayopen() {
    if (this.notificationoverlay == false) {
      this.notificationoverlay = true
    }

    else if (this.notificationoverlay == true) {
      this.notificationoverlay = false
    }

  }
  closenotifiation()
  {
    this.notificationoverlay = false
  }
}
