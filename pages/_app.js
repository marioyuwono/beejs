import UserProvider from '@context/user'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function App({ Component, pageProps }) {
    return (
        <UserProvider>
            <Component {...pageProps}/>
        </UserProvider>
    )
}