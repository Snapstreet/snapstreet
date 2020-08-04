import { Injectable, EventEmitter } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { listingBuyer } from "../../../Model/listingBuyer";
import {User} from '../../../shared/services/user';
import {buyerUser} from '../../../Model/buyerUser';
import {
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import {notification} from '../../../Model/notification'
@Injectable({
  providedIn: "root"
})
export class FormsService {
  private dbPath = "listingBuyer"; 
  private dbUserPath ="buyerUser";
  private dbnotification ="notification";
  userData: any;
  dataSavedEventEmitter = new EventEmitter<string>();
  return: any;
  user:any;
  ouputUser:any;
  customersRef: AngularFirestoreCollection<listingBuyer> = null;
  listingUserRef: AngularFirestoreCollection<buyerUser> = null;
  UserRef: any;
 userCollection:any;
  userDetail:any;
  now: Date = new Date();
  notificationref: AngularFirestoreCollection<unknown> = null;
  
  constructor(private db: AngularFirestore) {
    this.customersRef = db.collection(this.dbPath);
 this.listingUserRef = db.collection(this.dbUserPath);



this.userCollection = db.collection("users")
 this.userDetail = db.collectionGroup("${user.uid}");


 //Notification DB
 this.notificationref = db.collection(this.dbnotification);
  }



//Create Customer Notification
async notificationCustomer(key, customer: notification) {
  this.return = await  this.notificationref
    .doc(key)
    .collection("")
    .add({ ...customer })
    .then(function(data) {
      console.log("Document successfully written!");
    });
  return true;
}



//Create Customer ListingBuyer
  async createCustomer(key, customer: listingBuyer) {
    this.return = await this.customersRef
      .doc(key)
      .collection("requirements")
      .add({ ...customer })
      .then(function(data) {
        console.log("Document successfully written!");
      });
    return true;
  }


  createUserCustomer(user) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`)
    const userData: any = {
      uid: user.uid,
      email: user.email,
      Name :user.Name,
      DOB :user.DOB,
      Phone:user.Phone,
      title:user.title="Mr",
      Lastseen:this.now
    };
    return userRef.set(userData, {
      merge: true,
  
    });
    

  }
  createUserTime(user) {
  
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`)
    const userData: any = {
      Lastseen:user.Lastseen
    };
    return userRef.set(userData, {
      merge: true,
  
    });
    

  }
  userupate(user) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`)
    const userData: any = {
      uid: user.uid,
      email: user.email,
      Name :user.Name,
      DOB :user.DOB,
      Phone:user.Phone,
      title:user.title="Mr",
      Currentaddress:user.Currentaddress,
      prefrence:user.prefrence,
 
    };
    return userRef.set(userData, {
      merge: true,
  
    });
  }
  getUser(uid): any {
    return this.userCollection.get();
  }
 

  updateCustomer(key: string, value: any): Promise<void> {
    return this.userCollection.doc(key).update(value);
  }

  deleteCustomer(key: string): Promise<void> {
    return this.customersRef.doc(key).delete();
  }

  getCustomersList(listingBuyer): AngularFirestoreCollection<listingBuyer> {
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
}
