import firebase from 'firebase/app'
import 'firebase/firestore'
import Link from 'next/link'
import { useRouter }  from 'next/router';
import { useEffect, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import Moment from 'react-moment'

import Layout from "@components/layout"
import { useAuth } from "@context/user"

const Db =  firebase.firestore()

export default function Accounts(props) {
    return (
        <Layout requires_auth>
            <h1>Accounts</h1>
            <AccountsTable edit_mode={'edit' in props} />
        </Layout>
    )
}

function AccountsTable({ _, edit_mode }) {
    // https://stackoverflow.com/questions/58173809/next-js-redirect-from-to-another-page
    
    const auth = useAuth()
    const router = useRouter()
    const [ data, setData ] = useState(null)
    const [ saveMessage, setSaveMessage ] = useState('')

    useEffect(() => {
        Db.collection('accounts')
            .where('i', '==', auth.user.uid)
            .get()
            .then(snapshot => {
                let accounts = []

                snapshot.forEach(doc => {
                    let d = doc.data()
                    d.id = doc.id
                    accounts.push(d)
                })

                setData(accounts)
            }).catch(e => {
                console.error('Error while getting accounts:', e)
            })
    }, [])

    useEffect(() => {        
        if (!edit_mode) {
            setSaveMessage('')
        }
    })

    const populate = e => {
        e.preventDefault()
        const obj = e.currentTarget
        if (obj.value.length==0) {
            obj.value = obj.placeholder
        }
    }

    const clear = e => {
        e.preventDefault()
        const obj = e.currentTarget
        if (obj.value==obj.placeholder) {
            obj.value = ''
        }
    }

    const save = e => {
        e.preventDefault()
        const form = e.currentTarget
        let updates = []
        let accounts = []
        let totalSaved = 0

        for (let row of form.elements) {
            if (row.name == 'accounts' && row.value) {
                const id = row.getAttribute('aria-label')
                let acc = {
                    id,
                    a: row.value,
                }
                accounts.push(acc)

                updates.push(
                    Db.collection('accounts').doc(id)
                        .update({
                            a: row.value,
                            u: firebase.firestore.FieldValue.serverTimestamp(),
                        })
                        .then(() => {
                            totalSaved++
                        })
                        .catch(error => { // document probably doesn't exist.
                            console.error(`Error updating ${id} document: `, error)
                            acc.error = error
                        })
                )
            }
        }

        Promise.all(updates).then(() => {            
            setSaveMessage(totalSaved == accounts.length
                ? 'all saved'
                : `${totalSaved} of ${accounts.length} saved`)
            setData(accounts)
        })
    }

    console.debug('AccountsTable.data:', data)

    return data
        ? (
            <Form onSubmit={save}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Account</th>
                            <th>EA</th>
                            <th>Expiry</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        // Error warning: a list should have a unique "key" prop.
                        // https://reactjs.org/docs/lists-and-keys.html#keys
                        data.map(row => (
                            <tr key={row.id}>
                                <td>
                                {
                                    edit_mode
                                        ? <Form.Control
                                            name="accounts"
                                            aria-label={row.id}
                                            placeholder={row.a}
                                            onFocus={populate}
                                            onBlur={clear} />
                                        : row.a
                                }
                                </td>
                                <td>{row.o}</td>
                                <td>
                                {
                                    typeof row.x == 'object'
                                        && (
                                            <Moment format="D MMM YYYY">
                                                {new Date(row.x.seconds * 1000)}
                                            </Moment>
                                        )
                                }
                                </td>
                            </tr>
                        ))
                    }
                    {
                        saveMessage.length > 0
                            && (
                                <tr>
                                    <td colSpan="3">{saveMessage}</td>
                                </tr>
                            )
                    }
                    <tr>
                        <td colSpan="3" className="text-right">
                        {
                            edit_mode
                                ? (
                                    <>
                                        <Link href="accounts">
                                            <Button variant="outline-dark" onClick={e => router.push('accounts')}>Cancel</Button>
                                        </Link>
                                        <Button variant="success" type="submit" className="ml-2">Save</Button>
                                    </>
                                ) : (
                                    <Link href="?edit">
                                        <Button variant="outline-danger">Edit</Button>
                                    </Link>
                                )
                        }
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </Form>
        ) : (
            'loading...'
        )
}

export async function getServerSideProps(context) {
    return {
        props: context.query
    }
}