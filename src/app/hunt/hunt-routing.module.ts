import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TableComponent} from "./components/table/table.component";
import {HuntComponent} from "./components/hunt/hunt.component";
import {CompetitionComponent} from "./components/competition/competition.component";
import {CompetitionGuard} from "./components/competition/competition.guard";
import {authGuard} from "../guard/auth.guard";
import {hasAuthorityGuard} from "../guard/has-authority.guard";

const routes: Routes = [
  {
    path: "hunt", component: HuntComponent, children: [
      {path: "competition/:code", component: CompetitionComponent, canActivate: [CompetitionGuard]},
      {path: "table", component: TableComponent,canActivate: [authGuard, hasAuthorityGuard],data: {roles: ['MANAGER','JURY']}},
      {path: "", redirectTo: "table", pathMatch: "full"}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HuntRoutingModule { }
