import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { listingSeller } from "../../../Model/listingSeller";
import { User } from "../../../shared/services/user";
import {
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import {notification} from '../../../Model/notification'

@Injectable({
  providedIn: 'root'
})
export class EditListingSellerService {
  private dbPath = "listingSeller";
  private selleruserdbPath ="user";
   customersRef: AngularFirestoreCollection<listingSeller> = null;
   userCollection:any;
   userDetail:any;
   return: void;
   private dbnotification ="notification";
   notificationref: AngularFirestoreCollection<unknown> = null;
   constructor(private db: AngularFirestore) {
    this.customersRef = db.collection(this.dbPath);
    this.userCollection = db.collection("users")
    this.userDetail = db.collectionGroup("${user.uid}");

     //Notification DB
 this.notificationref = db.collection(this.dbnotification);
  }

  //Create Customer Notification
async notificationCustomer(key, customer: notification) {
  this.return = await  this.notificationref
    .doc(key)
    .collection("seller")
    .add({ ...customer })
    .then(function(data) {
      console.log("Document successfully written!");
    });
  return true;
}

  createUserCustomer(user) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`)
    const userData:any = {
      uid: user.uid,
      email: user.email,
      Name :user.Name,
      DOB :user.DOB,
      Phone:user.Phone,
      title:user.title="Mr",
      Currentpostcode:user.Currentpostcode,
      Currentaddress:user.CurrentAddress,
      CurrentTowncity:user.CurrentTown,
      Currentstate:user.Currentstate,
    };
    return userRef.set(userData, {
      merge: true
    });
  }
  getUser(uid): any {
    return this.userCollection.get();
  }

  updateCustomer(key: string, value: any): Promise<void> {
    return this.customersRef.doc(key).update(value);
  }

  deleteCustomer(key: string): Promise<void> {
    return this.customersRef.doc(key).delete();
  }

  getCustomersList(): AngularFirestoreCollection<listingSeller> {
    return this.customersRef;
  }

  deleteAll() {
    this.customersRef.get().subscribe(
      querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.delete();
        });
      },
      error => {
        console.log("Error: ", error);
      }
    );
  }

  //Create Customer ListingBuyer
  async createCustomer(uid,docid,listingBuyer) {
    return  this.db
        .collection("listingSeller")
       .doc(uid)
       .collection("properties")
       .doc(docid)
       .set(Object.assign({},listingBuyer))
       .then(function(data) {
         console.log("Document successfully written!");
       });
     return true;
   }
   
}
