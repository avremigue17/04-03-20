<template>
  <div class="login">
      <h1>Iniciar Sesion</h1>
      <imagen link="https://www.ebat.edu.mx/theme/images/avatar/avatar-18.png"/>
      <Entrada id="user" class="inputLogin" style="float:left"></Entrada>
      <Entrada id="pass" class="inputLogin" style="float:left"></Entrada>
      <boton @click="buscar">Aceptar</boton>
      <boton>Registrarse</boton>
  </div>
</template>

<script>
import axios from "axios";
import boton from "../atomos/boton";
import Entrada from "../atomos/Entrada";
import imagen from "../atomos/imagen";
export default {
    name:"login",
    components: {
        Entrada,
        imagen,
        boton,
    },
    data(){
        return {
            usuario:"",
            pass:"",
        }
    },
    methods:{
        buscar(){
            this.usuario=document.getElementById("user").value;
            this.pass=document.getElementById("pass").value;
            if(this.usuario!=""){
            axios.post("http://localhost:3000/usuarios/login", {
                correo: this.usuario,
                contraseña: this.pass
            } ).then(response => {
                this.$emit("emitir",response.data);
            }).catch(error => console.log(error));
        }else{
            this.$emit("emitir",this.busqueda);
        }
        }
    }
}
</script>

<style>
.login{
    width: 100%;
    height: 100px;
    float: left;
    display: none;
}
</style>