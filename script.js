// Configuración inicial
const configUno = {
    "estilo": "basico",
    "idioma": "es",
    "opciones": 4,
    "menu": ["Inicio", "Cargar JSON Local", "Obtener JSON de una API", "Formulario"]
};

let nav = document.getElementById("menu");
let contenido = document.getElementById("contenido");

// Mostrar el menú dinámico
function mostrarMenu() {
    let idOpcionMenu = 0;

    configUno.menu.forEach(item => { 
        let opcionMenu = document.createElement("a")
        opcionMenu.innerText = item;
        opcionMenu.id = `idOpcionMenu${idOpcionMenu++}`;
        nav.appendChild(opcionMenu);
    });
    nav.classList.add(configUno.estilo);


    let primerLink = document.getElementById('idOpcionMenu0');
    primerLink.classList.add('nav-link');
    let segundoLink = document.getElementById('idOpcionMenu1');
    segundoLink.classList.add('nav-link');
    let tercerink = document.getElementById('idOpcionMenu2');
    tercerink.classList.add('nav-link');
    let cuartoLink = document.getElementById('idOpcionMenu3');
    cuartoLink.classList.add('nav-link');

    primerLink.addEventListener('click', mostrarInicio);
    segundoLink.addEventListener('click', jsonLocal);
    tercerink.addEventListener('click', obtenerJson);
    cuartoLink.addEventListener('click', mostrarFormulario);

    let idioma = document.createElement('p');
    idioma.innerHTML = configUno.idioma;
    nav.appendChild(idioma);
};
mostrarMenu();

function mostrarInicio() {
    clearContainer(contenido);
};

function jsonLocal() {
    clearContainer(contenido);
    

    let inputTexto = document.createElement('input');
    inputTexto.value="personas_ciudad.json";
    let botonTexto = document.createElement('button');
    botonTexto.innerText = 'Cargar Json';
    inputTexto.type = 'text';
    contenido.appendChild(inputTexto);
    contenido.appendChild(botonTexto);

    botonTexto.addEventListener('click', ()=>{
        let valorInput = inputTexto.value;
        cargarJsonLocal(valorInput);
    }
    );
};
function obtenerJson(){
    clearContainer(contenido);

    let breakingBadApi = document.createElement('button');
    breakingBadApi.innerText = 'Breaking Bad Api';
    breakingBadApi.id = 'breakingBadApi-id';
    breakingBadApi.classList.add('btn-basico');
    let rickMortyApi = document.createElement('button');
    rickMortyApi.innerText = 'Rick and Morty Api';
    rickMortyApi.id = 'rickMortyApi-id';
    rickMortyApi.classList.add('btn-basico');
    let dragonBall = document.createElement('button');
    dragonBall.innerText = 'Dragon Ball Api';
    dragonBall.id = 'dragonBall-id';
    dragonBall.classList.add('btn-basico');
    contenido.appendChild(breakingBadApi);
    contenido.appendChild(rickMortyApi);
    contenido.appendChild(dragonBall);

    rickMortyApi.addEventListener('click', cargarApiRickMorty);
    breakingBadApi.addEventListener('click', cargarApiBreakingBad);
    dragonBall.addEventListener('click', cargarApiDragonBall);
    
    
    
}
function cargarApiDragonBall(){
    clearContainer(contenido);
    try {
        fetch("https://dragonball-api.com/api/characters")
        .then(response=>{
            if(!response.ok){
                alert(`Error al conectar con la api de Dragon Ball`); 
                return;
            }else{
                alert("Api cargada con éxito");
            }
            return response.json();
        })
        .then(data=>{
        
            mostrarApiDragonBall(data);
            
        })
    } catch (error) {
            console.log("Error");
    }
};
function mostrarApiDragonBall(data){
    for (const elemento of data.items) {
        
            let tarjetaDragonBall = document.createElement('div');
            tarjetaDragonBall.classList.add('tarjeta-dragon-ball');

            let name = document.createElement('h1');
            let ki = document.createElement('h2');
            name.innerText = `Personaje :${elemento.name}`;
            ki.innerText = `Ki :${elemento.ki}`;
            tarjetaDragonBall.appendChild(name);
            tarjetaDragonBall.appendChild(ki);
            contenido.appendChild(tarjetaDragonBall);
            
        }
}

function mostrarApiBreakingBad(data){
    for (const elemento of data) {
        
            let divTarjeta = document.createElement('div');
            divTarjeta.classList.add('tarjeta-brb');

            let quote = document.createElement('h1');
            let author = document.createElement('h2');
            quote.innerText = `${elemento.quote}`;
            author.innerText = `Autor :${elemento.author}`;

            divTarjeta.appendChild(quote);
            divTarjeta.appendChild(author);

            contenido.appendChild(divTarjeta);
            contenido.appendChild(divTarjeta);
            
            
        }
}
function cargarApiBreakingBad(){
    clearContainer(contenido);
    try {
        fetch("https://api.breakingbadquotes.xyz/v1/quotes/20")
        .then(response=>{
            if(!response.ok){
                alert(`Error al conectar con la api de Breaking bad`); 
                return;
            }else{
                alert("Api cargada con éxito");
            }
            return response.json();
        })
        .then(data=>{
            console.log(data);
            mostrarApiBreakingBad(data);
            
        })
    } catch (error) {
            console.log("Error");
    }
};

function cargarApiRickMorty(){
    clearContainer(contenido);
    try {
        fetch("https://rickandmortyapi.com/api/character")
        .then(response=>{
            if(!response.ok){
                alert(`Error al conectar con la api de Rick and Morty`); 
                return;
            }else{
                alert("Api cargada con éxito");
            }
            return response.json();
        })
        .then(data=>{
            mostrarApiRickMorty(data);
            
        })
    } catch (error) {
            console.log("Error");
    }
};

function mostrarApiRickMorty(data){
    for (const elemento of data.results) {
            
            let tarjetaRickMorty = document.createElement('div');
            tarjetaRickMorty.classList.add('tarjeta-rick');

            let name = document.createElement('h1');
            let status = document.createElement('h2');
            
            name.innerText = `Nombre :${elemento.name}`;
            status.innerText = `Estado :${elemento.status}`;
            tarjetaRickMorty.appendChild(name);
            tarjetaRickMorty.appendChild(status);
            contenido.appendChild(tarjetaRickMorty);
        
            
        }
}



function mostrarJson(respuestaJson){
    let enunciado = document.createElement('h2');
    enunciado.innerText = 'JSON Local, personas y ciudades';
    contenido.appendChild(enunciado);
    for (const i in respuestaJson) {
        if (respuestaJson.hasOwnProperty(i)) { 
            const elemento = respuestaJson[i];
            let containerJsonLocal = document.createElement('div');
            containerJsonLocal.classList.add('container-json-local');

            let nombre = document.createElement('h1');
            let ciudad = document.createElement('h2');
            nombre.innerText = `nombre:${elemento.nombre}`;
            ciudad.innerText = `Ciudad:${elemento.ciudad}`;
            containerJsonLocal.appendChild(nombre);
            containerJsonLocal.appendChild(ciudad);
            contenido.appendChild(containerJsonLocal);

            
        }
    }
};

function cargarJsonLocal(valorInput) {
    try {
        fetch(valorInput)
        .then(response=>{
            if(!response.ok){
                alert(`Error al conectar con el json`); 
                return;
            }else{
                alert("Archivo cargado con éxito");
            }
            return response.json();
        })
        .then(data=>{respuestaJson = data 
            mostrarJson(respuestaJson);
            
        })
    } catch (error) {
            console.log("Error");
    }
};

function mostrarFormulario() {
    clearContainer(contenido);
    
    let formulario = document.createElement('form');
    formulario.id = 'formulario';
    formulario.innerHTML = `
        <h2>Sube un Archivo JSON</h2>
        <input type="file" id="inputFile" accept=".json">
        <div id="table-container"></div>
    `;
    contenido.appendChild(formulario);

    document.getElementById('inputFile')
            .addEventListener('change', leerArchivoJSON);
};

function leerArchivoJSON(event) {
    const archivo = event.target.files[0];
    if (archivo && archivo.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const data = JSON.parse(e.target.result);
            
                contenido.innerHTML = generarTabla(data);
            } catch (error) {
                console.error('Error al leer el JSON:', error);
            }
        };
        reader.readAsText(archivo);
    }
};
function generarTabla(datos) {
    let tabla = '<table border="1">';
    tabla += '<thead><tr>';
    Object.keys(datos[0]).forEach(key => {
        tabla += `<th>${key.charAt(0).toUpperCase() + key.slice(1)}</th>`;
    });
    tabla += '</tr></thead>';
    tabla += '<tbody>';
    datos.forEach(item => {
        tabla += '<tr>';
        Object.values(item).forEach(value => {
            tabla += `<td>${value}</td>`;
        });
        tabla += '</tr>';
    });
    tabla += '</tbody></table>';
    return tabla;
};


function clearContainer(container) {
    if(!container) return;
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}
