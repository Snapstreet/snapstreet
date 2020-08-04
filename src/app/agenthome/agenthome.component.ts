import { Component, OnInit } from '@angular/core';
import { flatMap } from 'rxjs/operators';
import { AgenthomeService} from "./agenthome.service";
import {AuthService} from "../auth.service"
import { AngularFireAuth } from "@angular/fire/auth";


@Component({
  selector: 'app-agenthome',
  templateUrl: './agenthome.component.html',
  styleUrls: ['./agenthome.component.css']
})
export class AgenthomeComponent implements OnInit {
  agents = []
 
  user: any;
  uid: any;
  agentsBuyer = [];
  agentsSeller = [];
  agentNew = [];
  loggedIn:boolean = false
  signUp: any;
  password: any;
  name: any;
  email: any;
  userData: any;
  constructor(public AgenthomeService:AgenthomeService,public authService:AuthService,   public afAuth: AngularFireAuth,) { }

  ngOnInit() {
    this.userLogged()
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem("user", JSON.stringify(this.userData));
        this.loggedIn = true

      } else {
        localStorage.setItem("user", null);
        this.loggedIn = false
      }
    });
  this.items()

 


  }
 //SignIn Google
 googleLogin() {

  this.authService.GoogleAuth().then((data) => {
    this.loggedIn = true
    this.userLogged()
    this.items()
  });
}

//Signup Google
googleSignup() {
  
  this.authService.GoogleAuthSignup().then((data) => {
  this.loggedIn = true
  this.items()
  this.userLogged()
  });
}

signIn(email, pass) {
  console.log(email + pass);
  
  this.authService.SignIn(email, pass).then((data) => {

    this.items()
   
    this.userLogged()
  
  });
}

keyDownFunction(event) {
  if (event.keyCode == 13) {
    this.signUp(this.name, this.email, this.password);
  }
}


items()
{
  this.AgenthomeService.getAgent(this.uid).subscribe((ref) => {
    ref.forEach(elements => {
   
      this.agentNew.push(elements.data())
      if(this.uid == elements.data().uid)
      {
        this.agents = elements.data()
      }
    })
  
  });

  this.AgenthomeService.getAgentBuyer(this.uid).subscribe((ref) => {

    ref.forEach(element => {

      if(this.uid == element.data().uid)
      {
      this.agentsBuyer.push(element.data())
      }
    })
  
  })

  this.AgenthomeService.getAgentSeller(this.uid).subscribe((ref) => {
    ref.forEach(element => {
      if(this.uid == element.data().uid)
      {
      this.agentsSeller.push(element.data())
      }
    })
  
  })
}

userLogged()
{
  this.user = JSON.parse(localStorage.getItem("user"));
  if(this.user != null)
  {
    this.uid  = this.user.uid
    this.loggedIn = true
  }
}

}
