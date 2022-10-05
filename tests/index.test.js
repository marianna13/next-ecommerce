import {connectToDatabase} from "../utils/mongodb";


describe('Product CRUD',() => {
});


beforeAll(async () => {
    let { db } = await connectToDatabase();
 })

afterAll(async () => {
    const collection = "test";
    await db.dropCollection(collection);
    await db.dropDatabase();
    await db.close();
 });

test("Add product POST /products",async () => {
    await db.collection('products').insertOne({
        name: 'orange'
    });
    const response = await customers.create({
          name: process.env.PRODUCT_NAME,
          email: process.env.PRODUCT_PRICE});
          await response.save();
          expect(response.name).toBe(process.env.PRODUCT_NAME);
    });

test("All Products GET /addproduct", async () => {
   const response = await customers.find({});
   
   expect(response.length).toBeGreaterThan(0);
});