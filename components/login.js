import { useState } from 'react'
import { Container, Form, Button, Toast } from 'react-bootstrap'
import { useAuth } from '@context/user'
import styes from './login.module.css'

export default function LoginForm() {

    const [email, setEmail] = useState('ojericsson@gmail.com')
    const [pass, setPass] = useState('daniel16')
    const [any_error, setError] = useState(false)

    const auth = useAuth()

    function loginFormSubmitted(e) {
        e.preventDefault()
        const form = e.currentTarget

        auth.signInWithEmailAndPassword(form.email.value, form.password.value)
            .catch(setError)
    }

    return (
        <main className="form-signin">
            <Container className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                <Form onSubmit={loginFormSubmitted}>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} />
                    </Form.Group>

                    <Toast onClose={() => setError(false)} show={any_error} delay={3000} autohide>
                        <Toast.Header >
                            <strong className="mr-auto">Bootstrap</strong>
                            <small>11 mins ago</small>
                        </Toast.Header>
                        <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
                    </Toast>

                    <Button variant="outline-success" type="submit" className="w-100 btn-lg">
                        Submit
                    </Button>
                </Form>
            </Container>
        </main>
    )
}