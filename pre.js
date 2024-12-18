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


  const prereg=document.getElementById("prereg");
prereg.addEventListener("click", () => {

    setPersistence(auth, browserSessionPersistence)
    .then(() => signInWithPopup(auth, provider))
    .then((result) => {
      const user = result.user;
      console.log("User signed in: ", user);
      alert(`Welcome, ${user.displayName}!`);
      
    })
    .catch((error) => {
      console.error("Error during login: ", error);
      alert("Login Error: " + error.message);
    });

});

onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User signed in: ", user);
      prereg.textContent="REGISTERED!!!"
        
    } else {
      console.log("No user signed in.");
      
    }
  });