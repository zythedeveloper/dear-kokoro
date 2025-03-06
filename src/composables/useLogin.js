import { ref } from "vue";
import { auth } from "../firebase/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const error = ref(null);
const isPending = ref(false);

const login = async (email, password) => {
	error.value = null;
	isPending.value = true;

	try {
		const res = await signInWithEmailAndPassword(auth, email, password);
		error.value = null;
		isPending.value = false;
		return res;
	} catch (err) {
		console.log(err.message);
		error.value = "Incorrect login credentials";
		isPending.value = false;
	}
};

const useLogin = () => {
	return { error, login, isPending };
};

export default useLogin;
