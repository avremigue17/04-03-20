<template>
  <div class="cardFlotante" :datosPersonales="datosPersonales" :calificacionesTodo="calificacionesTodo" :loged="loged" :style="styles" :lista="lista" :datosCalificaicones="datosCalificaicones">
    <slot/>
    <div class="contenido" v-if="lista!=''">
        <ul>
            <li v-for="(nombre,indice) in lista" :key="nombre+indice">
                <div class="contenedor">
                    <img src="https://lafarmaciahomeopatica.com/wp-content/uploads/2019/12/location-pin-flat.png">
                    <h3 v-on:click="devolver(indice)">{{lista[indice].name}}</h3>
                    <div id="calificacion">
                        <img v-if="datosCalificaicones[indice]" id="estrellaCalificacion" src="https://upload.wikimedia.org/wikipedia/commons/1/18/Estrella_amarilla.png" alt="">
                        <h1 id="numeroCalificacion">{{datosCalificaicones[indice]?datosCalificaicones[indice]:""}}</h1>
                    </div>
                    <!--<h3>{{calificacion(lista[indice].id,indice)}}</h3>-->
                    <div class="estrellitas">
                        <img @click="modificar(loged, 5, lista[indice].id, datosPersonales)" class='estrella' :src="estrellas">
                        <img @click="modificar(loged, 4, lista[indice].id, datosPersonales)" class='estrella' :src="estrellas">
                        <img @click="modificar(loged, 3, lista[indice].id, datosPersonales)" class='estrella' :src="estrellas">
                        <img @click="modificar(loged, 2, lista[indice].id, datosPersonales)" class='estrella' :src="estrellas">
                        <img @click="modificar(loged, 1, lista[indice].id, datosPersonales)" class='estrella' :src="estrellas">
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <div class="contenido" v-else>
        <div></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
    name: "contenido",
    props:[
        "styles",
        "lista",
        "datosCalificaicones",
        "datosPersonales",
        "loged",
        "calificacionesTodo"
    ],
    data(){
        return {
            estrellas:"https://icons-for-free.com/iconfiles/png/512/favorite+favourite+premium+rate+rating+star+icon-1320166547676710135.png",
            estrellotas:[1,2,3,4,5],
            existeLugar:false,
        }
    },
    methods:{
        devolver(indice){
            this.$emit("devolver",indice);
        },
        /*calificacion(id,indice)
        {
            var totalCal = 0;
            var calificacionAux = 0;
            var palanca = false;
            for(var k=0;k<this.datosCalificaicones.length;k++)
            {
                if(id == this.datosCalificaicones[k].placeId)
                {
                    totalCal++;
                    calificacionAux += this.datosCalificaicones[k].calificacion;
                    palanca = true;
                }
            }

           /* var calificacionFinal = 0;
            if(palanca)
                calificacionFinal = (((calificacionAux/totalCal)*100)/5);
            
            for(var i=0;i<this.datosCalificaicones.length;i++)
            {
                if(id == this.datosCalificaicones[i].placeId)
                {
                    var estrellitas = document.getElementsByClassName("estrellitas");
                    for(var j=0;j<estrellitas.length;j++)
                    {
                        estrellitas[indice].style.backgroundImage = "linear-gradient(to right,yellow "+calificacionFinal+"%,white 0%)";
                    }
                }
            }
        },*/
        modificar(loged, calificacion, placeId, userId){
            if(loged)
            {
                this.existeLugar = false;
                for(var k=0;k<this.calificacionesTodo.length;k++)
                {
                    if(userId.user.id == this.calificacionesTodo[k].userId)
                    {
                        if(this.calificacionesTodo[k].placeId==placeId)
                            this.existeLugar = true;
                    }
                }
                if(this.existeLugar){
                    axios.post("http://localhost:3000/Calificaciones/modificarCalificacion",{
                        calificacion:calificacion,
                        userId:userId.user.id,
                        placeId:placeId,
                    }).then(response => {
                        console.log(response.data.message);
                    }).catch(error => console.log(error));
                }
                else{
                    axios.post("http://localhost:3000/Calificaciones/crearCalificacion",{
                        calificacion:calificacion,
                        placeId:placeId,
                        userId:userId.user.id
                    }).then(response => {
                        console.log(response.data.message);
                    }).catch(error => console.log(error));
                }
                this.$emit("emitir","");
            }
            else{
                alert("Tienes que registrarte para calificar");
            }
        },
        crear(calificacion, placeId, userId){
            axios.post("http://localhost:3000/Calificaciones/crearCalificacion",{
                calificacion:calificacion,
                placeId:placeId,
                userId:userId
                }).then(response => {
                console.log(response.data.message);
                }).catch(error => console.log(error));
        },
    }
}
</script>

<style scoped>
    .estrella{ 
        width:20%; 
        height: 100%;
        float: right;
        margin: 0;
    }
    .estrella:hover{
        filter:drop-shadow(0 0 0.1rem red);
    }
    .estrellitas{
        margin-bottom: 5px;
        margin-left: 25%;
        width: 20%; 
        height: 15px;
        float: left;
        text-align: center;
    }
    .cardFlotante{
        width: 400px;
        float: left;
        position: fixed;
        padding-top: 0px;
        margin-left: 50px;
        border-radius: 3px;
        background-color: rgba(16, 241, 148, 0.7);
        text-align: center;
    }
    .contenedor{
        width: 100%;
        background-color: aliceblue;
        margin-top: 5px;
        border-radius: 5px;;
        float: left;
    }
    ul{
        list-style-type: none;
    }
    li{
        width: 370px;
        margin-left: -25px;
    }
    .contenido{
        overflow: hidden;
        text-align: center;
    }
    img{
        width: 50px;
        height: 45px;
        float: left;
        margin-left: 5px;
    }
    h3{
        width: 70%;
        float: left;
        margin-left: 5px;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 20px;
        margin-top: 10px;
        margin-bottom: 0px;
        color: rgb(207, 65, 40);
        padding-bottom: 6px;
    }
    p{
        width: 80%;
        float: left;
        margin: 0;
        margin-left: 51px;
        text-align: center;
        font-weight: bold;
    }
    #calificacion{
        margin-top: 20px;
        margin-right: 2px;
        width: 12%;
        height: 50px;
        float: right;
    }
    #estrellaCalificacion{
        width: 35%;
        height: 15px;
        float: right;
        margin-top: 4px;

    }
    #numeroCalificacion{
        font-size: 20px;
        float: right;
        width: 30%;
        margin: 0;
        border: none;
        margin-right: 7px;
    }
</style>