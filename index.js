document.addEventListener('DOMContentLoaded', () => {
    const formularioNombre = document.getElementById('formularioNombre');
    const formularioMonto = document.getElementById('formularioMonto');
    const mensajeBienvenida = document.getElementById('mensajeBienvenida');
    const nombreCompletoSpan = document.getElementById('nombreCompleto');
    const tarjetasContainer = document.getElementById('tarjetas');
    const formularioCuotas = document.getElementById('formularioCuotas');
    const contenedorCuotas = document.getElementById('contenedorCuotas');
    const cuotaMensual = document.getElementById('cuotaMensual');
    const resultadoContainer = document.getElementById('resultado');
  
    let datosUsuario = {};
    let datosMonto = {};
    let tarjetaElegida = {};
  
    formularioNombre.addEventListener('submit', (event) => {
      event.preventDefault();
      const nombre = document.getElementById('nombre').value;
      const apellido = document.getElementById('apellido').value;
      datosUsuario = { nombre, apellido };
      localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario));
      mostrarMensajeBienvenida();
    });
  
    function mostrarMensajeBienvenida() {
      nombreCompletoSpan.textContent = datosUsuario.nombre + ' ' + datosUsuario.apellido;
      mensajeBienvenida.classList.remove('oculto');
      formularioNombre.classList.add('oculto');
      formularioMonto.classList.remove('oculto');
    }
  
    formularioMonto.addEventListener('submit', (event) => {
      event.preventDefault();
      const monto = parseFloat(document.getElementById('monto').value);
      datosMonto = { monto };
      localStorage.setItem('datosMonto', JSON.stringify(datosMonto));
      mostrarTarjetas();
    });
  
    function mostrarTarjetas() {
      formularioMonto.classList.add('oculto');
      tarjetasContainer.classList.remove('oculto');
      formularioCuotas.classList.remove('oculto');
      const tarjetas = document.getElementsByClassName('tarjeta');
      for (const tarjeta of tarjetas) {
        tarjeta.addEventListener('click', () => {
          tarjetaElegida = {
            tarjeta: tarjeta.getAttribute('data-tarjeta'),
            interes: parseFloat(tarjeta.getAttribute('data-interes')),
            cuotas: tarjeta.getAttribute('data-cuotas').split(',').map(Number),
          };
          mostrarFormularioCuotas();
        });
      }
    }
  
    function mostrarFormularioCuotas() {
      tarjetasContainer.classList.add('oculto');
      contenedorCuotas.innerHTML = '';
      for (const cuota of tarjetaElegida.cuotas) {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'cuotas';
        input.value = cuota;
        label.textContent = cuota + ' cuotas';
        contenedorCuotas.appendChild(input);
        contenedorCuotas.appendChild(label);
      }
      const botonCalcular = document.createElement('button');
      botonCalcular.type = 'submit';
      botonCalcular.textContent = 'Calcular';
      contenedorCuotas.appendChild(botonCalcular);
      formularioCuotas.classList.add('oculto');
      formularioCuotas.classList.remove('oculto');
      const botonSubmitFormularioCuotas = formularioCuotas.querySelector('button[type="submit"]');
      botonSubmitFormularioCuotas.addEventListener('click', calcularCuotaMensual);
    }
  
    function calcularCuotaMensual(event) {
      event.preventDefault();
      const inputCuotasSeleccionada = document.querySelector('input[name="cuotas"]:checked');
  
      if (inputCuotasSeleccionada) {
        const cuotasSeleccionada = parseInt(inputCuotasSeleccionada.value);
        const monto = datosMonto.monto;
        const interes = tarjetaElegida.interes;
        const cuotas = cuotasSeleccionada;
        const cuotaMensualCalculada = (monto * (1 + interes / 100)) / cuotas;
        cuotaMensual.textContent = '$' + cuotaMensualCalculada.toFixed(2) + ' por mes';
        resultadoContainer.classList.remove('oculto');
      } else {
        // Manejo de error: el usuario no seleccionó una opción de cuotas.
        cuotaMensual.textContent = 'Por favor, seleccione una opción de cuotas.';
        resultadoContainer.classList.remove('oculto');
      }
    }
  });
  