<script setup lang="ts">
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const fetchData = async () => {
  const querySnapshot = await getDocs(collection(db, "your-collection"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
};

fetchData();
</script>

<template>
  <div>
    <h1>Données de Firebase</h1>
  </div>
</template>
