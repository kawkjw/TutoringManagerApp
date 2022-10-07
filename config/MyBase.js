import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_ID, APP_ID, MEASUREMENT_ID } from "@env";

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID,
};

const myBase = initializeApp(firebaseConfig);

export default myBase;
export const db = getFirestore(myBase);
export const auth = getAuth(myBase);
