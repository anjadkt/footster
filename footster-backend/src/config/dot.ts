import dotenv from 'dotenv'
dotenv.config();

export default function getEnv(key:string):string{
  const value = process.env[key]
  if(!value){
    throw new Error("Env value not found!");
  }
  return value ;
}