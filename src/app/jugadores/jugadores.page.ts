import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../servicios/firestore.service';
import { Equipo } from '../equipo';
import { Jugador } from '../jugador';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.page.html',
  styleUrls: ['./jugadores.page.scss'],
})
export class JugadoresPage implements OnInit {
  public idSelect: string = "";

  public VisualDetalles: Boolean = false;
  public VisualFiltro: Boolean = false;
  public VisualFiltroSelect: Boolean = false;
  public VisualDetallesJugador: Boolean = true;
  public ModoEdicion: Boolean = true;
  ListaJugadores: Jugador[] = [];
  ListaJugadoresFiltro: Jugador[] = [];
  ListaProvJugadores: Jugador[] = [];
  ArrayCompleto: Jugador[] = [];
  ListaEquipos : Equipo[] = [];


  posicionSeleccionada: string = '';

  jugador: Jugador = {
    nombre: '',
    apellidos: '',
    pais: '',
    posicion: '',
    equipo: '',
    foto: '',
  };

  constructor(private firestore: FirestoreService) {}

  ngOnInit() {
    this.listarJugadores();
    this.listarEquipos();
  }

  listarJugadores() {
    this.firestore.LeerJugadores().subscribe((res) => {
      this.ListaJugadores = [];
      res.forEach((element: any) => {
        this.ListaJugadores.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
      console.log(this.ListaJugadores);
    });
  }

  seleccionarPosicion() {
    if (
      this.posicionSeleccionada == null ||
      this.posicionSeleccionada == 'Todas'
    ) {
      this.VisualFiltro = false;
      this.VisualFiltroSelect = true;
    } else {
      this.ListaJugadoresFiltro = [];
      this.VisualFiltroSelect = false;
      this.VisualFiltro = true;
      for (let item of this.ListaJugadores) {
        if (this.posicionSeleccionada == item.posicion) {
          this.ListaJugadoresFiltro.push(item);
        }
      }
    }
  }

  VerDetalles(jugador: Jugador) {
    const nombreEquipo = jugador.nombre; // Cambiado de this.equipo.nombre a detallesequipo.nombre
    //this.VisualFiltro = true;
    this.VisualDetallesJugador = false;
    this.VisualDetalles = !this.VisualDetalles;
    this.jugador = jugador;
    // Luego de asignar el valor a this.equipo, ahora puedes realizar la llamada a obtenerJugadoresPorEquipo
    console.log(this.jugador);
    this.ModoEdicion = true;
  }

  AtrasDetalles(){
    console.log("atras");
    this.VisualDetallesJugador = !this.VisualDetallesJugador;
    this.VisualDetalles = !this.VisualDetalles;
    //this.VisualDetalles = ;
  }

  EliminarJugador(id: any){
    this.idSelect = id;
    console.log("id del jugador seleccionado", this.idSelect);
    this.firestore.DeleteJugador(this.idSelect).then(()=>
    { console.log("Eliminado");}, error => {console.log(error)}
    );
    this.posicionSeleccionada = "Todas";
    this.seleccionarPosicion();
  }

  ActivarEditar(){
    this.ModoEdicion = !this.ModoEdicion;
  }
  actualizar(id: HTMLInputElement,nombre: HTMLInputElement, apellidos:HTMLInputElement, pais: HTMLInputElement,
    equipo: HTMLSelectElement, posicion: HTMLSelectElement,foto: HTMLInputElement){
    this.AtrasDetalles();
    console.log("Estoy en actualizar");
    const jugador: Jugador = {id: id.value,
      nombre: nombre.value, apellidos: apellidos.value, pais: pais.value, equipo: equipo.value,
      posicion:posicion.value, foto:foto.value};
    this.firestore.UpdateJugador(jugador);
    
    return false;
    
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
  
}
