import { db } from "../firebase/config"
import { collection, onSnapshot, query, orderBy, limit,getDoc, getDocs} from "firebase/firestore"
import { date, numOfDaysOfMonth } from "./DateTime"


// get the words for wordcloud
const getSentimentalCollections = async (user_id, filter = new Date() ) => {
    let records=[]
    let collectionName = `users/${user_id}/sentiment`
    const collectionRef = collection(db, collectionName)
    const querySnapshot = await getDocs(collectionRef)
    console.log(filter)
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log("foreach id: ", doc.id , " foreach data: ", doc.data())
        if(doc.id==filter){
            records.push(doc.data());
        }
      });
      console.log("records",records)
      if(records.length==0){
        return records
      }
      console.log(records)
      return records
}

export default getSentimentalCollections ;
