import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { matchesBuyer } from "../../../Model/matchesBuyer";
import { matchesSeller } from "../../../Model/matchesSeller";
import {notification} from "../../../Model/notification"
@Injectable({
  providedIn: 'root'
})
export class SellerMatchesService {
  return:any
  constructor(private db: AngularFirestore) { }

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
  getMatchesSellerProperties(uid): any {
    return this.db
      .collection("matchesBuyer")
      .doc(uid)
      .collection("matches")
      .ref.get();
  }
}
