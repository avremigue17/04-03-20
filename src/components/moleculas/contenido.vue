<template>
  <div class="cardFlotante" :style="styles" :lista="lista">
    <slot/>
    <div class="contenido" v-if="lista!=''">
        <ul>
            <li v-for="(nombre,indice) in lista" :key="nombre+indice">
                <div class="contenedor" v-on:click="devolver(indice)">
                    <img src="https://sosracismo.eu/wp-content/uploads/2016/06/direccion.png">
                    <h3>{{lista[indice].name}}</h3>
                    <p>{{lista[indice].direccion}}</p>
                </div>
            </li>
        </ul>
    </div>
    <div class="contenido" v-else>
        <div></div>
    </div>
  </div>
</template>

<script>
export default {
    name: "contenido",
    props:[
        "styles",
        "lista"
    ],
    methods:{
        devolver(indice){
            this.$emit("devolver",indice);
        }
    }
}
</script>

<style scoped>
    .cardFlotante{
        width: 500px;
        float: left;
        position: fixed;
        padding: 5px;
        border-radius: 3px;
        background:white;
        background-color: rgba(16, 241, 148, 0.7);
        text-align: center;
    }
    .contenedor{
        width: 100%;
        background-color: aliceblue;
        margin-top: 5px;
        border-radius: 5px;;
        float: left;
    }
    ul{
        list-style-type: none;
    }
    li{
        width: 470px;
        margin-left: -25px;
    }
    .contenido{
        overflow: hidden;
        text-align: center;
    }
    img{
        width: 50px;
        height: 50px;
        float: left;
        margin-top: 5px;
        margin-left: 5px;
    }
    h3{
        width: 80%;
        float: left;
        margin-left: 5px;
        text-align: center;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 20px;
        margin-bottom: 0;
        color: rgb(207, 65, 40);
    }
    p{
        width: 80%;
        float: left;
        margin: 0;
        margin-left: 51px;
        text-align: center;
        font-weight: bold;

    }
</style>