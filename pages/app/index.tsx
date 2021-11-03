import Head from 'next/head'
import { Fragment } from 'react'
import Nav from '../../components/Nav'

export default function app() {
    return (
        <Fragment>
            <Head>
                <title>App</title>
            </Head>

            <Nav />

            <section>
                <h1>users will go here :)</h1>
            </section>
        </Fragment>
    )
}
