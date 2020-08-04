import { Component, OnInit } from '@angular/core';

import { agentSignup } from '../../Model/agentSignup';
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "./../../auth.service";
import { StateServiceService } from "./../../state-service.service"
import {FormsService } from "./../Property/fillFormBuyer/fillFormBuyer.service"

@Component({
  selector: 'app-agent-signup',
  templateUrl: './agent-signup.component.html',
  styleUrls: ['./agent-signup.component.css']
})
export class AgentSignupComponent implements OnInit {

  Postcodes:any[]= [{ Postcode:''}];
  return: any;
  isAgentSelected:boolean=false;
  userData: any;
 
  agentSignup: agentSignup = new agentSignup();
  isLoggedIn: Boolean = true;
  myForm: any;
  _fb: any;

  constructor(

    public authService: AuthService,
    public afAuth: AngularFireAuth,
    private stateService: StateServiceService,
    private formsService: FormsService,
  ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem("user", JSON.stringify(this.userData));
        this.LoggedIn();
      } else {
        localStorage.setItem("user", null);
        this.LoggedOut();
      }
    });

  }
  // addPostcodes()
  // {
  //   this.Postcodes.push({Postcode:""});

  // }
  // submitForm() {
  //   this.stateService.agentSignup = this.agentSignup;
  //   this.isAgentSelected = true;
  //   this.return = this.AgentSignupServicee
  //     .createAgentCustomer(this.userData.uid, this.agentSignup)
  //     .then(data => {
  //       if (data == true) {
  //         this.isAgentSelected = false;
         
  //       }
  //     });
  // }
  private LoggedIn() {
    this.isLoggedIn = true;
  }
  private LoggedOut() {
    this.isLoggedIn = false;
  }


}
