
import { connectToDatabase } from "../../../utils/mongodb";
import redis from '../../../lib/redis';

export default async (req, res) => {
  const {
    query: { pid },
  } = req
  
 try {
        let { db } = await connectToDatabase();
    
        let products = await db
            .collection('products')
            .find({})
            .toArray();
        const product = products.find(x => x.id === pid);
        res.status(200).json(product);
        
       
    } catch (error) {
        // return the error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
}
}