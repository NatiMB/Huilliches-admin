console.log(location.search);    // Lee los argumentos pasados a este formulario
var id = location.search.substr(4);  // persona_update.html?id=1

console.log(id);
const { createApp } = Vue;
createApp({
  data() {
    return {
      transfers: [], // Nombre en plural para contener múltiples personas
      url: 'https://natimartinez.pythonanywhere.com/personas/' + id + '/transfers',
      error: false,
      cargando: true,
      hotel: "",
      pax: 0,
      fechayhora_in: new Date(),
      vuelo_in: "",
      fechayhora_out: new Date(),
      vuelo_out: "",
      showForm: false // Initially hide the form
    };
  },
  computed: {
    formattedDateIn() {
      return (transfer) => {
        const date = new Date(transfer.fechayhora_in);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`;
        return formattedDate;
      };
    },
    formattedDateOut() {
      return (transfer) => {
        const date = new Date(transfer.fechayhora_out);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`;
        return formattedDate;
      };
    }
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.transfers = data; // Asignar el resultado al arreglo "transfers"
          this.cargando = false;
        })
        .catch(err => {
          console.error(err);
          this.error = true;
        });
    },
    grabar() {
      // Convertir la fecha y hora In en formato adecuado
      const fechaHoraIn = new Date(this.fechayhora_in).toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).replace(/\//g, '-');
    
      // Convertir la fecha y hora Out en formato adecuado
      const fechaHoraOut = new Date(this.fechayhora_out).toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).replace(/\//g, '-');
    
      let transfers = {
        fechayhora_in: fechaHoraIn,
        vuelo_in: this.vuelo_in,
        fechayhora_out: fechaHoraOut,
        vuelo_out: this.vuelo_out,
      }
      var options = {
        body: JSON.stringify(transfers),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow'
      };
      fetch(this.url, options)
        .then(function () {
          alert("Se ha guardado correctamente")
          window.location.href = "./transfer.html?id=" + id; // navega a productos.html          
        })
        .catch(err => {
          console.error(err);
          alert("Error al guardar")
        })
    },
    eliminar(transfer) {
      const url = this.url + '/' + transfer.idt;
      var options = {
        method: 'DELETE'
      };
      fetch(url, options)
        .then(res => res.json())
        .then(res => {
          alert('Registro Eliminado');
          location.reload(); // recarga el json luego de eliminado el registro
        });
    },
  },
  created() {
    this.fetchData(this.url);
  }
}).mount('#app');
