import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  setPersistence, 
  browserSessionPersistence, 
  signOut 
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { app } from "./firebaseConfig.js";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const reg=document.getElementById("reg");
const authBtn = document.getElementById("auth-btn");
const userNameEl = document.getElementById("user-name");

// Function to update the UI based on authentication state
function updateUI(user) {
  if (user) {
    // User is logged in
    authBtn.id = "logout-btn"; // Change the button ID to "logout-btn"
    authBtn.textContent = "LOGOUT"; // Update the button text
    userNameEl.style.display = "inline-block"; // Show username
    userNameEl.textContent = user.displayName || "User"; // Set username
  } else {
    // User is logged out
    authBtn.id = "login-btn"; // Change the button ID back to "login-btn"
    authBtn.textContent = "LOGIN"; // Update the button text
    userNameEl.style.display = "none"; // Hide username
    userNameEl.textContent = ""; // Clear username text
  }
}
// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User signed in: ", user);
    updateUI(user); // Update UI for logged-in user
  } else {
    console.log("No user signed in.");
    updateUI(null); // Reset UI for logged-out state
  }
});


authBtn.addEventListener("click", () => {
  if (authBtn.id === "login-btn") {
    // Simulate user login
    setPersistence(auth, browserSessionPersistence)
    .then(() => signInWithPopup(auth, provider))
    .then((result) => {
      const user = result.user;
      console.log("User signed in: ", user);
      alert(`Welcome, ${user.displayName}!`);
      updateUI(user); // Update UI after login
    })
    .catch((error) => {
      console.error("Error during login: ", error);
      alert("Login Error: " + error.message);
    });
  } else if (authBtn.id === "logout-btn") {
    signOut(auth)
    .then(() => {
      console.log("User signed out.");
      alert("You have been logged out.");
      updateUI(null); // Update UI after logout
    })
    .catch((error) => {
      console.error("Error during logout: ", error);
      alert("Logout Error: " + error.message);
    });
  }
});


reg.addEventListener("click", () => {
  setPersistence(auth, browserSessionPersistence)
    .then(() => signInWithPopup(auth, provider))
    .then((result) => {
      const user = result.user;
      console.log("User signed in: ", user);
      alert(`Welcome, ${user.displayName}!`);
      updateUI(user); // Update UI after login
    })
    .catch((error) => {
      console.error("Error during login: ", error);
      alert("Login Error: " + error.message);
    });
});
// const prereg=document.getElementById("prereg");
// prereg.addEventListener("click", () => {
//   setPersistence(auth, browserSessionPersistence)
//     .then(() => signInWithPopup(auth, provider))
//     .then((result) => {
//       const user = result.user;
//       console.log("User signed in: ", user);
//       alert(`Welcome, ${user.displayName}!`);
      
//     })
//     .catch((error) => {
//       console.error("Error during login: ", error);
//       alert("Login Error: " + error.message);
//     });
// });

// Username hover to show logout button
userNameEl.addEventListener("mouseover", () => {
  logoutBtn.style.display = "inline-block"; // Show logout button on hover
});




