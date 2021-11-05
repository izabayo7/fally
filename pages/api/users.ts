import { NextApiRequest, NextApiResponse } from 'next'
import { getDatabase } from '../../lib/db'
import bcrypt from 'bcryptjs'

const hash = async (password: string) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

export default async function Users(req: NextApiRequest, res: NextApiResponse) {
    let db = await getDatabase()

    switch (req.method) {
        case 'POST':
            let user_exists = await db.collection('users').findOne({ email: req.body.email })

            if (user_exists) {
                return res.status(200).json({ success: false, message: 'user already exists' })
            }

            let new_user = await db
                .collection('users')
                .insertOne({ ...req.body, password: await hash(req.body.password), role: 'MEMBER' })
            return res.status(200).json({ success: true, data: new_user })
        case 'GET':
            let users = await db.collection('users').find().sort({ names: 1 }).toArray()
            return res.status(200).json({ success: true, data: users })
        default:
            return res.status(200).json({ message: 'Not supported' })
    }
}
