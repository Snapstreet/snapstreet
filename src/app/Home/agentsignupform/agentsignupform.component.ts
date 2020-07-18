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
  
  agentSignup: agentSignup = new agentSignup();
  users: any;
  ref: any;
  task: any;
  bytesTransferred:any
  uploadProgress: Observable<number>;
  image: any;
  constructor(    public authService: AuthService,
    public afAuth: AngularFireAuth,
    private stateService: StateServiceService,
    public AgentSignupService:AgentSignupService,
    private dialog: MatDialog,
    private afStorage: AngularFireStorage
    ) { }

  ngOnInit() {
    this.loggedIn =false
    this.users = JSON.parse(localStorage.getItem("user"));
    if(this.users == null)
    {
      this.loggedIn =false
    }
    else
    {
      this.uid = this.users.uid;
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
      }
    });
  }
  private LoggedIn() {
    this.loggedIn = true;
    
  }
  private LoggedOut() {
    this.loggedIn = false;
  }
 submitForm() {
    this.stateService.agentSignup = this.agentSignup;
    this.image=this.task.uploadUrl_
    this.return = this.AgentSignupService
   
      .createAgentCustomer(this.uid, this.agentSignup)
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
  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref= this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    console.log(this.task.uploadUrl_)
    console.log(this.task)
  }
}
