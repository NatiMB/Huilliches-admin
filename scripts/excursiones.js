console.log(location.search);    // Lee los argumentos pasados a este formulario
var id = location.search.substr(4);  // persona_update.html?id=1

console.log(id);
const { createApp } = Vue;
createApp({
  data() {
    return {
      excursiones: [], // Nombre en plural para contener múltiples personas
      url: 'https://natimartinez.pythonanywhere.com/personas/' + id + '/excursiones',
      error: false,
      cargando: true,
      hotel: "",
      excursion: "",
      cantidad_pasajeros: 0,
      fecha_hora: "",
      showForm: false // Initially hide the form
    };
  },
  computed: {
    formattedDate() {
      return (excursion) => {
        const date = new Date(excursion.fecha_hora);
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`;
        return formattedDate;
      };
    },
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.excursiones = data; // Asignar el resultado al arreglo "transfers"
          this.cargando = false;
        })
        .catch(err => {
          console.error(err);
          this.error = true;
        });
    },
    grabar() {
        // Convertir la fecha y hora en formato adecuado
        const fechaHora = new Date(this.fecha_hora).toISOString();
      
        let excursiones = {
          excursion: this.excursion,
          cantidad_pasajeros: this.cantidad_pasajeros,
          fecha_hora: fechaHora,
        }
      
      var options = {
        body: JSON.stringify(excursiones),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow'
      };
      fetch(this.url, options)
        .then(() => {
          alert("Se ha guardado correctamente");
          window.location.href = "./excursiones.html?id=" + id; // navega a productos.html
        })
        .catch(err => {
          console.error(err);
          alert("Error al guardar");
        });
    },
    eliminar(excursion) {
      const url = this.url + '/' + excursion.id;
      var options = {
        method: 'DELETE'
      };
      fetch(url, options)
        .then(() => {
          alert('Registro Eliminado');
          this.fetchData(this.url); // volver a cargar los datos después de eliminar el registro
        })
        .catch(err => {
          console.error(err);
          alert("Error al eliminar");
        });
    },
  },
  created() {
    this.fetchData(this.url);
  }
}).mount('#app');
