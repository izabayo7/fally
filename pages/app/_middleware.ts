import { NextResponse, NextRequest, NextFetchEvent } from 'next/server'
import jwt from 'jsonwebtoken'

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    const token = req.cookies['token']

    if (!token) return NextResponse.rewrite('/signin')

    const data = jwt.verify(token, process.env.JWT_SCRET)

    if (!data) return NextResponse.rewrite('/signin')

    return NextResponse.next()
}
