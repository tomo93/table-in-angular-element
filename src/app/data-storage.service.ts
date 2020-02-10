import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  constructor(private http: HttpClient) {}

  fetchElements() {
    this.http.get("").subscribe(elements => {
      console.log(elements);
    });
  }
}
