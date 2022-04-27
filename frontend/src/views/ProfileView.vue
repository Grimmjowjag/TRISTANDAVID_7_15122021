<template>
  <div class="card">
    <h1 class="card__title">Profil</h1>
    <p class="card__subtitle">Informations de compte</p>
    <p class="form-row">Prénom | Nom : <span class="card__action">{{ userInfos.prenom }} {{ userInfos.nom }}</span></p>
    <p class="form-row">Email : <span class="card__action">{{ userInfos.email }}</span></p>
    <div class="form-row">
      <button @click="supressProfile(user.userId)" class="suppressbutton">Supprimer le compte</button>

      <button @click="logout()" class="button">Déconnexion</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex"

export default {
  name: "Profile",
  data: function () {
    return {
      
    }
  },

  async mounted() {
    if (!this.user.token) {
      this.$router.push("/");
      return
    }
    else {
      this.$store.dispatch("getUserInfos", this.$store.state.user.userId)
    }
  },

  computed: {
    ...mapState({
      user: "user",
      userInfos: "userInfos"
    }),
  },
  methods: {
    ...mapActions(["supressProfile"]),
    logout: async function () {
      this.$store.commit("logout")
      await this.$router.push("/")
    },
    async supressProfile(userId) {
      await this.$store.dispatch("supressProfile", userId)
      localStorage.clear()
      this.$store.commit("logout")
      await this.$router.push("/")
    },
  },
}
</script>

<style scoped>

.form-row {
    margin: 15px;
    font-weight: bold;
}

.card__action {
  color: #091F43;
}
</style>