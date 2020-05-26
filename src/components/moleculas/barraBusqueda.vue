<template>
  <div>
      <Entrada id="entrada" v-model="busqueda" @input="buscar" placeholder="La Paz B.C.S - Buscar"/>
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
            busqueda:"",
            palanca:"",
            value:""
        }
    },
    methods:{
        ...mapMutations(["setResultadosMapa"]),
        buscar(){
            if(this.busqueda!=""){
            axios.get("http://localhost:3000/lugares", {
                params: {
                    search: this.busqueda
                }
            } ).then(response => {
                this.$emit("emitir",response);
                this.setResultadosMapa(response)
            }).catch(error => console.log(error));
            }else{
                this.$emit("emitir",this.busqueda);
            }
        },
        limpiar()
        {
            console.log("asd1");
            if(this.palanca)
            {
                console.log("asd2");
                this.busqueda = "";
            }
        }
    }
}
</script>
<style>

</style>