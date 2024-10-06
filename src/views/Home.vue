<script setup lang="ts">
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
// import AnimatedCurves from "../components/AnimatedCurves.vue";

const fetchData = async () => {
  const querySnapshot = await getDocs(collection(db, "your-collection"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
};

fetchData();
</script>

<template>
  <main></main>
</template>

<style scoped lang="scss">
main {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  background-color: $main;

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    background: url("../assets/medias/lines.svg");
    background-repeat: no-repeat;
    background-position: center 135%;
    background-size: contain;
    overflow: hidden;
  }
}
</style>
