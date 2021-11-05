import {Fragment} from 'react'
import Head from 'next/head'
import Nav from '../../components/Nav'
import {getDatabase} from '../../lib/db'
import {getCurrentWeekInTheYear} from '../../lib/utils'

export default function users({report}) {


    let item = JSON.parse(report)

    console.log({item})

    return (
        <Fragment>
            <Head>
                <title>users</title>
            </Head>

            <Nav />

            {item ? <section className="grid place-items-center mt-20 font-primary">
                <table className="table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-black text-white">
                            <th className="border border-gray-200 font-primary p-4">Igikora</th>
                            <th className="border border-gray-200 font-primary p-4">Ukocyakozwe</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-200 p-4">Abaje</td>
                            <td className="border border-gray-200 p-4">{item.presents}</td>
                        </tr>

                        <tr >
                            <td className="border border-gray-200 p-4">Abarwayi</td>
                            <td className="border border-gray-200 p-4">{item.sick}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-200 p-4">Abasuye</td>
                            <td className="border border-gray-200 p-4">{item.visited}</td>
                        </tr>

                        <tr>
                            <td className="border border-gray-200 p-4">Abasuwe</td>
                            <td className="border border-gray-200 p-4">{item.wereVisted}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-200 p-4">Abafashije</td>
                            <td className="border border-gray-200 p-4">{item.helped}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-200 p-4">Abaje</td>
                            <td className="border border-gray-200 p-4">{item.wereHelped}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-200 p-4">Abashyitsi</td>
                            <td className="border border-gray-200 p-4">{item.vistors}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-200 p-4">Twese twiriwe turi</td>
                            <td className="border border-gray-200 p-4">{item.vistors + item.presents}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
                : <section className="grid place-items-center mt-20"><p className="font-bold font-primary">No report</p></section>}

        </Fragment>
    )
}

export async function getServerSideProps() {
    let db = await getDatabase()


    const report = await db.collection('reports').findOne({
        sabbath_week: getCurrentWeekInTheYear()[1] - 1,
        year: getCurrentWeekInTheYear()[0]
    })


    return {
        props: {
            report: JSON.stringify(report)
        }
    }
}
