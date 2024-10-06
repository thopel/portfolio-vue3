<template>
  <header class="header">
    <div class="sections">
      <router-link to="/" class="logo">
        <div class="square"></div>
        <div class="circle"></div>
      </router-link>

      <nav class="navigation">
        <router-link to="/">home</router-link>
        <router-link to="/projects">projects</router-link>
        <router-link to="/about">about</router-link>
        <div class="selected-bg"></div>
      </nav>
    </div>
    <div class="sections">
      <span class="text">tpelfrene@gmail.com</span>
      <a href="https://github.com/votre-profil" target="_blank" aria-label="GitHub">
        <img src="@/assets/medias/github.svg" alt="GitHub" />
      </a>
      <a href="https://linkedin.com/in/votre-profil" target="_blank" aria-label="LinkedIn">
        <img src="@/assets/medias/linkedin.svg" alt="LinkedIn" />
      </a>
      <span class="lightmode" @click=""></span>
    </div>
  </header>
</template>

<script setup></script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: fixed;
  padding: 20px;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: #f1f1f1f1;
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
      background-color: #333; // couleur du carré
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
        background-color: $main;
      }
    }

    .circle {
      width: 27px;
      height: 30px;
      background-color: #333; // couleur du cercle
      border-radius: 50%;
      margin-left: 3px; // espace entre les deux formes
      transition: all 0.5s ease;
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
    background-color: $main;
    border: 3px solid $secondary;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: $secondary;
      border-color: $secondary;
    }
  }

  & .text {
    color: $main;
    background-color: $secondary;
    height: 30px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    font-weight: 400;
    cursor: pointer;
    border-radius: 5px;
  }
}

.navigation {
  display: flex;
  background-color: $secondary;
  border-radius: 5px;
  padding: 5px;
  position: relative;
  width: 250px;
  color: $main;

  a {
    width: calc(100% / 3);
    text-align: center;
    z-index: 2;
    mix-blend-mode: difference;
    display: flex;
    justify-content: center;
    align-items: center;

    &:nth-child(1).router-link-active ~ .selected-bg {
      left: calc(((100% - 10px) / 3) * 0 + 5px);
    }
    &:nth-child(2).router-link-active ~ .selected-bg {
      left: calc(((100% - 10px) / 3) * 1 + 5px);
    }
    &:nth-child(3).router-link-active ~ .selected-bg {
      left: calc(((100% - 10px) / 3) * 2 + 5px);
    }
  }

  & .selected-bg {
    position: absolute;
    width: calc((100% - 10px) / 3);
    height: 30px;
    background-color: $main;
    border-radius: 2px;
    z-index: 1;
    transition: 0.3s;
  }
}
</style>
