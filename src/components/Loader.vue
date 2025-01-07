<template>
  <div class="loader-wrapper">
    <div class="logo">
      <div class="square">
        <span>{{ percentLoaded }}%</span>
      </div>
      <div class="circle"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const percentLoaded = ref(0);

onMounted(() => {
  setTimeout(() => {
    const interval = setInterval(() => {
      percentLoaded.value += 1;
      if (percentLoaded.value === 100) {
        clearInterval(interval);
      }
    }, 18);
  }, 1100);
});
</script>

<style lang="scss" scoped>
.loader-wrapper {
  display: flex;
  justify-content: flex-end;
  overflow: hidden;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: var(--main-color);
  position: absolute;
  top: 0;
  left: 0;
  padding-right: calc(50vw - 22px);
  z-index: 1000;
  animation: disappear 2s 5s forwards;

  @keyframes disappear {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
}
.logo {
  display: flex;
  align-items: center;
  height: 30px;
  cursor: pointer;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    z-index: 1;
    top: 0;
    left: -30px;
    height: 100%;
    width: 30px;
    background-color: var(--main-color);
  }

  .square {
    width: 45vw;
    height: 30px;
    background-color: var(--secondary-color); // couleur du carré
    border-bottom-left-radius: 10px;
    animation: slide-square 1.8s forwards ease-out;
    animation-delay: 1.3s;
    color: var(--main-color);
    overflow: hidden;
    position: relative;

    span {
      position: absolute;
      top: 50%;
      left: 15px;
      transform: translateY(-50%);
      font-size: 1.7rem;
      font-weight: 700;
      white-space: nowrap;
    }

    @keyframes slide-square {
      0% {
        width: 45vw;
      }
      100% {
        width: 15px;
      }
    }
  }

  .circle {
    width: 27px;
    height: 30px;
    background-color: var(--secondary-color); // couleur du cercle
    border-radius: 50%;
    margin-left: 3px; // espace entre les deux formes
    transition: transform 0.5s ease;
    z-index: -2;
    animation: slide-circle 4.5s forwards, zoom-circle 3s 5s forwards;
  }

  @keyframes slide-circle {
    0% {
      transform: translateX(0);
    }
    10% {
      transform: translateX(60px);
    }
    25% {
      transform: translateX(-45px);
    }
    45% {
      transform: translateX(-60px);
    }
    100% {
      transform: translateX(0);
    }
  }
  @keyframes zoom-circle {
    0% {
      z-index: 10;
      transform: scale(1);
    }
    70% {
      transform: scale(1000);
    }
    100% {
      transform: scale(1000);
    }
  }
}
</style>
