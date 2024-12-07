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

// const loginBtn = document.getElementById("login-btn");
const userNameEl = document.getElementById("user-name");
// const logoutBtn = document.getElementById("logout-btn");
const reg=document.getElementById("reg")

// Function to update the UI based on authentication state
function updateUI(user) {
  if (user) {
    // loginBtn.style.display = "none"; // Hide login button
    userNameEl.style.display = "inline-block"; // Show username
    userNameEl.textContent = "Welcome "+user.displayName || "User"; // Set username
    // logoutBtn.style.display = "block"; // Ensure logout button starts hidden
  } else {
    // loginBtn.style.display = "block"; // Show login button
    userNameEl.style.display = "none"; // Hide username
    // logoutBtn.style.display = "none"; // Hide logout button
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

// Login button click handler
// loginBtn.addEventListener("click", () => {
//   setPersistence(auth, browserSessionPersistence)
//     .then(() => signInWithPopup(auth, provider))
//     .then((result) => {
//       const user = result.user;
//       console.log("User signed in: ", user);
//       alert(`Welcome, ${user.displayName}!`);
//       updateUI(user); // Update UI after login
//     })
//     .catch((error) => {
//       console.error("Error during login: ", error);
//       alert("Login Error: " + error.message);
//     });
// });
// event listening for register button
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

// Username hover to show logout button
userNameEl.addEventListener("mouseover", () => {
  logoutBtn.style.display = "inline-block"; // Show logout button on hover
});

// Logout button click handler
logoutBtn.addEventListener("click", () => {
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
});

// Logout button mouseout to hide it
logoutBtn.addEventListener("mouseout", () => {
  logoutBtn.style.display = "none"; // Hide logout button when mouse leaves
});
