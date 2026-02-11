export default function errorFunction(error:unknown){
  if(error instanceof Error){
     return {message : error.message , status : 500}
  }
  return console.log("Unknown Error!");
}