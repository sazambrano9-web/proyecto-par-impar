// components/input-range.js

// Plantilla de HTML + estilos
const plantilla = document.createElement('template');
plantilla.innerHTML = `
  <style>
    form { font-family: sans-serif; margin-bottom: 16px; }
    input { width: 60px; margin-right: 8px; }
    .mensaje-error { color: #c00; font-size: 0.9em; margin-top: 4px; }
  </style>
  <form>
    <label>Inicio: <input type="number" name="inicio" required></label>
    <label>Fin:    <input type="number" name="fin" required></label>
    <button type="submit">Mostrar</button>
    <div class="mensaje-error"></div>
  </form>
`;

export class EntradaRango extends HTMLElement {
  constructor() {
    super();
    // Creamos Shadow DOM e insertamos la plantilla
    this.attachShadow({ mode: 'open' })
        .appendChild(plantilla.content.cloneNode(true));

    this.formulario   = this.shadowRoot.querySelector('form');
    this.errorElemento = this.shadowRoot.querySelector('.mensaje-error');
  }

  connectedCallback() {
    // En envío del formulario
    this.formulario.addEventListener('submit', this._alEnviar.bind(this));
  }

  disconnectedCallback() {
    this.formulario.removeEventListener('submit', this._alEnviar);
  }

  _alEnviar(evt) {
    evt.preventDefault();
    this.errorElemento.textContent = '';

    const inicioValor = Number(this.shadowRoot
      .querySelector('input[name="inicio"]').value);
    const finValor    = Number(this.shadowRoot
      .querySelector('input[name="fin"]').value);

    // Validaciones
    if (isNaN(inicioValor) || isNaN(finValor)) {
      this.errorElemento.textContent = 'Ambos campos deben ser números.';
      return;
    }
    if (inicioValor > finValor) {
      this.errorElemento.textContent = 'Inicio debe ser ≤ que Fin.';
      return;
    }

    // Despachamos evento personalizado con los datos
    this.dispatchEvent(new CustomEvent('rangoSeleccionado', {
      detail: { inicio: inicioValor, fin: finValor },
      bubbles: true,
      composed: true
    }));
  }
}

// Definimos la etiqueta <input-range>
customElements.define('input-range', EntradaRango);

        