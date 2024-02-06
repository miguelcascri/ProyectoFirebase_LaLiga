import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Equipo } from '../equipo';
import { Jugador } from '../jugador';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  listaJugadores: Jugador[] = [];
  public listaMiembros: any = [];

  constructor(private firestore: AngularFirestore) {}

  LeerEquipos(): Observable<any> {
    return this.firestore.collection('Equipo').snapshotChanges();
  }
  LeerJugadores(): Observable<any> {
    return this.firestore.collection('Jugadores').snapshotChanges();
  }

  AgregarJugador(Jugador: Jugador) {
    console.log(Jugador);
    this.firestore.collection('Jugadores').add(Jugador);
  }
  AgregarEquipo(equipo: Equipo) {
    console.log(equipo);
    this.firestore.collection('Equipo').add(equipo);
  }

 
  obtenerEquipos(): Observable<any[]> {
    return this.firestore.collection('Equipo').valueChanges();
  }

  obtenerJugadoresPorEquipo(equipoNombre: string): Observable<any[]> {
    return this.firestore.collection('Jugadores', ref => 
        ref.where('equipo', '==', equipoNombre))
        .valueChanges();
  }

  DeleteJugador(id: string): Promise <any>
  {
    return this.firestore.collection("Jugadores").doc(id).delete();
  }

  UpdateJugador(jugador: Jugador){
    console.log("Actualizar Jugador, datos", jugador.id);
    this.firestore.collection("Jugadores").doc(jugador.id).update(jugador);
  }

}
