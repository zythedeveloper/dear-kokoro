import { ref } from "vue";
import { db } from "../firebase/config";
import { collection, doc, addDoc } from "firebase/firestore";

const useCollection = (collectionName) => {
	//const collectionRef = collection(db, collectionName);

	const error = ref(null);
	const isPending = ref(false);

	const addDocument = async (document) => {
		error.value = null;
		isPending.value = true;
		try {
			const res = await addDoc(collection(db, collectionName), document);
			let options={
				method: "POST",
				body: JSON.stringify({
					document: {...document, objectID:res.id}
				}),
				headers:{
					"Content-Type": "application/json"
				}
			}
			await fetch('https://expressapi-yc7ocl2pnq-uc.a.run.app/journal', options)
			isPending.value = false;
			return res;
		} catch (err) {
			console.log(err.message);
			error.value = "cannot upload document to database";
			isPending.value = false;
		}
	};

	return { error, addDocument, isPending };
};

export default useCollection;
