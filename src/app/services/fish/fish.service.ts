import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FishElement} from "../../hunt/models/fish-element";

@Injectable({
  providedIn: 'root'
})
export class FishService {
  private url: string = " http://localhost:8080/api/v1/fishes";

  constructor(private _http: HttpClient) { }

  getFishes(): Observable<FishElement[]> {
    return this._http.get<FishElement[]>(this.url);
  }
}
