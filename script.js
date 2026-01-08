// --- CONFIGURAZIONE FIREBASE ---
const firebaseConfig = {
    apiKey: "AIzaSyDfIW4GjBZ4QGPvfJtzLAr34VxDRLzcU6M",
    authDomain: "lspd-portal-d34b0.firebaseapp.com",
    projectId: "lspd-portal-d34b0",
    storageBucket: "lspd-portal-d34b0.firebasestorage.app",
    messagingSenderId: "991237515788",
    appId: "1:991237515788:web:302c1b6819947116199c29",
    measurementId: "G-Y4XMD4QLMQ"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// --- CONFIGURAZIONE WEBHOOK DISCORD ---
const WEBHOOK_URL = "https://discord.com/api/webhooks/1458876750787379344/83gIBufwxzVTqQXYkojqCCTXeFSwAZdrvWqAYnAUeypYCJnwAM9sYl-cbKeuC0EsmHBm"; 

// --- DATABASE DOMANDE ---
const questions = [
    { q: "In una pattuglia ADAM, quale ruolo ricopre l'agente seduto sul lato passeggero?", options: ["Guidatore", "Capo Pattuglia", "Addetto ai prigionieri", "Supporto tattico"], correct: 1 },
    { q: "Qual è il grado minimo richiesto per una pattuglia LINCOLN senza necessità di permessi?", options: ["Agente I", "Agente II", "Agente Scelto", "Sergente"], correct: 3 },
    { q: "Quante ADAM devono essere attive per autorizzare una pattuglia MARY (Moto)?", options: ["Almeno 2", "Almeno 3", "Almeno 4", "Almeno 5"], correct: 2 },
    { q: "Cosa indica il CODICE 0 nel protocollo emergenze?", options: ["Fine emergenza", "Emergenza massima (attacco istituzioni)", "Soggetto in custodia", "Rifornimento"], correct: 1 },
    { q: "Quale codice indica un fermo stradale operativo?", options: ["10-15", "10-20", "10-55", "10-80"], correct: 2 },
    { q: "Quante volte può essere ripetuto il Miranda Warning prima che si consideri accettato?", options: ["Sempre e solo 1 volta", "Massimo 2 volte", "Massimo 3 volte", "Fino a 5 volte"], correct: 2 },
    { q: "Se il soggetto non risponde dopo 3 ripetizioni dei diritti, quale reato si configura?", options: ["Resistenza a pubblico ufficiale", "Intralcio alla giustizia", "Oltraggio", "Nessun reato aggiuntivo"], correct: 1 },
    { q: "Qual è la durata fissa prevista per uno Stato di Fermo?", options: ["15 minuti", "20 minuti", "30 minuti", "60 minuti"], correct: 2 },
    { q: "Durante un 10-55, come va posizionata la volante rispetto al veicolo fermato?", options: ["Affiancata sul lato guida", "Davanti al veicolo per bloccarlo", "A 2m dietro con inclinazione 45° verso l'esterno", "Direttamente dietro in asse"], correct: 2 },
    { q: "Dopo quanti minuti di inseguimento (10-80) è possibile richiedere una manovra PIT o BOX?", options: ["Subito", "Dopo 5 minuti", "Dopo 10 minuti", "Dopo 15 minuti"], correct: 2 },
    { q: "Qual è la velocità massima consentita per eseguire una manovra PIT in sicurezza?", options: ["Inferiore a 80 km/h", "Inferiore a 100 km/h", "Inferiore a 120 km/h", "Senza limiti"], correct: 2 },
    { q: "In quale caso l'agente può agire senza mandato (Probable Cause)?", options: ["Sempre se ha un sospetto", "Se ritiene ragionevolmente che la persona sia colpevole di un crimine", "Solo su ordine del comando", "Solo se il soggetto ha precedenti"], correct: 1 },
    { q: "Chi può emanare o approvare lo stato di DEFCON 2?", options: ["Qualsiasi Agente", "Sergente o superiore", "Procuratore Generale o Governatore", "Solo il Governatore"], correct: 2 },
    { q: "Quale manovra BOX prevede l'ausilio di una struttura (es. muro) come blocco?", options: ["Box a I", "Box a T", "Box a Muro", "Box a Sandwich"], correct: 2 },
    { q: "Cosa indica lo stato di DEFCON 1?", options: ["Rifornimento centrali", "Guerre civili o colpi di stato", "Inseguimento alto rischio", "Rapina in corso"], correct: 1 },
    { q: "Cosa si intende per 'Paralleling' durante un inseguimento?", options: ["Speronare lateralmente", "Posizionarsi su strade parallele per anticipare il sospetto", "Inseguimento a luci spente", "Blocco stradale"], correct: 1 },
    { q: "Come deve rispondere la pattuglia se chiamata in CODICE 3?", options: ["Senza sirene rispettando il codice", "Solo lampeggianti e limiti di velocità", "Lampeggianti e sirene senza rispettare i codici stradali", "Solo se autorizzata dal comando"], correct: 2 },
    { q: "Entro quanto tempo deve essere inoltrato il rapporto dopo un arresto?", options: ["Immediatamente", "Entro massimo un'ora", "Entro due ore", "Entro fine turno"], correct: 1 },
    { q: "Chi ha l'autorità per approvare il DEFCON 3?", options: ["Qualsiasi Supervisore", "Governatore", "Procuratore Generale o Alto Comando", "Sergente"], correct: 2 },
    { q: "Qual è lo STATUS radio che indica che una pattuglia è in rifornimento o riparazione?", options: ["STATUS 1", "STATUS 2", "STATUS 3", "STATUS 4"], correct: 2 }
];

// --- VARIABILI GLOBALI ---
let currentQuestion = 0;
let score = 0;
let userName = "";
let timeLeft = 1800; 
let timerInterval;
let isExamStarted = false;

// Impedisce la chiusura accidentale durante il test
window.onbeforeunload = function() {
    if (isExamStarted) return "Il progresso del test andrà perduto. Sei sicuro?";
};

// Orologio tempo reale
function updateClock() {
    const clockEl = document.getElementById('clock');
    if (clockEl) clockEl.innerText = new Date().toLocaleTimeString();
}
setInterval(updateClock, 1000);

// --- STEP 1: LOGIN FIREBASE ---
function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const errorDiv = document.getElementById('authError');
    const loginBtn = document.getElementById('loginBtn');

    if (!email || !password) return alert("Inserire credenziali!");

    loginBtn.innerText = "VERIFICA IN CORSO...";
    loginBtn.disabled = true;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            // Successo: Passa alla schermata Nome RP
            document.getElementById('auth-section').classList.add('hidden');
            document.getElementById('rp-section').classList.remove('hidden');
            errorDiv.innerText = "";
        })
        .catch((error) => {
            loginBtn.innerText = "EFFETTUA LOGIN";
            loginBtn.disabled = false;
            errorDiv.innerText = "ACCESSO NEGATO: Credenziali non valide.";
        });
}

// --- STEP 2: CONFERMA IDENTITÀ RP ---
function confirmIdentity() {
    const nameInput = document.getElementById('rpName').value;
    if (nameInput.trim().length < 5) return alert("Inserire Nome e Cognome RP validi!");

    userName = nameInput.trim().toUpperCase();
    document.getElementById('nameModal').classList.add('hidden');
    document.getElementById('main-content').classList.remove('hidden');
    document.getElementById('exam-timer').classList.remove('hidden');
    
    isExamStarted = true;
    startTimer();
    loadQuestion();
}

// --- LOGICA TIMER ---
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        const timerDisplay = document.getElementById('exam-timer');
        
        if (timerDisplay) {
            timerDisplay.innerText = `TEMPO RIMASTO: ${mins}:${secs < 10 ? '0' : ''}${secs}`;
            if (timeLeft <= 300) timerDisplay.classList.add('timer-critical');
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("TEMPO SCADUTO!");
            showResults();
        }
    }, 1000);
}

// --- LOGICA QUIZ ---
function loadQuestion() {
    const quizBox = document.getElementById('quiz-box');
    const qData = questions[currentQuestion];
    const progressBar = document.getElementById('progress-bar');
    
    if (progressBar) {
        progressBar.style.width = (currentQuestion / questions.length * 100) + "%";
    }

    quizBox.innerHTML = `
        <h3>PROTOCOLLO ESAME: DOMANDA ${currentQuestion + 1} / ${questions.length}</h3>
        <p>${qData.q}</p>
        <div class="options-list">
            ${qData.options.map((opt, i) => `
                <button class="option" onclick="checkAnswer(${i})">> ${opt}</button>
            `).join('')}
        </div>
    `;
}

function checkAnswer(idx) {
    if (idx === questions[currentQuestion].correct) score++;
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        clearInterval(timerInterval);
        isExamStarted = false;
        showResults();
    }
}

function showResults() {
    document.getElementById('quiz-box').classList.add('hidden');
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('exam-timer').classList.add('hidden');

    const percent = Math.round((score / questions.length) * 100);
    const status = percent >= 75 ? "IDONEO" : "NON IDONEO";
    
    document.getElementById('score-display').innerHTML = `
        <div class="result-box">
            <p>OPERATORE: ${userName}</p>
            <p>PUNTEGGIO: ${score}/20 (${percent}%)</p>
            <p>ERRORI: ${20 - score}</p>
            <p>ESITO: <span style="color: ${percent >= 75 ? '#4CAF50' : '#f44336'}">${status}</span></p>
        </div>
    `;
    
    sendToDiscord(userName, score, percent, status);
}

// --- INVIO DISCORD ---
async function sendToDiscord(user, pts, perc, stat) {
    if(!WEBHOOK_URL.startsWith("https")) return;
    
    const timeSpent = 30 - Math.floor(timeLeft / 60);
    const payload = {
        embeds: [{
            title: "📢 ESITO TEST ACCADEMIA LSPD",
            color: stat === "IDONEO" ? 3066993 : 15158332,
            fields: [
                { name: "Candidato", value: user, inline: true },
                { name: "Esito", value: stat, inline: true },
                { name: "Punteggio", value: `${pts}/20 (${perc}%)` },
                { name: "Errori commessi", value: `${20 - pts}`, inline: true },
                { name: "Tempo impiegato", value: `${timeSpent} minuti` }
            ],
            footer: { text: "Terminale Centrale LSPD - Fusion Eternal" },
            timestamp: new Date()
        }]
    };

    try {
        await fetch(WEBHOOK_URL, { 
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(payload) 
        });
    } catch (err) {
        console.error("Errore Webhook:", err);
    }
}