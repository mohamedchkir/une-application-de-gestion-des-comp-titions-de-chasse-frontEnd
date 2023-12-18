import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompetitionComponent} from "./components/competition/competition.component";
import {TableComponent} from "./components/table/table.component";
import {PodiumComponent} from "./components/podium/podium.component";
import {CompetitionGuard} from "../hunt/components/competition/competition.guard";

const routes: Routes = [
  {
    path: "competition", component: CompetitionComponent, children: [
      {path: "result/:code", component: PodiumComponent, canActivate: [CompetitionGuard]},
      {path: "table", component: TableComponent},
      {path: "", redirectTo: "table", pathMatch: "full"}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompetitionRoutingModule {
}
