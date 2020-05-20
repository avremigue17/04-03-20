<template>
  <div class="login">
      <!-- login -->
      <h1 v-if="!registro">Iniciar Sesion</h1>
      <imagen v-if="!registro" link="https://www.ebat.edu.mx/theme/images/avatar/avatar-18.png"/>
      <Entrada v-if="!registro" placeholder="Correo" type="text" id="user" class="inputLogin" style="float:left"></Entrada>
      <Entrada v-if="!registro" placeholder="Contraseña" type="password" id="pass" class="inputLogin" style="float:left"></Entrada>
      <boton v-if="!registro"  @click="buscar">Aceptar</boton>
      <boton v-if="!registro"  @click="registrar">Registrarse</boton>
      <!-- registro -->
      <h1 v-if="registro">Registro</h1>
      <Entrada v-if="registro" placeholder="Nombre"  type="text" id="nombre" class="registro" style="float:left"></Entrada>
      <Entrada v-if="registro" placeholder="Apellido Paterno" type="text" id="apP" class="registro" style="float:left"></Entrada>
      <Entrada v-if="registro" placeholder="Apellido Materno" type="text" id="apM" class="registro" style="float:left"></Entrada>
      <Entrada v-if="registro" placeholder="Correo" type="text" id="correo" class="registro" style="float:left"></Entrada>
      <Entrada v-if="registro" placeholder="Usuario" type="text" id="usiario" class="registro" style="float:left"></Entrada>
      <Entrada v-if="registro" placeholder="Contraseña" type="password" id="pass" class="registro" style="float:left"></Entrada>
      <Entrada v-if="registro" placeholder="Fecha de Nacimiento" type="text" id="fecha" class="registro" style="float:left"></Entrada>
      <boton v-if="registro"  @click="atras">Atras</boton>
      <boton v-if="registro"  @click="insertar">Registrarse</boton>

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
            registro:false,
            nombre:"",
            apP:"",
            apM:"",
            correo:"",
            usiario:"",
            passCreate:"",
            fecha:"",
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
        },
        registrar(){
            this.registro = true;
        },
        insertar(){
            this.nombre=document.getElementById("nombre").value;
            this.apP=document.getElementById("apP").value;
            this.apM=document.getElementById("apM").value;
            this.correo=document.getElementById("correo").value;
            this.usiario=document.getElementById("usiario").value;
            this.passCreate=document.getElementById("pass").value;
            this.fecha=document.getElementById("fecha").value;

            if(this.nombre!="" && this.apP!="" && this.apM!="" && this.correo!="" && 
               this.usiario!="" && this.passCreate!="" && this.fecha!=""){
            axios.post("http://localhost:3000/usuarios/crearUsuario", {
                nombre:this.nombre, 
                ap_paterno:this.apP, 
                ap_materno:this.apM, 
                correo:this.correo, 
                usuario:this.usiario,
                contraseña:this.passCreate,
                fecha_nacimiento:this.fecha,
            } ).then(response => {
                console.log(response.data.message);
                this.registro = false;
            }).catch(error => console.log(error));
            }else{
                console.log("asd");
            }
        },
        atras(){
            this.registro = false;
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
.registro{
    width: 95%;
    height: 25px;
    margin-top: 2%;
    margin-left: 2.5%;
}
</style>