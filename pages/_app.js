import { useEffect } from 'react'
import UserProvider from '@context/user'
import 'bootstrap/dist/css/bootstrap.min.css'

async function registerSW() {
	// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
	try {
		const registration = await navigator.serviceWorker.register("/sw.js", {
			scope: "/",
		})
		if (registration.installing) {
			console.log("Service worker installing")
		} else if (registration.waiting) {
			console.log("Service worker installed")
		} else if (registration.active) {
			console.log("Service worker active")
		}
	} catch (error) {
		console.error(`Registration failed with ${error}`)
	}
}

export default function App({ Component, pageProps }) {
	useEffect(() => {
		if (navigator.serviceWorker) {
			console.log('Registering Service Worker')
			registerSW()
		} else {
			console.warn('Service Worker is not available')
		}
	}, [])
	return (
		<UserProvider>
			<Component {...pageProps} />
		</UserProvider>
	)
}