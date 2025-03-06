//http://localhost:8000/sentiment
// https://expressapi-yc7ocl2pnq-uc.a.run.app/

const sentimentAnalysis= async(message)=>{

    const options={
        method: "POST",
        body: JSON.stringify({
            message: message,
        }),
        headers:{
            "Content-Type": "application/json"
        }
    }
    try{
        const response= await fetch('https://expressapi-yc7ocl2pnq-uc.a.run.app/sentiment', options);
        const data= await response.json();
        return data;
    }
    catch(err){
        console.log(err);
    }
}
export default sentimentAnalysis;
