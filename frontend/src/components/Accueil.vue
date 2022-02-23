<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p v-if="abonnes == 0">Aucun abonnés pour le moment 😥</p>
    <p v-else-if="abonnes == 1">Une personne s'est abonnée, c'est super ! 💪</p>
    <p v-else>{{abonnes}} personnes se sont abonnées 🔥</p>
    <p>Le total général depuis VueX est de {{ abonnesGeneral }}</p>
    <button @click="subscribe()">S'abonner !</button>
    <div class="comment" v-for="(comment, idx) in comments" v-bind:key="idx">
      <h3>{{comment.nom}}</h3>
      <p>{{comment.commentaire}}</p>
      <div v-if="comment.note > 1">
        <span v-for="i in comment.note" v-bind:key="i">🍌</span>
      </div>
      <span v-else>💩</span>
    </div>  
  </div>
</template>

<script>
export default {
  name: 'Accueil',
  props: {
    msg: String
  },
  computed: {
    abonnesGeneral(){
      return this.$store.state.abonnesFromVueX
    }
  },
  data: function () {
    return {
      abonnes: 0,
      comments: [{
        nom: 'Tristan',
        commentaire: "C'est de la bombe !",
        note: 2,
        },{
        nom: 'Jean Michel',
        commentaire: "J'adore ce que tu fais continue !",
        note: 5},{
        nom: 'Marc Aigri',
        commentaire: "C'est nul",
        note: 1,
      }]
    }
  },
  methods: {
    // Cette fonction va permettre d'incrémenter le nombre d'abonnés
    subscribe: function () {
      this.abonnes++
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

p {
  font-size: 22px
}

button {
  background-color: #4189f5;
  color: white;
  font-weight: bold;
  padding: 1em;
  border: none;
  border-radius: 1.5em;
  font-size: 1em;
  cursor: pointer;
}

</style>
