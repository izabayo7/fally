import { NextApiRequest, NextApiResponse } from 'next'
import { getDatabase } from '../../lib/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    let db = await getDatabase()
    switch (req.method) {
        case 'POST':
            let req_data = JSON.parse(req.body)
            await db.collection('report').insertOne({ ...req_data })
            return res.status(201).json({ sucess: true, message: 'Saved sucessfully' })
        default:
            return res.status(200).json({ message: 'Nothing here' })
    }
}
