import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAJbF8ULqsQzDknlKaLOqsCXe1ghbY8Xn0",
  authDomain: "rimoldi-web-a59a5.firebaseapp.com",
  projectId: "rimoldi-web-a59a5",
  storageBucket: "rimoldi-web-a59a5.firebasestorage.app",
  messagingSenderId: "512077889968",
  appId: "1:512077889968:web:7454eb68e6c5c80772d675"
};

const app = initializeApp(firebaseConfig);

export default app;