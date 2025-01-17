/* === Imports === */
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

/* === Firebase Setup === */
const firebaseConfig = {
    apiKey: "AIzaSyCIKEKgGClsXH6Vn6MI_P_t9VD9g2apg3M",
    authDomain: "tech-t-d48f9.firebaseapp.com",
    projectId: "tech-t-d48f9",
    storageBucket: "tech-t-d48f9.firebasestorage.app",
    messagingSenderId: "370766628710",
    appId: "1:370766628710:web:f9396ccf4858199086eaa7"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth();

/* === UI === */

/* == UI - Elements == */
const viewLoggedOut = document.getElementById("logged-out-view");
const viewLoggedIn = document.getElementById("logged-in-view");

const signInWithGoogleButtonEl = document.getElementById("sign-in-with-google-btn");

const emailInputEl = document.getElementById("email-input");
const passwordInputEl = document.getElementById("password-input");

const signInButtonEl = document.getElementById("sign-in-btn");
const createAccountButtonEl = document.getElementById("create-account-btn");
const signOutButtonEl = document.getElementById("sign-out-btn");
const userProfilePictureEl = document.getElementById("user-profile-picture");

const userGreetingEl = document.getElementById("user-greeting");

/* == UI - Event Listeners == */
signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle);
signOutButtonEl.addEventListener("click", authSignOut);
signInButtonEl.addEventListener("click", authSignInWithEmail);
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail);

/* === Main Code === */
onAuthStateChanged(auth, (user) => {
    if (user) {
        showLoggedInView();
        showProfilePicture(userProfilePictureEl, user);
        showUserGreeting(userGreetingEl, user);
    } else {
        showLoggedOutView();
    }
});

/* === Functions === */

/* = Functions - Firebase - Authentication = */

function authSignInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("Signed in with Google", result.user);
        })
        .catch((error) => {
            console.error("Error signing in with Google", error.message);
        });
}

function authSignInWithEmail() {
    const email = emailInputEl.value;
    const password = passwordInputEl.value;
    
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Signed in with email", userCredential.user);
        })
        .catch((error) => {
            console.error("Error signing in with email", error.message);
        });
}

function authCreateAccountWithEmail() {
    const email = emailInputEl.value;
    const password = passwordInputEl.value;
    
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Account created", userCredential.user);
        })
        .catch((error) => {
            console.error("Error creating account", error.message);
        });
}

function authSignOut() {
    signOut(auth)
        .then(() => {
            console.log("Signed out");
        })
        .catch((error) => {
            console.error("Error signing out:", error.message);
        });
}

/* === Functions - UI Functions === */

function showProfilePicture(imgElement, user) {
    if (user.photoURL) {
        imgElement.src = user.photoURL;
    } else {
        imgElement.src = "assets/defaultPic.png";
    }
}

function showUserGreeting(element, user) {
    if (user.displayName) {
        element.textContent = `Hi ${user.displayName}`;
    } else {
        element.textContent = "Hello student"
    }
}

/* == Functions for View Toggling == */

function showLoggedOutView() {
    hideView(viewLoggedIn);
    showView(viewLoggedOut);
}

function showLoggedInView() {
    hideView(viewLoggedOut);
    showView(viewLoggedIn);
}

function showView(view) {
    view.style.display = "flex";
}

function hideView(view) {
    view.style.display = "none";
}