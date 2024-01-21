"use server"
import * as z from "zod"
import bcrypt from "bcrypt"
import { RegisterSchema } from "@/schemas"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/data"
export const register = async(values:z.infer<typeof RegisterSchema>)=>{

    const validateFields = RegisterSchema.safeParse(values)

    if(!validateFields.success){
        return {error: "Invalid fields!"}
    }

    const {email, password, name} = validateFields.data

    const hashedPassword = await bcrypt.hash(password,10)

    const existUser = await getUserByEmail(email)

    if(existUser){
        return {error: "Email already in use"}
    }

    await db.user.create({data:{name,email,password:hashedPassword}})
    
    return {success: "User created!"}
}