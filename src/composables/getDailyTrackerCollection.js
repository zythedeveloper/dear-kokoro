import { db } from "../firebase/config"
import { collection, onSnapshot, query, orderBy, limit} from "firebase/firestore"
import { date, numOfDaysOfMonth } from "./DateTime"

// get the records for most chart
const getCollection = async (user_id, filter=new Date()) => {
    const records = []
    let collectionName = `users/${user_id}/dailyTracker`
    const collectionRef = collection(db, collectionName)
    const yearMon = date(filter.getTime()).substring(0,6) // get year and month
    const q = query(collectionRef, orderBy("date", "desc"), limit(numOfDaysOfMonth(filter.getTime())))

    return await new Promise((resolve)=> {
        // realtime get collection data
        onSnapshot(q, 
            (snapshot) => {
                if (Object.keys(snapshot.docs).length <= 0) console.log("no records")
                else{
                    snapshot.docs.forEach((doc) => {
                        const record = {...doc.data()}
                        // console.log(`date: ${record.date}, ${yearMon}, ${record.date.toString().includes(yearMon)}`)
                        if (record.date.toString().includes(yearMon)) // make sure the data is same month
                        {
                            records.push({ ...doc.data(), id: doc.id })
                        }
                    })
                    resolve(records)
                }
            },
            (err) => console.log(err.message)
        )
    })
}

// get the words for wordcloud
const getSentimentalWords = async (user_id, filter = new Date() ) => {
    const words = []
    let collectionName = `users/${user_id}/sentiment`
    const collectionRef = collection(db, collectionName)
    const yearMon = date(filter.getTime()).substring(0,6) // get year and month
    const q = query(collectionRef, orderBy("date", "desc"), limit(numOfDaysOfMonth(filter.getTime())))

    return await new Promise((resolve)=> {
        // realtime get collection data
        onSnapshot(q,
            (snapshot) => {
                if (Object.keys(snapshot.docs).length <= 0) console.log("no records")
                else{
                    snapshot.docs.forEach((doc) => {
                        const record = {...doc.data()}
                        // make sure the data is same month and words existed
                        if (record.date.toString().includes(yearMon) && record.sentimentPositiveWords != undefined)
                        {
                            record.sentimentPositiveWords.forEach((w) => words.push(w))
                        }
                    })
                    resolve(words)
                }
            },
            (err) => console.log(err.message)
        )
    })
}

export { getCollection, getSentimentalWords };
