import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { HomeRightComponent } from "../home-right/home-right";

interface Field {
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

  constructor() { }

  toogleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  toogleProfile() {
    this.profileOpen.update(open => !open);
  }
  currentIndex = 0;
  intervalId: any;

  fields: Field[] = [
    {
      title: '',
      type: 'image',
      src: 'assets/images/ImagenHome.jpg',
      description: ''
    },
    {
      title: '',
      type: 'image',
      src: 'assets/images/ImagenHome2.jpg',
      description: ''
    },
    {
      title: 'Votación para la elección ',
      type: 'image',
      src: 'assets/images/formulario.jpg',
      description: 'https://forms.gle/wRqYsoifvRbR8z867'
    },
    {
      title: 'Capacitación',
      type: 'image',
      src: 'assets/images/modulos1.jpeg',
      description: ''
    },
    {
      title: 'Capacitación',
      type: 'image',
      src: 'assets/images/modulos2.jpeg',
      description: ''
    },
    {
      title: 'Capacitación',
      type: 'image',
      src: 'assets/images/modulos3.jpeg',
      description: ''
    }
  ]


  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.next();
    }, 5000); // 5000 ms = 5 segundos
  }

  next(): void {
    this.currentIndex =
      (this.currentIndex + 1) % this.fields.length;
  }

  prev(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.fields.length) %
      this.fields.length;
  }
}
