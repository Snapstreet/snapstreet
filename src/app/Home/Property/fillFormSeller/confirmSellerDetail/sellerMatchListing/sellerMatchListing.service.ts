import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class SellerMatchListingService {
  customersRef: any;
  propertiesRef: any;
  Userref:any;
  InterestRef: AngularFirestoreCollection<unknown>;
  Interest: any;
  constructor(private db: AngularFirestore) {
    this.customersRef = db.collection("listingSeller");
    // Collection Group
    this.propertiesRef = db.collectionGroup("requirements");
    this.Userref=db.collection("users");
    
    //Express Interest
    this.InterestRef = db.collection("expressInterest");
    this.Interest = db.collectionGroup("Express");
  }
  getSellerProperties(uid): any {
    return this.propertiesRef.get();
  }
 

  getUser(uid):any{
    return this.Userref.get();
  }
  
  ExpressInterest(uid) {
    return this.db
      .collection("expressInterest")
      .doc(uid)
      .collection("Express")
      .get();
  }
}
