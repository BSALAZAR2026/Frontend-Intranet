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
      title: 'Capacitación Siesa del mes de Mayo',
      type: 'image',
      src: 'assets/images/modulos1.jpeg',
      description: ''
    },
    {
      title: 'Capacitación Siesa del mes de Mayo',
      type: 'image',
      src: 'assets/images/modulos2.jpeg',
      description: ''
    },
    {
      title: 'Capacitación Siesa del mes de Mayo',
      type: 'image',
      src: 'assets/images/modulos3.jpeg',
      description: ''
      },
    {
      title: 'Integrantes de Copasst 2026 - 2028',
      type: 'image',
      src: 'assets/images/candidatos.jpeg',
      description: ''
      },
      {
      title: 'Alianza con Café Quindío',
      type: 'image',
      src: 'assets/images/cafePro.jpeg',
      description: 'https://www.instagram.com/reel/DYaSydSIw8f/?igsh=MWp2aWsxaHcxYjNrNQ=='
      },
      {
      title: 'Invitación a Mindset Digital',
      type: 'image',
      src: 'assets/images/invitacion.jpeg',
      description: ''
      },
      {
      title: 'Conformación Oficial del COCOLAB 2026 - 2028',
      type: 'image',
      src: 'assets/images/cocolab.jpeg',
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

  // Añade estos métodos a tu clase HomeComponent

manualNext(): void {
  this.restartTimer();
  this.next();
}

manualPrev(): void {
  this.restartTimer();
  this.prev();
}

goToSlide(index: number): void {
  this.restartTimer();
  this.currentIndex = index;
}

restartTimer(): void {
  clearInterval(this.intervalId);
  this.startAutoSlide();
}
}
