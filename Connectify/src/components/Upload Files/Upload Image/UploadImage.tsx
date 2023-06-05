import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

async function uploadImage(file) {
    const storage = getStorage();
    const storageRef = ref(storage, 'images/' + file.name);

    try {
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                console.error("Image upload failed", error);
                throw error;
            }
        );

        const snapshot = await uploadTask; 
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('File available at', downloadURL);
        return { downloadURL, fileName: file.name };
    } catch (error) {
        console.error("Image upload failed", error);
        throw error; 
    }
}

export default uploadImage;