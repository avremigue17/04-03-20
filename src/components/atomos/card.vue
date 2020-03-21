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

<style>
    .cardFlotante{
        margin-left: 2%;
        margin-top: 1%;
        float: left;
        position: fixed;
        padding: 5px;
        border-radius: 3px;
        background:white;
        background-color: rgba(255, 255, 255, 0.7);
    }
</style>