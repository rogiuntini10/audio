const microphoneButton = document.getElementById('microphoneButton');
const transcriptionText = document.getElementById('transcriptionText');
const recognition = createRecognition();
let listening = false;

microphoneButton.addEventListener('click', () => {
    if (!recognition) return;

    listening ? recognition.stop() : recognition.start();

    microphoneButton.innerHTML = listening ? '<span class="microphone-icon">&#128226;</span> Iniciar Transcrição' : '<span class="microphone-icon">&#128230;</span> Parar';
    microphoneButton.classList.toggle('active');
});

function createRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition !== undefined ? new SpeechRecognition() : null;
    if (!recognition) {
        transcriptionText.innerHTML = "Reconhecimento de Fala não encontrado!";
        return null;
    }
    recognition.lang = "pt_BR";

    recognition.onstart = () => {
        listening = true;
        transcriptionText.innerHTML = "Escutando...";
    };

    recognition.onend = () => {
        listening = false;
        transcriptionText.innerHTML = "";
    };

    recognition.onerror = e => {
        transcriptionText.innerHTML = `Erro de reconhecimento: ${e.error}`;
    };

    recognition.onresult = e => {
        const transcript = e.results[0][0].transcript;
        transcriptionText.innerHTML = `Transcrição: ${transcript}`;
    };

    return recognition;
}

