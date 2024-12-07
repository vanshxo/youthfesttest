import { app } from "./firebaseConfig.js";
import { getFirestore, doc, setDoc, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
const db = getFirestore(app);



// Reference to your Firestore collection
const eventsCollection = db.collection('events');

// Function to fetch events from Firestore and display them
function fetchEvents() {
    eventsCollection.orderBy('date').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const event = doc.data();

            // Creating dynamic event card
            const eventCard = document.createElement('div');
            eventCard.classList.add('event-card');
            eventCard.onclick = function() {
                openModal(doc.id); // Open modal on card click
            };

            eventCard.innerHTML = `
                <img src="${event.image}" alt="${event.description}">
                <div class="event-info">
                    <h2>${event.description}</h2>
                    <p>Price: ₹${event.price}</p>
                    <button class="register-btn">Register Now</button>
                </div>
            `;

            // Append the event card to a container on the page
            document.getElementById('events-container').appendChild(eventCard);
        });
    }).catch((error) => {
        console.error("Error getting events: ", error);
    });
}


function openModal(eventId) {
    
    db.collection('events').doc(eventId).get().then((doc) => {
        if (doc.exists) {
            const event = doc.data();
            document.getElementById('event-title').innerText = event.description;
            document.getElementById('event-img').src = event.image;
            document.getElementById('event-price').innerText = `Price: ₹${event.price}`;
            document.getElementsByClassName('modal').style.display = 'block';
        }
    });
}

// Close the modal
function closeModal() {
    document.getElementById('event-modal').style.display = 'none';
}

// Call the function to fetch events when the page is loaded
window.onload = fetchEvents;
