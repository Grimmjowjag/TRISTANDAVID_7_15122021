<template>
  <div class="home">
    <img id="logo" alt="Vue logo" src="../assets/icon-left-font-monochrome-black.png">
    <Accueil msg="Bienvenue sur le site Groupomania"/>
  </div>

  <!-- <div class="card">
    <div class="form-row">
      <input v-model="email" class="form-row__input" type="text" placeholder="Adresse mail"/>
    </div>
  </div> -->
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
