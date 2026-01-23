import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule, MatIcon],
  templateUrl: './admin.html',
  styleUrls: ['./admin.scss']
})
export class AdminComponent {

menuOpen = false;

toggleMenu() {
  this.menuOpen = !this.menuOpen;
}

closeMenu() {
  this.menuOpen = false;
}


  sections = [
    {
      label: 'Usuarios',
      icon: 'group',
      route: '/admin/users'
    },
    {
      label: 'Crear usuario',
      icon: 'person_add',
      route: '/admin/create-user'
    }
  ];
}
