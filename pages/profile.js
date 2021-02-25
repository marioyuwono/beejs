import firebase from 'firebase/app'
import 'firebase/firestore'
import { useEffect, useState } from 'react'
import Layout from '@components/layout'
import { useAuth } from '@context/user'

const Db =  firebase.firestore()

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
        <>
        {
            // TODO
        }
        </>
    )
}