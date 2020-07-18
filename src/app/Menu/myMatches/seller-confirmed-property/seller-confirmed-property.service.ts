import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
@Injectable({
  providedIn: 'root'
})
export class SellerConfirmedPropertyService {
  return: any;

  constructor(private db: AngularFirestore) { }


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
}
