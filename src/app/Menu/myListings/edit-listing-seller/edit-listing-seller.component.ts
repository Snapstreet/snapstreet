import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { listingSeller } from "../../../Model/listingSeller";
import { sellerUser } from "../../../Model/sellerUser";
import { AuthService } from "../../../auth.service";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import {
  VERSION,
  MatDialogRef,
  MatDialog,
  MatSnackBar,
  MAT_DIALOG_DATA,
} from "@angular/material";
import { StateServiceService } from "./../../../state-service.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

import { Config, HttpService } from "./../../../http.service";
import { debounceTime } from "rxjs/operators";
import { switchMap } from "rxjs/operators";
import { of } from "rxjs";
import {
  NativeDateAdapter,
  DateAdapter,
  MAT_DATE_FORMATS,
} from "@angular/material";
import {
  AppDateAdapter,
  APP_DATE_FORMATS,
} from "./../../../Helper/date.adapter";
import { AltertFormDialogComponent } from "../../../Misc/alertFormdialog/alertFormdialog.component";
import { EditListingSellerService } from "./edit-listing-seller.service";
import {FormsService} from "../../../Home/Property/fillFormBuyer/fillFormBuyer.service";
import {EditSellerSubmissionComponent} from "./editSellerSubmission.component"

declare var $: any;
@Component({
  selector: 'app-edit-listing-seller',
  templateUrl: './edit-listing-seller.component.html',
  styleUrls: ['./edit-listing-seller.component.css']
})
export class EditListingSellerComponent implements OnInit {
  public addressianAutoCompleteLooking$: Observable<any> = null;
  public autoCompleteControlLooking = new FormControl();
  public addressianAutoCompleteCurrent$: Observable<any> = null;
  public autoCompleteControlCurrent = new FormControl();
  data: any;
  isLoggedIn: Boolean = false;
  userData: any;
  config: Config;
  listingSeller: listingSeller = new listingSeller();
  sellerUser: sellerUser = new sellerUser();
  submitted = false;
  isLoading: boolean = false;
  return: any;
  version = VERSION;
  ConfirmDetailService: any;
  postcodeFormControl = new FormControl("");
  form: FormGroup;
  signatureFormGroup: any;
  result: any;
  selectedIndex = 0;
  maxNumberOfTabs = 2;
  myControl = new FormControl();
  features = new FormControl();
  applicable: string[] = [
    "any",
    "Garden",
    "Driveway",
    "Period Features",
    "Garage",
    "Gated Community",
    "Loft Conversion",
    "Conservatory/Sun room",
    "Granny Annexe",
    "Rear Extension"
  ];
  user: any;
  useremail: any;
  uid: any;
  postcodeCoordinates: any;
  name: any;
  email: any;
  password: any;
  passs: any;
  emails: any;
  boolean: boolean;
  newUser: boolean = false;
  DOB: string;
  age: any;
  userPasswordRegister: any;
  model: any = {};
  loading = false;
  returnUrl: string;
  overlay: boolean = false;
  pass: any;
  displayName: any;
  userEmailRegister: any;
  sub: any;
  Currentpostcode:any;
  Lookpostcode: string;
  Lookaddress: string;
  LookTown: string;
  Lookstate: string;
  Country: any;
  Property: any;
  Rooms: any;
  Amount: any;
  Ownership: string;
  Bathrooms: any;
  Reception: any;
  Condition: any;
  Features: any;
  Cpostcode: string;
  country: any;
  docid: any;
  sellOption:boolean =true;
  letOption:boolean;
   filter: any;
   rent:any;
   buy:any;
   maxamounts:boolean =false

  constructor(  public authService: AuthService,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth,
    private router: Router,
    private stateService: StateServiceService,
    private sellerService: HttpService,
    private dialog: MatDialog,
    private SellerformService: EditListingSellerService,
    private fillFormsService: FormsService,
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private postcodeService: HttpService,) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uid = this.user.uid;
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem("user", JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem("user"));
        this.LoggedIn();
      } else {
        localStorage.setItem("user", null);
        JSON.parse(localStorage.getItem("user"));
        this.LoggedOut();
      }
    });

    // The auto population of github method
    this.addressianAutoCompleteLooking$ = this.autoCompleteControlLooking.valueChanges.pipe(
      startWith(""),
      // delay emits
      debounceTime(1000),
      // use switch map so as to cancel previous subscribed events, before creating new once
      switchMap((value) => {
        if (value !== "") {
          this.lookup(this.listingSeller.Lookingpostcode).subscribe((data) => {
            this.data = data;
          });

          return this.lookup(this.listingSeller.Lookingpostcode);
        } else {
          return of(null);
        }
      })
    );
    // End method
    this.addressianAutoCompleteCurrent$ = this.autoCompleteControlCurrent.valueChanges.pipe(
      startWith(""),
      // delay emits
      debounceTime(1000),
      // use switch map so as to cancel previous subscribed events, before creating new once
      switchMap((value) => {
        if (value !== "") {
          this.lookup(this.listingSeller.Currentpostcode).subscribe((data) => {
            this.data = data;
          });

          return this.lookup(this.listingSeller.Currentpostcode);
        } else {
          return of(null);
        }
      })
    );

    

    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      this.listingSeller.Lookingpostcode= params.get("Lookingpostcode");
      this.listingSeller.LookingAddress = params.get("LookingAddress");
      this.listingSeller.LookingTown = params.get("LookingTown");
      this.listingSeller.Lookingstate= params.get("Lookingstate");
      this.listingSeller.Country =  params.get("Country");
       this.listingSeller.PropertyType= params.get("PropertyType");
      this.listingSeller.Maxrooms  = params.get("Maxrooms");
      this.listingSeller.MaxAmount = params.get("MaxAmount");
      this.listingSeller.ownership  = params.get("ownership");
      this.listingSeller.Maxbathrooms  = params.get("Maxbathrooms");
      this.listingSeller.Maxreception  = params.get("Maxreception");
      this.listingSeller.PropertyCondition = params.get("PropertyCondition")
      this.Features= params.get("features");
      this.listingSeller.Country = params.get("Country")
      this.docid = params.get("sellerId");
      this.listingSeller.PropertyFor = params.get("PropertyFor")
    });

    this.lookingLatLong();
  }

  private LoggedIn() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uid = this.user.uid;

    this.SellerformService.getUser(this.uid).subscribe((ref) => {
      ref.forEach((element) => {
        if (element.data().uid == this.uid) {
          this.user.Name = element.data().Name
          this.user.Email = element.data().email
          this.user.DOB = element.data().DOB.toDate()
          this.user.Phone = element.data().Phone
          this.user.title = element.data().title
          this.user.Currentpostcode=element.data().Currentpostcode
          this.user.CurrentAddress = element.data().Currentaddress
          this.user.CurrentTown = element.data().CurrentTowncity
          this.user.Currentstate = element.data().Currentstate
          console.log(element.data().Name)
        }
      });
    });
    this.isLoggedIn = true;
  }
  private LoggedOut() {
    this.isLoggedIn = false;
  }
  newCustomer(): void {
    this.submitted = false;
    this.listingSeller = new listingSeller();
  }

  onSubmit() {
    this.isLoading = true;
    this.postcodeService.getLat(this.listingSeller.Lookingpostcode.trim()).subscribe(data => {
      this.postcodeCoordinates = data;
      
      (this.listingSeller.longitude = this.postcodeCoordinates.result.longitude),
      (this.listingSeller.latitude = this.postcodeCoordinates.result.latitude),
      (this.listingSeller.UserId = this.userData.uid)
      console.log(this.postcodeCoordinates)
    
    });
    this.listingSeller.UserId = this.userData.uid
    this.isLoading = true;
    this.listingSeller.longitude,
  this.listingSeller.latitude,
    this.listingSeller.username =  this.user.Name,
  this.listingSeller.usertitle = this.user.title
    this.return = this.SellerformService.createCustomer(this.uid,this.docid,this.listingSeller).then(data => {
       
      this.isLoading = false
         const dialogRef = this.dialog.open(
          EditSellerSubmissionComponent,
          {
            data: {
              message: "HelloWorld",
              buttonText: {
                cancel: "Done"
              }
            }
          }
        );
      });
    }
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);
  phoneFormControl = new FormControl("", [
    Validators.required,
    Validators.maxLength(10),
    Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
  ]);
  FirstnameFormControl = new FormControl("", [
    Validators.required,
    Validators.maxLength(15),
  ]);
  LastnameFormControl = new FormControl("", [
    Validators.required,
    Validators.maxLength(15),
  ]);
  EmailFormControl = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);
  AddressFormControl = new FormControl("", [
    Validators.required,
    Validators.maxLength(15),
  ]);
  TownFormControl = new FormControl("", [
    Validators.required,
    Validators.maxLength(15),
  ]);
  stateFormControl = new FormControl("", [
    Validators.required,
    Validators.maxLength(15),
  ]);

  addressnameFormControl = new FormControl("", [
    Validators.required,
    Validators.maxLength(6),
  ]);
  noroomsFormControl = new FormControl("", [
    Validators.required,
    Validators.maxLength(2),
  ]);
  DOBFormControl = new FormControl("", [Validators.required]);

  lookup(value): Observable<any> {
    return this.sellerService.search(value);
  }
  selectTab(nextIndex: number, presentIndex: number): void {

    if (presentIndex == 0) {
      if (this.user.Name == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please Enter Full Name" },
        });
      }

      else if (this.user.Email == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please Enter Email" },
        });
      }
      else if (Math.floor(Math.abs(Date.now() - new Date(this.user.DOB).getTime()) / (1000 * 3600 * 24) / 365.25)
        < 18) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "You need to be over 18 to register on this website" },
        });
      }

      else if (this.user.Phone == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please enter Phone number" },
        });
      }
      if (this.user.Currentpostcode == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please Enter Current Postcode" },
        });
      }
      else if (this.user.CurrentAddress == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please Enter Your Current Address" },
        });
      }
      else if (this.user.CurrentTown == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please Enter Your Current Town" },
        });
      }
      else if (this.user.Currentstate == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please Enter Your Current State" },
        });
      }
      else {
        this.userDetail()
        this.selectedIndex = nextIndex;

      }

    } else if (presentIndex == 1) {

      if (nextIndex > presentIndex) {
        if(this.maxamounts == false)
        {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please select property" },
          });
        }
      

        else if (this.listingSeller.Lookingpostcode == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Enter Your Looking Postcodes" },
          });
        }

        else if (this.listingSeller.LookingAddress == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Enter Your Looking Address" },
          });
        }
        else if (this.listingSeller.LookingTown == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Enter Your Looking Town" },
          });
        }
        else if (this.listingSeller.Lookingstate == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Enter Your Looking State" },
          });
        }
        else if (this.listingSeller.Country== null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Enter Your Country" },
          });
        }

        
        else if (this.listingSeller.PropertyType == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Enter Your Property Type" },
          });
        }

        else if (this.listingSeller.Maxrooms == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Select Maximum of Rooms" },
          });
        }
 

        else if (this.listingSeller.MaxAmount == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Select Maximum Amount" },
          });
        }
      
        else if (this.listingSeller.ownership == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Select Ownership" },
          });
        }
     
       else {

          this.onSubmit() 

        }

      } 

    } 

  }
  // getPosts(value) {
  //   this.listingSeller.CurrentAddress = value.address;
  //   this.listingSeller.CurrentTown = value.citytown;
  //   this.listingSeller.Currentstate = value.county;
  //   this.listingSeller.Currentpostcode = value.postcode;
  //   console.log(value);
  // }
  getPost(value) {
    this.listingSeller.LookingTown = value.citytown;
    this.listingSeller.Lookingstate = value.county;
    this.listingSeller.Lookingpostcode = value.postcode;
    this.listingSeller.LookingAddress = value.address;
    console.log(value);
  }
  getSame(listingSeller) {
    this.listingSeller.LookingTown = this.user.CurrentTown;
    this.listingSeller.Lookingstate = this.user.Currentstate;
    this.listingSeller.Lookingpostcode = this.user.Currentpostcode;
    this.listingSeller.LookingStreetname = this.user.CurrentTown;
    this.listingSeller.LookingAddress = this.user.CurrentAddress;
    console.log(listingSeller);
  }


  openAlertDialog() {
    const dialogRef = this.dialog.open(AltertFormDialogComponent, {
      data: {
        message: "HelloWorld",
        buttonText: {
          cancel: "Done",
        },
      },
    });
  }
  userDetail() {
    console.log(this.user)
 
    this.return = this.SellerformService.createUserCustomer(this.user)
      .then(data => {
        console.log(data);
      });
  }





  //Login Form


  facebookLogin() {
    this.isLoading = true;
    this.authService.FacebookAuth().then((data) => {
      this.isLoading = false;
    });
  }

  //SignIn Google
  googleLogin() {
    this.isLoading = true;
    this.authService.GoogleAuth().then((data) => {
      this.isLoading = false;
    });
  }

  //Signup Google
  googleSignup() {
    this.isLoading = true;
    this.authService.GoogleAuthSignup().then((data) => {
      this.isLoading = false;
    });
  }

  signIn(email, pass) {
    console.log(email + pass);
    this.isLoading = true;
    this.authService.SignIn(email, pass).then((data) => {
      this.isLoading = false;
    });
  }

  NewUser() {
    this.newUser = true;
  }

  OldUser() {
    this.newUser = false;
  }
  close() {
    this.newUser = false;
    this.newUser = false;
  }

  signUp(displayName, email, pass) {
    console.log(displayName)
    
    this.authService.SignUp(email, pass).then((data) => {
      this.isLoading = false;
      this.user.Name = displayName;
      this.user.DOB = null;
      this.user.Phone = null;

      this.return = this.fillFormsService.createUserCustomer(this.user).then(
        (data) => {
          this.overlay = true;
          console.log(data);

        }
      );
    });
  }

  userNew() {
    this.user.DOB = null;
    this.user.Phone = null;
    this.user.name;
    this.return = this.fillFormsService.createUserCustomer(this.user).then(
      (data) => {
        console.log(data);
      }
    );
  }
  continueClose() {
    this.overlay = false;
  }

  keyDownFunction(event) {
    if (event.keyCode == 13) {
      this.signUp(this.name, this.email, this.password);
    }
  }

  saves() {

    this.signIn(this.emails, this.passs);
  }
  radioChange(event) {
    this.filter = event.value;
    if(this.filter == "buy")
    {
      this.maxamounts = true
      this.letOption = false
      this.sellOption = true
    }
    if(this.filter == "rent")
    {
      this.maxamounts = true
      this.sellOption = false;
      this.letOption = true
    }
}

lookingLatLong()

{  
  this.postcodeService.getLat(this.listingSeller.Lookingpostcode.trim()).subscribe(data => {
  this.postcodeCoordinates = data;
  
  (this.listingSeller.longitude = this.postcodeCoordinates.result.longitude),
  (this.listingSeller.latitude = this.postcodeCoordinates.result.latitude),
  (this.listingSeller.UserId = this.userData.uid)
  console.log(this.postcodeCoordinates)

});
}
}
