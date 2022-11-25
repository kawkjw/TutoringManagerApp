import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, updateDoc, setDoc, doc, deleteDoc, getDocs, getDoc } from "firebase/firestore";
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
export const storage = getStorage();

export const createMessage = async ({ channelId, message }) => {
    console.log("?????", message.text);
    const now = Date.now();
    const messageRef = doc(db, "channels", channelId, "messages", message._id);
    await setDoc(messageRef, {
        ...message,
        createdAt: now,
    });
    await updateDoc(doc(db, "channels", channelId), {
        lastMessageText: message.text,
        lastMessageTime: now,
    });

    console.log(messageRef.id);
};

export const deleteSchedule = async (id, year_, month_, date_) => {
    const userId = getCurrentUser().uid;
    //console.log(id, year_, month_, date_, '\n스케줄을 삭제해야 함');
    await deleteDoc(doc(db, `schedules/${userId}/${year_}/${month_}/${date_}`, id));
};

export const updateMatchingInfo = async (matchingId, matchingSubject) => {
    //console.log('마이베이스 시작');
    //console.log(matchingId);
    const userId = getCurrentUser().uid;
    const ref = doc(db, `users/${userId}/`);
    //console.log(ref);
    await updateDoc(ref, {
        currentMatchingId: matchingId,
        currentMatchingSubject: matchingSubject,
    });
};

export const getMatchingInfo = () => {
    console.log("마이베이스 getMatchingInfo");
    const userId = getCurrentUser().uid;
    const ref = doc(db, `users/${userId}/`);
    const matchingInfoId = getDoc(ref, "currentMatchingId");
    console.log(matchingInfoId);
    return matchingInfoId;
};

export const uploadNewSchedule = async (scheduleName_, startHour_, startMinute_, endHour_, endMinute_, year_, month_, date_, userId) => {
    //const userId = getCurrentUser().uid;
    try {
        //console.log(startHour_, startMinute_);
        const newScheduleRef = await addDoc(collection(db, `schedules`, `${userId}`, `${year_}`, `${month_}`, `${date_}`), {
            scheduleName: scheduleName_,
            startHour: startHour_,
            startMinute: startMinute_,
            endHour: endHour_,
            endMinute: endMinute_,
            year: year_,
            month: month_,
            date: date_,
        });
        console.log(newScheduleRef);
        console.log(newScheduleRef.id);
        await updateDoc(newScheduleRef, {
            id: newScheduleRef.id,
        });
        return newScheduleRef.id;
    } catch (e) {
        console.error("Error adding schedule: ", e);
    }
};

export const uploadImage = async (uri) => {
    console.log("uri:", uri);
    const user = await auth.currentUser;
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

    await updateDoc(doc(db, "users", user.uid), {
        photoURL: storageUrl,
    });
    console.log("리턴할 포토url");
    console.log(user.photoURL);
    return { name: user.displayName, email: user.email, photoUrl: user.photoURL };
};

export const getCurrentUser = () => {
    const { uid, displayName, email, photoURL } = auth.currentUser;
    //console.log(photoURL);
    // 실제로 photoURL을 리턴하지만 앱에서는 photoUrl로 쓴다.
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
