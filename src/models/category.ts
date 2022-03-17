import client from "../DB";

export type category = {
    id? : string | number,
    name : string,
    description : string,
    photoUrl : string
}

export class CategoriesStore{
    async index() : Promise<category[]>{
        try{
            const sql = "SELECT * FROM categories;"
            const connection =await client.connect();
            const results =await connection.query(sql);
            connection.release();
            return results.rows; 

        }catch(err){
            throw new Error(`Can not get categories from db , error is ${err}`);
        }
    }
    async show(id:string | number) : Promise<category>{
        try{
            const sql = "SELECT * FROM categories WHERE id=($1);"
            const connection = await client.connect();
            const results = await connection.query(sql,[id]);
            connection.release();
            return results.rows[0];
        }catch(err){
            throw new Error(`can not get category with id ${id} , error is ${err}`);
        }
    }
    async create(c : category) : Promise<category>{
        try{
            const sql = "INSERT INTO categories (name , description , photoUrl) VALUES($1,$2,$3) RETURNING *;"
            const connection = await client.connect();
            const results = await connection.query(sql,[c.name , c.description , c.photoUrl]);
            connection.release();
            return results.rows[0];

        }catch(err){
            throw new Error(`can not create category , error is ${err}`);

        }
    }
    async update(id : string | number , c:category) : Promise<category>{
        try{
            const sql = "UPDATE categories SET name=($1) , description=($2) , photoUrl=($3) WHERE id=($4) RETURNING *;"
            const connection = await client.connect();
            const results = await connection.query(sql,[c.name,c.description,c.photoUrl, id]);
            connection.release();
            return results.rows[0];
        }catch(err){
            throw new Error(`can not update category ${id} , error is ${err}`);
        }
    }
    async delete(id : string | number) : Promise<category>{
        try{
            const sql = "DELETE FROM categories WHERE id=($1);";
            const connection = await client.connect();
            const results = await connection.query(sql,[id]);
            connection.release();
            return results.rows[0];

        }catch(err){
            throw new Error(`can not delete category with id ${id} , error is ${err}`);
        }
    }

}