console.log('Neurodivergent Assistant script loaded!');

/// Referencje do elementów DOM
const widgetForm = document.getElementById('widget-form');
const widgetsList = document.getElementById('widgets-list');

// Funkcja do tworzenia widżetu
function createWidget(title, content, type) {
    const widget = document.createElement('div');
    widget.className = 'widget';
    
    if (type === 'water') {
        widget.innerHTML = `
            <h3>${title}</h3>
            <p>Wypita woda: <span id="water-intake">0</span> ml</p>
            <button onclick="addWaterIntake(this)">Dodaj 250ml</button>
            <button onclick="deleteWidget(this)">Usuń</button>
        `;
    } else if (type === 'medication') {
        widget.innerHTML = `
            <h3>${title}</h3>
            <p>Przyjęta dawka: <span id="med-dose">0</span> tabletek</p>
            <label for="med-count">Ilość dawek:</label>
            <input type="number" id="med-count" value="1" min="1" max="10">
            <button onclick="addMedicationDose(this)">Dodaj dawkę</button>
            <button onclick="deleteWidget(this)">Usuń</button>
        `;
    } else {
        widget.innerHTML = `
            <h3>${title}</h3>
            <p>${content}</p>
            <button onclick="deleteWidget(this)">Usuń</button>
        `;
    }
    widgetsList.appendChild(widget);
}

// Funkcja do dodawania wypitej wody
function addWaterIntake(button) {
    const waterSpan = button.parentElement.querySelector('#water-intake');
    let currentWater = parseInt(waterSpan.innerText);
    waterSpan.innerText = currentWater + 250;
}

// Funkcja do dodawania dawki leku
function addMedicationDose(button) {
    const doseSpan = button.parentElement.querySelector('#med-dose');
    const countInput = button.parentElement.querySelector('#med-count');
    let currentDose = parseInt(doseSpan.innerText);
    let count = parseInt(countInput.value);
    doseSpan.innerText = currentDose + count;
}

// Funkcja do usuwania widżetu
function deleteWidget(button) {
    const widget = button.parentElement;
    widgetsList.removeChild(widget);
}

// Obsługa zdarzenia dla formularza widżetów
widgetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('widget-title').value;
    const content = document.getElementById('widget-content').value;

    if (title && content) {
        createWidget(title, content, 'general'); // "general" dla zwykłego widżetu
        widgetForm.reset();
    } else {
        console.error('Tytuł i treść widżetu są wymagane.');
    }
});

// Funkcja do dodania widżetu do wody
function addWaterWidget() {
    createWidget('Wypij wodę', '', 'water');
}

// Funkcja do dodania widżetu do leków
function addMedicationWidget() {
    createWidget('Przyjmij leki', '', 'medication');
}
