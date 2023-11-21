import { Injectable } from '@angular/core'
import {
	AlertController,
	LoadingController,
	ToastController,
} from '@ionic/angular'
import { ShowAlertSimple } from 'src/app/interfaces/interface'
@Injectable({
	providedIn: 'root',
})
export class InteractionsService {
	loading: any
	constructor(
		private toastController: ToastController,
		public loadingController: LoadingController,
		private alertController: AlertController
	) { }

	// Guarda un elemento en el localStorage
	saveInLocalStorage(key: string, value: any) {
		return localStorage.setItem(key, JSON.stringify(value))
	}

	// 
	/**
	getFromLocalStorage(key: string) {
		return JSON.parse(localStorage.getItem(key))
	} */

	async presentToast(mensaje: string, duracion: number = 2000) {
		const toast = await this.toastController.create({
			message: mensaje,
			duration: duracion,
		})
		await toast.present()
	}

	async presentLoading(mensaje: string) {
		this.loading = await this.loadingController.create({
			message: mensaje,
			duration: 2000,
			cssClass: '.alert-button-confirm',
		})
		await this.loading.present()
	}

	async closeLoading() {
		this.loading.dismiss()
	}
	async showAlertSimple({
		header,
		subHeader,
		message,
		buttons,
	}: ShowAlertSimple) {
		const alert = await this.alertController.create({
			header,
			subHeader,
			message,
			buttons,
		})

		await alert.present()
	}
}
