import client from "../DB";

export type productsQuantities = {
    productId : string | number,
    qty : number
}
export type order = {
    id?: string | number,
    products_ids_qtys : Array<productsQuantities>,
    userId : string | number,
    address : string,
    totalPrice : number 
}

export class OrderStore {
    async index() : Promise<order[]> {
        try{
            const sql = "SELECT * FROM orders;"
            const connection =await client.connect();
            const results =await connection.query(sql);
            connection.release();
            return results.rows; 

        }catch(err){
            throw new Error(`Can not get orders from db , error is ${err}`);

        }
    }
    async show(id:string | number) : Promise<order>{
        try{
            const sql = "SELECT * FROM orders WHERE id=($1);"
            const connection = await client.connect();
            const results = await connection.query(sql,[id]);
            connection.release();
            return results.rows[0];
        }catch(err){
            throw new Error(`can not get order with id ${id} , error is ${err}`);
        }
    }

    async create(o:order) : Promise<order>{
        try{
            const sql = "INSERT INTO orders (products_ids_qtys , userId , address , totalPrice) VALUES($1,$2,$3,$4) RETURNING *;"
            const connection = await client.connect();
            console.log("after connecting");
            const results = await connection.query(sql,[o.products_ids_qtys , o.userId , o.address , o.totalPrice]);
            console.log("results");
            connection.release();
            console.log(results.rows);
            return results.rows[0];

        }catch(err){
            throw new Error(`can not create order , error is ${err}`);

        }
    }
    async update(id : string | number , o:order) : Promise<order>{
        try{
            //products_ids_qtys , userId , address , totalPrice
            const sql = "UPDATE products SET products_ids_qtys=($1) , userId=($2) , address=($3) , totalPrice=($4) WHERE id=($5) RETURNING *;"
            const connection = await client.connect();
            const results = await connection.query(sql,[o.products_ids_qtys , o.userId , o.address , o.totalPrice, id]);
            connection.release();
            return results.rows[0];
        }catch(err){
            throw new Error(`can not update order ${id} , error is ${err}`);
        }
    }
    async delete(id : string | number) : Promise<order>{
        try{
            const sql = "DELETE FROM orders WHERE id=($1);";
            const connection = await client.connect();
            const results = await connection.query(sql,[id]);
            connection.release();
            return results.rows[0];

        }catch(err){
            throw new Error(`can not delete order with id ${id} , error is ${err}`);
        }
    }
}