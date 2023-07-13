console.log(location.search)     /// lee los argumentos pasados a este formulario
var id=location.search.substr(4)  // persona_update.html?id=1
console.log(id)
const { createApp } = Vue
  createApp({
    data() {
      return {
        id:id,
        nombre:"", 
        apellido:"",
        dni:"",
        tel:"",
        pax:"",
        hotel:"",
        url:'https://natimartinez.pythonanywhere.com/personas/all/'+id,
       }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.id=data.id
                    this.nombre = data.nombre;
                    this.apellido=data.apellido
                    this.dni=data.dni
                    this.precio=data.precio 
                    this.tel=data.tel 
                    this.pax=data.pax
                    this.hotel=data.hotel                    
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        modificar() {
            let persona = {
                nombre:this.nombre,
                apellido: this.apellido,
                dni: this.dni,
                tel: this.tel,
                pax: this.pax,
                hotel: this.hotel
            }
            var options = {
                body: JSON.stringify(persona),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Se ha guardado correctamente")
                    window.location.href = "./index.html"; // navega a productos.html          
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')
