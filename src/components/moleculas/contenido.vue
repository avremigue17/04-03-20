<template>
  <div class="cardFlotante" :style="styles" :lista="lista">
    <slot/>
    <div class="contenido" v-if="lista!=''">
        <ul>
            <li v-for="(nombre,indice) in lista" :key="nombre+indice">
                <div class="contenedor" v-on:click="devolver(indice)">
                    <img src="https://lafarmaciahomeopatica.com/wp-content/uploads/2019/12/location-pin-flat.png">
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
        width: 400px;
        float: left;
        position: fixed;
        padding-top: 0px;
        margin-left: 50px;
        border-radius: 3px;
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
        width: 370px;
        margin-left: -25px;
    }
    .contenido{
        overflow: hidden;
        text-align: center;
    }
    img{
        width: 50px;
        height: 45px;
        float: left;
        margin-left: 5px;
    }
    h3{
        width: 70%;
        float: left;
        margin-left: 5px;
        text-align: center;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 20px;
        margin-top: 10px;
        margin-bottom: 0px;
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