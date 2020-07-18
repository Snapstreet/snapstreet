import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from "@angular/fire/firestore";
import {agentSignup} from "../../../Model/agentSignup";
import {expressMatches}  from "../../../Model/matchesExpress";
import { matchesSeller } from "../../../Model/matchesSeller";
import {notification} from "../../../Model/notification";
import { matchesBuyer } from "../../../Model/matchesBuyer";
@Injectable({
  providedIn: 'root'
}) 
export class SelectAgentService {

agentRef: AngularFirestoreCollection<agentSignup> = null;
  agentcollectionRef: any;
  return: any;
  expressInterestRef: AngularFirestoreCollection<expressMatches> = null;
  notificationMatchesRef:AngularFirestoreCollection<notification>=null;
  dbnotification ="notification";
  Interest: any;
  customersRef:any;
  
  constructor(private db: AngularFirestore) { 
    this.agentRef = db.collection("agentSignup");
    this.agentcollectionRef = db.collectionGroup("agents");
    this.customersRef = db.collection(this.dbnotification);
  }
  getAgent(uid)
  {
    return this.agentcollectionRef.get()
  }
  async ExpressInterest(uid, propertyId) {
    this.return = await this.db
      .collection("expressMatches")
      .doc(uid)
      .collection("MatchesExpress")
      .add({ propertyId: propertyId })
      .then(function (data) {
        console.log("expressInterest Document seller successfully written!");
      });
    return true;
  }

  async createNotification(UserId, customer: notification) {
    this.return = await this.db
      .collection("notification")
      .doc(UserId)
      .collection("Received")
      .add({ ...customer })
      .then(function(data) {
        console.log("Document successfully written!");
      });
    return true;
  }



//create Database Buyer Matches
async matchesSellerCreate(key, customer: matchesSeller) {
  this.return = await this.db
    .collection("matchesSeller")
    .doc(key)
    .collection("matches")
    .add({ ...customer })
    .then(function (data) {
      console.log("Document successfully written!");
    });
  return true;
}
getMatchesSellerProperties(uid): any {
  return this.db
    .collection("matchesBuyer")
    .doc(uid)
    .collection("matches")
    .ref.get();
}
async matchesBuyerCreate(key, customer: matchesBuyer) {
  this.return = await this.db
    .collection("matchesBuyer")
    .doc(key)
    .collection("matches")
    .add({ ...customer })
    .then(function (data) {
      console.log("matchesBuyer successfully written!");
    });
  return true;
}
}
  
