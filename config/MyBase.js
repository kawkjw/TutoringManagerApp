import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, updateDoc, setDoc, doc } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
export const storage = getStorage(myBase);

export const createMessage = async ({ channelId, message }) => {
    console.log("?????", message);
    const messageRef = await setDoc(doc(db, `channels/${channelId}/messages/${message._id}`), {
        ...message,
        createdAt: Date.now(),
    });
    //console.log(messageRef);
};

export const uploadImage = async (uri) => {
    console.log("uri:", uri);
    const user = auth.currentUser;
    const ref_ = ref(storage, `/profile/${user.uid}/photo.png`);
    const metadata = {
        contentType: "image/png",
    };

    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });

    await uploadBytes(ref_, blob, metadata).then((snapshot) => {
        console.log("Uploaded a blob or file!");
    });

    const downloadURL = await getDownloadURL(ref_);

    return downloadURL;
};

export const updateUserPhoto = async (photoUrl) => {
    console.log("여긴 업데이트유저포토 in 파이어베이스");
    const user = auth.currentUser;
    const storageUrl = await uploadImage(photoUrl);
    await updateProfile(user, {
        photoURL: storageUrl,
    });
    console.log("리턴할 포토url");
    console.log(user.photoURL);
    return { name: user.displayName, email: user.email, photoUrl: user.photoURL };
};

export const getCurrentUser = () => {
    const { uid, displayName, email, photoURL } = auth.currentUser;
    return { uid, name: displayName, email, photoUrl: photoURL };
};

export const createChannel = async (inviteUser_, hostId_) => {
    try {
        const newChannelRef = await addDoc(collection(db, "channels"), {
            inviteUser: inviteUser_,
            hostId: hostId_,
            createdAt: Date.now(),
        });
        console.log(newChannelRef);
        console.log("생성된 채널의 id: ", newChannelRef.id);
        await updateDoc(newChannelRef, {
            id: newChannelRef.id,
        });

        return newChannelRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};
