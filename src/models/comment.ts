import client from "../DB";

export type comment ={
    id?: string | number,
    commentBody : string,
    userId : string | number,
    commentTitle : string,
    rating : number
}

export class CommentStore{
    async index() : Promise<comment[]> {
        try{
            const sql = "SELECT * FROM comments;"
            const connection =await client.connect();
            const results =await connection.query(sql);
            connection.release();
            return results.rows; 

        }catch(err){
            throw new Error(`Can not get commments from db , error is ${err}`);

        }
    }
    async show(id:string | number) : Promise<comment>{
        try{
            const sql = "SELECT * FROM comments WHERE id=($1);"
            const connection = await client.connect();
            const results = await connection.query(sql,[id]);
            connection.release();
            return results.rows[0];
        }catch(err){
            throw new Error(`can not get comment with id ${id} , error is ${err}`);
        }
    }
    async create(c : comment) : Promise<comment>{
        try{
            const sql = "INSERT INTO comments (userId , commentTitle , commentBody , rating) VALUES($1,$2,$3,$4) RETURNING *;"
            const connection = await client.connect();
            console.log("after connecting");
            const results = await connection.query(sql,[c.userId , c.commentTitle , c.commentBody , c.rating]);
            console.log("results");
            connection.release();
            console.log(results.rows);
            return results.rows[0];

        }catch(err){
            throw new Error(`can not create comment , error is ${err}`);

        }
    }
    async update(id : string | number , c:comment) : Promise<comment>{
        try{
            const sql = "UPDATE comments SET userId=($1) , commentTitle=($2) , commentBody=($3)  ,  rating=($4) WHERE id=($5) RETURNING *;"
            const connection = await client.connect();
            const results = await connection.query(sql,[c.userId , c.commentTitle , c.commentBody , c.rating, id]);
            connection.release();
            return results.rows[0];
        }catch(err){
            throw new Error(`can not update comment ${id} , error is ${err}`);
        }
    }
    async delete(id : string | number) : Promise<comment>{
        try{
            const sql = "DELETE FROM comments WHERE id=($1);";
            const connection = await client.connect();
            const results = await connection.query(sql,[id]);
            connection.release();
            return results.rows[0];

        }catch(err){
            throw new Error(`can not delete comment with id ${id} , error is ${err}`);
        }
    }
}