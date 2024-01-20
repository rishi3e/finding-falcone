import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FalconAPIService } from './falcon-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'finding-falcone';

  projectContent: boolean = true;
  gameContent: boolean = false;
  clickEventsubscription?: Subscription;

  constructor(private router: Router, public falconService: FalconAPIService) {
    this.clickEventsubscription = this.falconService
      .getClickEvent()
      .subscribe(() => {
        this.reloadPage();
      });
  }

  letsPlayTheGame() {
    this.projectContent = false;
    this.gameContent = true;
    this.router.navigate(['./letsPlayTheGame']);
  }

  reloadPage() {
    this.projectContent = true;
    this.gameContent = false;
    this.router.navigate(['']);
  }
}
