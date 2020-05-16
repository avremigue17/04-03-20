<template>
  <div id="map-view">
     <mapa id="mapita" :longitud="longitud " :latitud="latitud" :descrip="descrip" :name="name" :imagen="imagen"/>
     <card styles="top: 5px; left: 5px;">
    <contenido styles="top: 51px; left: 5px;" :lista="lista" @devolver="ind"/>
    <barraBusqueda @emitir="recibir"/>
     </card>
  </div>
</template>

<script>
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
        contenido
    },
    data(){
        return{
            longitud:"",
            latitud:"",
            descrip:"",
            name:"",
            imagen:"",
            lista:""
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
    }
}
}
</script>

<style scoped>
    #map-view{
        height: 100vh;
        width: 100vw;
    }
</style>