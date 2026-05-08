import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { HomeRightComponent } from "../home-right/home-right";

interface Field{
  title: string,
  type: 'image' | 'video',
  src: string,
  description?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HomeRightComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  userName = 'Perfil'; 
  menuOpen = false;
  profileOpen = signal(false);

  constructor() {}

  toogleMenu(){
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(){
    this.menuOpen = false;
  }

  toogleProfile(){
    this.profileOpen.update(open => !open); 
  }

fields: Field[]= [
  {
    title: 'Imagen 1',
    type: 'image',
    src: 'assets/images/ImagenHome.jpg',
    description: ''
  },
  {
    title: 'Imagen 2',
    type: 'image',
    src: 'assets/images/ImagenHome2.jpg',
    description: ''
  }
]
currentIndex = 0;

next() {
  this.currentIndex = (this.currentIndex + 1) % this.fields.length;
}

prev() {
  this.currentIndex =
    (this.currentIndex - 1 + this.fields.length) % this.fields.length;
}
}
