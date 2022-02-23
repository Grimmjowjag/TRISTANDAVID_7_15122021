<template>
  <div class="home">
    <img id="logo" alt="Vue logo" src="../assets/logo.png">
    <Accueil msg="Bienvenue sur le site Groupomania"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Accueil from '@/components/Accueil.vue'

export default {
  name: 'HomeView',
  components: {
    Accueil
  }
}
</script>
