<template>
  <header class="header">
    <div class="sections">
      <router-link to="/" class="logo">
        <div class="square"></div>
        <div class="circle-box">
          <div class="circle"></div>
        </div>
      </router-link>

      <nav class="navigation">
        <router-link :to="{ name: 'Home', params: { hideLoader: true } }">home</router-link>
        <router-link to="/projects">projects</router-link>
        <router-link to="/about">about</router-link>
        <div class="selected-bg"></div>
      </nav>
    </div>

    <div class="sections no-mobile">
      <span v-if="copied.text" :style="`background-color: ${copied.bgColor};`" :class="copied.moving ? 'moving' : ''" class="text" id="copied">{{
        copied.text
      }}</span>
      <span @click="copyEmail" class="text">{{ email }}</span>
      <a class="filtered-object" href="https://github.com/thopel" target="_blank" aria-label="GitHub">
        <img src="@/assets/medias/github.svg" alt="GitHub" />
      </a>
      <a class="filtered-object" href="https://linkedin.com/in/thomas-pelfrene" target="_blank" aria-label="LinkedIn">
        <img src="@/assets/medias/linkedin.svg" alt="LinkedIn" />
      </a>
      <span class="lightmode" @click="swapColors"></span>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Récupérer la valeur dark-mode au montage
onMounted(() => {
  const isDarkMode = localStorage.getItem("dark-mode") === "true";
  if (isDarkMode) {
    document.querySelector("#app").classList.add("dark-mode");
    const root = document.documentElement;

    // Échange les couleurs si dark-mode est activé
    const mainColor = getComputedStyle(root).getPropertyValue("--main-color");
    const secondaryColor = getComputedStyle(root).getPropertyValue("--secondary-color");
    root.style.setProperty("--main-color", secondaryColor);
    root.style.setProperty("--secondary-color", mainColor);
  }
});

const copied = ref({
  moving: false,
  text: "",
  bgColor: "var(--secondary-color)",
});
const emailClickedCounter = ref(0);
const timeoutRef = ref(null);
const email = "hello@thomaspelfrene.com";

// Fonction pour inverser les couleurs
const swapColors = () => {
  const root = document.documentElement;

  const mainColor = getComputedStyle(root).getPropertyValue("--main-color");
  const secondaryColor = getComputedStyle(root).getPropertyValue("--secondary-color");

  root.style.setProperty("--main-color", secondaryColor);
  root.style.setProperty("--secondary-color", mainColor);
  document.querySelector("#app").classList.toggle("dark-mode");

  localStorage.setItem("dark-mode", document.querySelector("#app").classList.contains("dark-mode"));
};

const copyEmail = async () => {
  try {
    // Clear existing timeout if any
    if (timeoutRef.value) {
      clearTimeout(timeoutRef.value);
    }

    await navigator.clipboard.writeText(email);
    if (emailClickedCounter.value === 9) {
      emailClickedCounter.value = 0;
    }
    emailClickedCounter.value++;

    const messageData = getCopyMessage(emailClickedCounter.value);
    copied.value = messageData;

    // Set new timeout and store the reference
    timeoutRef.value = setTimeout(() => {
      copied.value = {
        text: "",
        bgColor: "var(--secondary-color)",
        moving: false,
      };
      timeoutRef.value = null;
    }, 3000);
  } catch (err) {
    console.error("Erreur lors de la copie:", err);
  }
};

const getCopyMessage = (count) => {
  switch (count) {
    case 1:
      return { text: "copied", bgColor: "var(--secondary-color)" };
    case 2:
      return { text: "re copied", bgColor: "var(--secondary-color)" };
    case 3:
      return { text: "re re copied", bgColor: "var(--secondary-color)" };
    case 4:
      return { text: "re re re copied", bgColor: "var(--secondary-color)" };
    case 5:
      return { text: "re re re re copied", bgColor: "var(--secondary-color)" };
    case 6:
      return { text: "its time to send me an email now", bgColor: "var(--secondary-color)" };
    case 7:
      return { text: "MEGA COPY", bgColor: "red", moving: true };
    case 8:
      return { text: "ULTRA MEGA COPY", bgColor: "red", moving: true };
    case 9:
      return { text: "INTERGALLACTIC COPY", bgColor: "red", moving: true };
    default:
      return { text: "INTERGALLACTIC COPY", bgColor: "red", moving: true };
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-items: fixed;
  padding: 20px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 100;
  backdrop-filter: blur(25px);
}

h1 {
  color: var(--secondary-color);
  font-size: 2.7rem;
  font-weight: 400;
  font-family: "Eugusto";
}

.sections {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  & a {
    height: 30px;
    & img {
      height: 100%;
    }
  }

  .logo {
    display: flex;
    align-items: center;
    height: 30px;
    width: 45px;
    min-width: 45px;
    overflow: hidden;
    cursor: pointer;

    &:hover {
      .circle {
        animation: slide-logo 1.2s forwards;
      }
    }

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
    }

    @keyframes slide-logo {
      0% {
        transform: translateX(0);
      }
      30% {
        transform: translateX(-30px);
      }
      45% {
        transform: translateX(-30px);
      }
      100% {
        transform: translateX(0);
      }
    }
  }

  & .lightmode {
    width: 25px;
    height: 25px;
    background-color: var(--main-color);
    border: 3px solid var(--secondary-color);
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: var(--secondary-color);
      border-color: var(--secondary-color);
    }
  }

  & .text {
    color: var(--main-color);
    background-color: var(--secondary-color);
    height: 30px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    font-weight: 400;
    cursor: pointer;
    border-radius: 5px;
    user-select: none;
    transform-origin: center right;

    &.moving {
      animation: shake-text 0.7s infinite;
    }
    @keyframes shake-text {
      0%,
      100% {
        transform: translateX(0);
      }
      10% {
        transform: translateX(-2px) rotate(-1deg);
      }
      20% {
        transform: translateX(2px) rotate(1deg);
      }
      30% {
        transform: translateX(-3px) rotate(-1.5deg);
      }
      40% {
        transform: translateX(3px) rotate(1.5deg);
      }
      50% {
        transform: translateX(-2px) rotate(-1deg);
      }
      60% {
        transform: translateX(2px) rotate(1deg);
      }
      70% {
        transform: translateX(-2px) rotate(-1deg);
      }
      80% {
        transform: translateX(2px) rotate(1deg);
      }
      90% {
        transform: translateX(-1px) rotate(-0.5deg);
      }
    }
  }
}

.navigation {
  display: flex;
  background-color: var(--secondary-color);
  border-radius: 5px;
  padding: 5px;
  position: relative;
  width: 250px;
  color: var(--main-color);

  a {
    width: calc(100% / 3);
    text-align: center;
    z-index: 2;
    filter: invert(0.6);

    display: flex;
    justify-content: center;
    align-items: center;

    &:nth-child(1).router-link-active ~ .selected-bg {
      display: block;
      left: calc(((100% - 10px) / 3) * 0 + 5px);
    }
    &:nth-child(2).router-link-active ~ .selected-bg {
      display: block;
      left: calc(((100% - 10px) / 3) * 1 + 5px);
    }
    &:nth-child(3).router-link-active ~ .selected-bg {
      display: block;
      left: calc(((100% - 10px) / 3) * 2 + 5px);
    }
  }

  & .selected-bg {
    position: absolute;
    width: calc((100% - 10px) / 3);
    height: 30px;
    background-color: var(--main-color);
    border-radius: 2px;
    z-index: 1;
    transition: 0.3s;
    display: none;
    color: var(--secondary-color);
  }
}
@include mobile {
  h1 {
    font-size: 1rem;
  }
  .no-mobile {
    justify-content: flex-end;
    & :not(.lightmode) {
      display: none;
    }
  }
  .sections:first-child {
    margin-right: 20px;
    width: 100%;
    .navigation {
      width: 100%;
    }
  }
}
</style>
