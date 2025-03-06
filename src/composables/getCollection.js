import { ref, watchEffect } from "vue";
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot, getDocs, where } from "firebase/firestore";


const getCollection = (collectionName, queryString) => {
	const documents = ref(null);
	const error = ref(null);

	let collectionRef = collection(db, collectionName);

	let q = query(collectionRef, orderBy("createdAt", "desc"));
	if (queryString) {
		q = query(collectionRef, orderBy("createdAt", "desc"), where(...queryString));
	}

	const unsub = onSnapshot(
		q,
		(snapshot) => {
			let results = [];
			snapshot.forEach((doc) => {
				doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
			});
			documents.value = results;
			error.value = null;
		},
		(err) => {
			console.log(err.message);
			document.value = null;
			error.value = "cannot fetch data";
		}
	);

	watchEffect((onInvalidate) => {
		// unsub from prev collection when watch is stopped (component unmounted)

		onInvalidate(() => {
			unsub();
		});
	});

	return { documents, error };
};

export default getCollection;
