import firebase from 'firebase/app'
import 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import Layout from '@components/layout'
import Moment from '@components/moment'
import { useAuth } from '@context/user'

const Db =  firebase.firestore()
const Info = [
    ['displayName', 'Name'],
    ['email', 'Email'],
    ['phoneNumber', 'Phone'],
]
const Dates = [
    ['c', 'Member since'],
    ['x', 'Expiry'],
]

export default function Profile() {
    return (
        <Layout requires_auth>
            <h1>Profile</h1>
            <ProfileTable/>
        </Layout>
    )
}

function ProfileTable() {

    const auth = useAuth()
    const [ profile, setProfile ] = useState(null)

    useEffect(() => {
        Db.collection('members')
            .doc(auth.user.uid)
            .get()
            .then(doc => {
                if (doc.exists) {
                    const data = doc.data()
                    data.id = doc.id
                    setProfile(data)
                    console.debug(data)
                } else {
                    // TODO
                }
            }).catch(e => {
                console.error('Error while getting members:', e)
            })
    }, [])

    return (
        <Container>
        {
            Info.map(([key, text]) => (
                <Row key={key} className="py-2">
                    <Col>{text}</Col>
                    <Col>{auth.user[key]}</Col>
                </Row>
            ))
        }
        {
            profile // still loading
                && (
                    Dates.map(([key, text]) => (
                        <Row key={key} className="py-2">
                            <Col>{text}</Col>
                            <Col><Moment>{profile[key]}</Moment></Col>
                        </Row>
                    ))
                )
        }
        </Container>
    )
}