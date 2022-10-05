
import { connectToDatabase } from "../../../utils/mongodb";
import redis from '../../../lib/redis';

export default async (req, res) => {
  const {
    query: { sid },
  } = req
 try {
        let cache = await redis.get("cache-stores")
        cache = JSON.parse(cache)
        if (cache) {
            console.log("loading from cache")
            return res.json({
                message: cache,
                success: true,
            });
        } else {
            console.log("loading from api")
        // connect to the database
        let { db } = await connectToDatabase();
    
        let store = await db
            .collection('stores')
            .find({'id':parseInt(sid)})
            .toArray();

        res.status(200).json(store[0]);
        }
       
    } catch (error) {
        // return the error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
}
}