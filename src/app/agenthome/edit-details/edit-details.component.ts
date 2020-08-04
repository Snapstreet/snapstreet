import { Component, OnInit } from '@angular/core';
import {AgenthomeService}  from "../agenthome.service";
import {agentSignup} from "../../Model/agentSignup"
@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css']
})
export class EditDetailsComponent implements OnInit {

  agents = []
  loggedIn:boolean = false
  user: any;
  uid: any;
  docid: any;
  agentSignup = {};
  constructor(public AgenthomeService:AgenthomeService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    if(this.user != null)
    {
      this.uid  = this.user.uid
    }
    this.AgenthomeService.getAgent(this.uid).subscribe((ref) => {
      ref.forEach(elements => {
        
      if(this.uid = elements.data().uid)
      {
        this.docid = elements.id
        this.agents = elements.data()
        console.log(this.agents)
      }
      })
    
    })
  
  }

//  editUserDetail()
//  {
//    this.agentSignup = this.agents
//    this.AgenthomeService.createCustomer(this.uid,this.docid,this.agentSignup).then(data =>{

//    })
//  }




}

