<template>
  <div class="card">
    <h1>{{ msg }}</h1>
    <div class="card_newPost">
      <div>
        <h2>Nouvelle publication :</h2>
        <input
          v-model="title" type="text" class="form-row-input" placeholder="Titre"/>
      </div>
      <button @click="addPost()" id="newPost">Ajouter une Publication</button>
    </div>

    <!-- <p v-if="abonnes == 0">Aucun like pour le moment 😥</p>
    <p v-else-if="abonnes == 1">Une personne aime ce post, c'est super ! 💪</p>
    <p v-else>{{ abonnes }} personnes ont liké 🔥</p>
    <button class="likebutton" @click="like()">Like !</button> -->
    <button class="comsbutton" @click="Seecoms()">Voir les commentaires</button>

    <div class="comment" v-for="(comment, idx) in comments" v-bind:key="idx">
      <h3>{{ comment.nom }}</h3>
      <p>{{ comment.commentaire }}</p>
      <div v-if="comment.note > 1">
        <span v-for="i in comment.note" v-bind:key="i">👍</span>
      </div>
      <span v-else>👎</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Fil actualité",
  props: {
    msg: String,
  },
  data: function () {
    return {
      abonnes: 0,
      comments: [
        {
          nom: "Tristan",
          commentaire: "C'est de la bombe !",
          note: 2,
        },
        {
          nom: "Jean Michel",
          commentaire: "J'adore ce que tu fais continue !",
          note: 5,
        },
        {
          nom: "Marc Aigri",
          commentaire: "C'est nul",
          note: 1,
        },
      ],
    };
  },
  methods: {
    // Cette fonction va permettre d'incrémenter le nombre d'abonnés
    like: function () {
      this.abonnes++;
    },
  },
};
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
  font-size: 22px;
}

.card {
  max-width: 100%;
  width: 1200px;
  background: white;
  border-radius: 16px;
  padding: 32px;
  margin-top: 1em;
}

.form-row-input {
  width: 30%;
  font-weight: bold;
  border-radius: 1em;
  border: none;
  margin: 1em;
  padding: 1em;
}

input {
    background: whitesmoke;
}


.comment {
  width: 400px;
  background: rgb(92, 110, 229);
  border-radius: 16px;
  padding: 32px;
  margin-top: 1em;
}

button {
  background-color: #091f43;
  color: white;
  font-weight: bold;
  margin: 1em;
  padding: 1em;
  border: none;
  border-radius: 1.5em;
  font-size: 1em;
  cursor: pointer;
}
</style>
