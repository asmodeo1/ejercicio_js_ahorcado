const palabras = [
    "abundancia", "aceptacion", "actividad", "admiracion", "adolescente",
    "afortunado", "agricultura", "alimentar", "alucinante", "amistad",
    "analfabeto", "analisis", "anestesia", "ansiedad", "antibiotico",
    "apreciable", "aprovechar", "arqueologo", "arquitecto", "arrepentir",
    "articulado", "asombroso", "astronauta", "auditorio", "aumentable",
    "autenticar", "aventurado", "beneficiar", "bicicleta", "biologia",
    "brillante", "calorifico", "camaraderia", "camioneta", "candidato",
    "capacitado", "capturador", "carretera", "celebracion", "cementerio",
    "cientifico", "circulante", "claridad", "colaborar", "colectivo",
    "colorante", "companero", "completar", "compromiso", "conectar",
    "confiable", "conjuntivo", "conocido", "consolador", "constructo",
    "contundente", "cooperante", "correccion", "crecimiento", "cualificado",
    "curiosidad", "debilidad", "deducible", "definicion", "delicioso",
    "dependiente", "desarrollo", "desconocido", "descubrir", "deslumbrar",
    "destacado", "detallista", "dificultad", "dinamismo", "directorio",
    "disponible", "distincion", "diversidad", "economista", "efectividad",
    "ejecutivo", "elaboracion", "elocuencia", "emprendedor", "encontrado",
    "energetico", "enfocar", "enriquecer", "entendible", "entusiasta",
    "equilibrio", "escritorio", "esplendido", "establecer", "estimacion",
    "eternidad", "excelencia", "experimentar", "explorador", "extranjero",
    "fabuloso", "facilidad", "fascinante", "fertilidad", "fiabilidad",
    "fluctuante", "formidable", "fotografia", "frecuentar", "frustrante",
    "funcionario", "fundamento", "generacion", "glorioso", "gobernante",
    "grandioso", "gratitud", "habilidad", "hermosura", "honestidad",
    "hospital", "identidad", "iluminado", "imaginario", "impresionante",
    "increible", "indispensable", "inspiracion", "intangible", "invisible",
    "investigador", "irresistible", "juventud", "kilometro", "laborioso",
    "liderazgo", "longevo", "magnifico", "majestuoso", "maravilloso",
    "mecanismo", "melodioso", "mentira", "milagroso", "modernidad",
    "monumento", "naturalista", "necesidad", "novedoso", "nube", 
    "objetivo", "obstaculo", "optimismo", "ordenador", "organizar",
    "orientado", "palpitante", "pandemia", "patriotico", "percepcion",
    "permanente", "perspectiva", "personalidad", "pertinente", "pintoresco",
    "plausible", "posibilidad", "precision", "preocupado", "prevision",
    "procedente", "productivo", "profundidad", "programar", "prolongado",
    "proposito", "proyecto", "quebrantado", "querencia", "quietud",
    "radiacion", "racionalidad", "receptivo", "reconocimiento", "rectangulo",
    "reducible", "reflexionar", "relajante", "relevante", "remontar",
    "renovable", "resistencia", "responsable", "resultante", "revolucionario",
    "rotativo", "sabiduria", "satisfactorio", "semantico", "sensibilidad",
    "silencioso", "simplicidad", "sobresaliente", "solidaridad", "sorprendente",
    "submarino", "sugerente", "superficie", "tecnologia", "tolerancia",
    "tranquilidad", "trascendental", "universidad", "valoracion", "variabilidad",
    "vegetacion", "ventajoso", "versatilidad", "vigilante", "voluntario",
    "vulnerable", "zoologia", "zumbador"
];

// Creamos una serie de variables y constantes globales para que
// existan durante toda la vida de la página
let palabra = "";
let fallos = 0;
let aciertos = 0;
const INTENTOS_MAXIMOS = 6; 
let letrasPosibles = "abcdefghijklmnopqrstuvwxyz";

function comprobar() {
    const letra = document.getElementById("letra");
    // Comprobamos si la letra está vacía. Con trim quitamos los espacios en blanco
    // que pueda haber por la izquierda y por la derecha
    if(letra.value.trim() == "") {
        window.alert("Debes escribir la letra");
        letra.focus();
        letra.select();
        return;
    }
    // Comprobamos si la letra está dentro de una de las válidas.
    // indexOf devuelve -1 si no la encuentra
    if(letrasPosibles.indexOf(letra.value.toLowerCase()) == -1) {
        window.alert("Letra no válida");
        letra.focus();
        letra.select();
        return;
    }
    // Eliminamos la letra introducida de las posibles, para que no se vuelva a introducir
    letrasPosibles = letrasPosibles.replace(letra.value.toLowerCase(), "");

    // Añadimos la letra al div de las letras usadas
    const letrasUsadas = document.getElementById("letrasUsadas");
    letrasUsadas.textContent += letra.value;

    letra.focus();
    letra.select();

    // Vemos si la letra no está en la palabra
    if(palabra.indexOf(letra.value) == -1) {
        fallos++; // o fallos += 1; o fallos = fallos + 1;
        const span = document.querySelector("#fallos span");
        // o const span = document.getElementById("fallos").getElementsByTagName("span")[0];
        span.textContent = fallos;
        const horca = document.getElementById("horca");
        // Cada "imagen" tiene 261px de ancho
        horca.style.backgroundPosition = fallos * -261 + "px";
        // Comprobamos si se han consumido los intentos máximos
        if (fallos == INTENTOS_MAXIMOS) {
            mostrarResultado("☹️ Has perdido");
        }
        return;
    }
    // Comprobamos si la letra está en la palabra, en cuyo caso aumentamos el número
    // de aciertos
    const spanes = document.querySelectorAll("#solucion span");
    for (let i = 0; i < palabra.length; i++) {
        if(letra.value.toLowerCase() === palabra[i]) {
            spanes[i].innerText = letra.value;
            aciertos++;
        }
    }

    // Comprobamos si ganó (el número de aciertos debe ser igual a la longitud de la palabra)
    if (aciertos == palabra.length) {
        mostrarResultado("😄 Has ganado");
    }
}

// Como al ganar y al perder hay que hacer básicamente lo mismo, creamos una función 
// para no repetir código; solo cambia el mensaje a mostrar
function mostrarResultado(texto) {
    document.getElementById("comprobar").disabled = true;
    const resultado = document.getElementById("resultado");
    resultado.getElementsByTagName("p")[0].textContent = texto;
    resultado.style.display = "block";
}

function reiniciar() {
    // Debemos limpiar e inicializar todo de nuevo
    document.getElementById("comprobar").disabled = false;
    fallos = 0;
    aciertos = 0;
    // Hay que volver a poner todas las letras como posibles
    letrasPosibles = "abcdefghijklmnopqrstuvwxyz";
    const horca = document.getElementById("horca");
    // Ponemos de nuevo la "primera imagen"
    horca.style.backgroundPosition = 0;
    document.getElementById("solucion").textContent = "";
    const span = document.querySelector("#fallos span");
    // Moostramos 0 en los fallos
    span.textContent = 0;
    const letrasUsadas = document.getElementById("letrasUsadas");
    // Limpiamos las letras usadas
    letrasUsadas.textContent = "";
    const letra = document.getElementById("letra");
    letra.value = "";
    letra.focus();
    // Generamos la nueva palabra usando la función iniciar
    iniciar();
}

function iniciar() {
    // Generammos una posición entre 0 y el númer de palabras - 1
    const posicion = Math.floor(Math.random() * palabras.length);
    // Cogemos la palabra de esa posición
    palabra = palabras[posicion];
    //o palabra = palabras[Math.floor(Math.random() * palabras.length)];
    const solucion = document.getElementById("solucion");
    // Debemos crear tantas _ como letras tenga la palabra
    for (const letra of palabra) {
        const span = document.createElement("span");
        span.classList.add("m-2");
        span.textContent = "_";
        solucion.appendChild(span);
    }
}

function cerrar() {
    document.getElementById("resultado").style.display = "none";
}

document.getElementById("comprobar").addEventListener("click", comprobar);
document.getElementById("reiniciar").addEventListener("click", reiniciar);
document.getElementById("cerrar").addEventListener("click", cerrar);

iniciar();


