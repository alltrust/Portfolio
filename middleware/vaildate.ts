import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ObjectSchema, Maybe, AnyObject } from "yup";

const validate = (schema:ObjectSchema<Maybe<AnyObject>>, handler: NextApiHandler)=>{
    return async (req:NextApiRequest, res:NextApiResponse)=>{
        if(req.method && req.method=== "POST"){
            try{
                console.log(req.body, "FROM VALIDATE")
                await schema.validate(req.body)
            }catch (err){
                console.log(err)
                return res.status(400).json(err)
            }
        }
        await handler(req, res)
    }
}

export default validate;

