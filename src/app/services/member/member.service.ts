import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MemberElement} from "../../member/models/member-element";
import {RegisterElement} from "../../member/models/register-element";

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private url: string = " http://localhost:8080/api/v1/members";
  private url_register: string = "http://localhost:8080/api/v1/rankings/register";

  constructor(private _http: HttpClient) { }

  getMembers(): Observable<MemberElement[]> {
    return this._http.get<MemberElement[]>(this.url);
  }

  saveMember(member: MemberElement): Observable<MemberElement> {
    return this._http.post<MemberElement>(this.url, member);
  }

  registerMember(register: RegisterElement): Observable<RegisterElement> {
    return this._http.post<RegisterElement>(this.url_register, register);
  }

  updateMember(member: MemberElement): Observable<MemberElement> {
    return this._http.put<MemberElement>(this.url, member);
  }
}
