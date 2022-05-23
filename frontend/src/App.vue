<template>
  <div>
    <nav>
      <router-link to="/home">Posts</router-link> |
      <router-link to="/profile">Profil</router-link> |
      <router-link to="/allProfile">Utilisateurs</router-link>
      
    </nav>
    <router-view />
  </div>
</template>

<script>
import Accueil from "./components/Accueil.vue"

export default {
  name: "App",
  components: {
    Accueil,
  },
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

* {
  box-sizing: border-box;
}

nav {
  color: white;
  font-weight: 800;
  font-size: 18px;
}

a {
  text-decoration: none;
  color: white;
}

.router-link-active {
  font-weight: bold;
  color: #091F43;
}

#logo {
  width: 200px;
}

body {
  background-image: linear-gradient(#D1515A, #091F43);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 32px;
}

img {
  max-width: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
}

.card {
  max-width: 100%;
  width: 600px;
  background: white;
  border-radius: 16px;
  padding: 32px;
  margin-top: 1em;
}

.card__title {
  text-align: center;
  font-weight: 800;
  color: #091F43;
}

.card__subtitle {
  text-align: center;
  color: #666;
  font-weight: 500;
}

.button {
  background: #091F43;
  color: white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 100%;
  padding: 16px;
  transition: 0.4s background-color;
}

.card__action {
  color: #091F43;
  text-decoration: underline;
}

.card__action:hover {
  cursor: pointer;
}

.button:hover {
  cursor: pointer;
  background: #D1515A;
}

.button--disabled {
  background: #cecece;
  color: #ececec;
}

.button--disabled:hover {
  cursor: not-allowed;
  background: #cecece;
}

.suppressbutton {
  background: #091F43;
  color: white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 40%;
  padding: 12px;
  transition: 0.4s background-color;
  margin: 1em;
  cursor: pointer;
}
</style>
