import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from 'src/app/interfaces/interface'; 

@Injectable({
  providedIn: 'root'
})
  

export class DbserviceService {

  public dataBase!: SQLiteObject;

  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(id INTEGER PRIMARY KEY autoincrement, correo VARCHAR(25) NOT NULL, usuario VARCHAR(20) NOT NULL, password VARCHAR(20) NOT NULL);";

  listaUsuario = new BehaviorSubject<Usuario[]>([]);

  private isDbReady:
    BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite,
    private plataform: Platform,
    public toastController: ToastController) {
      this.crearBD();
     }

     //Registro

  crearBD() {
    this.plataform.ready().then(() => {
      this.sqlite.create({
        name: 'usuario.db',
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
      await this.dataBase.executeSql(this.tablaUsuario, []);
      this.presentToast("Tabla creada");
      //this.cargarUsuario();
      this.isDbReady.next(true);
    } catch (error) {
      this.presentToast("Error en Crear Tabla: " + error);
    }
    
  }

  cargarUsuario() {
    let items: Usuario[] = [];
    this.dataBase.executeSql('SELECT * FROM usuario', []).then(
      res => {
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            items.push({
              id: res.rows.item(i).id,
              nombre: res.rows.item(i).nombre,
              username: res.rows.item(i).username,
              listaPersonaje: res.rows.item(i).listaPersonaje
            });
          }
        }
      });
      this.listaUsuario.next(items);
  }

  async addUsuario(correo: any, usuario: any, password: any){
    let data = [correo, usuario, password];
    await this.dataBase.executeSql('INSERT INTO usuario(correo, usuario, password) VALUES(?,?,?)',
    data);
    this.cargarUsuario();
  }
  async verificarUsuario(usuario: any){
    let data = [usuario];
    this.cargarUsuario();
  }
  /** 
  async verificarPassword(password: any){
    let data = [password];
    let.cargarUsuario();
  }
  */

  async updateUsuario(id: any, correo: any, usuario: any, password: any){
    let data = [usuario, password, id, correo];
    await this.dataBase.executeSql('UPDATE usuario SET usuario=?, password=? WHERE id=?, correo=?', data);
    this.cargarUsuario();
  }

  async deleteUsuario(id: any) {
    await this.dataBase.executeSql('DELETE FROM usuario WHERE id=?', [id]);
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
