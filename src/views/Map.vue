<template>
  <div id="map-view">
     <mapa id="mapita" :longitud="longitud " :latitud="latitud" :descrip="descrip" :name="name" :imagen="imagen"/>
     <card styles="top: 10px; left: 10px;">
    <barraBusqueda @emitir="recibir"/>
     </card>
  </div>
</template>

<script>
import mapa from "../components/moleculas/mapa";
import card from "../components/atomos/card";
import barraBusqueda from "../components/moleculas/barraBusqueda";
export default {
    name:"Mapa",
    components: {
        mapa,
        card,
        barraBusqueda
    },
    data(){
        return{
            longitud:[],
            latitud:[],
            descrip:[],
            name:[],
            imagen:[]
        };
    },
methods:{
    recibir(response){

        this.longitud=[];
        this.latitud=[];
        this.descrip=[];   
        this.name=[];
        this.imagen=[];
        if(response.data.data["0"]!=null){
            for (const i in response.data.data) {
            //console.log(response.data.data[i].alt)
            this.longitud.push(response.data.data[i].alt);
            this.latitud.push(response.data.data[i].lat);
            this.descrip.push(response.data.data[i].descripcion);
            this.name.push(response.data.data[i].name);
            this.imagen.push(response.data.data[i].imagen);
            }
        }else{
            alert("¡NO SE DETECTO UBICACION!");
        }
      /*  console.log(response.data.data.length)
        this.longitud=response.data.data["0"].alt;
        this.latitud=response.data.data["0"].lat;
        this.descrip=response.data.data["0"].descripcion;*/
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