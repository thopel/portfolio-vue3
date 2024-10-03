<template>
  <header class="header">
    <nav class="navigation">
      <router-link to="/">home</router-link>
      <router-link to="/projects">projects</router-link>
      <router-link to="/about">about</router-link>
      <div class="selected-bg"></div>
    </nav>
    <div class="social-icons">
      <a href="https://github.com/votre-profil" target="_blank" aria-label="GitHub">
        <img src="@/assets/medias/light-mode.svg" alt="GitHub" />
      </a>
      <span>tpelfrene@gmail.com</span>
      <a href="https://github.com/votre-profil" target="_blank" aria-label="GitHub">
        <img src="@/assets/medias/github.svg" alt="GitHub" />
      </a>
      <a href="https://linkedin.com/in/votre-profil" target="_blank" aria-label="LinkedIn">
        <img src="@/assets/medias/linkedin.svg" alt="LinkedIn" />
      </a>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.social-icons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  & a {
    height: 30px;
    & img {
      height: 100%;
      filter: invert(1);
    }
  }

  & span {
    font-size: 14px;
    color: #1d1d1d;
    background-color: #cdcdcd;
    height: 30px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    font-weight: 700;
    cursor: pointer;
    border-radius: 5px;
  }
}

.navigation {
  display: flex;
  background-color: #cdcdcd;
  border-radius: 5px;
  padding: 10px;
  position: relative;
  width: 250px;

  a {
    width: calc(100% / 3);
    text-align: center;
    z-index: 2;
    mix-blend-mode: difference;

    &:nth-child(1).router-link-active ~ .selected-bg {
      left: calc(((100% - 20px) / 3) * 0 + 10px);
    }
    &:nth-child(2).router-link-active ~ .selected-bg {
      left: calc(((100% - 20px) / 3) * 1 + 10px);
    }
    &:nth-child(3).router-link-active ~ .selected-bg {
      left: calc(((100% - 20px) / 3) * 2 + 10px);
    }
  }

  & .selected-bg {
    position: absolute;
    width: calc((100% - 30px) / 3);
    height: 26px;
    background-color: #1d1d1d;
    border-radius: 2px;
    z-index: 1;
    transition: 0.3s;
  }
}
</style>
