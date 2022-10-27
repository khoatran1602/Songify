import { User } from "firebase/auth";
import { AppUser } from "../../types";

const getAppUserFromFirebaseUser = (firebaseUser: User): AppUser => {
	return {
		id: firebaseUser.uid,
		email: firebaseUser?.email,
		displayName: firebaseUser?.displayName,
		photoUrl: firebaseUser?.photoURL,
	};
};

const downloadURI = (uri: string, name: string) => {
	const link = document.createElement("a");
	link.download = name;
	link.href = uri;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

export {
	getAppUserFromFirebaseUser,
	downloadURI,
};
