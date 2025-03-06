import { ref } from "vue";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const user = ref(auth.currentUser);

onAuthStateChanged(auth, (userr) => {
	console.log("user state change. Current user is: ", userr);
	if (userr) {
		user.value = userr;
	}
});

const getUser = () => {
	return { user };
};

export default getUser;
