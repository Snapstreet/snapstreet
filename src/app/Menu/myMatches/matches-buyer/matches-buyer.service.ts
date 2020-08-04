import { Injectable } from '@angular/core';
import {expressMatches}  from "../../../Model/matchesExpress";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import {notification} from "../../../Model/notification";

import { matchesBuyer } from "../../../Model/matchesBuyer";
import { matchesSeller } from "../../../Model/matchesSeller";
@Injectable({
  providedIn: 'root'
})
export class MatchesBuyerService {
  return: any;
  expressInterestRef: AngularFirestoreCollection<expressMatches> = null;
  notificationMatchesRef:AngularFirestoreCollection<notification>=null;
  dbnotification ="notification";
  Interest: any;
  customersRef:any;
  constructor(private db: AngularFirestore) {
    this.expressInterestRef = db.collection("expressMatches");
    this.Interest = db.collectionGroup("MatchesExpress");
    this.customersRef = db.collection(this.dbnotification);
   }
 

  async ExpressInterest(uid, propertyId) {
    this.return = await this.db
      .collection("expressMatches")
      .doc(uid)
      .collection("MatchesExpress")
      .add({ propertyId: propertyId })
      .then(function (data) {
        console.log("expressInterest Document Buyer successfully written!");
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
  getMatchesSellerProperties(uid): any {
    return this.db
      .collection("matchesSeller")
      .doc(uid)
      .collection("matches")
      .ref.get();
  }
  async matchesBuyerCreate(key, customer: matchesSeller) {
    this.return = await this.db
      .collection("matchesSeller")
      .doc(key)
      .collection("matches")
      .add({ ...customer })
      .then(function (data) {
        console.log("matchesBuyer successfully written!");
      });
    return true;
  }
}
