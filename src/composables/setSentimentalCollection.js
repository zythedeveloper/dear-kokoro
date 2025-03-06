import { ref, watchEffect } from "vue"
import { db } from "../firebase/config"
import { doc, setDoc,updateDoc ,deleteDoc } from "firebase/firestore"
import { date, time } from './DateTime'


const useSentiment = (user_id,oldData,date) => {
    const directory = `users/${user_id}/sentiment/${date}`
    const docRef = doc(db, directory)
    let YearMonthDate= parseInt(date)
    console.log("old data" ,oldData)
    const setSentiment = async (newData) => {
        const newWords=[];
        try{
        newWords.push(...oldData[0].sentimentPositiveWords)
        }
        catch(err){
            newWords.push(...oldData)
        }
        newWords.push(...newData.sentimentPositiveWords)
        const error = ref(null)
        try {  
            await setDoc(docRef, {sentimentPositiveWords:newWords , date:YearMonthDate})
        } catch (err) {
            console.log(err)
            // error.value = "cannot upload document to database"
        }
    }


    const deleteSentiment= async(data)=>{
        let oldD;
        try{
            oldD= oldData[0].sentimentPositiveWords
        }catch(err){
            oldD= oldData
        }
        
        console.log("newD ",data)
        for(var i=0;i<data.length;i++){
            for(var j=0 ; j<oldD.length;j++){
                if (oldD[j].word == data[i].word){
                    console.log(oldD.splice(j,1))
                    break
                }
            }
        }
     
        try {  
            await setDoc(docRef, {sentimentPositiveWords:oldD , date:YearMonthDate})
        } catch (err) {
            console.log(err)
            // error.value = "cannot upload document to database"
        }

    }

    return{setSentiment, deleteSentiment}
}

export default useSentiment