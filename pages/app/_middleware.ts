import { NextResponse, NextRequest, NextFetchEvent } from 'next/server'
import jwt from 'jsonwebtoken'

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    const token = req.cookies['token']

    if (!token) {
        return NextResponse.redirect('/signin')
    }

    const data = jwt.verify(token, process.env.JWT_SCRET)

    console.log({ data })

    return NextResponse.next()
}