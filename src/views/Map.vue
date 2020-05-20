<template>
  <div id="map-view">
    <mapa id="mapita" :longitud="longitud " :latitud="latitud" :descrip="descrip" :name="name" :imagen="imagen"/>
    
    <!-- iniciar sesion -->
    <card v-if="!loged" id="card" styles="top: 5px; left: 94%;width: 5%;">
        <boton @click="buscar"><img src="https://img.icons8.com/cute-clipart/2x/login-rounded-right.png" style="width:50%; height:100%;"></boton>
        <login id="login" @emitir="logeado"></login>
    </card>


    <!-- usuario ya logeado -->
    <card v-else id="card" styles="top: 5px; left: 94%;width: 5%;">
         <boton @click="buscar2"><img src="https://img.icons8.com/cute-clipart/2x/login-rounded-right.png" style="width:50%; height:100%;"></boton>
        <div id="loged">
            <h1>{{datosPersonales.user.nombre}}</h1>
            <boton class="opciones">Crear</boton>
            <boton class="opciones">Modifica</boton>
            <boton class="opciones">Eliminar</boton>
            <boton class="opciones" @click="salir">Salir</boton>
        </div>
        
    </card>

    <!-- barra de busqueda -->
    <card styles="top: 5px; left: 5px; width: 500px;">
        <contenido styles="top: 51px; left: 5px;" :lista="lista" @devolver="ind"/>
        <barraBusqueda @emitir="recibir"/>
    </card>
  </div>
</template>

<script>
import login from "../components/moleculas/login";
import boton from "../components/atomos/boton";
import mapa from "../components/moleculas/mapa";
import card from "../components/atomos/card";
import barraBusqueda from "../components/moleculas/barraBusqueda";
import contenido from "../components/moleculas/contenido";
export default {
    name:"Mapa",
    components: {
        mapa,
        card,
        barraBusqueda,
        contenido,
        boton,
        login
    },
    data(){
        return{
            longitud:"",
            latitud:"",
            descrip:"",
            name:"",
            imagen:"",
            lista:"",
            loged: false,
            datosPersonales:"",
        };
    },
methods:{
    recibir(response){
        if(response!=""){
            this.lista=response.data.data;
        }else{
            this.lista="";
        }
    },
    ind(indice){
            this.longitud=this.lista[indice].lon;
            this.latitud=this.lista[indice].lat;
            this.descrip=this.lista[indice].description;
            this.name=this.lista[indice].name;
            this.imagen=this.lista[indice].image;
    },
    //inciar sesion
    buscar(){
        if(document.getElementById("login").style.display=="inline"){
            document.getElementById("login").style.display="none";
            document.getElementById("card").style.width="5%";
            document.getElementById("card").style.height="5%";
            document.getElementById("card").style.left="94%";
        }else{
            document.getElementById("login").style.display="inline";
            document.getElementById("card").style.width="20%";
            document.getElementById("card").style.height="60%";
            document.getElementById("card").style.left="79%";
        }
    },
    //ya adentro
    buscar2(){
         if(document.getElementById("loged").style.display=="inline"){
            document.getElementById("loged").style.display="none";
            document.getElementById("card").style.width="5%";
            document.getElementById("card").style.height="5%";
            document.getElementById("card").style.left="94%";
        }else{
            document.getElementById("loged").style.display="inline";
            document.getElementById("card").style.width="20%";
            document.getElementById("card").style.height="60%";
            document.getElementById("card").style.left="79%";
        }
    }
    ,
    logeado(response){
        this.loged=response.message;
        this.datosPersonales=response.data;
    },
    salir(){
        this.loged=false;
        document.getElementById("loged").style.display="none";
        document.getElementById("card").style.width="5%";
        document.getElementById("card").style.height="5%";
        document.getElementById("card").style.left="94%";

    }
}
}
</script>

<style scoped>
    #map-view{
        height: 100vh;
        width: 100vw;
    }
    h1{
        float: left;
    }
</style>