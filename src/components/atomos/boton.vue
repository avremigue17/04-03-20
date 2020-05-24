<template>
  <button @click="$emit('click')"><slot/></button>
</template>

<script>
export default {
    name:"boton"
}
</script>

<style>
  button{
      height: 34px;
      border-radius: 4px;

      font-weight: bold;
      background-color: rgba(16, 241, 148, 0);
      font-size: 17px;
      float: left;
  }
  .opciones{
    width: 95%;
    margin-bottom: 5px;
    margin-left: 8px;
  }
</style>