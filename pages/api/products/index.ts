import type { NextApiRequest, NextApiResponse } from 'next'
import { ProductModel } from '../../../models'
import { IProduct } from '../../../interfaces'
import { db } from '../../../database'

type Response = 
| { message: string }
| IProduct[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
    
    switch (req.method) {
        case 'GET':
            return getProducts(req, res)
    
        default:
            return res.status(405).json({message: 'Method not allowed'})
    }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
    await db.connect()
    const products = await ProductModel.find({}).lean()
    await db.disconnect()
    return res.status(200).json(products)
}
