<template>
  <main>
    <h1>Discover my projects throught the years.</h1>
    <div class="wrapper" v-for="(section, indexSection) in chunkArray(projets, 4)" :key="indexSection">
      <router-link
        v-for="(projet, index) in section"
        :to="'projects/' + projet.slug"
        :key="index"
        class="card"
        :style="'background-image: url(' + projet.banner + ');'"
      >
        <h2>{{ String(projet.addDate.toDate().getFullYear()) }}</h2>
      </router-link>
    </div>
  </main>
</template>

<script>
import { ref, onMounted } from "vue";
import { db } from "../../firebase"; // Assurez-vous que "db" est bien l'instance Firestore initialisée
import { collection, getDocs, orderBy, query } from "firebase/firestore"; // Importation des fonctions Firestore

export default {
  head() {
    return {
      titleTemplate: "Projects - %s",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "Here are the projects I've done, discover more by visiting my entire portfolio!",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    };
  },
  setup() {
    const projets = ref([]); // Utilisation de ref pour la réactivité
    const loaded = ref(false);

    const getProjet = async () => {
      try {
        // Requête Firestore pour obtenir les projets en ordre décroissant par addDate
        const projetsQuery = query(collection(db, "projets"), orderBy("addDate", "desc"));
        const querySnapshot = await getDocs(projetsQuery);

        querySnapshot.forEach((doc) => {
          projets.value.push(doc.data());
        });
        loaded.value = true;
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };

    const chunkArray = (myArray, chunk_size) => {
      let index = 0;
      const arrayLength = myArray.length;
      const tempArray = [];

      for (index = 0; index < arrayLength; index += chunk_size) {
        const myChunk = myArray.slice(index, index + chunk_size);
        tempArray.push(myChunk);
      }
      return tempArray;
    };

    onMounted(() => {
      getProjet();
    });

    return {
      projets,
      loaded,
      chunkArray,
    };
  },
};
</script>

<style lang="scss" scoped>
.loader_wrapper {
  transform: translateY(-30vh);
}

h1 {
  font-family: $Eugusto;
  font-size: 40px;
  color: $secondary;
  margin-bottom: 2vw;
  @include mobile {
    font-size: 40px;
    margin-bottom: 10vw;
  }
}

main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 12vw;
  align-items: center;
  justify-content: center;
  // & > div {
  //   flex-direction: column;
  //   align-items: center;
  //   justify-content: center;
  //   width: 100%;
  //   height: 100%;
  // }
  @include mobile {
    padding: 0 3.9rem;
    padding-top: 12vh;
  }
}

.wrapper {
  width: 100%;
  @include flexbox(row, flex-start, center, 2vw);
  padding-bottom: 2vw;
  z-index: 1;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    width: calc(100% + 24vw);
    height: 100%;
    left: -12vw;
    z-index: -1;

    @include mobile {
      display: none;
    }
  }
  &:nth-of-type(odd):before {
    background: url("@/assets/medias/line-4.svg") center/100% 100% no-repeat;
  }
  &:nth-of-type(even):before {
    background: url("@/assets/medias/line-5.svg") center/100% 100% no-repeat;
  }
  @include mobile {
    height: fit-content;
    gap: 10vw;
    flex-direction: column;
    padding-bottom: 11vw;
  }
  &::-webkit-scrollbar {
    display: none;
  }
}

.card {
  transition: width 0.5s ease-in-out;
  height: 35vw;
  width: calc(100% / 4 - 2vw + (2vw / 4));
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;

  h2 {
    font-family: $Eugusto;
    font-size: 80px;
    transform: translateY(40px);
    padding-top: 40px;
    color: $main;
    width: 100%;
    text-align: center;
    background: $secondary;
    background: -moz-linear-gradient(180deg, rgba(240, 240, 240, 0) 0%, $secondary 100%);
    background: -webkit-linear-gradient(180deg, rgba(240, 240, 240, 0) 0%, $secondary 100%);
    background: linear-gradient(180deg, rgba(240, 240, 240, 0) 0%, $secondary 100%);
  }

  @include mobile {
    height: 100%;
    width: 100%;
    height: 85vw;
  }

  &:hover {
    width: 25vw;

    @include mobile {
      height: 100%;
      width: 100%;
      height: 85vw;
    }
  }
}
</style>
