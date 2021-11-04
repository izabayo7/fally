import Link from 'next/link'
import { server } from '../lib/utils'
import router from 'next/router'

export default function Nav() {
    const logout = async () => {
        let resp = await fetch(`${server}/api/signout`)
        router.push('/')
    }

    return (
        <nav className="bg-black shadow-md py-4 items-center px-12 text-white flex justify-end space-x-4">
            <Link href="/app">
                <a>home</a>
            </Link>

            <Link href="/app/attendance">
                <a>attendancies</a>
            </Link>
            <Link href="/app/report">
                <a>report</a>
            </Link>

            <button className="bg-gray-800 px-4 py-2 rounded-sm shadow-md" onClick={logout}>
                logout
            </button>
        </nav>
    )
}
