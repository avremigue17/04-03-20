<template>
  <input ref="input" :type="type" @input="input" :value="value" :placeholder="placeholder" required>
</template>

<script>
export default {
    name:"Entrada",
    props:[
        "type",
        "value",
        "placeholder"
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
        width: 400PX;
        height: 31PX;
        border-radius: 4px;
        border:solid 1.5px steelblue;
        text-align: center;
        font-size: 17px;
        margin: 0;
    }
    .inputLogin{
        width: 90%;
        height: 31PX;
        border-radius: 4px;
        border:solid 1.5px steelblue;
        text-align: center;
        font-size: 17px;
        margin: 0;
        margin-bottom: 5px;
    }
</style>