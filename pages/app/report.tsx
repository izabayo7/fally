import { Fragment } from 'react'
import Head from 'next/head'
import Nav from '../../components/Nav'

export default function users() {
    return (
        <Fragment>
            <Head>
                <title>users</title>
            </Head>

            <Nav />
            <p>users :)</p>
        </Fragment>
    )
}
