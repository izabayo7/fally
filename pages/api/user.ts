import { NextApiRequest, NextApiResponse } from 'next'
import { getDatabase } from '../../lib/db'
import bcrypt from 'bcryptjs'

const hash = async (password: string) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    let db = await getDatabase()

    switch (req.method) {
        case 'POST':
            let new_user = await db
                .collection('users')
                .insertOne({ ...req.body, password: await hash(req.body.password), role: 'MEMBER' })
            return res.status(200).json({ success: true, data: new_user })
        case 'GET':
            return res.status(200).json({ name: 'Getting users.....' })
        default:
            return res.status(200).json({ message: 'Not supported' })
    }
}
