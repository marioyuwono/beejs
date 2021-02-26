import { useEffect, useState } from 'react'
import { Alert, Container, Form, Button, Toast } from 'react-bootstrap'
import Head from 'next/head'
import { useAuth } from '@context/user'
import styles from './login.module.css'

export default function LoginForm() {

    // Input elements should have autocomplete attributes
    // https://goo.gl/9p2vKq

    // Add class to body in React
    // https://brettdewoody.com/modifying-body-attributes-in-react/
    // https://stackoverflow.com/questions/37641996/react-routes-different-styling-on-body-css-tag

    const auth = useAuth()
    const [errorMessage, setErrorMessage] = useState('')

    const loginFormSubmitted = e => {
        e.preventDefault()
        const form = e.currentTarget
        console.log('LOGIN')
        auth.signInWithEmailAndPassword(form.email.value, form.password.value)
            .catch(e => {
                setErrorMessage(e.message)
            })
    }

    useEffect(() => {
        document.body.className = styles.body
        document.body.parentNode.className = styles.html
    }, [])

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <main className={styles.formSignin}>
                <Form onSubmit={loginFormSubmitted}>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" type="email" placeholder="Enter email" autoComplete="username" required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" autoComplete="current-password" required />
                    </Form.Group>

                    <Toast onClose={() => setErrorMessage('')} show={errorMessage!=''} delay={3000} autohide>
                        <Alert variant="danger">
                            {errorMessage}
                        </Alert>
                    </Toast>

                    <Button variant="outline-success" type="submit" className="w-100 btn-lg">
                        Login
                    </Button>
                </Form>
            </main>
        </>
    )
}