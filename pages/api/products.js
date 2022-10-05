import { connectToDatabase } from "../../utils/mongodb";
import redis from '../../lib/redis';

export default async (req, res) => {

  switch (req.method) {
        case 'GET': {
            return getProducts(req, res);
        }

        case 'POST': {
            return addProduct(req, res);
        }

        case 'PUT': {
            return updateProduct(req, res);
        }

        case 'DELETE': {
            return deleteProduct(req, res);
        }
    }
};

async function addProduct(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // add the post
        await db.collection('products').insertOne(JSON.parse(req.body));
        // return a message
        return res.json({
            message: 'Product added successfully',
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

async function getProducts(req,res){
    try {
        let cache = await redis.get("cache")
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
    
        let products = await db
            .collection('products')
            .find({})
            .toArray();
        redis.set("cache", JSON.stringify(products), "EX", 60)
        return res.json({
            message: JSON.parse(JSON.stringify(products)),
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

async function deleteProduct(req, res) {
    try {
        // Connecting to the database
        let { db } = await connectToDatabase();

        // Deleting the post
        await db.collection('products').deleteOne({
            _id: new ObjectId(req.body),
        });

        // returning a message
        return res.json({
            message: 'Product deleted successfully',
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