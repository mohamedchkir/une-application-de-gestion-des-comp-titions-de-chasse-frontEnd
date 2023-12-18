import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TableComponent} from "./components/table/table.component";
import {MemberComponent} from "./components/member/member.component";

const routes: Routes = [
  {
    path: "member", component: MemberComponent, children: [
      {path: "table", component: TableComponent},
      {path: "", redirectTo: "table", pathMatch: "full"}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
