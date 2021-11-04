import { SWRConfig } from 'swr'
import '../styles/globals.css'
import fetch from '../lib/fetch'

function MyApp({ Component, pageProps }) {
    return (
        <SWRConfig value={{ fetcher: fetch }}>
            {' '}
            <Component {...pageProps} />
        </SWRConfig>
    )
}

export default MyApp
