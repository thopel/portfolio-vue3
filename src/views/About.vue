<script setup lang="ts">
import { ref, onMounted } from "vue";
import { db } from "../firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import PageLoader from "@/components/PageLoader.vue";

// Définir des variables réactives pour stocker les données du projet et des technologies
const projet = ref<{ description: string; techno: Array<{ id: string }>; profilPictureUrl: string; softSkills: Array<{ id: string }> }>({
  description: "",
  techno: [],
  profilPictureUrl: "", // Ajout du champ pour l'image de profil
  softSkills: [],
});
const loaded = ref(false);

const email = "hello@thomaspelfrene.com";
const techno = ref<Array<{ id: string; name: string }>>([]);
const softSkills = ref<Array<{ id: string; name: string }>>([]);
const timeline = ref<
  Array<{
    id: string;
    jobName: string;
    jobDescription: string;
    jobSticker: string;
    formationName: string;
    formationDescription: string;
    formationSticker: string;
    year: number;
  }>
>([]);

// Fonction pour récupérer les données du projet spécifique
const fetchData = async () => {
  const docRef = doc(db, "settings", "t167xWSkApLAWyUgEOhy");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    projet.value = docSnap.data() as { description: string; techno: Array<{ id: string }>; profilPictureUrl: string; softSkills: Array<{ id: string }> };
  } else {
    console.error("Document non trouvé !");
  }
};

// Fonction pour récupérer toutes les technologies
const fetchTechnologies = async () => {
  const querySnapshot = await getDocs(collection(db, "technologies"));
  const techList: Array<{ id: string; name: string }> = [];
  querySnapshot.forEach((doc) => {
    techList.push({ id: doc.id, ...doc.data() } as { id: string; name: string });
  });
  techno.value = techList;
};

const fetchSoftSkills = async () => {
  const querySnapshot = await getDocs(collection(db, "softskills"));
  const softSkillsList: Array<{ id: string; name: string }> = [];
  querySnapshot.forEach((doc) => {
    softSkillsList.push({ id: doc.id, ...doc.data() } as { id: string; name: string });
  });
  softSkills.value = softSkillsList;
};

// fetch timeline data
const fetchTimeline = async () => {
  const querySnapshot = await getDocs(collection(db, "timeline"));
  const timelineList: Array<{
    id: string;
    jobName: string;
    jobDescription: string;
    jobSticker: string;
    formationName: string;
    formationDescription: string;
    formationSticker: string;
    year: number;
  }> = [];
  querySnapshot.forEach((doc) => {
    timelineList.push({ id: doc.id, ...doc.data() } as {
      id: string;
      jobName: string;
      jobDescription: string;
      jobSticker: string;
      formationName: string;
      formationDescription: string;
      formationSticker: string;
      year: number;
    });
  });
  // order by year with the highest year first
  timelineList.sort((a, b) => b.year - a.year);
  timeline.value = timelineList;
};

// Appel de fetchData et fetchTechnologies lors du montage du composant
onMounted(async () => {
  await Promise.all([fetchData(), fetchTechnologies(), fetchSoftSkills(), fetchTimeline()]);
  loaded.value = true;
});
</script>

<template>
  <main>
    <div v-if="!loaded">
      <PageLoader />
    </div>
    <div style="width: 100%" v-else>
      <h1>Get to know me!</h1>
      <div class="descr-wrapper">
        <div class="descr-infos">
          <div class="contact">
            <span class="text">{{ email }}</span>
            <div class="icons">
              <a class="filtered-object-inverse" href="https://github.com/thopel" target="_blank" aria-label="GitHub">
                <img src="@/assets/medias/github.svg" alt="GitHub" />
              </a>
              <a class="filtered-object-inverse" href="https://linkedin.com/in/thomas-pelfrene" target="_blank" aria-label="LinkedIn">
                <img src="@/assets/medias/linkedin.svg" alt="LinkedIn" />
              </a>
            </div>
          </div>
          <div class="infos-content">
            <p class="descr" v-html="projet.description"></p>
            <h2 class="subtitle">Hard Skills</h2>
            <div class="tech">
              <span v-for="(app, index) in techno" :key="index">
                {{ app.name }}
              </span>
            </div>
          </div>
        </div>
        <!-- Utilisation de profilPictureUrl pour l'image de profil -->
        <img :src="projet.profilPictureUrl" alt="Profile Picture" class="picture" />
      </div>
      <h2 class="subtitle">Soft Skills</h2>
      <div class="tech">
        <span v-for="(skill, index) in softSkills" :key="index">
          {{ skill.name }}
        </span>
      </div>
      <div class="timeline">
        <img src="../assets/medias/line-5.svg" alt="line" class="line" />
        <div class="tl-title">
          <h2>Job</h2>
          <h2>Formation</h2>
        </div>
        <div class="tl-item" v-for="(item, index) in timeline" :index="index">
          <img v-if="item.jobSticker" :src="item.jobSticker" alt="logo de l'entreprise" class="sticker-job" />
          <img v-if="item.formationSticker" :src="item.formationSticker" alt="logo de l'école" class="sticker-formation" />
          <div class="tl-item-title">
            <h2 class="job-title" v-if="item.jobName">{{ item.jobName }}</h2>
            <div class="job-title empty" v-else></div>
            <div class="year-wrapper">
              <span class="year">{{ item.year }}</span>
            </div>
            <h2 class="formation-title" v-if="item.formationName">{{ item.formationName }}</h2>
            <div class="formation-title empty" v-else></div>
          </div>
          <div class="tl-description">
            <p>
              {{ item.jobDescription }}
            </p>
            <p>
              {{ item.formationDescription }}
            </p>
          </div>
        </div>
      </div>
      <ul class="timeline-mobile">
        <li v-for="(item, index) in timeline" :index="index">
          <div class="year-wrapper">
            <span class="year">{{ item.year }}</span>
          </div>

          <div class="item-list-wrapper" v-if="item.jobSticker">
            <div class="tl-item-title">
              <img :src="item.jobSticker" alt="logo de l'entreprise" class="sticker-job" />
              <h2 class="job-title" v-if="item.jobName">{{ item.jobName }}</h2>
            </div>
            <div class="tl-description">
              <p>
                {{ item.jobDescription }}
              </p>
            </div>
          </div>
          <div class="item-list-wrapper" v-if="item.formationSticker">
            <div class="tl-item-title">
              <img :src="item.formationSticker" alt="logo de l'école" class="sticker-formation" />
              <h2 class="formation-title" v-if="item.formationName">{{ item.formationName }}</h2>
            </div>
            <div class="tl-description">
              <p>
                {{ item.formationDescription }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.contact {
  display: none;

  @media screen and (max-width: 768px) {
    @include flexbox(row, space-between, center);
    width: 100%;
    & .icons {
      @include flexbox(row, space-between, center, 2vw);
    }
    & .text {
      color: var(--secondary-color);
      background-color: var(--main-color);
      height: 30px;
      display: flex;
      align-items: center;
      padding: 0 10px;
      font-weight: 400;
      border-radius: 5px;
    }
    & a {
      height: 30px;
      & img {
        height: 100%;
      }
    }
  }
}
main {
  padding: 1vw 12vw;
  @include flexbox(column, space-between, flex-start);
  overflow-x: hidden;

  @include mobile {
    padding: 0 2rem;
    padding-top: 12vh;
    overflow-x: hidden;
  }
}
.tech {
  @include flexbox(row, flex-start, center, 1vw);
  font-size: 2rem;
  font-family: $Readex-Regular;
  flex-wrap: wrap;
  width: 50%;
  padding-left: 2vw;

  span {
    background-color: var(--secondary-color);
    color: var(--main-color);
    padding: 4px 12px;
    border-radius: 5px;
    margin-top: 10px;
  }

  @include mobile {
    @include flexbox(row, flex-start, center, 2vw);
    font-size: 2rem;
    width: 100%;

    div {
      width: 25%;
      margin-top: 2vw;
      height: auto;
    }
  }
}
h1 {
  font-family: $Eugusto;
  font-size: 40px;
  color: var(--secondary-color);
  margin-bottom: 2vw;
  text-align: center;
  width: 100%;
  @include mobile {
    font-size: 30px;
    margin-bottom: 10vw;
  }
}
.subtitle {
  font-family: $Eugusto;
  font-size: 4rem;
  padding-left: 2vw;
}
.line {
  width: calc(100vw - 6px);
  overflow: hidden;
  transform: translate(-12vw, -200px);
  position: absolute;
  top: 0;

  @include mobile {
    width: calc(100vw + 6rem);
    transform: translateX(3rem) scale(1.5);
  }
}
.descr-wrapper {
  width: 100%;
  background-color: var(--secondary-color);
  color: var(--main-color);
  border-radius: 10px;
  padding: 2vw;
  @include flexbox(row, space-between, flex-start, 2vw);
  margin-bottom: 5vw;
  position: relative;

  @include mobile {
    @include flexbox(column-reverse, space-between, flex-start, 2vw);
  }

  & .descr-infos {
    width: 50%;
    height: 100%;
    @include flexbox(column, space-between, flex-start, 2vw);

    @include mobile {
      padding: 5vw;
      width: 100%;
    }
  }
  .subtitle {
    padding-left: 0;
  }
  & > img {
    width: 37%;
    height: auto;
    position: absolute;
    right: 2vw;
    top: 2vw;
    border-radius: 5px;

    @include mobile {
      width: 100%;
      height: 50%;
      position: relative;
      top: 0;
      right: 0;
    }

    &:hover {
      cursor: url("../assets/medias/city-name.png") 15 43, auto;
    }
  }

  .tech {
    @include flexbox(row, flex-start, center, 1vw);
    font-size: 2rem;
    font-family: $Readex-Regular;
    flex-wrap: wrap;
    width: 100%;
    padding-left: 0;

    span {
      background-color: var(--main-color);
      color: var(--secondary-color);
      padding: 4px 12px;
      border-radius: 5px;
      margin-top: 10px;
    }

    @include mobile {
      @include flexbox(row, flex-start, center, 2vw);
      font-size: 2rem;
      width: 100%;

      div {
        width: 25%;
        margin-top: 2vw;
        height: auto;
      }
    }
  }
}
.descr {
  font-size: 1.5rem;
  margin-top: 1vw;
  font-family: $Readex-Regular;
  margin-bottom: 2vw;
  text-align: justify;

  @include tablet {
    width: 100%;
    text-align: justify;
  }

  @include mobile {
    font-size: 1.7rem;
    margin-top: 5vw;
    width: 100%;
  }
}
.timeline {
  width: 100%;
  height: 100%;
  position: relative;
  padding-top: 100px;
  margin-top: 300px;
  @include flexbox(column, space-between, flex-start);

  @include mobile {
    display: none;
  }

  .tl-title {
    width: 100%;
    @include flexbox(row, space-between, center, 150px);
    padding-bottom: 100px;

    & h2 {
      font-family: $Eugusto;
      text-align: center;
      width: 50%;
      font-size: 4rem;
      color: var(--secondary-color);
    }
  }

  .tl-item {
    width: 100%;
    border-radius: 10px;
    @include flexbox(column, space-between, center, 20px);
    margin-bottom: 100px;
    position: relative;

    & .sticker-job {
      height: 100px;
      position: absolute;
      top: -50px;
      left: -30px;
      transform: rotate(-10deg);
    }

    & .sticker-formation {
      height: 100px;
      position: absolute;
      top: -50px;
      right: -30px;
      transform: rotate(10deg);
    }

    .tl-item-title {
      @include flexbox(row, flex-start, center);
      width: 100%;
    }

    .tl-description {
      @include flexbox(row, flex-start, center, 150px);
      width: 100%;
      & p {
        width: 100%;
      }
    }

    & .job-title {
      font-family: $Eugusto;
      font-size: 2.1rem;
      color: var(--main-color);
      padding: 2vw;
      border-radius: 10px;
      background-color: var(--secondary-color);
      width: 50%;
      text-align: center;

      &.empty {
        background-color: transparent;
      }
    }

    & .formation-title {
      font-family: $Eugusto;
      font-size: 2.1rem;
      color: var(--main-color);
      padding: 2vw;
      border-radius: 10px;
      background-color: var(--secondary-color);
      width: 50%;
      text-align: center;

      &.empty {
        background-color: transparent;
      }
    }

    & .year-wrapper {
      @include flexbox(column, flex-end, center, 30px);
      width: 150px;
      position: relative;

      & .year {
        font-family: $Eugusto;
        font-size: 1.5rem;
        color: var(--main-color);
        padding: 10px 20px 5px 20px;
        border-radius: 5px;
        background-color: var(--secondary-color);
        text-align: center;
      }
      &:before {
        content: "";
        position: absolute;
        width: 6px;
        z-index: -1;
        height: calc(100% + 400px);
        left: 50%;
        bottom: -190px;
        transform: translate(-50%, -50%);
        background-color: var(--secondary-color);
      }
    }
  }
}
.timeline-mobile {
  display: none;
  @include mobile {
    width: 100%;
    padding-top: 100px;
    @include flexbox(column, space-between, flex-start, 20px);
  }
  & li {
    @include flexbox(column, flex-start, flex-start, 20px);
    width: 100%;
  }

  & .item-list-wrapper {
    width: 100%;
  }
  .year-wrapper {
    @include flexbox(row, flex-start, center, 30px);
    width: 100%;
    position: relative;
    & .year {
      font-family: $Eugusto;
      font-size: 1.5rem;
      color: var(--main-color);
      padding: 10px 20px 5px 20px;
      border-radius: 10px;
      background-color: var(--secondary-color);
      text-align: center;
    }
  }
  & img {
    width: auto;
    height: 15vw;
  }
  & .tl-item-title {
    @include flexbox(row, flex-start, center);
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    background-color: var(--secondary-color);
    color: var(--main-color);
  }

  & .tl-description {
    margin-top: 20px;
    padding-left: 20px;
    border-left: 2px solid var(--secondary-color);
  }

  h2 {
    padding-left: 20px;
  }
}
</style>
