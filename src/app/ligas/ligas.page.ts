import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../servicios/firestore.service';
import { Equipo } from '../equipo';
import { Jugador } from '../jugador';

@Component({
  selector: 'app-ligas',
  templateUrl: './ligas.page.html',
  styleUrls: ['./ligas.page.scss'],
})
export class LigasPage implements OnInit {
  ListaEquipos: Equipo[] = [];
  ListaEquiposLiga : Equipo[] = [];
  public VisualDetalles: Boolean = true;
  public VisualLigas : Boolean = false;
  public VisualEquipos : Boolean = true;
  public LigaSelect = "";
  public ListaJugEquipo: any = [];

  constructor(private firestore: FirestoreService) { }

  equipo: Equipo = {
    nombre: '',
    escudo: '',
    entrenador: '',
    ciudad: '',
    pais: '',
  };
  ngOnInit() {
    this.listarEquipos();
  }

  listarEquipos() {
    this.firestore.LeerEquipos().subscribe((res) => {
      this.ListaEquipos = [];
      res.forEach((element: any) => {
        this.ListaEquipos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
      console.log(this.ListaEquipos);
    });
  }



  ObtenerEquipos(opcion: number) {
    this.ListaEquiposLiga = [];
  
    if (opcion == 1) {
      this.LigaSelect = "España";
    }
    if (opcion == 2) {
      this.LigaSelect = "Inglaterra"; // Utiliza el operador de asignación (=) en lugar de ==
    }
    if (opcion == 3) {
      this.LigaSelect = "Alemania"; // Utiliza el operador de asignación (=) en lugar de ==
    }
    if (opcion == 4) {
      this.LigaSelect = "Italia"; // Utiliza el operador de asignación (=) en lugar de ==
    }
  
    console.log(this.LigaSelect);
    console.log(opcion);
  
    for (let equipo of this.ListaEquipos) {
      if (equipo.pais == this.LigaSelect) {
        this.ListaEquiposLiga.push(equipo);
      }
    }
  
    this.VisualLigas = true;
    this.VisualEquipos = false;
  
    console.log(this.ListaEquiposLiga);
  }

  

  VerDetalles(detallesequipo: Equipo) {
    const nombreEquipo = detallesequipo.nombre; // Cambiado de this.equipo.nombre a detallesequipo.nombre
    this.VisualEquipos = !this.VisualEquipos;
    this.VisualDetalles = !this.VisualDetalles;
    this.equipo = detallesequipo;

    // Luego de asignar el valor a this.equipo, ahora puedes realizar la llamada a obtenerJugadoresPorEquipo
    console.log(this.equipo);
    this.obtenerJugadoresPorEquipo(nombreEquipo);
  }

  obtenerJugadoresPorEquipo(equipoNombre: string): void {
    this.firestore.obtenerJugadoresPorEquipo(equipoNombre).subscribe((data) => {
      this.ListaJugEquipo = data;
      console.log(this.ListaJugEquipo); // Mueve este console.log aquí
    });
  }

}
