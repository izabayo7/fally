import { NextResponse, NextRequest, NextFetchEvent } from 'next/server'
// import jwt from 'jsonwebtoken'

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    const { pathname } = req.nextUrl
    // const token = req.cookies['token']

    if (pathname == '/') {
        return NextResponse.rewrite('/signin')
    }

    // if (token) {
    //     const data = jwt.verify(token, process.env.JWT_SCRET)
    //     if (data) {
    //         return NextResponse.rewrite('/app)
    //     }
    // }

    return NextResponse.next()
}
