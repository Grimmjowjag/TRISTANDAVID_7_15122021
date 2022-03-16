<template>
  <div class="card">
    <h1 class="card__title">Profil</h1>
    <p class="card__subtitle">Informations de compte</p>
    <div class="profile__infos">
      <div>
        <p>{{user.prenom}}{{user.nom}}{{user.email}}{{user}}</p>
      </div>
    </div>

    <div class="form-row">
      <button @click="modify()" class="modifybutton">
        Modifier le profil
      </button>
      <button @click="supressProfile()" class="suppressbutton">
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

  data: function () {
    return {
      admin: false,
    }
  },
  
  computed: {
    ...mapState({
      user: 'userInfos',
    })
  },
  methods: {
    switchTosupressProfile: function () {
        this.mode='supressProfile'
    },
    supressProfile: function () {
      const self = this
      this.$store.dispatch('supressProfile', {
      
      })
      .then(function () {
        self.$router.push('/profile')
      }, function (error) {
        console.log(error)
      })
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
  width: 50%;
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