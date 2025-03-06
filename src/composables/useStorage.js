import { ref } from "vue";
import { storage } from "../firebase/config";
import getUser from "./getUser";
import { ref as firebaseRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const { user } = getUser();
const useStorage = () => {
	const error = ref(null);
	const url = ref(null);
	const filePath = ref(null);

	const uploadImage = async (file, documentID) => {
		filePath.value = `images/${user.value.uid}/${documentID}/${file.name}`;

		const storageRef = firebaseRef(storage, filePath.value);
		try {
			url.value = await getDownloadURL(firebaseRef(storage, filePath.value));
		} catch (err) {
			console.log(err.message);
			url.value = null;
		}

		try {
			if (url.value) {
				//if user upload the same file to storage do nothing
				const res = await uploadBytes(storageRef, file);
			} else {
				const res = await uploadBytes(storageRef, file);
				url.value = await getDownloadURL(res.ref);
			}
		} catch (err) {
			console.log(err.message);
			error.value = err.message;
		}
		return { filePath: filePath.value, url: url.value };
	};

	const deleteImage = async (path) => {
		const storageRef = firebaseRef(storage, path);

		try {
			await deleteObject(storageRef);
		} catch (err) {
			console.log(err.message);
			error.value = err.message;
		}
	};

	return { url, filePath, error, uploadImage, deleteImage };
};

export default useStorage;
