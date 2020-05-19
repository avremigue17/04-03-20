<template>
  <div>
    <img ref="imagen" :link="link" :src="link">
  </div>
</template>

<script>
  export default {
      name : "imagen",
      props: ["link"],
  };
</script>

<style scoped>
  img{
    float: left;
    width: 70%;
    background-color:cyan;
    border: solid white;
    border-width: 10px;
    border-top-right-radius: 15%;
    border-bottom-left-radius: 15%;
  }
  div
  {
    width: 100%;
    float: left;
    padding-left: 12%;
    margin-bottom: 3%;
  }
</style>