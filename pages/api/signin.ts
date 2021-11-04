import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'
import { getDatabase } from '../../lib/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const db = await getDatabase()

    switch (req.method) {
        case 'POST':
            const { email, password } = req.body

            if (!email || !password) {
                return res.status(403).json({ success: false, message: 'All fields are required' })
            }

            const user = await db.collection('users').findOne({ email })

            const passwordMatch = await bcrypt.compare(password, user.password)

            if (!passwordMatch) {
                return res
                    .status(401)
                    .json({ success: false, message: 'Invalid email or password' })
            }

            const token = jwt.sign({ user }, process.env.JWT_SCRET, {
                expiresIn: process.env.JWT_EXPIRE
            })

            res.setHeader(
                'Set-Cookie',
                cookie.serialize('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    maxAge: 60 * 24 * 60,
                    sameSite: 'strict',
                    path: '/'
                })
            )
            return res.status(200).json({ success: true })
        default:
            res.status(401).json({ success: false })
    }
}
