<template>
  <div class="cardFlotante" :style="styles || '' ">
      <slot/>
  </div>
</template>

<script>
export default {
    name: "card",
    props:[
        "styles"
    ]
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
</style>