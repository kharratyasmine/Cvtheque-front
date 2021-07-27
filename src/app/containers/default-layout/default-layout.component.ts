import {Component, OnInit} from '@angular/core';
import { navItems } from '../../_nav';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  constructor(private keycloakService: KeycloakService) {
  }
  public sidebarMinimized = false;
  public navItems = navItems;
  public username: any;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
    this.keycloakService.logout();
  }

  ngOnInit(): void {
    this.username = this.keycloakService.getUsername();
  }
}
