<template>
  <div class="card">
    <h1 class="card__title">Profil</h1>
    <p class="card__subtitle">Informations de compte</p>
    <p class="form-row">Prénom | Nom : <span class="card__action">{{ prenom }} {{ nom }}</span></p>
    <p class="form-row">Email : <span class="card__action">{{ email }}</span></p>
    <div class="form-row">
      <button @click="supressProfile($route.params.userId)" class="suppressbutton">Supprimer le compte</button>

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
      email: "",
      prenom: "",
      nom: "",
      password: "",
    }
  },

  async mounted() {
    if (!this.user.token) {
      this.$router.push("/");
      return
    }
    // const userInfos = await this.getUserInfos(this.user.id) accéder req du store
    this.email = "Tristan@gmail.com"
    this.prenom = "Tristan"
    this.nom = "David"
  },

  computed: {
    ...mapState({
      user: "user",
    }),
  },
  methods: {
    ...mapActions(["supressProfile"]),
    logout: async function () {
      this.$store.commit("logout")
      await this.$router.push("/")
    },
    async supressProfile(userId) {
      await this.supressProfile(userId)
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
  color: #2196f3;
}
</style>