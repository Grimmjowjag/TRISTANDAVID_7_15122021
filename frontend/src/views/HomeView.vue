<template>
  <div class="home">
    <img id="logo" alt="Vue logo" src="../assets/icon-left-font-monochrome-black.png">
    <Accueil msg="Posts Groupomania"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Accueil from '@/components/Accueil.vue'

export default {
  name: 'HomeView',
  components: {
    Accueil
  },
}
</script>
