
import { initializeApp, getApps, getApp } from "firebase/app";
import {getStorage} from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmsKYLwuwoWbmrRmHKFoQclW63TmFH8Jk",
  authDomain: "perfume-store-ca0eb.firebaseapp.com",
  projectId: "perfume-store-ca0eb",
  storageBucket: "perfume-store-ca0eb.appspot.com",
  messagingSenderId: "117600940233",
  appId: "1:117600940233:web:bd3d621680be87aea0dd18"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)


export default storage
