import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PlayTheGameComponent } from './components/play-the-game/play-the-game.component';
import { ResultScreenComponent } from './components/result-screen/result-screen.component';

const routes: Routes = [
  { path: 'home', component: AppComponent },
  { path: 'letsPlayTheGame', component: PlayTheGameComponent },
  { path: 'resultScreen', component: ResultScreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
