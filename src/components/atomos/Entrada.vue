<template>
  <input ref="input" type="text" @input="input" :value="value">
</template>

<script>
export default {
    name:"Entrada",
    props:[
        "type",
        "value"
    ],
    methods:{
        input(){
            this.$emit("input", this.$refs.input.value)
        }
    }
}
</script>

<style>
    input{
        width: 200PX;
        height: 31PX;
        border-radius: 4px;
        border:solid 1.5px steelblue;
        text-align: center;
        font-size: 17px;
        margin: 0;
    }
</style>