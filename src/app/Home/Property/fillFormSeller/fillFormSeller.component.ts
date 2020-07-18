import { Component, OnInit } from "@angular/core";
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
import { SellerformService } from "./fillFormSeller.service";
import { FormsService } from "../fillFormBuyer/fillFormBuyer.service";

declare var $: any;

@Component({
  selector: "app-fillFormSeller",
  templateUrl: "./fillFormSeller.component.html",
  styleUrls: ["./fillFormSeller.component.css"],
  providers: [
    {
      provide: DateAdapter,
      useClass: AppDateAdapter,
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: APP_DATE_FORMATS,
    },
  ],
})
export class FillFormSellerComponent implements OnInit {
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

  applicable: string[] = [
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
  brake:any = "20,0000"


  constructor(
    public authService: AuthService,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth,
    private router: Router,
    private stateService: StateServiceService,
    private sellerService: HttpService,
    private dialog: MatDialog,
    private SellerformService: SellerformService,
    private fillFormsService: FormsService,
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit() {
console.log(this.brake.replace(/,/g,""))
this.brake.replace(/,/g,"")
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
      this.Lookpostcode = params.get("Lookingpostcode");
      this.Lookaddress = params.get("LookingAddress");
      this.LookTown = params.get("LookingTown");
      this.Lookstate = params.get("Lookingstate");
      this.Country = params.get("Country");
      this.Property = params.get("PropertyType");
      this.Rooms = params.get("Maxrooms");
      this.Amount = params.get("MaxAmount");
      this.Ownership = params.get("ownership");
      this.Bathrooms = params.get("Maxbathrooms");
      this.Reception = params.get("Maxreception");
      this.Condition = params.get("PropertyCondition")
      this.Features= params.get("features");
      this.country = params.get("Country")
      
    });

    if (this.Lookpostcode != ":Lookingpostcode") {
      this.listingSeller.Lookingpostcode = this.Lookpostcode
    }
    if (this.Lookaddress != ":LookingAddress") {
      this.listingSeller.LookingAddress = this.Lookaddress
    }
    if (this.LookTown != ":LookingTown") {
      this.listingSeller.LookingTown = this.LookTown
    }
    if (this.Lookstate != ":Lookingstate") {
      this.listingSeller.Lookingstate = this.Lookstate
    }
    if (this.Country != ":Country") {
      this.listingSeller.Country = this.Country
    }
    if (this.Property != ":PropertyType") {
      this.listingSeller.PropertyType = this.Property
    }
    if (this.Rooms != ":Maxrooms") {
      this.listingSeller.Maxrooms = this.Rooms
    }
    if (this.Amount != ":MaxAmount") {
      this.listingSeller.MaxAmount = this.Amount
    }
   if(this.Ownership!=":ownership")
   {
     this.listingSeller.ownership = this.Ownership
   }

  this.listingSeller.Maxbathrooms = this.Bathrooms



  this.listingSeller.Maxreception = this.Reception


  this.listingSeller.PropertyCondition=this.Condition

  this.listingSeller.features = this.Features

if(this.country != ":Country")
{
  this.listingSeller.Country= this.country
}














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
    // Get Seller variable into local scope for html
    this.stateService.listingSeller = this.listingSeller;
    this.router.navigate(["confirmSellerdetail"]);
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
      else {
        this.userDetail()
        this.selectedIndex = nextIndex;

      }

    } else if (presentIndex == 1) {

      if (nextIndex > presentIndex) {
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
        // else if (this.listingSeller.PropertyCondition == null) {
        //   const dialogRef = this.dialog.open(AltertFormDialogComponent, {
        //     data: { message: "Please Select Property Condition" },
        //   });
        // }
        else if (this.listingSeller.ownership == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Select Ownership" },
          });
        }
        // else if (this.listingSeller.features == null) {
        //   const dialogRef = this.dialog.open(AltertFormDialogComponent, {
        //     data: { message: "Please Select Features" },
        //   });
        // }




        else {

          this.selectedIndex = nextIndex;

        }

      } else {

        this.selectedIndex = nextIndex;

      }

    } else if (presentIndex == 2) {

      if (nextIndex > presentIndex) {

        if (this.listingSeller.otherInfo == null) {

          this.openAlertDialog();

        } else {

          this.selectedIndex = nextIndex;

        }

      } else {

        this.selectedIndex = nextIndex;

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
}
