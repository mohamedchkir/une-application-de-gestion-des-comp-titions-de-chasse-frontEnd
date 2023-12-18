import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {CompetitionService} from "../../../services/competition/competition.service";
import {Injectable} from "@angular/core";
import {catchError, map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CompetitionGuard implements CanActivate {
  constructor(private competitionService: CompetitionService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const code = route.paramMap.get('code') ?? '';
    return this.competitionService.getCompetition(code).pipe(
      map(competition => !!competition),
      catchError(() => of(this._router.createUrlTree(['/hunt/table']))),
    );
  }
}
