<template>
  <div>
      <Entrada v-model="busqueda" @input="buscar" placeholder="La Paz B.C.S - Buscar"/>
  </div>
</template>

<script>
import Entrada from "../atomos/Entrada";
import axios from "axios";
import {mapMutations} from "vuex"
export default {
    name:"barraBusqueda",
    components:{
        Entrada,
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
            this.$emit("emitir",this.busqueda);
        }
        }
    }
}
</script>
<style>

</style>