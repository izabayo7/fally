import Head from 'next/head'
import { Fragment } from 'react'
export default function Signin() {
    return (
        <Fragment>
            <Head>
                <title>signin</title>
            </Head>
            <section className="grid place-items-center h-screen w-screen">
                <form className="shadow-xl w-96 px-8 py-12">
                    <h1 className="text-2xl text-center">Signin</h1>
                    <div className="py-5">
                        <label className="block">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="py-4 rounded-sm px-3 w-full border-2 border-gray-900"
                        />
                    </div>
                    <div className="py-5">
                        <label className="block">Password</label>
                        <input
                            type="password"
                            className="rounded-sm px-3 w-full border-2 border-gray-900 py-4"
                            placeholder="Enter your password"
                        />
                    </div>
                    <input
                        type="submit"
                        value="signin"
                        className="bg-black text-white w-full py-3 rounded-md"
                    />
                </form>
            </section>
        </Fragment>
    )
}
