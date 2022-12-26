import type { NextApiRequest, NextApiResponse } from 'next'
import { ProductModel } from '../../../models'
import { IProduct } from '../../../interfaces'
import { db, SHOP_CONSTANTS } from '../../../database'

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
    const { gender = 'all' } = req.query;
    let condition = {};

    if ( gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`) ) {
        condition = { gender };
    }

    await db.connect()
    
    const products = await ProductModel.find(condition)
        .select('title images price inStock slug -_id')
        .lean();

    await db.disconnect()
    return res.status(200).json(products)
}
