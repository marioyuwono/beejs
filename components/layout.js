import Head from 'next/head'
import Link from 'next/link'
import { Container, Button, Navbar, Nav } from 'react-bootstrap'
import { useAuth } from '@context/user'
import LoginForm from './login'
import styles from './layout.module.css'

const MainNavs = [
    ['/', 'Home'],
    ['profile', 'Profile'],
    ['accounts', 'Accounts'],
]

export default function Layout({ children, requires_auth }) {
    const auth = useAuth()

    if (requires_auth && !auth.user) {
        return (
            <LoginForm />
        )
    } else {
        return (
            <NavBarFixed>
                <Head>
                    <title>Bee</title>
                </Head>
                {children}
            </NavBarFixed>
        )
    }
}

function NavBarFixed({ children }) {

    // https://getbootstrap.com/docs/5.0/examples/navbar-fixed/

    const auth = useAuth()

    return (
        <>
            <Navbar collapseOnSelect expand="sm" fixed="top">
                {/* <Navbar.Brand href="#">Fixed navbar</Navbar.Brand> */}
                <Navbar.Toggle data-bs-target="#navbarCollapse" aria-controls="navbarCollapse"/>
                {
                    MainNavs.map(([href, text], i) => (
                        <Nav.Item key={i}>
                        <Link href={href} aria-current="page">
                            <a className="nav-link">{text}</a>
                        </Link>
                        </Nav.Item>
                    ))
                }
                <Navbar.Collapse id="navbarCollapse" className="justify-content-end">
                    <Button variant="outline-danger" onClick={ () => auth.signOut() }>Logout</Button>
                </Navbar.Collapse>
            </Navbar>

            <main className={styles.main_container}>
                <div className="bg-light p-5 rounded">
                    {children}
                </div>
            </main>

            <script src="https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap/1.4.3/react-bootstrap.min.js" integrity="sha512-g+U7Jq4qc/iS5iRjdkQvSwStnzu1bc0GLGCkaELVvLFn86IDclt5uBV8bWA/JUvAUwqSS55/0Ir/fvVkrP1I5w==" crossOrigin="anonymous"></script>
        </>
    )
}