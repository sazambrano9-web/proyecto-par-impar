// components/par-impar-lista.js

// Plantilla de HTML + estilos
const plantillaLista = document.createElement('template');
plantillaLista.innerHTML = `
  <style>
    :host { display: block; font-family: sans-serif; margin-top: 16px; }
    .item { margin: 4px 0; }
    .par   { color: green; }
    .impar { color: blue; }
  </style>
  <div class="contenedor-resultados"></div>
`;

export class ListaParImpar extends HTMLElement {
  constructor() {
    super();
    // Creamos Shadow DOM e insertamos la plantilla
    this.attachShadow({ mode: 'open' })
        .appendChild(plantillaLista.content.cloneNode(true));

    this.contenedor = this.shadowRoot
      .querySelector('.contenedor-resultados');
    this._manejarEvento = this._actualizarLista.bind(this);
  }

  connectedCallback() {
    // Escuchamos el evento global rangoSeleccionado
    document.addEventListener('rangoSeleccionado', this._manejarEvento);
  }

  disconnectedCallback() {
    document.removeEventListener('rangoSeleccionado', this._manejarEvento);
  }

  _actualizarLista(evt) {
    const { inicio, fin } = evt.detail;
    this.contenedor.innerHTML = '';  // Limpiamos la lista previa

    for (let n = inicio; n <= fin; n++) {
      const elemento = document.createElement('p');
      elemento.textContent = `${n} – ${n % 2 === 0 ? 'Par' : 'Impar'}`;
      elemento.classList.add('item', n % 2 === 0 ? 'par' : 'impar');
      this.contenedor.appendChild(elemento);
    }
  }
}

// Definimos la etiqueta <par-impar-lista>
customElements.define('par-impar-lista', ListaParImpar);
