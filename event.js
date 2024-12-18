// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
// import { getFirestore, collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBgkNCw_2Lov20fAct7k7yD-elXLqG4kds",
//   authDomain: "youthfest-dd861.firebaseapp.com",
//   projectId: "youthfest-dd861",
//   storageBucket: "youthfest-dd861.appspot.com", // Corrected URL
//   messagingSenderId: "298434097168",
//   appId: "1:298434097168:web:85d7cafe8efb7fa8911a95",
//   measurementId: "G-VG5HYZGMGD"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// // Fetch and display events
// async function fetchEvents() {
//   const eventContainer = document.querySelector(".event-container");

//   const eventsCollection = collection(db, "events");
  
//   try {
//     const querySnapshot = await getDocs(eventsCollection);

//     querySnapshot.forEach((doc) => {
//       const event = doc.data();
//       console.log(doc.data())
//       // Create event card dynamically
//       const eventCard = document.createElement("div");
//       eventCard.className = "event-card";
//       eventCard.onclick = () => openModal(doc.id);

//       eventCard.innerHTML = `
//         <img src="${event.image}" alt="${event.description}">
//         <div class="event-info">
//           <h2>${event.description}</h2>
//           <p>Price: ₹${event.price}</p>
//           <button class="register-btn">Register Now</button>
//         </div>
//       `;

//       eventContainer.appendChild(eventCard);
//     });
//   } catch (error) {
//     console.error("Error fetching events:", error);
//   }
// }

// // Open modal with event details
// function openModal(eventId) {
//   const modal = document.getElementById("event-modal");
//   const modalTitle = document.getElementById("modal-title");
//   const modalDescription = document.getElementById("modal-description");
//   const modalDate = document.getElementById("modal-date");
//   const modalPrice = document.getElementById("modal-price");
//   const eventsCollection = collection(db, "events");

//   getDoc(doc(eventsCollection, eventId))
//     .then((docSnap) => {
//       if (docSnap.exists()) {
//         const event = docSnap.data();
//         modalTitle.textContent = event.description;
//         modalDescription.textContent = "Join us for an amazing event!";
//         modalDate.textContent = `Date: ${new Date(
//           event.date.seconds * 1000
//         ).toLocaleString()}`;
//         modalPrice.textContent = `Price: ₹${event.price}`;
//         modal.style.display = "flex";
//       } else {
//         console.error("Event not found!");
//       }
//     })
//     .catch((error) => {
//       console.error("Error fetching event details:", error);
//     });
// }

// // Close modal
// function closeModal() {
//   const modal = document.getElementById("event-modal");
//   modal.style.display = "none";
// }

// // Close modal on clicking outside
// window.onclick = function (event) {
//   const modal = document.getElementById("event-modal");
//   if (event.target === modal) {
//     closeModal();
//   }
// };
// window.onclick = function (event) {
//   const close = document.getElementById("close");
//   if (event.target === close) {
//     closeModal();
//   }
// };
// // Initialize the app
// fetchEvents();


// Import Firebase modules
import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgkNCw_2Lov20fAct7k7yD-elXLqG4kds",
  authDomain: "youthfest-dd861.firebaseapp.com",
  projectId: "youthfest-dd861",
  storageBucket: "youthfest-dd861.appspot.com",
  messagingSenderId: "298434097168",
  appId: "1:298434097168:web:85d7cafe8efb7fa8911a95",
  measurementId: "G-VG5HYZGMGD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Fetch and display events
async function fetchEvents() {
  const eventContainer = document.querySelector(".event-container");
  const loadingPage = document.getElementById("loading-page");

  const eventsCollection = collection(db, "events");

  try {
    // Show loading page
    loadingPage.style.display = "flex";

    const querySnapshot = await getDocs(eventsCollection);

    querySnapshot.forEach((doc) => {
      const event = doc.data();

      // Create event card dynamically
      const eventCard = document.createElement("div");
      eventCard.className = "event-card";
      eventCard.onclick = () => handleRegistration(doc.id);

      eventCard.innerHTML = `
        <img src="${event.image}" alt="${event.description}">
        <div class="event-info">
          <h2>${event.description}</h2>
          <p>Price: ₹${event.price}</p>
          <button class="register-btn">Register Now</button>
        </div>
      `;

      eventContainer.appendChild(eventCard);
    });

    // Hide loading page
    loadingPage.style.display = "none";
  } catch (error) {
    console.error("Error fetching events:", error);
    loadingPage.style.display = "none";
  }
}
// Handle registration process
async function handleRegistration(eventId) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is logged in, show event modal
      openModal(eventId, user.email);
    } else {
      // User not logged in, show sign-in modal
      document.getElementById("sign-in-modal").style.display = "flex";
    }
  });
}

// Sign-in using Google
document.getElementById("sign-in-btn").onclick = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      document.getElementById("sign-in-modal").style.display = "none";
    })
    .catch((error) => {
      console.error("Error signing in:", error);
    });
};

// Open event modal
function openModal(eventId, userEmail) {
  const modal = document.getElementById("event-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalDate = document.getElementById("modal-date");
  const modalPrice = document.getElementById("modal-price");

  const eventsCollection = collection(db, "events");

  getDoc(doc(eventsCollection, eventId))
    .then((docSnap) => {
      if (docSnap.exists()) {
        const event = docSnap.data();
        modalTitle.textContent = event.description;
        modalDescription.textContent = event.details || "Join us for an amazing event!";
        modalDate.textContent = `Date: ${new Date(
          event.date.seconds * 1000
        ).toLocaleString()}`;
        modalPrice.textContent = `Price: ₹${event.price}`;

        document.getElementById("register-now").onclick = () => {
          openRegisterForm(eventId, userEmail, event.price);
        };

        modal.style.display = "flex";
      } else {
        console.error("Event not found!");
      }
    })
    .catch((error) => {
      console.error("Error fetching event details:", error);
    });
}

// Open registration form modal
function openRegisterForm(eventId, userEmail, price) {
  const registerForm = document.getElementById("register-form");
  registerForm.eventPrice.value = price;
  registerForm.userEmail.value = userEmail;
  registerForm.eventId = eventId;

  document.getElementById("register-form-modal").style.display = "flex";
}

// Handle payment
document.getElementById("pay-now-btn").onclick = async () => {
  const registerForm = document.getElementById("register-form");
  const price = registerForm.eventPrice.value;
  const email = registerForm.userEmail.value;
  const eventId = registerForm.eventId;

  // Razorpay integration
  const options = {
    key: "rzp_test_MbIf0zII822vJ8",
    amount: price * 100,
    currency: "INR",
    name: "Youth Fest",
    description: "Event Registration",
    handler: async function (response) {
      // On successful payment
      try {
        await addDoc(collection(db, `events/${eventId}/registrations`), {
          email,
          paymentId: response.razorpay_payment_id,
        });
        showSuccessModal();
      } catch (error) {
        console.error("Error saving registration:", error);
      }
    },
    modal: {
      ondismiss: showFailureModal,
    },
  };

  const rzp = new Razorpay(options);
  rzp.open();
};


// document.getElementById("pay-now-btn").onclick = async () => {
//   const registerForm = document.getElementById("register-form");
//   const price = registerForm.eventPrice.value;
//   const email = registerForm.userEmail.value;
//   const eventId = registerForm.eventId;
 

//   // Validate input fields
//   if (!price || !email || !eventId) {
//     alert("Please fill in all required fields.");
//     return;
//   }

//   // Generate a unique order ID
//   const orderId = `ORDER_${new Date().getTime()}`;

//   // Create a dynamic form for CCAvenue submission
//   const ccavenueForm = document.createElement("form");
//   ccavenueForm.method = "POST";
//   ccavenueForm.action =
//     "https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction";

//   // Add CCAvenue required fields
//   const fields = {
//     merchant_id: "4017195", // Replace with your CCAvenue Merchant ID
//     access_code: "AVUE40LL46BK83EUKB", // Replace with your Access Code
//     order_id: orderId,
//     amount: price,
//     currency: "INR",
//     redirect_url: "https://your-website.com/success.html",
//     cancel_url: "https://your-website.com/cancel.html",
    
//     billing_email: email,
    
//     // Custom field to track the event
//     event_id: eventId,
//   };

//   // Append form fields dynamically
//   for (const [key, value] of Object.entries(fields)) {
//     const input = document.createElement("input");
//     input.type = "hidden";
//     input.name = key;
//     input.value = value;
//     ccavenueForm.appendChild(input);
//   }

//   // Append the form to the body and submit
//   document.body.appendChild(ccavenueForm);
//   ccavenueForm.submit();
// };


// const merchantId = "4017195"; // Your Merchant ID
// const accessCode = "AVUE40LL46BK83EUKB"; // Your Access Code
// const workingKey = "5756424FF86A4609FBE3C8F43AF748D5"; // Your Working Key (Encryption Key)

// // Handle payment when the user clicks the "Pay Now" button
// document.getElementById("pay-now-btn").onclick = async () => {
//     const registerForm = document.getElementById("register-form");
//     const price = registerForm.eventPrice.value;
//     const email = registerForm.userEmail.value;
    
//     // Generate a unique order ID
//     const orderId = `ORDER_${new Date().getTime()}`;
    
//     // Prepare data for encryption
//     const formData = {
//         merchant_id: merchantId,
//         access_code: accessCode,
//         order_id: orderId,
//         amount: price,
//         currency: "INR",
//         redirect_url: "https://your-website.com/success.html", // Redirect after success
//         cancel_url: "https://your-website.com/cancel.html", // Redirect after failure
//         billing_email: email,
        
//     };

//     // Encrypt the form data using CCAvenue's encryption method
//     const encryptedData = encryptCCAvenueData(formData,workingKey);

//     // Create a dynamic form to send data to CCAvenue
//     const ccavenueForm = document.createElement("form");
//     ccavenueForm.method = "POST";
//     ccavenueForm.action =
//         "https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction";

//     // Add encrypted data as hidden inputs to the form
//     Object.keys(encryptedData).forEach((key) => {
//         const input = document.createElement("input");
//         input.type = "hidden";
//         input.name = key;
//         input.value = encryptedData[key];
//         ccavenueForm.appendChild(input);
//     });

//     // Append the form to the body and submit it
//     document.body.appendChild(ccavenueForm);
//     ccavenueForm.submit();
// };

// // Encrypt data using CCAvenue's Working Key
// function encryptCCAvenueData(data, workingKey) {
//   const encryptedData = CCAvenueEncrypt.encrypt(data, workingKey);
//   return encryptedData;
// }

// // Handle success and failure after payment
// window.onload = () => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const orderId = urlParams.get("order_id");
//     const trackingId = urlParams.get("tracking_id");
//     const status = urlParams.get("order_status");

//     if (status === "Success") {
//         saveRegistration(orderId, trackingId, status);
//         document.getElementById("success-modal").style.display = "block";
//     } else {
//         document.getElementById("failure-modal").style.display = "block";
//     }
// };

// // Save registration details to Firestore
// async function saveRegistration(orderId, trackingId, status) {
//     const email = new URLSearchParams(window.location.search).get("billing_email");
//     const eventId = new URLSearchParams(window.location.search).get("event_id");

//     try {
//         await db.collection(`events/${eventId}/registrations`).add({
//             orderId,
//             trackingId,
//             status,
//             email,
//             registeredAt: firebase.firestore.FieldValue.serverTimestamp(),
//         });
//         console.log("Registration saved successfully.");
//     } catch (error) {
//         console.error("Error saving registration:", error);
//     }
// }





// Show success modal
function showSuccessModal() {
  document.getElementById("success-modal").style.display = "flex";
}

// Show failure modal
function showFailureModal() {
  document.getElementById("failure-modal").style.display = "flex";
}

// Close modals
function closeModal() {
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.style.display = "none";
  });
}

document.querySelectorAll(".close-btn").forEach((btn) => {
  btn.addEventListener("click", closeModal);
});

// Initialize the app
fetchEvents();
