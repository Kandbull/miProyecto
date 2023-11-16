import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import 'firebase/auth'
@Injectable({
	providedIn: 'root',
})
export class FirebaseAuthService {
	currentUser = null
	constructor(
		private authFirebase: AngularFireAuth //firebase.auth.Auth
	) {
		this.getUID()
		this.authFirebase.authState.subscribe((user) => {
			
		})
	}
	iniciarSesion(correo: string, contraseña: string) {
		return this.authFirebase.signInWithEmailAndPassword(correo, contraseña);
	  }
	
	  cerrarSesion() {
		return this.authFirebase.signOut();
	  }
	
	  obtenerUsuarioActual() {
		return this.authFirebase.authState;
	  }

	async logIn(email: string, password: string) {
		return await this.authFirebase.signInWithEmailAndPassword(email, password)
	}

	async resetPassword(email: string) {
		try {
			return this.authFirebase.sendPasswordResetEmail(email)
		} catch (error) {
			console.log(error)
		}
	}

	logOut() {
		return this.authFirebase.signOut()
	}

	async getUID() {
		const user = await this.authFirebase.currentUser
		return user ? user.uid : null
	}
	stateUser() {
		return this.authFirebase.authState
	}
}
