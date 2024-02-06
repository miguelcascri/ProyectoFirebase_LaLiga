import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inico', url: '/home', icon: 'home' },
    {title:'Equipos',url:'/equipos',icon:'people'},
    {title:'Jugadores',url:'/jugadores',icon:'person'},
    {title:'Ligas',url:'/ligas',icon:'person'},
  ];
  constructor() {}
}
