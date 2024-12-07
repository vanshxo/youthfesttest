import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgkNCw_2Lov20fAct7k7yD-elXLqG4kds",
  authDomain: "youthfest-dd861.firebaseapp.com",
  projectId: "youthfest-dd861",
  storageBucket: "youthfest-dd861.appspot.com", // Corrected URL
  messagingSenderId: "298434097168",
  appId: "1:298434097168:web:85d7cafe8efb7fa8911a95",
  measurementId: "G-VG5HYZGMGD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch and display events
async function fetchEvents() {
  const eventContainer = document.querySelector(".event-container");

  const eventsCollection = collection(db, "events");
  
  try {
    const querySnapshot = await getDocs(eventsCollection);

    querySnapshot.forEach((doc) => {
      const event = doc.data();
      console.log(doc.data())
      // Create event card dynamically
      const eventCard = document.createElement("div");
      eventCard.className = "event-card";
      eventCard.onclick = () => openModal(doc.id);

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
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

// Open modal with event details
function openModal(eventId) {
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
        modalDescription.textContent = "Join us for an amazing event!";
        modalDate.textContent = `Date: ${new Date(
          event.date.seconds * 1000
        ).toLocaleString()}`;
        modalPrice.textContent = `Price: ₹${event.price}`;
        modal.style.display = "flex";
      } else {
        console.error("Event not found!");
      }
    })
    .catch((error) => {
      console.error("Error fetching event details:", error);
    });
}

// Close modal
function closeModal() {
  const modal = document.getElementById("event-modal");
  modal.style.display = "none";
}

// Close modal on clicking outside
window.onclick = function (event) {
  const modal = document.getElementById("event-modal");
  if (event.target === modal) {
    closeModal();
  }
};
window.onclick = function (event) {
  const close = document.getElementById("close");
  if (event.target === close) {
    closeModal();
  }
};
// Initialize the app
fetchEvents();
