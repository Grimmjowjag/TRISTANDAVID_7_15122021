<template>
  <div>
    <nav>
      <router-link to="/home">Accueil</router-link> |
      <router-link to="/profile">Profil</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
import Accueil from "./components/Accueil.vue";

export default {
  name: "App",
  components: {
    Accueil,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

nav {
  color: white;
  font-weight: 800;
  font-size: 15px;
}

a {
  text-decoration: none;
  color: white;
}

.router-link-active {
  font-weight: bold;
  color: rgb(39, 39, 218);
}

#logo {
  width: 200px;
}

body {
  background-image: linear-gradient(#c71e1e, #3d3db1);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 32px;
}

img {
  max-width: 100%;
  border-radius: 8px;
}

.card {
  max-width: 100%;
  width: 540px;
  background: white;
  border-radius: 16px;
  padding: 32px;
  margin-top: 1em;
}
.card__title {
  text-align: center;
  font-weight: 800;
  color: blue;
}
.card__subtitle {
  text-align: center;
  color: #666;
  font-weight: 500;
}
.button {
  background: #4189f5;
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
  color: #2196f3;
  text-decoration: underline;
}
.card__action:hover {
  cursor: pointer;
}
.button:hover {
  cursor: pointer;
  background: #1976d2;
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
  background: #4189f5;
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
