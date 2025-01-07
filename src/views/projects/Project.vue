<template>
  <main>
    <router-link class="back" :to="{ name: 'Projects' }">Back</router-link>
    <div v-if="!loaded || !technoLoaded">
      <PageLoader />
    </div>
    <div v-else>
      <div class="top">
        <h1>{{ projet.name }}</h1>
        <div class="tech">
          <span v-for="(app, index) in projet.techno" :key="index">
            {{ techno.find((elem) => elem.id == projet.techno[index].id).name }}
          </span>
        </div>
      </div>

      <section class="wrapper">
        <div class="descr-wrapper">
          <div class="descr-infos">
            <div class="infos-content">
              <h2 class="subtitle">Information</h2>
              <h3>{{ projet.annee }} ~ {{ projet.type }}</h3>
              <div v-if="projet.collab.length > 0" class="collab">
                <span>Featuring :</span>
                <a
                  :title="'LinkedIn profile of ' + pers.name"
                  rel="noopener noreferrer"
                  v-for="(pers, index) in projet.collab"
                  :key="index"
                  target="_blank"
                  :href="'https://www.linkedin.com/in/' + pers.linkedin"
                  >{{ pers.name }}</a
                >
              </div>
              <p class="descr" v-html="projet.description"></p>
            </div>
            <a :title="projet.name" rel="noopener noreferrer" target="_blank" v-if="projet.lien" class="link" :href="projet.lien">Have a look</a>
          </div>
          <img
            :src="projet.images[0].url"
            alt="image of {{ projet.name }}"
            class="picture"
            :style="'width:' + (projet.images[0].width - 0.25) + '%'"
            :alt="'image of ' + projet.name"
          />
        </div>
        <img
          v-for="(img, index) in projet.images.slice(1)"
          :key="index"
          class="picture"
          :style="'width:' + (img.width - 0.25) + '%'"
          :src="img.url"
          :alt="'image of ' + projet.name"
        />
      </section>
    </div>
  </main>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import PageLoader from "../../components/PageLoader.vue";

export default {
  components: {
    PageLoader,
  },
  setup() {
    const projet = ref({});
    const techno = ref([]);
    const loaded = ref(false);
    const technoLoaded = ref(false);
    const route = useRoute();

    const getProjet = async () => {
      const db = getFirestore();
      const q = query(collection(db, "projets"), where("slug", "==", route.params.slug));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        projet.value = doc.data();
        loaded.value = true;
      });
    };

    const getTechno = async () => {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, "technologies"));
      querySnapshot.forEach((doc) => {
        techno.value.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
        });
      });
      technoLoaded.value = true;
    };

    onMounted(() => {
      getProjet();
      getTechno();
    });

    return {
      projet,
      techno,
      loaded,
      technoLoaded,
    };
  },
};
</script>

<style scoped lang="scss">
main {
  color: var(--main-color);
  letter-spacing: 1px;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  color: var(--secondary-color);
  padding: 1vw 12vw;

  @include mobile {
    padding: 20px;
    padding-bottom: 35vw;
  }

  .top {
    width: 100%;
    @include flexbox(row, flex-start, center, 2vw);

    @include mobile {
      @include flexbox(column, flex-start, flex-start);
      height: fit-content;
    }

    h1 {
      font-family: $Eugusto;
      font-size: 9rem;
      color: var(--secondary-color);
      @include mobile {
        font-size: 40px;
      }
    }

    .infos {
      width: 100%;

      h1 {
        font-family: $Eugusto;
        font-size: 40px;
        color: var(--secondary-color);
        margin-bottom: 2vw;
        @include mobile {
          font-size: 40px;
          margin-bottom: 10vw;
        }
      }
    }

    .tech {
      @include flexbox(row, flex-start, center, 1vw);
      font-size: 2rem;
      font-family: $Readex-Regular;
      flex-wrap: wrap;

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
  }

  h2,
  h3 {
    font-family: $Readex-Regular;
    font-weight: normal;
    text-transform: capitalize;
    font-size: 3rem;

    @include mobile {
      font-size: 2.5rem;
    }
  }

  h3 {
    margin-bottom: 1vw;

    @include mobile {
      margin: 5vw 0;
    }
  }

  .collab {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    font-size: 2rem;
    font-family: $Readex-Regular;
    margin-top: 1vw;

    @include mobile {
      font-size: 2rem;
      margin-top: 5vw;
    }

    span {
      color: var(--main-color);
    }

    a {
      margin-left: 10px;
      color: var(--main-color);
      position: relative;
      text-decoration: underline;

      &:hover:after {
        transform: rotate(360deg);
      }

      &:not(:first-of-type) {
        margin-left: 28px;
      }

      &:after {
        position: absolute;
        content: "";
        left: 100%;
        top: 0rem;
        height: 1.8rem;
        width: 1.8rem;
        background: url("~/assets/medias/linkedin.svg") center/cover no-repeat;
        transition: transform 0.7s ease-in-out;
      }
    }
  }

  .subtitle {
    font-family: $Eugusto;
    font-size: 4rem;
  }

  .descr-wrapper {
    width: 100%;
    background-color: var(--secondary-color);
    color: var(--main-color);
    border-radius: 10px;
    padding: 2vw;
    @include flexbox(row, space-between, flex-start, 2vw);
    margin-bottom: 2vw;
    position: relative;

    @include mobile {
      @include flexbox(column, space-between, flex-start, 2vw);
      margin-bottom: 0;
      padding: 5vw;
    }

    &:before {
      content: "";
      position: absolute;
      width: calc(100% + 24vw);
      height: 100%;
      left: -12vw;
      z-index: -1;
      background: url("@/assets/medias/line-5.svg") center/100% 100% no-repeat;

      @include mobile {
        display: none;
      }
    }

    & .descr-infos {
      width: 50%;
      height: 100%;
      @include flexbox(column, space-between, flex-start, 2vw);

      @include mobile {
        width: 100%;
      }
    }

    @include mobile {
      width: 100%;
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
      font-size: 2rem;
      margin-top: 5vw;
      font-size: 1.4rem;
    }
  }

  .link {
    font-size: 2rem;
    text-decoration: none;
    color: var(--secondary-color);
    width: fit-content;
    position: relative;
    cursor: pointer;
    background-color: var(--main-color);
    border-radius: 5px;
    padding: 5px;

    @include mobile {
      font-size: 1.5rem;
      margin-bottom: 30px;
      padding: 10px;
      order: 1;
      width: 100%;
      text-align: center;
    }
  }

  .logo-app {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: flex-end;
    align-items: center;
    img {
      width: auto;
      height: 70px;
      margin-bottom: 5px;

      @include mobile {
        height: 40px;
      }
    }
    p {
      width: 100%;
      text-align: center;
    }
  }
  .back {
    position: fixed;
    bottom: -5vw;
    right: 50%;
    background-color: var(--secondary-color);
    transform: translateX(51.5%);
    width: 10vw;
    height: 10vw;
    padding-bottom: 3vw;
    border-radius: 50%;
    @include flexbox(row, center, center);
    color: var(--main-color);
    z-index: 9;
    font-family: $Eugusto;
    font-size: 1.6rem;
    transition: all 0.3s ease-in-out;
    display: none;

    @include mobile {
      display: flex;
      height: 80px;
      width: 80px;
      transform: translateX(50%);
      right: 50%;
      box-shadow: 0px 0px 29px -10px var(--main-color);
      bottom: 20px;
      padding-bottom: 0;
    }
  }

  .wrapper {
    @include flexbox(row, space-between, flex-start, 0.5%);
    flex-wrap: wrap;

    @include mobile {
      gap: 11vw;
    }

    img:first-of-type {
      object-fit: cover;
      object-position: right center;
      margin-bottom: 2.5vw;

      @include mobile {
        margin-bottom: 0;
        height: auto;
        width: inherit;
        object-fit: auto;
        object-position: none;
      }
    }

    @include mobile {
      margin-top: 10vw;
      gap: 20px;
    }

    .picture {
      height: auto;
      display: flex;
      margin-bottom: 0.5%;
      border-radius: 10px;
      margin-bottom: 2.5vw;

      @include mobile {
        width: 100% !important;
        margin-bottom: 0;
      }
    }

    .descr-wrapper {
      & > .picture {
        margin-bottom: 0;
      }
    }
  }
}
</style>
