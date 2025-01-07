<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { doc, getDoc } from "firebase/firestore";
import Header from "@/components/Header.vue";
import { db } from "./firebase";

// Firebase setup
const stickers = ref<string[]>([]); // Tous les stickers depuis Firebase
const displayedStickers = ref<{ src: string; top: string; left: string; rotation: string }[]>([]); // Stickers affichés avec position fixe
const isShowingStickers = ref(false); // Mode affichage des stickers
let stickerInterval: any | null = null; // Gestion de l'intervalle
let isLoading = ref(true);

// Fetch stickers from Firebase settings > first doc > images
const fetchStickers = async () => {
  const settingsDocRef = doc(db, "settings", "t167xWSkApLAWyUgEOhy"); // ID du premier document
  const settingsDoc = await getDoc(settingsDocRef);
  if (settingsDoc.exists()) {
    stickers.value = settingsDoc.data().stickers || [];
  } else {
    console.error("Le document settings n'existe pas.");
  }
};

// Timeout management
let inactivityTimeout: any | null = null;

const resetInactivityTimer = () => {
  if (inactivityTimeout !== null) clearTimeout(inactivityTimeout);

  isShowingStickers.value = false;
  displayedStickers.value = []; // Réinitialisation des stickers affichés

  if (stickerInterval !== null) {
    clearInterval(stickerInterval);
    stickerInterval = null;
  }

  inactivityTimeout = setTimeout(() => {
    isShowingStickers.value = true;
    startStickerDisplay();
  }, 25000);
};

// Logique d'affichage des stickers
const startStickerDisplay = () => {
  if (stickers.value.length === 0) return;

  let index = 0;

  // Affiche un sticker toutes les 2 secondes
  stickerInterval = setInterval(() => {
    const sticker = stickers.value[index];
    displayedStickers.value.push({
      src: sticker,
      top: `${Math.random() * 80 + 10}%`, // Génération de position aléatoire une fois
      left: `${Math.random() * 80 + 10}%`,
      rotation: `${Math.random() * 45}deg`, // Rotation aléatoire
    });
    index = (index + 1) % stickers.value.length; // Repart à 0 après le dernier sticker
  }, 4000);
};

const setupInactivityDetection = () => {
  const events = ["mousemove", "click", "touchstart", "scroll"];
  events.forEach((event) => window.addEventListener(event, resetInactivityTimer));

  resetInactivityTimer();
};

const removeInactivityDetection = () => {
  const events = ["mousemove", "click", "touchstart", "scroll"];
  events.forEach((event) => window.removeEventListener(event, resetInactivityTimer));

  if (inactivityTimeout !== null) clearTimeout(inactivityTimeout);
  if (stickerInterval !== null) clearInterval(stickerInterval);
};

onMounted(() => {
  fetchStickers();
  setupInactivityDetection();
  setTimeout(() => {
    isLoading.value = false;
  }, 9000);
});

onUnmounted(() => {
  removeInactivityDetection();
});
</script>

<template>
  <Header />
  <div>
    <router-view></router-view>
    <div v-if="isShowingStickers" class="stickers-overlay">
      <div
        v-for="(sticker, index) in displayedStickers"
        :key="index"
        class="sticker"
        :style="{
          top: sticker.top,
          left: sticker.left,
          transform: `rotate(${sticker.rotation})`,
        }"
      >
        <img :src="sticker.src" alt="Sticker" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
div {
  padding-top: 80px;
  flex: 1;
}

.stickers-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
}

.sticker {
  position: absolute;
  // width: 200px;
  height: 230px;

  @include mobile {
    height: 190px;
  }
}

.sticker img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
