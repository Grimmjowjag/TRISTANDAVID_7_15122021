<template>
  <div class="card">
    <h1 class="card__title">Profil</h1>
    <p class="card__subtitle">Informations de compte</p>
    <p>{{user.prenom}} {{user.nom}} {{user.email}}</p>
    <div class="form-row">
      <button @click="supress()" class="suppressbutton">
        Supprimer le compte
      </button>
      <button @click="logout()" class="button">
        Déconnexion
      </button>
    </div>
  </div>
</template>

<script>

import {mapState } from 'vuex'

export default {
  name: 'Profile',
  mounted: function () {
    console.log(this.$store.state.user)
    if (this.$store.state.user.userId == -1) {
        this.$router.push('/')
        return
    }
    this.$store.dispatch('getUserInfos')
  },
  computed: {
    ...mapState({
      user: 'userInfos',
    })
  },
  methods: {
    supress: function () {
      this.$store.commit('supress')
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
  width: 50%;
  padding: 12px;
  transition: .4s background-color;
  margin-bottom: 1em;
}

</style>