import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.scss']
})
export class LoggedComponent {
  constructor(private router: Router) {}

  ngOnInit() {
  }

  get isHomePage(): boolean {
    return this.router.url === '/home';
  }

  get isSearchPage(): boolean {
      return this.router.url === '/search';
  }

  get isFavPage(): boolean {
      return this.router.url === '/favoris';
  }

  get isProfilePage(): boolean {
      return this.router.url === '/profil';
  }

}
