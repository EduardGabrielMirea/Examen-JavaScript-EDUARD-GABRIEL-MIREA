
/*
 *Primero vamos a inicializar la variable universal coche, que se pueda cambiar dentro de los metodos. Pero asi no nos dara error a la hora de usarlo en los listenners. 
 */
let coche; 

class Coche{
    constructor(cadena){
        const division = cadena.split(':');
        this.matricula = division[0];
        this.marca = division[1];
        this.modelo = division[2];
        this.fechaFabricacion = division[3];
        this.kilometros = parseFloat(division[4]);

        if(this.kilometros < 0 || this.fechaFabricacion > new Date().getFullYear()){
            throw new Error("Error en la creación del objeto Coche. El año tiene que ser el año actual y los kilometros no pueden ser negativos.");
        }
    }

    mostrarAlta(){
        return `Nuevo Coche a valorar:
                Matrícula: ${this.matricula}
                Marca y Modelo: ${this.marca} (${this.modelo})
                Fecha de fabricación: ${this.fechaFabricacion}
                kilometraje: ${this.kilometros.toFixed(3)} km. `;
    }

    /*En caso de que el coche tenga menos de 4 años, exento. En caso de que tenga hasta 10 años la pasa cada 2 años y cuando tiene mas de 10 años la pasa cada año.
    */

    //Codigo Corregido.
    revisionITV(){
        const anioActual = new Date().getFullYear();
        const anioFabricacion = parseInt(this.fechaFabricacion);
        const diferenciaAnios = anioActual - anioFabricacion;

        if (diferenciaAnios <= 4) {
            // If the car is 4 years old or younger, the next ITV is in 4 years
            return anioActual + 4;
          } else if (diferenciaAnios <= 10) {
            // If the car is between 4 and 10 years old, the next ITV is in 2 years
            return anioActual + 2;
          } else {
            // If the car is older than 10 years, the next ITV is every year
            return anioActual + 1;
          }
    }

    mostrarITV(){
        return `Proxima ITV: ${this.revisionITV()}`;
    }

    /*
     *El cambio del aceite se tiene que hacer cada 150.000 km. Hay que comprobar cuando el coche llege a 150.000 desde el ultimo cambio. 
     */

     //Codigo Corregido.
    revisionAceite(){
        const kmlCambio = 15000;
        const cambio = this.kilometros - kmlCambio;
        
        if(this.kilometros < kmlCambio){
            return "No necesita revisión de aceite";
            }else if(this.kilometros % kmlCambio === 0){
                return "Revisión de aceite en 10000 km";
                }else{
                    return "Revisión de aceite en " + (kmlCambio - (this.kilometros % kmlCambio)) + " km";
    }
}

/*
Aqui compruebas cuantos cambios de aceite lleva el coche.
 */

    totalcambios(){
        const cambios = Math.floor(this.kilometros / 15000);
        return 'Se han realizado '+cambios+' cambios de aceite.';
    }

    mostrarTodosCambios(){
        return `${this.mostrarITV()} 
            ${this.revisionAceite()}
            ${this.totalcambios()}`;
    }
}


//const coche = new Coche('1596xyz:bmw:x1:2021:16552');


document.getElementById('alta').addEventListener('click',()=>{
    const cadena = prompt('Introduce la documentación del coche: ');
    try{
        const coche = new Coche(cadena);
        document.getElementById('resultado-alta').innerHTML = coche.mostrarAlta();
    }catch(Error){
        alert('Error al crear el coche');
    }
});


document.getElementById('revisiones').addEventListener('click',()=>{
    if(!coche){
        setTimeout(() => {
            const ventana = window.open('','_blank',' width=300,height=100');
            ventana.document.write(`<span style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">No hay coche seleccionado. <br> Porfavor primeroe da de alta un vehículo.<span>`);
            function cerrarVentana(){
                ventana.close();
            }
            setTimeout(cerrarVentana, 10000);
        }, 10);
    }else{
        document.getElementById('resultado-revision').innerHTML = coche.mostrarTodosCambios();
    }
   
});



const nombreMecanico = prompt('Introduce el nombre del mecanico: ');

document.getElementById('mecanico').innerHTML = `<p>Mecánico: ${nombreMecanico} <p>`;

//console.log(coche.revisionITV());

//const coche = new Coche('1596xyz:bmw:x1:2021:16552');
//console.log(coche1.mostrarAlta());

