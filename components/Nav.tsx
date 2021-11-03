import Link from 'next/link'

export default function Nav() {
    return (
        <nav className="bg-black shadow-md py-4 items-center px-12 text-white flex justify-end space-x-4">
            <Link href="/app/users">
                <a>users</a>
            </Link>

            <Link href="/app/attendance">
                <a>attendancies</a>
            </Link>
            <Link href="/app/report">
                <a>report</a>
            </Link>

            <button className="bg-gray-800 px-4 py-2 rounded-sm shadow-md">logout</button>
        </nav>
    )
}
