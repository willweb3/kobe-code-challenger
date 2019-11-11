import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MovieComponent } from "./components/movie/movie.component";

const routes: Routes = [
  { path: "movie/:id", component: MovieComponent },
  { path: "", pathMatch: "full", component: HomeComponent },
  { path: "**", pathMatch: "full", redirectTo: "/" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
