import { Injectable, NgZone } from "@angular/core";
import { User } from "./shared/services/user";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Location } from "@angular/common";
import { buyerUser } from './Model/buyerUser';
@Injectable({
  providedIn: "root"
})
export class AuthService {
  Name: string;
  user: any;
  displayName: any;
  userData: any; // Save logged in user data
  logout() {
    throw new Error("Method not implemented.");
  }


  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private _location: Location
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {

        this.userData = user;
        localStorage.setItem("user", JSON.stringify(this.userData));
      } else {
        localStorage.setItem("user", null);
      }
    });
  }

  // Sign in with email/password
  async SignIn(email, password) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(
        email,
        password
      );
      this.ngZone.run(() => {
        
      });
     // this.SetUserData(result.user);
    } catch (error) {
      window.alert("incorrect username/password");
    }
  }

  // Sign up with email/password
  async SignUp(email,password) { 
  
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(email,password);
      this.SetUserData(result.user);
    } 
    catch (error) {
      window.alert(error.message);
    }
  }

  // Send email verfificaiton when new user sign up
  // async SendVerificationMail() {
  //   await this.afAuth.auth.currentUser.sendEmailVerification();
  //   this.router.navigate(["verify-email-address"]);
  // }

  // Reset Forggot password
  async ForgotPassword(passwordResetEmail) {
    try {
      await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
      window.alert("Password reset email sent, check your inbox.");
    } catch (error) {
      window.alert(error);
    }
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }
   // Sign in with Google
   GoogleAuthSignup() {
    return this.AuthSignup(new auth.GoogleAuthProvider());
  }
  // Sign in with Google
  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }

  // Auth logic to run auth providers
  async AuthLogin(provider) {
    try {
      const result = await this.afAuth.auth.signInWithPopup(provider);
      this.ngZone.run(() => {
      });
    } catch (error) {
      window.alert(error);
    }
  }
  async AuthSignup(provider) {
    try {
      const result = await this.afAuth.auth.signInWithPopup(provider);
      this.ngZone.run(() => {
        this.SetUserData(result.user);
      });
    } catch (error) {
      window.alert(" incorrect username/password needs to change");
    }
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData:any= {
      uid: user.uid,
      email: user.email,
      Name :user.displayName,
   

    };
    return userRef.set(userData, {
      merge: true
    });
  }

  // Sign out
  async SignOut() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem("user");
    window.location.reload()
    this.router.navigate(["/"]);
  }

}
