<template>
  <div>
      <Entrada v-model="busqueda"/>
      <boton @click="buscar">Buscar</boton>
  </div>
</template>

<script>
import Entrada from "../atomos/Entrada";
import boton from "../atomos/boton";
import axios from "axios";
import {mapMutations} from "vuex"
export default {
    name:"barraBusqueda",
    components:{
        Entrada,
        boton
    },
    data(){
        return {
            busqueda:""
        }
    },
    methods:{
        ...mapMutations(["setResultadosMapa"]),
        buscar(){
            if(this.busqueda!=""){
            axios.get("http://localhost:3000/busqueda", {
                params: {
                    search: this.busqueda
                }
            } ).then(response => {
                this.$emit("emitir",response);
                this.setResultadosMapa(response.data)
            }).catch(error => console.log(error));
        }else{
            alert("¡NO SE DETECTO UBICACION!");
        }
        }
    }
}
</script>
<style>

</style>