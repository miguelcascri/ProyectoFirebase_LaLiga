import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../servicios/firestore.service';
import { Equipo } from '../equipo';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.page.html',
  styleUrls: ['./equipos.page.scss'],
})
export class EquiposPage implements OnInit {
  ListaEquipos: Equipo[] = [];
  public VisualTabla: Boolean = false;
  public VisualDetalles: Boolean = true;
  public ListaJugEquipo: any = [];
  equipos!: any[];

  equipo: Equipo = {
    nombre: '',
    escudo: '',
    entrenador: '',
    ciudad: '',
    pais: '',
  };

  constructor(private firestore: FirestoreService) {
    this.firestore.obtenerEquipos().subscribe((data) => {
      this.equipos = data;
    });
  }

  ngOnInit() {
    this.listarEquipos();
    console.log(this.ListaJugEquipo);
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

  VerDetalles(detallesequipo: Equipo) {
    const nombreEquipo = detallesequipo.nombre; // Cambiado de this.equipo.nombre a detallesequipo.nombre
    this.VisualTabla = !this.VisualTabla;
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
