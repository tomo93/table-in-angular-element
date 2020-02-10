import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  constructor(private http: HttpClient) {}

  fetchElements() {
    // let headers: HttpHeaders = new HttpHeaders();
    // headers = headers.append("Access-Control-Allow-Origin", "*");

    return this.http.get("https://testtt.free.beeceptor.com/elements");
  }
}
