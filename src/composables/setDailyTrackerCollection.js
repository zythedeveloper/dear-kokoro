import { ref, watchEffect } from "vue"
import { db } from "../firebase/config"
import { doc, setDoc } from "firebase/firestore"
import { date, time } from './DateTime'

const setDocument = async (user_id, data) => {
    const error = ref(null)
	const isPending = ref(false)

    const directory = `users/${user_id}/dailyTracker/${date()}`
    const docRef = doc(db, directory)

    try {
        error.value = null;
        isPending.value = true;
        await setDoc(docRef, data)
    } catch (err) {
        console.log(err.message)
        error.value = "cannot upload document to database"
        isPending.value = false
    }
}

export default setDocument 