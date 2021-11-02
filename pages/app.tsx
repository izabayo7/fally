import Head from "next/head";
import {Fragment} from "react";
import Link from "next/link"

export default function app() {
  return <Fragment>
   <Head>
     <title>App</title>
   </Head>
    <nav className="bg-black shadow-md py-4 items-center px-12 text-white flex justify-end space-x-4">
     <Link href="/attendance">
        <a>users</a>
      </Link>

      <Link href="/attendance">
        <a>attendancies</a>
      </Link>
<Link href="/attendance">
        <a>report</a>
      </Link>

      <button className="bg-gray-800 px-4 py-2 rounded-sm shadow-md">logout</button>
    </nav>

    <section>
     <h1>users will go here :)</h1>
    </section>

  </Fragment>
}
