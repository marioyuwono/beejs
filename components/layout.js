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

    if (requires_auth) {
        if (auth.user) {
            return (
                <NavBarFixed>
                    <Head>
                        <title>Bee</title>
                    </Head>
                    {children}
                </NavBarFixed>
            )
        } else {
            return (
                <LoginForm />
            )
        }
    } else {
        // TODO
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
                        <Link href={href} aria-current="page" className="nav-link">
                            {text}
                        </Link>
                        </Nav.Item>
                    ))
                }
                <Navbar.Collapse id="navbarCollapse" className="justify-content-end">
                    <Nav.Item>
                        <Nav.Link eventKey="disabled" disabled>
                            Hi {
                                auth.user.displayName
                            }
                        </Nav.Link>
                    </Nav.Item>
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