<template>
  <div>
  <nav>
    <router-link to="/">Accueil</router-link> |
    <router-link to="/about">Fil d'actualité</router-link> |
    <router-link :to="{name: 'Profile', params: {name: 'Vous pouvez modifier votre profil'}}">Profil</router-link>
  </nav>
  <router-view/>
  </div>
</template>

<script>
import Accueil from './components/Accueil.vue'

export default {
  name: 'App',
  components: {
    Accueil
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

/* nav a {
  font-size: 1.5em;
} */

a {
  text-decoration: none;
  color: blue;
}

.router-link-active {
  font-weight: bold;
  color: rgb(39, 39, 218);
}

#logo {
  width: 200px
}

</style>
