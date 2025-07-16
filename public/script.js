// Configuração do Firebase com seus dados
const firebaseConfig = {
  apiKey: "AIzaSyATi7D_DQcQGC8ZVTkQcEEL0uST-A_1FBY",
  authDomain: "encurtador-1e26c.firebaseapp.com",
  databaseURL: "https://encurtador-1e26c-default-rtdb.firebaseio.com",
  projectId: "encurtador-1e26c",
  storageBucket: "encurtador-1e26c.firebasestorage.app",
  messagingSenderId: "87029686538",
  appId: "1:87029686538:web:7549c24d5d7506dd5edaf3",
  measurementId: "G-PDWZGY78CQ"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref("links");

function gerarCodigo(tamanho = 8) {
  const caracteres = "abcdefghijklmnopqrstuvwxyz0123456789";
  let codigo = "";
  for (let i = 0; i < tamanho; i++) {
    codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return codigo;
}

async function encurtar() {
  const link = document.getElementById("link").value.trim();
  if (!link) return alert("Cole um link válido");

  let codigo = gerarCodigo();

  // Evitar código duplicado
  const existe = await db.child(codigo).get();
  while (existe.exists()) {
    codigo = gerarCodigo();
  }

  await db.child(codigo).set(link);
  const curto = `${location.origin}/bit.ly/${codigo}`;
  document.getElementById("out").innerHTML = `Link encurtado:<br><a href="${curto}" target="_blank">${curto}</a>`;
}
