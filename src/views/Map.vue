<template>
    <div id="map-view">
        <div class="cabecera">
        <img src="https://place.network/wp-content/uploads/2019/08/PLACE-LOGO.png">
        <h2>.Search</h2>
        </div>
        <mapa id="mapita" :lugarId="lugarId" :longitud="longitud " :latitud="latitud" :descrip="descrip" :name="name" :imagen="imagen"/>
        
        <card  id="card" styles="top: 8px; left: 96.5%;width: 2.5%;">
            <!-- iniciar sesion -->
            <img id="botonVolver" @click="resize" src="https://cdn1.iconfinder.com/data/icons/pikku-ui/16/dots_vertical-512.png" style="width:40px; height:40px;">
            <login v-if="!loged && !palanca" id="login" @emitir="logeado"></login>
            
            <!-- usuario ya logeado -->
            <div v-if="(loged && !palanca) && (!crear && !modificar && !eliminar)" id="loged">
                <h1>Bienvenido:<br>{{datosPersonales.user.usuario}}</h1>
                <boton class="registro3" @click="opcion(1)"><img src="https://image.flaticon.com/icons/png/512/61/61183.png" class="icono"><h3>Crear lugar</h3></boton>
                <boton class="registro3" @click="opcion(2)"><img src="https://image.flaticon.com/icons/png/512/104/104668.png" class="icono"><h3>Modificar lugar</h3></boton>
                <boton class="registro3" @click="opcion(3)"><img src="https://image.flaticon.com/icons/png/512/25/25008.png" class="icono"><h3>Eliminar lugar</h3></boton>
                <boton class="registro3" @click="salir">Salir</boton>
            </div>

            <div v-if="crear && !palanca" id="crear">
                <h1>Crear Lugar</h1>
                <Entrada placeholder="Nombre" type="text" id="nombre" class="registro" required></Entrada>
                <Entrada placeholder="Descripción" type="text" id="descripcion" class="registro" required></Entrada>
                <Entrada placeholder="Url imagen" type="text" id="url" class="registro" required></Entrada>
                <h4>Haz Click en el lugar del mapa</h4>
                <Entrada placeholder="Latitud" type="text" id="latitud" class="registro" disabled required></Entrada>
                <Entrada placeholder="Longitud" type="text" id="longitud" class="registro" disabled required></Entrada>
                <boton class="registro" @click="insertarLugar" style="width: 97%;">Crear</boton>
                <boton class="registro" @click="volver(1)" style="width: 97%;">Atras</boton>
            </div>

            <div v-if="modificar && !palanca"  id="modificar">
                <div v-if="!palanca" class="contenido" id="prueba">
                    <h1>Modificar Lugar</h1>
                    <div class="contenedor">
                    <boton class="registro" v-for="(nombre,indice) in datosLugares" :key="nombre+indice" v-on:click="modificarLugar(indice)" >{{datosLugares[indice].name}}</boton>
                    </div>
                    <boton class="registro" @click="volver(2)">Atras</boton>
                </div>
                <div class="contenido" id="prueba2" style="display:none">
                    <h1>Modificar Lugar</h1>
                    <Entrada placeholder="Nombre" type="text" id="nombre2" class="registro"></Entrada>
                    <Entrada placeholder="Descripcion" type="text" id="descripcion2" class="registro"></Entrada>
                    <Entrada placeholder="Url imagen" type="text" id="url2" class="registro"></Entrada> 
                    <h4>Haz Click en el lugar del mapa</h4>
                    <Entrada placeholder="Latitud" type="text" id="latitud2" class="registro" disabled></Entrada>
                    <Entrada placeholder="Longitud" type="text" id="longitud2" class="registro" disabled></Entrada>
                    <boton class="registro" @click="realizarCambios()">Guardar</boton>
                    <boton class="registro" @click="volver2(2)">Atras</boton>
                </div>
                
            </div>

            <div v-if="eliminar && !palanca"  id="eliminar">
                <div v-if="!palanca" class="contenido" id="prueba">
                    <h1>Eliminar Lugar</h1>
                    <div class="contenedor">
                        <boton class="registro" v-for="(nombre,indice) in datosLugares" :key="nombre+indice" v-on:click="eliminarLugar(indice)" >{{datosLugares[indice].name}}</boton>
                    </div>
                    <boton class="registro" @click="volver(3)">Atras</boton>
                </div> 
            </div>
        </card>

        <!-- barra de busqueda -->
        <card styles="top: 8px; left: 5px; width: 500px;">
            <contenido styles="top: 51px; left: 5px;" :loged="loged" :calificacionesTodo="calificacionesTodo" :datosPersonales="datosPersonales" :datosCalificaicones="calificacion" :lista="lista" @emitir="recibir" @devolver="ind"/>
            <barraBusqueda id="barraBusqueda" @emitir="recibir"/>
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
import swal from 'sweetalert';
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
            lugarId:"",
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
            datosLugares: [],
            lugarSeleccionado: false,
            holi:false,
            id:"",
            datosCalificaicones:[],
            palanca2:false,
            vacio:"",
            calificacion:[],
            calificacionesTodo:[],
        };
    },
    methods:{
        recibir(response){
            if(response!=""){
                this.lista=response.data.data;
                var cadena =  [];
                for(var i=0;i<this.lista.length;i++){
                    cadena.push(this.lista[i].id);
                }
                axios.post("http://localhost:3000/calificaciones/consultarCalificacion", {
                    placeId:cadena,
                } ).then(response => {
                    this.datosCalificaicones = response.data;
                    this.calificacion = [];
                    var lugar = [];
                    var cal = [];
                    var total = [];

                    for(var j=0;j<this.lista.length;j++)
                    {
                        for(var h=0;h<this.datosCalificaicones.length;h++)
                        {
                            if(this.lista[j].id==this.datosCalificaicones[h].placeId)
                            {
                                if(!lugar.includes(this.lista[j].id))
                                {
                                    lugar.push(this.lista[j].id);
                                    cal.push(this.datosCalificaicones[h].calificacion);
                                    total.push(1);
                                }
                                else
                                {
                                    for(var k=0;k<lugar.length;k++)
                                    {
                                        if(lugar[k] == this.lista[j].id) 
                                        {
                                            var calAux = cal[k];
                                            var totalAux = total[k];
                                            total[k] = totalAux+1;
                                            cal[k] = calAux+this.datosCalificaicones[h].calificacion;
                                        }
                                    }
                                }
                            }
                            
                        }
                    }
                    for(var i=0;i<this.lista.length;i++)
                    {
                        if(lugar.includes(this.lista[i].id))
                        {
                            this.calificacion.push((cal[i]/total[i]%1!=0)?(cal[i]/total[i]).toFixed(1):cal[i]/total[i]);
                        }
                        else
                        {
                            this.calificacion.push(0);
                        }
                    }
                }).catch(error => console.log(error));

                axios.post("http://localhost:3000/calificaciones/consultarCalificacionTodo", {
                } ).then(response => {
                    this.calificacionesTodo = response.data;
                }).catch(error => console.log(error));
            }
            else{
                this.lista="";
                document.getElementById("entrada").value="";
                
            }
        },
        ind(indice){
            this.lugarId=this.lista[indice].id;
            this.longitud=this.lista[indice].lon;
            this.latitud=this.lista[indice].lat;
            this.descrip=this.lista[indice].description;
            this.name=this.lista[indice].name;
            this.imagen=this.lista[indice].image;
        },
        //inciar sesion
        resize(){
            if(!this.palanca){
                document.getElementById("card").style.width="2.5%";
                document.getElementById("card").style.height="5%";
                document.getElementById("card").style.left="96.5%";
                document.getElementById("botonVolver").src="https://cdn1.iconfinder.com/data/icons/pikku-ui/16/dots_vertical-512.png";
                document.getElementById("card").style.backgroundColor="rgba(16, 241, 148, 0)";
            }else{
                document.getElementById("card").style.width="20%";
                document.getElementById("card").style.height="85%";
                document.getElementById("card").style.left="79%";
                document.getElementById("botonVolver").src="https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-right-01-512.png";
                document.getElementById("card").style.backgroundColor="rgba(16, 241, 148, .7)";
                
            }
            this.palanca = !this.palanca;
        },
        //logeado
        logeado(response){
            if(response.message){   
                this.loged=response.message;
                this.datosPersonales=response.data;
            }else{
                swal("Usuario o Contraseña Incorrecta");
            }
            
        },
        salir(){
            this.loged=false;
            this.resize();

        },
        opcion(op){
            switch(op)
            {
                case 1: 
                    this.crear = true; 
                break;
                case 2: this.modificar = true;  this.consultarLugar(); break;
                case 3: this.eliminar = true;this.consultarLugar(); break;
            }
        },
        volver(op){
            switch(op)
            {
                case 1: 
                    this.crear = false;
                break;
                case 2: this.modificar = false; break;
                case 3: this.eliminar = false; break;
            }
        },
        volver2(op){
            switch(op)
            {
                case 1: this.crear = false; break;
                case 2: 
                    this.modificar = true; 
                    document.getElementById("prueba").style.display="inline";
                    document.getElementById("prueba2").style.display="none";
                break;
                case 3: this.eliminar = false; break;
            }
        },
        //crear lugar
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
                    swal("Lugar creado!", this.name2, "success");
                }).catch(error => console.log(error));
                this.volver(1);
            }
            else{
                swal("Favor de llenar todos los campos");

            }
        },
        //consultar lugar
        consultarLugar(){
            axios.post("http://localhost:3000/lugares/consultarLugares",{
                    userId:this.datosPersonales.user.id,
                }).then(response => {
                    this.datosLugares=response.data;
                }).catch(error => console.log(error));

        }, 
        modificarLugar(id){
            this.id=this.datosLugares[id].id;
            this.lugarSeleccionado=true;
            document.getElementById("prueba").style.display="none";
            document.getElementById("prueba2").style.display="inline";
            document.getElementById("nombre2").value=this.datosLugares[id].name;
            document.getElementById("latitud2").value=this.datosLugares[id].lat;
            document.getElementById("longitud2").value=this.datosLugares[id].lon;
            document.getElementById("descripcion2").value=this.datosLugares[id].description;
            document.getElementById("url2").value=this.datosLugares[id].image;
        },
        realizarCambios(){
            this.name2=document.getElementById("nombre2").value;
            this.latitud2=document.getElementById("latitud2").value;
            this.longitud2=document.getElementById("longitud2").value;
            this.descrip2=document.getElementById("descripcion2").value;
            this.imagen2=document.getElementById("url2").value;

            if(this.name2!="" && this.latitud2!="" && this.longitud2!="" && this.descrip2!="" && this.imagen2!=""){
                swal({
                    title: "¿Desea Modificar?",
                    text: this.name2+" - Los cambios realizados seran de forma permanente",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        axios.post("http://localhost:3000/lugares/modificarLugar",{
                    name:this.name2,
                    image:this.imagen2, 
                    lat:this.latitud2, 
                    lon:this.longitud2, 
                    description:this.descrip2,
                    id:this.id,
                }).then(response => {
                    console.log(response.data.message);
                    swal("Modificado!", {icon: "success",});
                }).catch(error => console.log(error));
                this.volver2(2);
                this.volver(2);
                    } else {
                        swal("Cancelado!");
                    }
                });    
            }
            else{
                swal("Favor de llenar todos los campos");
            }
        },
        eliminarLugar(id){
            if(id!==""){
                swal({
                    title: "¿Desea Eliminar?",
                    text: this.datosLugares[id].name+" - Sera eliminado de forma permanente",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        axios.post("http://localhost:3000/lugares/eliminarLugar",{
                            id:this.datosLugares[id].id,
                        }).then(response => {
                        console.log(response.data.message);
                        swal("Cancelado!", {
                        icon: "success",
                        });
                        }).catch(error => console.log(error));
                    } else {
                        swal("Cancelado!");
                    }
                });
            }
            this.volver2(3);
            this.volver(3);
        },
    }
}
</script>

<style scoped>
    #map-view{
        height: 90vh;
        width: 99vw;
    }
    h1{
        float: left;
        color: darkblue;
        font-weight: bold;
        font-size: 45px;
        margin-top: 8px;
    }
    h2{
        float: left;
        color: darkblue;
        font-weight: bold;
        font-size: 45px;
        margin-top: 8px;
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
    .registro3{
        width: 95%;
        height: 50px;
        margin-top: 2%;
        margin-left: 3.5%;
        background-color: floralwhite;
        border-radius: 5px; 
        border: none;
    }
    .registro3:hover{
        filter:drop-shadow(0 0 0.15rem black);
    }
    .contenedor{
        overflow: auto;
        float: left;
        width: 100%;
        height: 320px;
        text-align: center;
    }
    .cabecera{
        width: 100%;
        height: 50px;
        background-color: rgba(16, 241, 148, .7);
        float: left;
        text-align: center;
    }
    img{
        width: 15%;
        height: 100%;
        text-align: center;
        float: left;
        margin-left: 40%;
    }
    #botonVolver{
        float: right;
    }
    h4{
        background-color: floralwhite;
        border-radius: 5px;
        margin-bottom: 0 ;
        width: 97%;
        margin-left: 2.5%;
    }
    .icono{
        width: 30px;
        height: 30px;
        float: left;
        margin-left: 5px;
        margin-right: 0;
        margin-top: 4%;
    }
    h3{
        float: left;
        font-size: 18px;
        margin-left: 20%;
        margin-top: 6%;
    }
</style>