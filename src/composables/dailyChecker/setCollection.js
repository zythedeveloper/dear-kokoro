import { db } from "../../firebase/config"
import { doc, setDoc } from "firebase/firestore"
import { date, time } from '../DateTime'

const setDocument = async (user_id, data) => {
    const directory = `users/${user_id}/dailyTracker/${date()}`
    const docRef = doc(db, directory)

    try { 
        await setDoc(docRef, data)
    } catch (err) {
        console.log(err.message)
    }
}

export default setDocument 