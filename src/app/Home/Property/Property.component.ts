import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router,  ParamMap } from "@angular/router";
import { AuthService } from "../../auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
@Component({
  selector: "app-Property",
  templateUrl: "./Property.component.html",
  styleUrls: ["./Property.component.css", "./../../common.css"]
})
export class PropertyComponent implements OnInit {
  useCase: any;
  activeTab: any;
  buy:boolean=false;
  sell:boolean=false;
  isLoggedIn: Boolean = true;
  userData: any;
  boolean: boolean;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    public afAuth: AngularFireAuth) {}

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.useCase = params["use"];
      if (this.useCase == "buy") {
        this.activeTab = 0;
        this.buy = true;
        this.sell =false;
      } else if (this.useCase == "sell") {
        this.activeTab = 1;
        this.buy = false;
        this.sell =true;
      }
      console.log(this.useCase);
    });

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem("user", JSON.stringify(this.userData));
        this.LoggedIn();
      } else {
        localStorage.setItem("user", null);
        JSON.parse(localStorage.getItem("user"));
        this.LoggedOut();
      }
    });
  }
   LoggedIn() {
    this.isLoggedIn = true;
  }
 LoggedOut() {
    this.isLoggedIn = false;
  }

  buyerCheck()
  {
    if(this.isLoggedIn==true)
    {
      this.router.navigate(["fillFormBuyer"]);
      
    }
    else if (this.isLoggedIn == false)
    {

      this.router.navigate(["checkLogin"]);

      
      }
    
}
sellerCheck()
{
  if(this.isLoggedIn == true)
  {
    this.router.navigate(["fillformseller"]);
  }
  else if (this.isLoggedIn == false)
  {
    this.router.navigate(["checkLogin"]);
  }
  
}
}
