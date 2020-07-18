import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import {expressMatches} from "../../Model/matchesExpress";
import {notification} from "../../Model/notification"
@Injectable({
  providedIn: "root"
})
export class MyMatchesService {
  customersRef: any;
  propertiesRef: any;
  expressInterestRef: AngularFirestoreCollection<expressMatches> = null;
  return: void;
  dbnotification ="notification";
  constructor(private db: AngularFirestore) {
    this.customersRef = db.collection(this.dbnotification);
  }

  getMatchesSellerProperties(uid): any {
    return this.db
      .collection("matchesBuyer")
      .doc(uid)
      .collection("matches")
      .ref.get();
  }
  getMatchesBuyerProperties(uid): any {
    return this.db
      .collection("matchesSeller")
      .doc(uid)
      .collection("matches")
      .ref.get();
  }

  ExpressInterest(uid) {
    return this.db
      .collection("expressMatches")
      .doc(uid)
      .collection("MatchesExpress")
      .get();
  }

  async createNotification(key, customer: notification) {
    this.return = await this.customersRef
      .doc(key)
      .collection("notification")
      .add({ ...customer })
      .then(function(data) {
        console.log("Document successfully written!");
      });
    return true;
  }
  getnotifications(uid): any {
    return  this.db.collection("notification").doc(uid).collection("Received").get();
  }
}

