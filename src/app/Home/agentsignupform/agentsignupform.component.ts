import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "../../auth.service";
import {AgentSignupService} from "../agentsignupform/agentSignup.service";
import { StateServiceService } from "./../../state-service.service";
import { agentSignup } from '../../Model/agentSignup';
import { AlertDialogAgentComponent  } from "./alertDialogagent.component";
import {
  VERSION,
  MatDialogRef,
  MatDialog,
  MatSnackBar,
  MAT_DIALOG_DATA
} from "@angular/material";
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { from, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, startWith, take, ignoreElements } from "rxjs/operators";

import { Router, ActivatedRoute } from "@angular/router";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { FormsService } from "../../Home/Property/fillFormBuyer/fillFormBuyer.service";

@Component({
  selector: 'app-agentsignupform',
  templateUrl: './agentsignupform.component.html',
  styleUrls: ['./agentsignupform.component.css']
})
export class AgentsignupformComponent implements OnInit {
  loggedIn:boolean=false
  userData: any;

  return: any;
  user: any;
  uid: any;
  newUser:boolean = true
  agentSignup: agentSignup = new agentSignup();
  users: any;
  ref: any;

  bytesTransferred:any
  uploadProgress: Observable<number>;
  image: any;
  hide = true;
  Type: string;
  verified: boolean = false;

  basePath = '/images';                       //  <<<<<<<
  downloadableURL :any;                      //  <<<<<<<
  task: any
  isLoading:boolean = false
  name: any;
  Name :any;
  email: any;
  password: any;
  constructor(    public authService: AuthService,
    public afAuth: AngularFireAuth,
    private stateService: StateServiceService,
    public AgentSignupService:AgentSignupService,
    private dialog: MatDialog,
    private afStorage: AngularFireStorage,
 
    private route: ActivatedRoute,
    private router: Router,
    private FormService: FormsService

    ) { }

  ngOnInit() {
  //   this.loggedIn =false
  this.getUserDetail()
   
  //   this.afAuth.authState.subscribe(user => {
  //     if (user) {
  //       this.userData = user;
  //       localStorage.setItem("user", JSON.stringify(this.userData));
  //       this.LoggedIn();
  //     } else {
  //       localStorage.setItem("user", null);
  //       JSON.parse(localStorage.getItem("user"));
  //       this.LoggedOut();
  //     }
  //   });
 }
  private LoggedIn() {
    this.loggedIn = true;
    
  }
  private LoggedOut() {
    this.loggedIn = false;

  }
  
 submitForm() {
  console.log(this.downloadableURL)
    this.stateService.agentSignup = this.agentSignup;
 this.agentSignup.image = this.downloadableURL
 this.agentSignup.uid  = this.uid
    this.return = this.AgentSignupService
   
      .createAgentCustomer(this.uid,this.agentSignup)
      .then(data => {
      
        if (data == true) {
          const dialogRef = this.dialog.open(
            AlertDialogAgentComponent,
            {
              data: {
                message: "HelloWorld",
                buttonText: {
                  cancel: "Done"
                }
              }
            }
          );
        }
      });
  }
  async upload(event) {
this.isLoading = true
    const file = event.target.files[0];
    if (file) {
       const filePath = `${this.basePath}/${file.name}`;  // path at which image will be stored in the firebase storage
       this.task =  this.afStorage.upload(filePath, file);    // upload task
       // this.progress = this.snapTask.percentageChanges();
       (await this.task).ref.getDownloadURL().then(url => {this.downloadableURL = url; });  // <<< url is found here
      } 
      this.isLoading = false
   }
  //   const id = Math.random().toString(36).substring(2);
  //   this.ref= this.afStorage.ref(id);
  //   this.task = this.ref.put(event.target.files[0]);
  //   console.log(this.task.task.uploadUrl_)
  //   console.log(this.task)
  // }
  


  facebookLogin() {
    this.isLoading = true;

    this.authService.FacebookAuth().then((data) => {
      this.isLoading = false;
    });
  }

  //SignIn Google
  googleLogin() {
    this.isLoading = true;
    this.authService.GoogleAuth().then((data) => {
      this.isLoading = false;
    });
  }
     signUp(displayName, email, pass) {
   console.log(displayName)
 
    this.authService.SignUp(email, pass).then((data) => {
      this.isLoading = false;
      this.getUserDetail()
      // this.user.Name = displayName;
      // this.user.DOB = null;
      // this.user.Phone = null;

      // this.return = this.FormService.createUserCustomer(this.user).then(
      //   (data) => {
      //     console.log(data);
      //    this.getUserDetail()
      //   }
      //);
    });
  }

  getUserDetail()
  {
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log(this.user)
    if(this.user == null)
    {
      this.loggedIn =false
    }
    else
    {
      this.uid = this.user.uid;
      this.loggedIn = true
      console.log(this.user)
    }

  }
  keyDownFunction(event) {
    if (event.keyCode == 13) {
      this.signUp(this.name, this.email, this.password);
    }
  }
}
