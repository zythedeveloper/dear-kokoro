import { ref, watchEffect } from "vue";
import { db} from "../firebase/config";
import { doc, onSnapshot, getDoc, DocumentSnapshot } from "firebase/firestore";

const getDocument = (collectionName, id) => {
	
	const error = ref(null);
	const document = ref(null);
	// const docRef = doc(db, collectionName, id);
	// const docSnap = await getDoc(docRef);
	// document.value = { ...docSnap.data(), id: docSnap.id };

	const unsub = onSnapshot(
		doc(db, collectionName, id),
		(documentRes) => {
			if (documentRes.data()) {
				document.value = { ...documentRes.data(), id: documentRes.id };
				error.value = null;
			} else {
				error.value = "that document does not exist";
			}
		},
		(err) => {
			console.log(err.message);
			error.value = "cannot fetch data";
		}
	);
	watchEffect((onInvalidate) => {
		// unsub from prev collection when watch is stopped (component unmounted)

		onInvalidate(() => {
			unsub();
		});
	});
	return { document, error };
};

export default getDocument;