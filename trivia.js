// 1. DATOS DE LAS PREGUNTAS
var questions = [
    { 
        question: "¿Cuál es el objetivo principal del juego?",
        answers: [
            {
                description: "Obtener oro de los minions",
                value: 0,
            },
            {
                description: "Destruir el nexo enemigo",
                value: 1,
            },
            {
                description: "Hacerle daño a los enemigos",
                value: 0,
            },
        ],
    },
    {
        question: "¿Qué tipo de juego es League of Legends?",
        answers: [
            {
                description: "Es un MOBA (Multiplayer Online Battle Arena)",
                value: 1,
            },
            {
                description: "Es un MMORPG no lineal",
                value: 0,
            },
            {
                description: "Es un Tactical Shooter",
                value: 0,
            },
        ],
    },
    {
        question: "¿Cuales son los campeones tanques?",
        answers: [
            {
                description: "Alta movilidad y daño",
                value: 0,
            },
            {
                description: "Daño a distancia constante",
                value: 0,
            },
            {
                description: "Alta resistencia y control de masas",
                value: 1,
            },
        ],
    },
    {
        question: "¿Cuál es el modo de juego donde puedes subir de rango?",
        answers: [
            {
                description: "URF",
                value: 0,
            },
            {
                description: "Casual",
                value: 0,
            },
            {
                description: "Clasificatoria",
                value: 1,
            },
        ],
    },
    {
        question: "¿Como se llama la liga en donde juega el famoso jugador Faker?",
        answers: [
            {
                description: "LPL",
                value: 0,
            },
            {
                description: "LTA",
                value: 0,
            },
            {
                description: "LCK",
                value: 1,
            },
        ],
    },
];

// 2. VARIABLES PARA CONTROLAR LA TRIVIA
var currentQuestion = 0;        // Qué pregunta estamos mostrando (0, 1, 2, 3, 4)
var correctAnswers = 0;         // Cuántas respuestas correctas lleva el usuario
var totalQuestions = questions.length;  // Total de preguntas (5)

// 3. FUNCIÓN PRINCIPAL: INICIAR LA TRIVIA
function startTrivia() {
    // Resetear las variables
    currentQuestion = 0;
    correctAnswers = 0;
    
    // Mostrar el modal
    showModal();
    
    // Mostrar la primera pregunta
    showQuestion();
}

// 4. FUNCIÓN: MOSTRAR EL MODAL
function showModal() {
    var modal = document.getElementById('trivia-modal');
    modal.classList.add('show');
}

// 5. FUNCIÓN: OCULTAR EL MODAL
function hideModal() {
    var modal = document.getElementById('trivia-modal');
    modal.classList.remove('show');
}

// 6. FUNCIÓN: MOSTRAR UNA PREGUNTA
function showQuestion() {
    // Verificar si ya terminamos todas las preguntas
    if (currentQuestion >= totalQuestions) {
        showResults();
        return;
    }
    
    // Obtener la pregunta actual
    var question = questions[currentQuestion];
    
    // Crear el HTML de la pregunta
    var questionHTML = "";
    
    // Agregar el progreso
    questionHTML += "<div class='question-progress'>Pregunta " + (currentQuestion + 1) + " de " + totalQuestions + "</div>";
    
    // Agregar el título de la pregunta
    questionHTML += "<h3 class='question-title'>" + question.question + "</h3>";
    
    // Agregar el contenedor de respuestas
    questionHTML += "<div class='answers-container'>";
    
    // Crear un botón para cada respuesta
    for (var i = 0; i < question.answers.length; i++) {
        questionHTML += "<button class='answer-button' onclick='answerQuestion(" + i + ")' data-value='" + question.answers[i].value + "'>" + question.answers[i].description + "</button>";
    }
    
    questionHTML += "</div>";
    
    // Mostrar el HTML en la página
    document.getElementById('trivia-container').innerHTML = questionHTML;
}

// 7. FUNCIÓN: MANEJAR UNA RESPUESTA
function answerQuestion(answerNumber) {
    // Obtener la pregunta actual
    var question = questions[currentQuestion];
    
    // Obtener el valor de la respuesta seleccionada
    var answerValue = question.answers[answerNumber].value;
    
    // Verificar si la respuesta es correcta (valor = 1)
    var isCorrect = (answerValue === 1);
    
    // Si es correcta, aumentar el contador
    if (isCorrect) {
        correctAnswers++;
    }
    
    // Mostrar los colores de las respuestas
    showAnswerColors(answerNumber);
    
    // Después de 2 segundos, pasar a la siguiente pregunta
    setTimeout(function() {
        currentQuestion++;
        showQuestion();
    }, 2000);
}

// 8. FUNCIÓN: MOSTRAR COLORES DE LAS RESPUESTAS
function showAnswerColors(userAnswer) {
    // Obtener todos los botones de respuesta
    var buttons = document.querySelectorAll('.answer-button');
    
    // Recorrer todos los botones
    for (var i = 0; i < buttons.length; i++) {
        // Deshabilitar el botón
        buttons[i].disabled = true;
        
        // Obtener el valor de la respuesta (1 = correcta, 0 = incorrecta)
        var answerValue = parseInt(buttons[i].getAttribute('data-value'));
        
        // Si es la respuesta correcta, ponerla verde
        if (answerValue === 1) {
            buttons[i].classList.add('correct');
        }
        // Si es la respuesta del usuario y es incorrecta, ponerla roja
        else if (i === userAnswer && answerValue === 0) {
            buttons[i].classList.add('incorrect');
        }
    }
}

// 9. FUNCIÓN: MOSTRAR LOS RESULTADOS FINALES
function showResults() {
    // Ocultar el contenedor de preguntas
    document.getElementById('trivia-container').style.display = 'none';
    
    // Mostrar el contenedor de resultados
    document.getElementById('trivia-results').style.display = 'block';
    
    // Calcular el porcentaje
    var percentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Mostrar la puntuación
    document.getElementById('final-score').textContent = "Puntuación: " + correctAnswers + "/" + totalQuestions;
    
    // Mostrar el mensaje según la puntuación
    var message = "";
    if (percentage === 100) {
        message = "¡Perfecto! Eres un verdadero experto de League of Legends! 🏆";
    } else if (percentage >= 80) {
        message = "¡Excelente! Tienes un gran conocimiento del juego! 🌟";
    } else if (percentage >= 60) {
        message = "¡Bien hecho! Sigue practicando para mejorar! 👍";
    } else if (percentage >= 40) {
        message = "No está mal, pero puedes mejorar mucho más! 💪";
    } else {
        message = "¡Sigue aprendiendo sobre League of Legends! 📚";
    }
    
    document.getElementById('score-message').textContent = message;
}

// 10. FUNCIÓN: REINICIAR LA TRIVIA
function restartTrivia() {
    // Ocultar resultados
    document.getElementById('trivia-results').style.display = 'none';
    
    // Mostrar contenedor de preguntas
    document.getElementById('trivia-container').style.display = 'block';
    
    // Iniciar de nuevo
    startTrivia();
}

// 11. FUNCIÓN: CERRAR LA TRIVIA
function closeTrivia() {
    hideModal();
}

// ========================================
// CONFIGURACIÓN DE EVENTOS (CUANDO LA PÁGINA SE CARGA)
// ========================================

// Esperar a que la página se cargue completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // Botón para iniciar la trivia
    document.getElementById('start-button').onclick = startTrivia;
    
    // Botón para cerrar la trivia
    document.getElementById('close-trivia').onclick = closeTrivia;
    
    // Botón para reiniciar la trivia
    document.getElementById('restart-trivia').onclick = restartTrivia;
    
    // Botón para cerrar los resultados
    document.getElementById('close-results').onclick = closeTrivia;
    
    // Cerrar modal al hacer clic fuera de él
    document.getElementById('trivia-modal').onclick = function(event) {
        if (event.target === this) {
            closeTrivia();
        }
    };
    
    // Cerrar modal con la tecla Escape
    document.onkeydown = function(event) {
        if (event.key === 'Escape') {
            closeTrivia();
        }
    };
});