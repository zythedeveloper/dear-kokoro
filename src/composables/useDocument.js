import { ref } from "vue";
import { db } from "../firebase/config";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const useDocument = (collectionName, id) => {
	const error = ref(null);
	const isPending = ref(false);
	let docRef = doc(db, collectionName, id);

	const deleteDocument = async () => {
		isPending.value = true;
		error.value = null;

		try {
			const res = await deleteDoc(docRef);
			let options={
				method: "DELETE",
				body: JSON.stringify({
					id: id
				}),
				headers:{
					"Content-Type": "application/json"
				}
			}
			// update to algolia search indices
			await fetch('https://expressapi-yc7ocl2pnq-uc.a.run.app/journal', options)
			isPending.value = false;
			return res;
		} catch (err) {
			console.log(err.message);
			isPending.value = false;
			error.value = "cannot delete document";
		}
	};

	const updateDocument = async (updates) => {
		isPending.value = true;
		error.value = null;
		try {
			const res = await updateDoc(docRef, updates);
			let options={
				method: "PATCH",
				body: JSON.stringify({
					document: {...updates, objectID:id} 
				}),
				headers:{
					"Content-Type": "application/json"
				}
			}
			// upadate to Algolia search indices
			await fetch('https://expressapi-yc7ocl2pnq-uc.a.run.app/journal', options)
			isPending.value = false;
			return res;
		} catch (err) {
			console.log(err.message);
			isPending.value = false;
			error.value = "cannot update document";
		}
	};

	return { error, isPending, deleteDocument, updateDocument };
};

export default useDocument;
