import {Fragment} from 'react'
import Head from 'next/head'
import Nav from '../../components/Nav'
import {server} from '../../lib/utils'
import useSWR, {SWRConfig} from 'swr'
import {User} from '../../lib/types'
import fetch from '../../lib/fetch'
import React from 'react'

function Users() {
    const {data} = useSWR<{data: User[]}>(`${server}/api/users`)

    const [presents, setPresents] = React.useState<string[]>([])
    const [visitors, setVisitors] = React.useState<string>('0')
    const [visit, setVisit] = React.useState<string[]>([])
    const [visited, setVisited] = React.useState<string[]>([])
    const [helped, setHelped] = React.useState<string[]>([])
    const [washelped, setwashelpded] = React.useState<string[]>([])
    const [sick, setsick] = React.useState<string[]>([])
    const [studied, setstudied] = React.useState<string[]>([])
    const [startedSabbath, setStartedSabbath] = React.useState<string[]>([])
    const [away, setaway] = React.useState<string[]>([])

    const isPresent = (id: string) => presents.includes(id)
    const hasVisited = (id: string) => visit.includes(id)
    const wasvisted = (id: string) => visited.includes(id)
    const isaway = (id: string) => away.includes(id)
    const hasHelped = (id: string) => helped.includes(id)
    const wasGivenHelp = (id: string) => washelped.includes(id)
    const isSick = (id: string) => sick.includes(id)
    const hasStudied = (id: string) => studied.includes(id)
    const hasStarted = (id: string) => startedSabbath.includes(id)

    const handleStarted = (id: string) => {
        if (!startedSabbath.includes(id)) {
            setStartedSabbath([...startedSabbath, id])
        } else {
            setStartedSabbath(startedSabbath.filter((s) => s != id))
        }
    }

    const handleStudied = (id: string) => {
        if (!studied.includes(id)) {
            setstudied([...studied, id])
        } else {
            setstudied(studied.filter((s) => s != id))
        }
    }

    const handleSick = (id: string) => {
        if (!sick.includes(id)) {
            setsick([...sick, id])
        } else {
            setsick(sick.filter((s) => s != id))
        }
    }

    const handelWasHelped = (id: string) => {
        if (!washelped.includes(id)) {
            setwashelpded([...washelped, id])
        } else {
            setwashelpded(washelped.filter((w) => w != id))
        }
    }

    const handleaway = (id: string) => {
        if (!away.includes(id)) {
            setaway([...away, id])
        } else {
            setaway(away.filter((w) => w != id))
        }
    }

    const handleHelp = (id: string) => {
        if (!helped.includes(id)) {
            setHelped([...helped, id])
        } else {
            setHelped(helped.filter((h) => h != id))
        }
    }

    const handlePresence = (id: string) => {
        if (!presents.includes(id)) {
            setPresents([...presents, id])
        } else {
            setPresents(presents.filter((p) => p != id))
        }
    }

    const handlewasvisted = (id: string) => {
        if (!visited.includes(id)) {
            setVisited([...visited, id])
        } else {
            setVisited(visited.filter((v) => v != id))
        }
    }

    const handleVisit = (id: string) => {
        if (!visit.includes(id)) {
            setVisit([...visit, id])
        } else {
            setVisit(visit.filter((v) => v != id))
        }
    }

    async function handle_submit_report() {
        const request = {
            presents: presents.length,
            vistors: parseInt(visitors),
            visited: visit.length,
            wereVisted: visited.length,
            helped: helped.length,
            wereHelped: washelped.length,
            sick: sick.length,
            studied7times: studied.length,
            startedSabbath: startedSabbath.length,
            absent: data?.data.length - presents.length - sick.length - away.length,
            away: away.length
        }

        try {
            let resp = await fetch(`${server}/api/report`, {
                method: 'POST',
                body: JSON.stringify(request)
            })

            alert(resp.message)

            setPresents([])
            setVisitors('')
            setVisit([])
            setVisited([])
            setHelped([])
            setaway([])
            setwashelpded([])
            setsick([])
            setstudied([])
            setStartedSabbath([])
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <section>
            <table className="table-auto relative h-20 overflow-auto  border-collapse border border-gray-300 font-primary mb-10">
                <thead >
                    <tr className="border-gray-200 border">
                        <th className="border sticky top-0 border-gray-200 p-4 bg-white">No</th>
                        <th className="border sticky top-0 border-gray-200 p-4 bg-white">Name</th>
                        <th className="border sticky top-0 border-gray-200 p-4 bg-white">Yaje</th>
                        <th className="border  sticky top-0 border-gray-200 p-4 bg-white">Afite impamvu</th>
                        <th className="border sticky top-0 border-gray-200 p-4 bg-white">Yasuye</th>
                        <th className="border sticky top-0 border-gray-200 p-4 bg-white">Yarasuwe</th>
                        <th className="border sticky top-0 border-gray-200 p-4 bg-white">Yarafashije</th>
                        <th className="border sticky top-0 border-gray-200 p-4 bg-white">Yarafashijwe</th>
                        <th className="border sticky top-0 border-gray-200 p-4 bg-white">Ararwaye</th>
                        <th className="border sticky top-0 border-gray-200 p-4 bg-white">Yize 7</th>
                        <th className="border sticky top-0 border-gray-200 p-4 bg-white">Yatangiye isabato</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.data.map((row, index) => (
                        <tr key={row._id}>
                            <td className="border border-gray-200 p-4">{index + 1}</td>
                            <td className="border border-gray-200 p-4">{row.names}</td>
                            <td className="border border-gray-200 p-4">
                                <input
                                    type="checkbox"
                                    className="rounded"
                                    checked={isPresent(row._id)}
                                    disabled={isaway(row._id)}
                                    onChange={() => handlePresence(row._id)}
                                />
                            </td>
                            <td className="border border-gray-200 p-4">
                                <input
                                    type="checkbox"
                                    className="rounded"
                                    checked={isaway(row._id)}
                                    disabled={isPresent(row._id)}
                                    onChange={() => handleaway(row._id)}
                                />
                            </td>
                            <td className="border border-gray-200 p-4">
                                <input
                                    type="checkbox"
                                    className="rounded"
                                    checked={hasVisited(row._id)}
                                    onChange={() => handleVisit(row._id)}
                                />
                            </td>
                            <td className="border border-gray-200 p-4">
                                <input
                                    type="checkbox"
                                    className="rounded"
                                    checked={wasvisted(row._id)}
                                    onChange={() => handlewasvisted(row._id)}
                                />
                            </td>
                            <td className="border border-gray-200 p-4">
                                <input
                                    type="checkbox"
                                    className="rounded"
                                    checked={hasHelped(row._id)}
                                    onChange={() => handleHelp(row._id)}
                                />
                            </td>
                            <td className="border border-gray-200 p-4">
                                <input
                                    type="checkbox"
                                    className="rounded"
                                    checked={wasGivenHelp(row._id)}
                                    onChange={() => handelWasHelped(row._id)}
                                />
                            </td>
                            <td className="border border-gray-200 p-4">
                                <input
                                    type="checkbox"
                                    className="rounded"
                                    checked={isSick(row._id)}
                                    onChange={() => handleSick(row._id)}
                                    disabled={isPresent(row._id)}
                                />
                            </td>
                            <td className="border border-gray-200 p-4">
                                <input
                                    type="checkbox"
                                    className="rounded"
                                    checked={hasStudied(row._id)}
                                    onChange={() => handleStudied(row._id)}
                                />
                            </td>
                            <td className="border border-gray-200 p-4">
                                <input
                                    type="checkbox"
                                    className="rounded"
                                    checked={hasStarted(row._id)}
                                    onChange={() => handleStarted(row._id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <section className="flex items-end flex-col py-10 space-y-2">
                <input
                    type="number"
                    placeholder="vistors number"
                    className="rounded-sm"
                    onChange={(e) => setVisitors(e.target.value)}
                    value={visitors}
                />
                <input
                    type="submit"
                    onClick={handle_submit_report}
                    className="px-24 py-3 bg-black text-white rounded-sm cursor-pointer"
                />
            </section>
        </section>
    )
}

export default function attendance({fallback}) {
    return (
        <Fragment>
            <Head>
                <title>attendance</title>
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
