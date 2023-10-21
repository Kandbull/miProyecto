import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Registro } from '../../interfaces/registro';

@Injectable({
  providedIn: 'root'
})
  

export class DbserviceService {

  public dataBase!: SQLiteObject;

  tablaRegistro: string = "CREATE TABLE IF NOT EXISTS noticia(id INTEGER PRIMARY KEY autoincrement, correo VARCHAR(25) NOT NULL, usuario VARCHAR(20) NOT NULL, password VARCHAR(20) NOT NULL);";

  listaRegistro = new BehaviorSubject<Registro[]>([]);

  private isDbReady:
    BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite,
    private plataform: Platform,
    public toastController: ToastController) {
      this.crearBD();
     }



  crearBD() {
    this.plataform.ready().then(() => {
      this.sqlite.create({
        name: 'registro.db',
        location: 'default'
    }).then((db: SQLiteObject) => {   
      this.dataBase = db;
      this.presentToast("Base de Datos creada");
    //se llama a crear la(s) tabla(s)
      this.crearTablas();
    }).catch(e => this.presentToast(e));
    })
  }

  async crearTablas(){
    try{
      await this.dataBase.executeSql(this.tablaRegistro, []);
      this.presentToast("Tabla creada");
      //this.cargarUsuario();
      this.isDbReady.next(true);
    } catch (error) {
      this.presentToast("Error en Crear Tabla: " + error);
    }
    
  }

  cargarUsuario() {
    let items: Registro[] = [];
    this.dataBase.executeSql('SELECT * FROM registro', []).then(
      res => {
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            items.push({
              id: res.rows.item(i).id,
              correo: res.rows.item(i).correo,
              usuario: res.rows.item(i).usuario,
              password: res.rows.item(i).password
            });
          }
        }
      });
      this.listaRegistro.next(items);
  }

  async addUsuario(correo: any, usuario: any, password: any){
    let data = [correo, usuario, password];
    await this.dataBase.executeSql('INSERT INTO user(correo, usuario, password) VALUES(?,?,?)',
    data);
    this.cargarUsuario();
  }
  async verificarUsuario(usuario: any, password: any){
    let data = [usuario, password];
    this.cargarUsuario();
  }


  async updateUsuario(id: any, correo: any, usuario: any, password: any){
    let data = [usuario, password, id, correo];
    await this.dataBase.executeSql('UPDATE registro SET usuario=?, password=? WHERE id=?, correo=?', data);
    this.cargarUsuario();
  }

  async deleteUsuario(id: any) {
    await this.dataBase.executeSql('DELETE FROM registro WHERE id=?', [id]);
    this.cargarUsuario();
  }

  /**
* Método que verifica la suscripción del Observable
*/
  dbState() {
    return this.isDbReady.asObservable();
  }
  
  
    


  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
    message: mensaje,
    duration: 3000
    });
    toast.present();
  }
      
}
