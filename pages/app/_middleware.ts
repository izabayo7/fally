import { NextResponse, NextRequest, NextFetchEvent } from 'next/server'
import { auth } from '../../lib/utils'

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    return auth(req)
}
