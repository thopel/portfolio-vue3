<script setup lang="ts">
import { ref } from "vue";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import PageLoader from "../components/PageLoader.vue";
// import AnimatedCurves from "../components/AnimatedCurves.vue";

let loaded = ref(false);

// Définir des variables réactives pour stocker les données des paramètres
const settings = ref<{
  description: string;
  techno: Array<{ id: string }>;
  profilPictureUrl: string;
  companyPictureUrl: string;
  schoolPictureUrl: string;
  myName: string;
  companyName: string;
  schoolName: string;
  title: string;
  schoolLink: string;
  companyLink: string;
}>({
  description: "",
  techno: [],
  profilPictureUrl: "",
  companyPictureUrl: "",
  schoolPictureUrl: "",
  myName: "",
  companyName: "",
  schoolName: "",
  title: "",
  schoolLink: "",
  companyLink: "",
});

const fetchData = async () => {
  loaded.value = false;
  const docRef = doc(db, "settings", "t167xWSkApLAWyUgEOhy");
  const docSnap = await getDoc(docRef);
  loaded.value = true;

  if (docSnap.exists()) {
    settings.value = docSnap.data() as {
      description: string;
      techno: Array<{ id: string }>;
      profilPictureUrl: string;
      companyPictureUrl: string;
      schoolPictureUrl: string;
      myName: string;
      companyName: string;
      schoolName: string;
      title: string;
      schoolLink: string;
      companyLink: string;
    };
  } else {
    console.error("Document non trouvé !");
  }
};

fetchData();
</script>

<template>
  <div v-if="!loaded">
    <PageLoader />
  </div>
  <main v-else>
    <div class="wrapper">
      <a :href="settings.schoolLink" target="_blank" rel="noopener noreferrer" class="section" :style="`background-image: url(${settings.schoolPictureUrl})`">
        <div class="image">
          <p class="image-text">Studying at</p>
          <p class="image-title">{{ settings.schoolName }}</p>
        </div>
      </a>
      <div class="section" @click="$router.push('/about')" :style="`background-image: url(${settings.profilPictureUrl})`">
        <div class="image">
          <p class="image-text">Hello, I'm</p>
          <p class="image-title">{{ settings.myName }}</p>
        </div>
      </div>
      <a :href="settings.companyLink" target="_blank" rel="noopener noreferrer" class="section" :style="`background-image: url(${settings.companyPictureUrl})`">
        <div class="image">
          <p class="image-text">Working at</p>
          <p class="image-title">{{ settings.companyName }}</p>
        </div>
      </a>
    </div>
    <h1>{{ settings.title }}</h1>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: var(--main-color);
  padding: 1vw 6vw;
  background-image: url("../assets/medias/line-5.svg");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;

  @include mobile {
    background-image: none;
    flex-direction: column-reverse;
    padding: 20px;
    padding-top: 0;
  }

  & h1 {
    font-family: "Eugusto";
    font-size: 4.2rem;
    color: var(--secondary-color);
    text-align: center;
    width: 100%;

    @include mobile {
      font-size: 2.7rem;
      padding-bottom: 20px;
    }
  }

  .wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    @include flexbox(row, center, center, 2vw);
    flex: 1;
    width: 100%;
    padding: 2rem;
    gap: 2vw;

    @include mobile {
      flex-direction: column;
      padding: 0;
      gap: 20px;
    }

    & .section {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      height: 100%;
      width: 100%;
      transition: width 0.5s ease-in-out;
      position: relative;
      background-color: var(--secondary-color);
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      border-radius: 10px;

      &:hover {
        width: 115%;
        @include mobile {
          width: 100%;
        }
      }

      & .image {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        overflow: hidden;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        background-image: linear-gradient(360deg, #00000000 70%, #13131348 100%);

        @include mobile {
          display: flex;
          justify-content: flex-end;
          background-image: linear-gradient(180deg, #00000000 20%, #13131383 100%);
        }

        &-title {
          font-family: "Eugusto";
          font-size: 4.2rem;
          color: #f1f1f1;
          padding: 0 12px;
          border-radius: 5px;
          width: 100%;
          text-align: center;

          @include mobile {
            font-size: 4rem;
            height: fit-content;
            padding-bottom: 0;
          }
        }

        &-text {
          font-family: "Eugusto";
          font-size: 2rem;
          color: #f1f1f1;
          padding: 0 12px;
          border-radius: 5px;
          margin-top: 10px;
          width: 100%;
          text-align: center;
          letter-spacing: 2px;

          @include mobile {
            font-size: 2rem;
            height: fit-content;
            padding-bottom: 0;
          }
        }
      }
      @include mobile {
        &:nth-child(2) {
          order: -1;
          background-position: center 30%;
        }
      }
    }
  }
}
</style>
