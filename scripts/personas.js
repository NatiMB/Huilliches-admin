const { createApp } = Vue
createApp({
  data() {
    return {
      personas: [], // Nombre en plural para contener múltiples personas
      url: 'https://natimartinez.pythonanywhere.com/personas/all',
      error: false,
      cargando: true,
      id: 0,
      nombre: "",
      apellido: "",
      dni: "",
      tel: "",
      pax: 0,
      hotel: ""
    };
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.personas = data; // Asignar el resultado al arreglo "personas"
          this.cargando = false;
        })
        .catch(err => {
          console.error(err);
          this.error = true;
        });
    },
    eliminar(id) {
      const url = this.url + '/' + id;
      var options = {
        method: 'DELETE',
      };
      fetch(url, options)
        .then(res => res.json())
        .then(res => {
          alert('Registro Eliminado');
          location.reload(); // recarga el json luego de eliminado el registro
        });
    },
    grabar() {
      let personas = {
        nombre: this.nombre,
        apellido: this.apellido,
        dni: this.dni,
        hotel: this.hotel,
        pax: this.pax,
        tel: this.tel,
      }
      var options = {
        body: JSON.stringify(personas),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow'
      };
      fetch(this.url, options)
      .then(function () {
          alert("Se ha guardado correctamente")
          window.location.href = "./index.html"; // navega a productos.html          
      })
      .catch(err => {
          console.error(err);
          alert("Error al guardar")
      })
    }
  },
  created() {
    this.fetchData(this.url);
  },
  
}).mount('#app');
