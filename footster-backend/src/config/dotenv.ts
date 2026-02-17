import dotenv from 'dotenv'
dotenv.config();

function getEnv (env:string){
  if(!process.env[env]){
    throw new Error("Env not found!");
  }
  return process.env[env] ;
}

export default getEnv ;