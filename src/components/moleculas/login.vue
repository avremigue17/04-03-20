<template>
  <div class="login">
      <!-- login -->
      <h1 v-if="!registro">Iniciar Sesion</h1>
      <imagen v-if="!registro" link="https://image.flaticon.com/icons/png/512/166/166258.png"/>
      <Entrada v-if="!registro" placeholder="Correo" type="text" id="user" class="registro" style="float:left"></Entrada>
      <Entrada v-if="!registro" placeholder="Contraseña" type="password" id="pass" class="registro" style="float:left"></Entrada>
      <boton v-if="!registro" class="registro" @click="buscar" style="width: 96%;">Iniciar</boton>
      <boton v-if="!registro" class="registro2" @click="registrar">Registrarse</boton>
      <!-- registro -->
      <h1 v-if="registro">Registro</h1>
      <Entrada v-if="registro" placeholder="Nombre"  type="text" id="nombre" class="registro" style="float:left"></Entrada>
      <Entrada v-if="registro" placeholder="Apellido Paterno" type="text" id="apP" class="registro" style="float:left"></Entrada>
      <Entrada v-if="registro" placeholder="Apellido Materno" type="text" id="apM" class="registro" style="float:left"></Entrada>
      <Entrada v-if="registro" placeholder="Correo" type="text" id="correo" class="registro" style="float:left"></Entrada>
      <Entrada v-if="registro" placeholder="Usuario" type="text" id="usiario" class="registro" style="float:left"></Entrada>
      <Entrada v-if="registro" placeholder="Contraseña" type="password" id="pass" class="registro" style="float:left"></Entrada>
      <Entrada v-if="registro" placeholder="Fecha de Nacimiento" type="date" id="fecha" class="registro" style="float:left"></Entrada>
      <boton v-if="registro" class="registro"  @click="atras">Atras</boton>
      <boton v-if="registro" class="registro" @click="insertar">Registrarse</boton>

  </div>
</template>

<script>
import axios from "axios";
import boton from "../atomos/boton";
import Entrada from "../atomos/Entrada";
import imagen from "../atomos/imagen";
import swal from 'sweetalert';
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
                swal("Introducir usuario y contraseña");
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
                if(response.data.message==false){
                    swal("El correo ya ha sido utilizado");
                }else{
                    swal("Usuario creado correctamente");
                }
                console.log(response.data.message);
                this.registro = false;
            }).catch(error => console.log(error));
            }else{
                swal("Favor de llenar todos los datos");
            }
        },
        atras(){
            this.registro = false;
        },
    }
}
</script>

<style>
.login{
    width: 100%;
    height: 100px;
    float: left;
}
.registro{
    width: 95%;
    height: 30px;
    margin-top: 2%;
    margin-left: 2.5%;
    background-color: floralwhite;
    border-radius: 5px;
    border: none; 
}
.registro:hover{
        filter:drop-shadow(0 0 0.15rem black);
    }
.registro2{
    width: 95%;
    height: 25px;
    margin-top: 2%;
    margin-left: 2.5%;
    background-color: rgba(16, 241, 148, 0);
    border: none;
    border-radius: 5px;  
     text-decoration: underline;
}
h1{
    width: 100%;
        float: left;
        color: darkblue;
        font-weight: bold;
        font-size: 45px;
        margin-top: 8px;
        text-align: center;
        background-color:  white;
        border-bottom: solid 3px black;;  
        border-top: solid 3px black;  
    }
</style>