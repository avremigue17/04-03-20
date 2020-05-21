<template>
  <div id="map-view">
    <mapa id="mapita" :longitud="longitud " :latitud="latitud" :descrip="descrip" :name="name" :imagen="imagen"/>
    
    <card  id="card" styles="top: 5px; left: 94%;width: 5%;">
        <!-- iniciar sesion -->
        <boton @click="resize"><img src="https://img.icons8.com/cute-clipart/2x/login-rounded-right.png" style="width:50%; height:100%;"></boton>
        <login v-if="!loged && !palanca" id="login" @emitir="logeado"></login>
        
        <!-- usuario ya logeado -->
        <div v-if="(loged && !palanca) && (!crear && !modificar && !eliminar)" id="loged">
            <h1>{{datosPersonales.user.nombre}}</h1>
            <boton class="opciones" @click="opcion(1)">Crear</boton>
            <boton class="opciones" @click="opcion(2)">Modifica</boton>
            <boton class="opciones" @click="opcion(3)">Eliminar</boton>
            <boton class="opciones" @click="salir">Salir</boton>
        </div>

        <div v-if="crear && !palanca" id="crear">
            <Entrada placeholder="Nombre" type="text" id="nombre" class="registro"></Entrada>
            <Entrada placeholder="Latitud" type="text" id="latitud" class="registro"></Entrada>
            <Entrada placeholder="Longitud" type="text" id="longitud" class="registro"></Entrada>
            <Entrada placeholder="Descripcion" type="text" id="descripcion" class="registro"></Entrada>
            <Entrada placeholder="Url imagen" type="text" id="url" class="registro"></Entrada>
            <boton class="opciones" @click="insertarLugar">Crear</boton>
            <boton class="opciones" @click="volver(1)">Atras</boton>
        </div>

        <div v-if="modificar && !palanca"  id="modificar">
            <boton class="opciones" @click="volver(2)">Atras</boton>
        </div>

        <div v-if="eliminar && !palanca"  id="eliminar">
            <boton class="opciones" @click="volver(3)">Atras</boton>
        </div>
    </card>


    <!--
    <card v-else id="card" styles="top: 5px; left: 94%;width: 5%;">
        
        
    </card>
    -->

    <!-- barra de busqueda -->
    <card styles="top: 5px; left: 5px; width: 500px;">
        <contenido styles="top: 51px; left: 5px;" :lista="lista" @devolver="ind"/>
        <barraBusqueda @emitir="recibir"/>
    </card>
  </div>
</template>

<script>
import axios from "axios";
import Entrada from "../components/atomos/Entrada";
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
        login,
        Entrada,
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
            pestaña:"",
            crear:false,
            modificar:false,
            eliminar:false,
            palanca:true,
            longitud2:"",
            latitud2:"",
            descrip2:"",
            name2:"",
            imagen2:"",
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
    resize(){
        if(!this.palanca){
            document.getElementById("card").style.width="5%";
            document.getElementById("card").style.height="5%";
            document.getElementById("card").style.left="94%";
        }else{
            document.getElementById("card").style.width="20%";
            document.getElementById("card").style.height="60%";
            document.getElementById("card").style.left="79%";
        }
        this.palanca = !this.palanca;
    },
    logeado(response){
        this.loged=response.message;
        this.datosPersonales=response.data;
    },
    salir(){
        this.loged=false;
        this.resize();

    },
    opcion(op){
        switch(op)
        {
            case 1: this.crear = true; break;
            case 2: this.modificar = true; break;
            case 3: this.eliminar = true; break;
        }
    },
    volver(op){
        switch(op)
        {
            case 1: this.crear = false; break;
            case 2: this.modificar = false; break;
            case 3: this.eliminar = false; break;
        }
    },
    insertarLugar(){
            this.name2=document.getElementById("nombre").value;
            this.latitud2=document.getElementById("latitud").value;
            this.longitud2=document.getElementById("longitud").value;
            this.descrip2=document.getElementById("descripcion").value;
            this.imagen2=document.getElementById("url").value;

            if(this.name2!="" && this.latitud2!="" && this.longitud2!="" && this.descrip2!="" && this.imagen2!=""){
            axios.post("http://localhost:3000/lugares",{
                name:this.name2,
                image:this.imagen2, 
                lat:this.latitud2, 
                lon:this.longitud2, 
                description:this.descrip2,
                userId:this.datosPersonales.user.id,
            }).then(response => {
                console.log(response.data.message);
            }).catch(error => console.log(error));
            }
        },
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
    .registro{
    width: 95%;
    height: 25px;
    margin-top: 2%;
    margin-left: 2.5%;
}
</style>