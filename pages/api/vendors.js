
import { connectToDatabase } from "../../utils/mongodb";
import redis from '../../lib/redis';



export default async (req, res) => {

  switch (req.method) {
        case 'GET': {
            return getVendors(req, res);
        }

        case 'POST': {
            return addVendor(req, res);
        }

        case 'PUT': {
            return updateVendor(req, res);
        }

        case 'DELETE': {
            return deleteVendor(req, res);
        }
    }
};

async function addVendor(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // add the post
        await db.collection('vendors').insertOne(JSON.parse(req.body));
        // return a message
        return res.json({
            message: 'Vendor added successfully',
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

async function getVendors(req,res){
    try {
        let cache = await redis.get("cache-vendors")
        cache = JSON.parse(cache)
        if (cache) {
            console.log("loading from cache")
            return res.json({
                message: cache,
                success: true,
                numOfVendors: cache.length
            });
        } else {
            console.log("loading from api")
        // connect to the database
        let { db } = await connectToDatabase();
    
        let Vendors = await db
            .collection('vendors')
            .find({})
            .toArray();
        redis.set("cache-vendors", JSON.stringify(Vendors), "EX", 60)
        return res.json({
            message: JSON.parse(JSON.stringify(Vendors)),
            success: true,
            numOfVendors: Vendors.length,
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

async function deleteVendor(req, res) {
    try {
        // Connecting to the database
        let { db } = await connectToDatabase();

        // Deleting the post
        const result = await db.collection('vendors').deleteOne({
            id: req.body,
        });
        let Vendors = await db
            .collection('vendors')
            .find({id:'1652700669467'})
            .toArray();
        console.log(Vendors, req.body.toString())

        // returning a message
        return res.json({
           message:`Successfully deleted ${result.deletedCount} document.`
        });
    } catch (error) {

        // returning an error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}