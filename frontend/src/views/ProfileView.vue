<template>
  <div class="card">
    <h1 class="card__title">Profil</h1>
    <p class="card__subtitle">Informations de compte</p>
    <p class="form-row">Nom | prénom : <span class="card__action">{{ prenom }} {{ nom }}</span></p>
    <p class="form-row">Email : <span class="card__action">{{ email }}</span></p>
    <div class="form-row">
      <button @click="modify()" class="modifybutton">
        Modifier le profil
      </button>
      <button @click="supressProfile($route.params.userId)" class="suppressbutton">
        Supprimer le compte
      </button>
      <button @click="logout()" class="button">
        Déconnexion
      </button>
    </div>
  </div>
</template>

<script>

import {mapActions, mapState } from 'vuex'

export default {
  name: 'Profile',
  data: function () {
    return {
      email: '',
      prenom: '',
      nom: '',
      password: '',
    }
  },

  async mounted() {
    this.email = "Tristan@gmail.com"
    this.prenom = "Grimmjow"
    this.nom = "Jaggerjack"
  },

  computed: {
    ...mapState({
      user: 'user',
    })
  },
  methods: {
    ...mapActions(['supressProfile']),
    async supressProfile(userId){
      await this.supressProfile(userId)
      localStorage.clear()
      this.$store.commit('logout')
      await this.$router.push('/home')
    },

    logout: function () {
      this.$store.commit('logout')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

.suppressbutton {
  background: #4189f5;
  color:white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 40%;
  padding: 12px;
  transition: .4s background-color;
  margin: 1em;
  cursor: pointer;
}

.modifybutton {
  background: #4189f5;
  color:white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 40%;
  padding: 12px;
  transition: .4s background-color;
  cursor: pointer;
}

.profile__infos {
  display: flex;
  color:black;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
}

</style>