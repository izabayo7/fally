import Head from 'next/head'
import {Fragment} from 'react'
import Nav from '../../components/Nav'
import useSWR, {SWRConfig} from 'swr'
import fetch from '../../lib/fetch'
import {server} from '../../lib/utils'
import {User} from '../../lib/types'

function Users() {
    const {data} = useSWR<{data: User[]}>(`${server}/api/users`)

    return (
        <section className="pb-10">
            <table className="table-auto border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-200 p-4">No</th>
                        <th className="border border-gray-200 p-4">Name</th>
                        <th className="border border-gray-200 p-4">Email</th>
                        <th className="border border-gray-200 p-4">Gender</th>
                        <th className="border border-gray-200 p-4">Class</th>
                        {/* <th colSpan={2} className="border border-gray-200 p-4"> */}
                        {/*     Action */}
                        {/* </th> */}
                    </tr>
                </thead>
                <tbody>
                    {data?.data.map((item, index) => (
                        <tr key={item._id}>
                            <td className="border border-gray-200 p-4">{index + 1}</td>
                            <td className="border border-gray-200 p-4">{item.names}</td>
                            <td className="border border-gray-200 p-4">{item.email}</td>
                            <td className="border border-gray-200 p-4">{item.gender}</td>
                            <td className="border border-gray-200 p-4">{item.class}</td>
                            {/* <td className="border border-gray-200 p-4"> */}
                            {/*     <svg */}
                            {/*         xmlns="http://www.w3.org/2000/svg" */}
                            {/*         className="h-6 w-6" */}
                            {/*         fill="none" */}
                            {/*         viewBox="0 0 24 24" */}
                            {/*         stroke="currentColor" */}
                            {/*     > */}
                            {/*         <path */}
                            {/*             strokeLinecap="round" */}
                            {/*             strokeLinejoin="round" */}
                            {/*             strokeWidth={2} */}
                            {/*             d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" */}
                            {/*         /> */}
                            {/*     </svg> */}
                            {/* </td> */}
                            {/* <td className="border border-gray-200 p-4"> */}
                            {/*     <svg */}
                            {/*         xmlns="http://www.w3.org/2000/svg" */}
                            {/*         className="h-6 w-6" */}
                            {/*         fill="none" */}
                            {/*         viewBox="0 0 24 24" */}
                            {/*         stroke="currentColor" */}
                            {/*     > */}
                            {/*         <path */}
                            {/*             strokeLinecap="round" */}
                            {/*             strokeLinejoin="round" */}
                            {/*             strokeWidth={2} */}
                            {/*             d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" */}
                            {/*         /> */}
                            {/*     </svg> */}
                            {/* </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default function app({fallback}) {
    return (
        <Fragment>
            <Head>
                <title>App</title>
            </Head>

            <Nav />

            <section className="grid place-items-center mt-10">
                <SWRConfig value={fallback}>
                    <Users />
                </SWRConfig>
            </section>
        </Fragment>
    )
}

export async function getServerSideProps() {
    let server_url = `${server}/api/users`

    const users = await fetch(server_url)

    return {
        props: {
            fallback: {
                server_url: users
            }
        }
    }
}
