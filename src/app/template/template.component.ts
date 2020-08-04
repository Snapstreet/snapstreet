import { Component, OnInit } from "@angular/core";
import { AuthService } from ".././auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router, ActivatedRoute } from "@angular/router";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { FormsService } from "../Home/Property/fillFormBuyer/fillFormBuyer.service";
@Component({
  selector: "app-template",
  templateUrl: "./template.component.html",
  styleUrls: ["./template.component.css"],
})
export class TemplateComponent implements OnInit {
  uid: any;
  selectedIndex = 0;
  maxNumberOfTabs = 2;
  isLoggedIn: Boolean = true;
  userData: any;
  boolean: boolean;
  isLoading: boolean = false;
  newUser: boolean = false;
  return: any;
  user: any;
  useremail: any;
  DOB: string;
  age: any;
  name: any;
  userPasswordRegister: any;
  model: any = {};
  loading = false;
  returnUrl: string;
  overlay: boolean = false;
  email: any;
  pass: any;
  displayName: any;
  userEmailRegister: any;
  password;
  emails: any;
  passs: any;
  now: Date = new Date();
  constructor(
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private FormService: FormsService
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem("user", JSON.stringify(this.userData));
        this.LoggedIn();
      } else {
        localStorage.setItem("user", null);
        JSON.parse(localStorage.getItem("user"));
        this.LoggedOut();
      }
    });
  }
  private LoggedIn() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uid = this.user.uid;
    this.isLoggedIn = true;
  }
  private LoggedOut() {
    this.isLoggedIn = false;
  }

  facebookLogin() {
    this.isLoading = true;

    this.authService.FacebookAuth().then((data) => {
      this.user.Lastseen = this.now
      this.return = this.FormService.createUserTime(this.user)
        .then(data => {
        });
      this.isLoading = false;
    });
  }

  //SignIn Google
  googleLogin() {
    this.isLoading = true;
    this.authService.GoogleAuth().then((data) => {
      this.user.Lastseen = this.now
      this.return = this.FormService.createUserTime(this.user)
        .then(data => {
        });
      this.isLoading = false;
    });
  }

  //Signup Google
  googleSignup() {
    this.isLoading = true;
    this.authService.GoogleAuthSignup().then((data) => {
      this.user.Lastseen = this.now
      this.return = this.FormService.createUserTime(this.user)
        .then(data => {
        });
      this.isLoading = false;
    });
  }

  signIn(email, pass) {
    console.log(email + pass);
    this.isLoading = true;
    this.authService.SignIn(email, pass).then((data) => {
      this.isLoading = false;
      this.user.Lastseen = this.now
      this.return = this.FormService.createUserTime(this.user)
        .then(data => {
        });
      this.isLoading = false;
    });
  }

  NewUser() {
    this.newUser = true;
  }

  OldUser() {
    this.newUser = false;
  }
  close() {
    this.newUser = false;
    this.newUser = false;
  }

  signUp(displayName, email, pass) {
   console.log(displayName)
    this.overlay = true;
    this.authService.SignUp(email, pass).then((data) => {
      this.isLoading = false;
      this.user.Name = displayName;
      this.user.DOB = null;
      this.user.Phone = null;

      this.return = this.FormService.createUserCustomer(this.user).then(
        (data) => {
          this.user.Lastseen = this.now
          this.return = this.FormService.createUserTime(this.user)
            .then(data => {
            });
          console.log(data);
         
        }
      );
    });
  }

  userNew() {
    this.user.DOB = null;
    this.user.Phone = null;
    this.user.name;
    this.return = this.FormService.createUserCustomer(this.user).then(
      (data) => {
        console.log(data);
      }
    );
  }
  continueClose() {
    this.overlay = false;
  }

  keyDownFunction(event) {
    if (event.keyCode == 13) {
      this.signUp(this.name, this.email, this.password);
    }
  }
  
  saves() {
 
      this.signIn(this.emails, this.passs);
  
  }
  
}
