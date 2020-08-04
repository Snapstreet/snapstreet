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
import { NotificationService } from "../notification/notification.service"
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
  notifications: any;
  confirmInterest = [];
  now: Date = new Date();
  confirmInterests = [];
  bellicon = []
  docid: any;
  Lastseen: Date;

  Notification :any
  notificationRed: string;
  belliconone: boolean 
  bellicontwo: boolean
  constructor(
    public authService: AuthService,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth,
    private MatchesService: MyMatchesService,
    private stateService: StateServiceService,
    private _Activatedroute: ActivatedRoute,
    public _router: Router,
    private FormsService: FormsService,
    private fb: FormBuilder,
    private NotificationService: NotificationService

  ) {
    this.formVar = this.fb.group({
      Name: '',
      email: '',
      password: ''
    });
  }

  ngOnInit() {

    this.initProfile()
    new Date().getTime() / 1000
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

    console.log(this.constructor.name)
  }

  private LoggedIn() {

    this.isLoggedIn = true;
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uid = this.user.uid;
    this.getMatchCases()
    this.navLogin = false;
    this._router.navigate["/"]
  }
  private LoggedOut() {
    this.isLoggedIn = false;
    this.navLogin = false;
    this.initProfile()
    this._router.navigate["/"]
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

  getNotification() {
  
    this.MatchesService.getnotifications(this.uid).subscribe((ref) => {
      ref.forEach((item) => {
     
        this.bellicon.push(item.data())
        this.confirmInterest.push(item.data())
        if (this.bellicon.length > 0) {
          this.belliconone = false
       
        }
        if (item.data().Lastseen == undefined)  {
        console.log(item.data().Lastseen)
          this.notifications = this.confirmInterest.length
     
              }
       else {
          console.log(item.data().Lastseen)
        
        this.notifications = 0
         
        }

       
      });
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
      this.user.Lastseen = this.now
      this.return = this.FormsService.createUserTime(this.user)
        .then(data => {
        });
      this.isLoading = false;
      window.location.reload()
    });
  }


  //Signup Google
  googleSignup() {
    this.isLoading = true;
    this.authService.GoogleAuthSignup().then(data => {
      this.user.Lastseen = this.now
      this.return = this.FormsService.createUserTime(this.user)
        .then(data => {
        });
      this.isLoading = false;
      this.initProfile()
      window.location.reload()
    });
  }



  signIn(email, pass) {
    this.isLoading = true;

    this.authService.SignIn(email, pass).then(data => {
      this.isLoading = false;
      this.user.Lastseen = this.now

      this.return = this.FormsService.createUserTime(this.user)
        .then(data => {

        });
      this.isLoading = false;
      this.initProfile()
      window.location.reload()
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
          this.user.Lastseen = this.now
          this.return = this.FormsService.createUserTime(this.user)
            .then(data => {
            });
          if (this.user != null) {
            this.isLoading = false;
            this.initProfile()
            window.location.reload()
          }
          else {
            this.isLoading = false
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
      this.user = JSON.parse(localStorage.getItem("user"));
      this.uid = this.user.uid;
      this.NotificationService.getnotifications(this.uid).subscribe((ref) => {
        ref.forEach((item) => {
          this.confirmInterests.push({ Detail: item.data(), id: item.id });
        });
      });

      this.notificationoverlay = true

    }
    else if (this.notificationoverlay == true) {
      this.notificationoverlay = false


    }

  }
  closenotifiation() {
    this.notificationoverlay = false
  }
  initProfile() {
    this.users = JSON.parse(localStorage.getItem("user"));
    if (this.users != null) {
      this.uid = this.users.uid;
      this.getNotification();
    }
  }



  getDocid(id, propertyId, time, userId, viewed, now, Type) {

    this.notificationoverlay = false
    this.getNotification()


    this.Notification = {

      propertyId: propertyId,
      time: time,
      userId: userId,
      viewed: viewed,
      Lastseen: now,
      Type: Type
    }

    this._router.navigate(["/mymatches"])

    this.Notification.Lastseen = this.now
    this.return = this.NotificationService.createDateCustomer(this.uid, id, this.Notification).then(data => {


    })

  }
  notificationItems() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uid = this.user.uid;
    this.NotificationService.getnotifications(this.uid).subscribe((ref) => {
      ref.forEach((item) => {
    
          this.confirmInterests.push({ Detail: item.data(), id: item.id });
      
        
      });
    });
  }
  bellone() {
    this.notificationoverlay = true
    this.bellicontwo = true;
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uid = this.user.uid;
    this.confirmInterests =[]
    this.NotificationService.getnotifications(this.uid).subscribe((ref) => {
      ref.forEach((item) => {
          this.confirmInterests.push({ Detail: item.data(), id: item.id });

      });
      console.log(this.confirmInterests)
    });
  }
  belltwo()
  {
    
      this.notificationoverlay = false
      this.user = JSON.parse(localStorage.getItem("user"));
      this.uid = this.user.uid;
      this.confirmInterests = null
      this.NotificationService.getnotifications(this.uid).subscribe((ref) => {
        ref.forEach((item) => {
          this.confirmInterests = null
  
        });
      });
      this.bellicontwo = false
  }
 
}
