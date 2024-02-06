import { Component, OnInit } from '@angular/core';
import { countries } from 'countries-list';
import { FirestoreService } from '../servicios/firestore.service';
import { Equipo } from '../equipo';
import { Jugador } from '../jugador';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  public FormEquipos : Boolean = true;
  public FormJugadores : Boolean = true;
  ListaPaises: { name: string, alpha2: string }[] = Object.entries(countries).map(([alpha2, country]: [string, any]) => ({ name: country.name, alpha2 }));
  ListaPosicion:string[] = ['Portero','Defensa','Centrocampista','Delantero'];
  ListaEquipos : Equipo[] = [];

  constructor(private firestore: FirestoreService) { }

  ngOnInit() {
    this.listarEquipos();
  }

  MostrarFormJugadores(){
    if(this.FormEquipos == false){
      this.FormEquipos = true;
    }
    this.FormJugadores = !this.FormJugadores;
  }
  MostrarFormEquipos(){
    if(this.FormJugadores == false){
      this.FormJugadores = true;
    }
    this.FormEquipos = !this.FormEquipos;
  }

  listarEquipos()
    {
      this.firestore.LeerEquipos().subscribe(res=>{
        this.ListaEquipos=[];
        res.forEach((element:any) => {
          this.ListaEquipos.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()})
        });
        console.log(this.ListaEquipos);
      })
    }
  
    addJugador(nombre: HTMLInputElement, apellidos:HTMLInputElement, pais: any,
      equipo: any, posicion: any, foto: HTMLInputElement){
     //Creo un jugador y le añado los valores introducidos
        const jugador: Jugador = {
       nombre: nombre.value, 
       apellidos: apellidos.value, 
       pais: pais.value, 
       equipo: equipo.value,
       posicion: posicion.value,
       foto: foto.value};
     //Lo agrego con esta clase creada en el servicio
     this.firestore.AgregarJugador(jugador);
     //Seteo como vacios los campos del formulario
     nombre.value="";
     apellidos.value="";
     pais.value="";
     equipo.value="";
     posicion.value="";
     foto.value="";
     
     return false;
     };

     addEquipo(nombree: HTMLInputElement, ciudad: HTMLInputElement, entrenador: HTMLInputElement, paises : HTMLInputElement, 
      escudo:HTMLInputElement){
      const equipo: Equipo = {
        ciudad: ciudad.value,
        entrenador: entrenador.value,
        pais: paises.value,
        escudo: escudo.value,
        nombre: nombree.value,
      }
      this.firestore.AgregarEquipo(equipo);
      nombree.value="";
      ciudad.value="";
      entrenador.value="";
      paises.value="";
      escudo.value="";
     }

}
