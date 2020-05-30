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
    margin-left: 4%;
    float: left;
    width: 70%;
    background-color:white;
    border-radius: 25px;
  }
  div
  {
    width: 100%;
    float: left;
    padding-left: 12%;
    margin-bottom: 3%;
  }
</style>