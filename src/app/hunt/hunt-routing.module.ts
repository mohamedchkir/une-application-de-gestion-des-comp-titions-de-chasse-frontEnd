import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TableComponent} from "./components/table/table.component";
import {HuntComponent} from "./components/hunt/hunt.component";
import {CompetitionComponent} from "./components/competition/competition.component";
import {CompetitionGuard} from "./components/competition/competition.guard";

const routes: Routes = [
  {
    path: "hunt", component: HuntComponent, children: [
      {path: "competition/:code", component: CompetitionComponent, canActivate: [CompetitionGuard]},
      {path: "table", component: TableComponent},
      {path: "", redirectTo: "table", pathMatch: "full"}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HuntRoutingModule { }
