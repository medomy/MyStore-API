import client from "../DB";

export type product = {
    id? : string | number,
    title : string,
    price : number,
    description : string,
    company : string,
    categoryId : string | number,
    photoSrc : string
}

export class ProductsStore {
    async index() : Promise<product[]> {
        try{
            const sql = "SELECT * FROM products;"
            const connection =await client.connect();
            const results =await connection.query(sql);
            connection.release();
            return results.rows; 

        }catch(err){
            throw new Error(`Can not get products from db , error is ${err}`);

        }
    }
    async show(id:string | number) : Promise<product>{
        try{
            const sql = "SELECT * FROM products WHERE id=($1);"
            const connection = await client.connect();
            const results = await connection.query(sql,[id]);
            connection.release();
            return results.rows[0];
        }catch(err){
            throw new Error(`can not get product with id ${id} , error is ${err}`);
        }
    }

    async create(p:product) : Promise<product>{
        try{
            const sql = "INSERT INTO products (title , price , description , company , categoryId , photoSrc) VALUES($1,$2,$3,$4,$5,$6) RETURNING *;"
            const connection = await client.connect();
            console.log("after connecting");
            const results = await connection.query(sql,[p.title , p.price , p.description , p.company , p.categoryId , p.photoSrc]);
            console.log("results");
            connection.release();
            console.log(results.rows);
            return results.rows[0];

        }catch(err){
            throw new Error(`can not create product , error is ${err}`);

        }
    }

    async update(id : string | number , p:product) : Promise<product>{
        try{
            const sql = "UPDATE products SET title=($1) , price=($2) , description=($3) , company=($4) , categoryId=($5) , photoSrc=($6) WHERE id=($7) RETURNING *;"
            const connection = await client.connect();
            const results = await connection.query(sql,[p.title , p.price , p.description , p.company , p.categoryId , p.photoSrc , id]);
            connection.release();
            return results.rows[0];
        }catch(err){
            throw new Error(`can not update product ${id} , error is ${err}`);
        }
    }
    async delete(id : string | number) : Promise<product>{
        try{
            const sql = "DELETE FROM products WHERE id=($1);";
            const connection = await client.connect();
            const results = await connection.query(sql,[id]);
            connection.release();
            return results.rows[0];

        }catch(err){
            throw new Error(`can not delete product with id ${id} , error is ${err}`);
        }
    }
}