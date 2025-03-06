import { ref } from "vue";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";

const error = ref(null);
const isPending = ref(false);

const signUp = async (email, password, displayName) => {
	error.value = null;
	isPending.value = true;
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);

		if (!res) {
			throw new Error("Cannot complete the signup");
		}
		await updateProfile(res.user, {
			displayName: displayName,
		});
		error.value = null;
		console.log(res.user);
		isPending.value = false;
		return res;
	} catch (err) {
		console.log(err.message);
		error.value = err.message;
		isPending.value = false;
	}
};

const useSignup = () => {
	return { error, signUp, isPending };
};

export default useSignup;
