// 🔹 Paste your Firebase config here
var firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_APP.firebaseapp.com",
  databaseURL: "https://YOUR_APP.firebaseio.com",
  projectId: "YOUR_APP",
};
firebase.initializeApp(firebaseConfig);

let db = firebase.database();

function sendMessage() {
  let name = document.getElementById("name").value;
  let msg = document.getElementById("message").value;
  if (name && msg) {
    db.ref("messages").push().set({
      sender: name,
      text: msg,
      timestamp: Date.now()
    });
    document.getElementById("message").value = "";
  }
}

db.ref("messages").on("child_added", function(snapshot) {
  let data = snapshot.val();
  let chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += `<p><b>${data.sender}:</b> ${data.text}</p>`;
  chatBox.scrollTop = chatBox.scrollHeight;
});
