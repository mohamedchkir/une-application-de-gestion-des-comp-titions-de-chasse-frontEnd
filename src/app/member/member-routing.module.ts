import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TableComponent} from "./components/table/table.component";
import {MemberComponent} from "./components/member/member.component";
import {authGuard} from "../guard/auth.guard";
import {hasAuthorityGuard} from "../guard/has-authority.guard";

const routes: Routes = [
  {
    path: "member", component: MemberComponent, children: [
      {path: "table", component: TableComponent,canActivate: [authGuard, hasAuthorityGuard],data: {roles: ['MANAGER']}},
      {path: "", redirectTo: "table", pathMatch: "full"}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
