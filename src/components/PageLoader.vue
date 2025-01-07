<template>
  <div class="small-loader">
    <div class="square"></div>
    <div class="circle-box">
      <div class="circle"></div>
    </div>
    <span class="text">Loading...</span>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
</script>

<style scoped lang="scss">
.small-loader {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%; /* ou toute largeur adaptée */
  height: calc(100vh - 80px); /* ou toute hauteur adaptée */
  top: 0;
  left: 0;

  .square {
    width: 15px;
    height: 30px;
    background-color: var(--secondary-color); // couleur du carré
    border-bottom-left-radius: 10px;
    position: relative;

    &:before {
      content: "";
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      // background-color: var(--main-color);
    }
  }
  .circle-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    position: relative;
    z-index: 1;
    overflow-x: hidden;
  }
  .circle {
    position: absolute;
    width: 27px;
    height: 30px;
    background-color: var(--secondary-color); // couleur du cercle
    border-radius: 50%;
    margin-left: 3px; // espace entre les deux formes
    transition: transform 0.5s ease;
    z-index: -2;
    animation: slide-logo 1.5s ease-in-out infinite; /* Durée totale : animation (1.2s) + attente (2s) */
  }

  .text {
    font-size: 14px;
    color: var(--secondary-color);
    position: absolute;
    transform: translateY(40px);
  }

  .loading-text {
    font-size: 14px;
    font-family: Arial, sans-serif;
    color: var(--secondary-color); // Remplacez "blue" par la couleur par défaut
    margin-left: 10px;
  }

  @keyframes slide-logo {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(-50px);
    }
    100% {
      transform: translateX(0);
    }
  }
}
</style>
