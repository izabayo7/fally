import { NextApiRequest, NextApiResponse } from 'next'
import { getDatabase } from '../../lib/db'
import { getCurrentWeekInTheYear } from '../../lib/utils'

export default async function Report(req: NextApiRequest, res: NextApiResponse) {
    let db = await getDatabase()
    switch (req.method) {
        case 'POST':
            let req_data = JSON.parse(req.body)

            let report_exists = await db.collection('reports').findOne({
                sabbath_week: getCurrentWeekInTheYear()[1],
                year: getCurrentWeekInTheYear()[0]
            })

            if (report_exists) {
                return res.status(403).json({ sucess: true, message: 'Report already submitted' })
            }

            await db.collection('reports').insertOne({
                ...req_data,
                sabbath_week: getCurrentWeekInTheYear()[1],
                year: getCurrentWeekInTheYear()[0],
                created: Date.now()
            })
            return res.status(201).json({ sucess: true, message: 'Saved sucessfully' })
        default:
            return res.status(200).json({ message: 'Nothing here' })
    }
}
