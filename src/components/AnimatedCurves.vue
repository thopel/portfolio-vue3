<template>
  <div ref="threeContainer" class="three-container"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import * as THREE from "three";

const threeContainer = ref(null);

onMounted(() => {
  // Création de la scène
  const scene = new THREE.Scene();

  // Dimensions pour la caméra orthographique
  const aspect = window.innerWidth / window.innerHeight;
  const frustumSize = 20;
  const camera = new THREE.OrthographicCamera((frustumSize * aspect) / -2, (frustumSize * aspect) / 2, frustumSize / 2, frustumSize / -2, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  threeContainer.value.appendChild(renderer.domElement);

  // Lumière directionnelle plus intense et plus claire
  const light = new THREE.DirectionalLight(0xffffff, 2); // Lumière directionnelle plus intense
  light.position.set(1, 4, 1).normalize();
  scene.add(light);

  // Ajout d'une lumière ambiante
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Lumière ambiante
  scene.add(ambientLight);

  // Points pour la courbe rouge et noire
  const redPoints = [];
  const blackPoints = [];
  const numPoints = 70; // Plus de points pour une courbe plus fluide
  const separation = 1; // Séparation minimale entre les courbes

  for (let i = 0; i < numPoints; i++) {
    redPoints.push(new THREE.Vector3(i - numPoints / 2, Math.sin(i), 0));
    blackPoints.push(new THREE.Vector3(i - numPoints / 2, Math.sin(i), 0));
  }

  // Création des courbes
  let redCurve = new THREE.CatmullRomCurve3(redPoints);
  let blackCurve = new THREE.CatmullRomCurve3(blackPoints);

  // Création de la géométrie de tube suivant la courbe
  let redTubeGeometry = new THREE.TubeGeometry(redCurve, 100, 1.5, 32, false);
  let blackTubeGeometry = new THREE.TubeGeometry(blackCurve, 100, 1.5, 32, false);

  const redMaterial = new THREE.MeshStandardMaterial({ color: 0xff5e5e });
  const blackMaterial = new THREE.MeshStandardMaterial({ color: 0x4d4d4d });

  // Création des tubes (un rouge, un noir)
  const redTube = new THREE.Mesh(redTubeGeometry, redMaterial);
  scene.add(redTube);

  const blackTube = new THREE.Mesh(blackTubeGeometry, blackMaterial);
  blackTube.position.y = -1; // Position légèrement pour qu'il soit entrelacé
  scene.add(blackTube);

  camera.position.z = 5; // Ajuste la position de la caméra pour mieux voir les tubes plus gros

  // Fonction de mise à jour pour créer des vagues synchronisées mais moins régulières
  let time = 0;
  function updateCurves() {
    time += 0.003; // Ralentir l'animation

    for (let i = 0; i < redPoints.length; i++) {
      const redAngle = i * 0.7 + time;
      const blackAngle = i * 0.7 + time + 1; // Légèrement décalé pour la courbe noire

      // Modifie l'amplitude et la fréquence des vagues
      redPoints[i].y = Math.sin(redAngle) * 2; // Amplitude de 2 pour la courbe rouge
      blackPoints[i].y = Math.sin(blackAngle) * 1.2; // Amplitude de 1.2 pour la courbe noire
      // Si l'indice est inférieur ou égal à 50, mettre la courbe rouge en arrière-plan
      if (i <= 30) {
        redPoints[i].z = -2; // Positionner la courbe rouge derrière la noire (axe Z)
      } else {
        redPoints[i].z = 2; // Remettre la courbe rouge au même niveau après i = 50
      }
    }

    // Mettre à jour les courbes
    redCurve = new THREE.CatmullRomCurve3(redPoints);
    blackCurve = new THREE.CatmullRomCurve3(blackPoints);

    // Mettre à jour la géométrie des tubes
    redTube.geometry.dispose(); // Libérer la géométrie précédente
    blackTube.geometry.dispose();
    redTubeGeometry = new THREE.TubeGeometry(redCurve, 100, 1.5, 32, false);
    blackTubeGeometry = new THREE.TubeGeometry(blackCurve, 100, 1.5, 32, false);
    redTube.geometry = redTubeGeometry;
    blackTube.geometry = blackTubeGeometry;
  }

  // Gestion de la taille de la fenêtre
  window.addEventListener("resize", () => {
    const aspect = window.innerWidth / window.innerHeight;
    camera.left = (frustumSize * aspect) / -2;
    camera.right = (frustumSize * aspect) / 2;
    camera.top = frustumSize / 2;
    camera.bottom = frustumSize / -2;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Animation de la scène
  function animate() {
    requestAnimationFrame(animate);

    // Met à jour les courbes pour simuler des vagues moins régulières mais synchronisées
    updateCurves();

    renderer.render(scene, camera);
  }
  animate();
});
</script>

<style scoped>
.three-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
