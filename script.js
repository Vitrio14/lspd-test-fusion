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
const questionsRecluta = [
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
    { q: "Come deve rispondere la pattuglia si chiamata in CODICE 3?", options: ["Senza sirene rispettando il codice", "Solo lampeggianti e limiti di velocità", "Lampeggianti e sirene senza rispettare i codici stradali", "Solo se autorizzata dal comando"], correct: 2 },
    { q: "Entro quanto tempo deve essere inoltrato il rapporto dopo un arresto?", options: ["Immediatamente", "Entro massimo un'ora", "Entro due ore", "Entro fine turno"], correct: 1 },
    { q: "Chi ha l'autorità per approvare il DEFCON 3?", options: ["Qualsiasi Supervisore", "Governatore", "Procuratore Generale o Alto Comando", "Sergente"], correct: 2 },
    { q: "Qual è lo STATUS radio che indica che una pattuglia è in rifornimento o riparazione?", options: ["STATUS 1", "STATUS 2", "STATUS 3", "STATUS 4"], correct: 2 }
];

const questionsSergente = [
    { q: "In qualità di supervisore, un'unità ADAM richiede il supporto per un 10-80 ad alta velocità. Qual è la tua priorità?", options: ["Prendere il comando radio e coordinare", "Inseguire personalmente", "Autorizzare il PIT subito", "Chiedere il modello auto"], correct: 0 },
    { q: "Durante un conflitto a fuoco, un Agente è a terra. Cosa impone il protocollo sotto fuoco?", options: ["Rianimarlo subito", "Neutralizzare la minaccia prima dei soccorsi", "Aspettare i medici senza fare nulla", "Trasportarlo via mentre sparano"], correct: 1 },
    { q: "Un cittadino lamenta un abuso di potere da un Agente I. Come procedi?", options: ["Ignori il civile", "Sospendi l'agente subito", "Raccogli prove e apri rapporto disciplinare", "Dai ragione all'agente"], correct: 2 },
    { q: "Differenza tra DEFCON 2 e DEFCON 3?", options: ["Il 2 riguarda solo rapine", "Il 2 indica pericolo critico (approvazione Governatore)", "Nessuna", "Il 3 è più grave"], correct: 1 },
    { q: "Soggetto barricato con ostaggio. Ruolo del Sergente?", options: ["Irrompere da solo", "Perimetro, negoziazione e attesa SWAT/Specialisti", "Sparare alle vetrine", "Ordinare il fuoco libero"], correct: 1 },
    { q: "Cosa definisce la 'Catena di Custodia'?", options: ["L'arresto", "Documentazione cronologica per integrità prove", "Trasporto detenuti", "Gradi della pattuglia"], correct: 1 },
    { q: "Un'unità LINCOLN può operare in zone rosse (alto rischio)?", options: ["Sì, sempre", "No, serve supporto o integrazione in ADAM", "Solo con fucile", "Solo di giorno"], correct: 1 },
    { q: "Logica: Sospetto in vicolo cieco. Posizionamento volanti?", options: ["Tutte dentro il vicolo", "A 'V' (tappo) all'uscita del vicolo", "Affiancate al sospetto", "Lontano dal vicolo"], correct: 1 },
    { q: "Subordinato non rispetta protocollo radio. Azione correttiva?", options: ["Urla via radio", "Richiamo privato e poi rapporto scritto", "Ignora", "Licenziamento subito"], correct: 1 },
    { q: "Quando è giustificata la forza letale (Codice 4)?", options: ["Sospetto scappa a piedi", "Minaccia attiva alla vita con armi", "Insulti all'agente", "Furto d'auto"], correct: 1 },
    { q: "Obiettivo 'Air Support' (Elicottero)?", options: ["Sparare", "Visuale costante e coordinamento unità terra", "Trasporto", "Rifornimento"], correct: 1 },
    { q: "Soggetto dichiara vizio di forma e chiede rilascio. Cosa fai?", options: ["Lo rilasci", "Verifichi diritti e prosegui (deciderà il Giudice)", "Lo minacci", "Sequestri il telefono"], correct: 1 },
    { q: "Differenza tra Furto e Rapina?", options: ["Nessuna", "Furto senza violenza, Rapina con violenza/minaccia", "Rapina solo in banca", "Furto solo di notte"], correct: 1 },
    { q: "Regola d'oro negoziazione ostaggi?", options: ["Promettere tutto", "Mai scambiare ostaggio con agenti o armi", "Arrendersi", "Entrare mentre si parla"], correct: 1 },
    { q: "Chi coordina i rinforzi in una fuga a piedi nei boschi?", options: ["L'agente che corre", "Il grado più alto sul posto", "La centrale", "Nessuno"], correct: 1 },
    { q: "Cosa sono le 'Joint Operations'?", options: ["Operazioni tra diverse agenzie (LSPD/FIB)", "Pattuglia a due", "Turno notturno", "Adunata"], correct: 0 },
    { q: "Uso eccessivo del Taser da parte di un subordinato. Intervento?", options: ["Ti complimenti", "Segnali l'abuso e apri indagine interna", "Ignori", "Usi il taser anche tu"], correct: 1 },
    { q: "Velocità Codice 2?", options: ["Senza limiti", "Crociera rispettando il codice stradale", "Fissa 100km/h", "Sempre 200km/h"], correct: 1 },
    { q: "Il Sergente può autorizzare armamento pesante?", options: ["Sì, se la situazione lo richiede (conflitto a fuoco)", "No, mai", "Solo il Governatore", "Solo in caserma"], correct: 0 },
    { q: "Cosa si intende per 'Perimetro Tattico'?", options: ["Stare alla porta", "Isolare l'area impedendo accessi/uscite", "Entrare subito", "Fare foto"], correct: 1 }
];

// --- VARIABILI GLOBALI ---
let currentQuestionsDB = [];
let currentQuestion = 0;
let score = 0;
let userName = "";
let examType = "";
let timeLeft = 1800; 
let timerInterval;
let isExamStarted = false;

// --- INIZIALIZZAZIONE ---
window.addEventListener('DOMContentLoaded', () => {
    updateClock();
    const pendingMsg = localStorage.getItem("pendingNotification");
    const pendingType = localStorage.getItem("pendingType");
    if (pendingMsg) {
        setTimeout(() => {
            showNotification(pendingMsg, pendingType || "success");
            localStorage.removeItem("pendingNotification");
            localStorage.removeItem("pendingType");
        }, 800);
    }
});

function updateClock() {
    const clockEl = document.getElementById('clock');
    if (clockEl) clockEl.innerText = new Date().toLocaleTimeString();
}
setInterval(updateClock, 1000);

function showNotification(message, type = 'error') {
    const container = document.getElementById('notification-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    let icon = "⚠️";
    if(type === 'success') icon = "✅";
    if(type === 'error') icon = "🚫";
    if(type === 'warning') icon = "⚡";
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = "toastOut 0.4s forwards";
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const loginBtn = document.getElementById('loginBtn');
    if (!email || !password) return showNotification("DATI MANCANTI", "error");
    loginBtn.innerText = "ACCESSO IN CORSO...";
    loginBtn.disabled = true;
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            showNotification("ACCESSO AUTORIZZATO", "success");
            document.getElementById('auth-section').classList.add('hidden');
            document.getElementById('rp-section').classList.remove('hidden');
        })
        .catch(() => {
            loginBtn.innerText = "EFFETTUA LOGIN";
            loginBtn.disabled = false;
            showNotification("ACCESSO NEGATO", "error");
        });
}

function confirmIdentity() {
    const nameInput = document.getElementById('rpName').value;
    if (nameInput.trim().length < 5) return showNotification("NOME TROPPO CORTO", "error");
    userName = nameInput.trim().toUpperCase();
    document.getElementById('rp-section').classList.add('hidden');
    document.getElementById('course-section').classList.remove('hidden');
    showNotification(`IDENTITÀ REGISTRATA: ${userName}`, "success");
}

function backToName() {
    // Nascondi selezione corsi e mostra input nome
    document.getElementById('course-section').classList.add('hidden');
    document.getElementById('rp-section').classList.remove('hidden');
    // Notifica di reset
    showNotification("RESET IDENTITÀ IN CORSO", "warning");
}

function selectExam(type) {
    examType = type === 'recluta' ? "RECLUTA / CADETTO" : "SERGENTE";
    currentQuestionsDB = type === 'recluta' ? questionsRecluta : questionsSergente;
    
    // FIX: Nascondi il modale e la selezione corsi per evitare che il logo resti visibile al centro
    document.getElementById('nameModal').classList.add('hidden');
    document.getElementById('course-section').classList.add('hidden');
    
    document.getElementById('briefing-title').innerText = `BRIEFING ESAME ${examType}`;
    document.getElementById('briefing-section').classList.remove('hidden');
    showNotification("DATA-PACK CARICATO", "warning");
}

function cancelBriefing() {
    // Nascondiamo il briefing
    document.getElementById('briefing-section').classList.add('hidden');
    
    // Riappare il modale centrale con la selezione dei corsi
    document.getElementById('nameModal').classList.remove('hidden');
    document.getElementById('course-section').classList.remove('hidden');
    
    // Aggiungiamo la notifica
    showNotification("REINDIRIZZAMENTO ALLA SELEZIONE CORSI", "warning");
}

function startFinalExam() {
    document.getElementById('briefing-section').classList.add('hidden');
    document.getElementById('main-content').classList.remove('hidden');
    document.getElementById('exam-timer').classList.remove('hidden');
    document.getElementById('exam-title-display').innerText = `ESAME ${examType}`;
    if(document.getElementById('abort-btn')) document.getElementById('abort-btn').classList.remove('hidden');
    isExamStarted = true;
    startTimer();
    loadQuestion();
    showNotification("TEST AVVIATO - BUONA FORTUNA", "success");
}

function confirmAbort() { document.getElementById('abort-modal').classList.remove('hidden'); }
function closeAbortModal() { document.getElementById('abort-modal').classList.add('hidden'); }

async function abortExam() {
    clearInterval(timerInterval);
    isExamStarted = false; 
    localStorage.setItem("pendingNotification", "OPERAZIONE ANNULLATA");
    localStorage.setItem("pendingType", "error");
    await sendToDiscord(userName, 0, 0, "🛑 ANNULLATO", examType);
    location.reload();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        const display = document.getElementById('exam-timer');
        if (display) {
            display.innerText = `TEMPO: ${mins}:${secs < 10 ? '0' : ''}${secs}`;
            if (timeLeft <= 300) display.style.color = "var(--error-red)";
        }
        if (timeLeft <= 0) { clearInterval(timerInterval); showResults(); }
    }, 1000);
}

function loadQuestion() {
    const quizBox = document.getElementById('quiz-box');
    const qData = currentQuestionsDB[currentQuestion];
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) progressBar.style.width = (currentQuestion / currentQuestionsDB.length * 100) + "%";
    quizBox.innerHTML = `
        <h2 style="color: var(--main-blue); font-size: 0.9rem; margin-bottom: 5px;">MODULO ${currentQuestion + 1} / ${currentQuestionsDB.length}</h2>
        <div style="font-size: 1.1rem; margin-bottom: 25px; padding: 15px; background: rgba(0, 114, 255, 0.05); border-left: 3px solid var(--main-blue);">${qData.q}</div>
        <div class="options-list">${qData.options.map((opt, i) => `<button class="option" onclick="checkAnswer(${i})">> ${opt}</button>`).join('')}</div>`;
}

function checkAnswer(idx) {
    if (idx === currentQuestionsDB[currentQuestion].correct) score++;
    currentQuestion++;
    if (currentQuestion < currentQuestionsDB.length) loadQuestion(); else { clearInterval(timerInterval); showResults(); }
}

async function showResults() {
    isExamStarted = false;
    document.getElementById('quiz-box').classList.add('hidden');
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('exam-timer').classList.add('hidden');
    if(document.getElementById('abort-btn')) document.getElementById('abort-btn').classList.add('hidden');
    const total = currentQuestionsDB.length;
    const percent = Math.round((score / total) * 100);
    const status = score >= 15 ? "IDONEO" : "NON IDONEO";
    document.getElementById('score-display').innerHTML = `<div style="border: 1px solid ${score >= 15 ? 'var(--success-green)' : 'var(--error-red)'}; padding: 25px;"><h3>ESITO: ${status}</h3><p>AGENTE: ${userName}</p><p>PUNTEGGIO: ${score}/${total} (${percent}%)</p></div>`;
    await sendToDiscord(userName, score, percent, status, examType);
}

async function sendToDiscord(user, pts, perc, stat, type) {
    let color = stat === "IDONEO" ? 3066993 : 15158332;
    if (stat.includes("ANNULLATO")) color = 8355711;
    const payload = { embeds: [{ title: `📋 RAPPORTO LSPD - ${type}`, color: color, fields: [{ name: "👤 Agente", value: `\`${user}\``, inline: true }, { name: "⚖️ Verdetto", value: `**${stat}**`, inline: true }, { name: "📊 Risultato", value: `Punti: ${pts}/${currentQuestionsDB.length} (${perc}%)` }], timestamp: new Date().toISOString() }] };
    try { await fetch(WEBHOOK_URL, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload) }); } catch (e) {}
}

function finalLogout() {
    localStorage.setItem("pendingNotification", "TERMINALE RESETTATO");
    localStorage.setItem("pendingType", "success");
    location.reload();
}

window.onbeforeunload = () => { if (isExamStarted) return "Il test verrà annullato!"; };cancelBriefing