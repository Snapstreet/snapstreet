import { Injectable } from '@angular/core';

import { AngularFirestore,AngularFirestoreCollection } from "@angular/fire/firestore";
import {agentSignup} from "../Model/agentSignup";

@Injectable({
  providedIn: 'root'
})
export class AgenthomeService {
  agentcollectionRef: any;
  return: any;

  dbnotification ="notification";
  Interest: any;
  customersRef:any;
  agentbuyercollectionRef: any;
  agentsellercollectionRef: any;
  constructor(private db: AngularFirestore) { 
    this.agentcollectionRef = db.collectionGroup("agents");
    this.agentbuyercollectionRef = db.collectionGroup("agentBuyer");
    this.agentsellercollectionRef = db.collectionGroup("agentSeller");
  }

  getAgent(uid)
  {
    return this.agentcollectionRef.get()
  }

  async createCustomer(uid,docid,agentSignup) {
    return  this.db
        .collection("agentSignup")
       .doc(uid)
       .collection("agents")
       .doc(docid)
       .set(Object.assign({},agentSignup))
       .then(function(data) {
         console.log("Document successfully written!");
       });
     return true;
   }

   getAgentBuyer(uid)
   {
     return  this.agentbuyercollectionRef.get()
   }

   getAgentSeller(uid)
   {
     return  this.agentsellercollectionRef.get()
   }

}
