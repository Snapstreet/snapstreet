import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { listingBuyer } from './Model/listingBuyer';

export interface Config {
  Currentpostcode: string;
  Lookingpostcode: any;
  latitude: any;
  longitude: any;
  result:any;
}
@Injectable({
  providedIn: "root"
})
export class HttpService {
  headers: any;
  latUrl="https://api.postcodes.io/postcodes/"
  configUrl = "https://api-full.addressian.co.uk/postcode/";
  listingBuyer: any;

  
  constructor(private http: HttpClient) {

  }

  search(query: string): any {
    const headerDict = {
      "x-api-key": "BcLIABSb6J3HsvGTpI5jA8FrtOaQqR67736r1Hip"
    };

    const url = "https://api-full.addressian.co.uk/postcode/";
    return this.http.get(url + query, {
      headers: new HttpHeaders(headerDict)
    });
  }

 
getLat(Lookingpostcode) {

  return this.http.get(this.latUrl + Lookingpostcode);
 }

sentEmail(url,data)
{
  return this.http.post(url,data)
}
  
}
