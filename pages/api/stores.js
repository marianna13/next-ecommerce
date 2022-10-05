
import { connectToDatabase } from "../../utils/mongodb";
import redis from '../../lib/redis';



export default async (req, res) => {

  switch (req.method) {
        case 'GET': {
            return getStores(req, res);
        }

        case 'POST': {
            return addStore(req, res);
        }

        case 'PUT': {
            return updateStore(req, res);
        }

        case 'DELETE': {
            return deleteStore(req, res);
        }
    }
};

async function addStore(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // add the post
        await db.collection('stores').insertOne(JSON.parse(req.body));
        // return a message
        return res.json({
            message: 'store added successfully',
            success: true,
        });
    } catch (error) {
        // return an error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
};

async function getStores(req,res){
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
    
        let stores = await db
            .collection('stores')
            .find({})
            .toArray();
        redis.set("cache-stores", JSON.stringify(stores), "EX", 60)
        return res.json({
            message: JSON.parse(JSON.stringify(stores)),
            success: true,
        });
        }
       
    } catch (error) {
        // return the error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
};

async function deleteStore(req, res) {
    try {
        // Connecting to the database
        let { db } = await connectToDatabase();

        // Deleting the post
        await db.collection('stores').deleteOne({
            _id: new ObjectId(req.body),
        });

        // returning a message
        return res.json({
            message: 'store deleted successfully',
            success: true,
        });
    } catch (error) {

        // returning an error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}