import client from "../DB";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD?.toString();
const salt = Number(process.env.SALT_ROUNDS);

export type user = {
    id?: string | number,
    userName: string,
    first_name: string,
    last_name: string,
    password: string,
    email: string,
    country: string,
    mobilePhone: string | number,
    photoUrl: string
}
export type cartItem = {
    id?: string | number,
    productId : number | string,
    userId : string | number,
    quantity : number
}

export class UserStore {
    async index(): Promise<user[]> {
        try {
            const sql = "SELECT * FROM users;"
            const connection = await client.connect();
            const results = await connection.query(sql);
            connection.release();
            return results.rows;

        } catch (err) {
            throw new Error(`can not get users ,, error is ${err}`)
        }
    }
    async show(id: string | number): Promise<user> {
        try {
            const sql = `SELECT * FROM users WHERE id=($1);`;
            const connection = await client.connect();
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`can not find user ${id}. error is ${err}`)
        }
    }
    async create(u: user): Promise<user> {
        try {
            const users = await this.index();
            const users_userName = users.filter((user) => user.userName === u.userName);
            if (users_userName.length) {
                throw new Error(`username ${u.userName} alredy exists`)
            }
            else {
                const sql = `INSERT INTO users (userName , first_name ,last_name, password_encryption, email ,country ,mobilePhone,photoUrl) VALUES($1, $2, $3, $4 , $5, $6 , $7 , $8 ) RETURNING *;`;
                const connection = await client.connect();
                const hash = bcrypt.hashSync(
                    u.password + pepper,
                    salt
                )
                const result = await connection.query(sql, [u.userName, u.first_name, u.last_name, hash, u.email, u.country, u.mobilePhone, u.photoUrl]);
                connection.release();
                return result.rows[0];

            }

        } catch (err) {
            throw new Error(`can not add user ${u.userName} , the error is ${err}`);
        }
    }
    async delete(id: string | number): Promise<user> {
        try {
            const sql = `DELETE FROM users WHERE id=($1);`;
            const connection = await client.connect();
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`can not delete user ${id} , the error is ${err}`);

        }
    }
    async update(id: string | number, u: user): Promise<user> {
        try {
            //(userName , first_name ,last_name, password_encryption, email ,country ,mobilePhone,photoUrl)
            const sql = `UPDATE users SET userName=($1) , first_name=($2) , last_name=($3), password_encryption=($4) , email=($5) , country=($6) , mobilePhone=($7) , photoUrl=($8) WHERE id=($9) RETURNING *; `;
            const connection = await client.connect();
            const hash = bcrypt.hashSync(
                u.password + pepper,
                salt
            );
            const result = await connection.query(sql, [u.userName, u.first_name, u.last_name, hash, u.email, u.country, u.mobilePhone, u.photoUrl, id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`can not update user ${id} , the error is ${err}`);

        }
    }
    async signIn(userName : string , password : string) : Promise <user | null>{
        try{
            const sql = 'SELECT * FROM users WHERE username=($1)';
            const connection = await client.connect();
            console.log("connecting");
            const result = await connection.query(sql,[userName]);
            console.log(result.rows);
            connection.release();
            if(result.rows.length){
                const user = result.rows[0];
                console.log(user);
                if(bcrypt.compareSync(password + pepper , user.password_encryption)){
                    return user;
                }
                else{
                    throw new Error ("password is incorrect");
                }
            }
            else{
                return null;
            }
    }catch(err){
        throw new Error(`can not authenticate ${err}`);
        }
    }
    // for cart items that relate to users
    async getCartItems(userId : string | number): Promise<cartItem[]>{
        try{
            const sql = 'SELECT * FROM cartItems WHERE userId =($1);'
            const connection = await client.connect();
            const result = await connection.query(sql , [userId]);
            connection.release();
            return result.rows;
        }catch(err){
            throw new Error(`can not get cart items , ${err}`)

        }
    }
    async addCartItem(qty : number , userId : string | number , productId :string | number) : Promise<cartItem>{
        try{
            const sql = 'INSERT INTO cartItems(quantity, userId , productId) VALUES($1, $2, $3) RETURNING *;';
            const connection = await client.connect();
            const result = await connection.query(sql,[qty,userId,productId]);
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`can't add cart items ,${err}`);

        }
    }
    async removeFromCart(userId : string | number , productId :string | number) : Promise<cartItem>{
        try{
            const sql = 'DELETE FROM cartItems WHERE userId =($1) AND productId=($2);'
            const connection = await client.connect();
            const result = await connection.query(sql , [userId , productId]);
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`can not delete cart items , ${err}`)
        }
    }

    async removeAllFromCart(userId : string | number) : Promise<cartItem[]>{
        try{
            const sql = 'DELETE FROM cartItems WHERE userId =($1);'
            const connection = await client.connect();
            const result = await connection.query(sql , [userId ]);
            connection.release();
            return result.rows;
        }catch(err){
            throw new Error(`can not delete cart items , ${err}`)
        }
    }
    
}