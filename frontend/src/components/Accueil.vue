<template>
  <div class="card">
    <h1>{{ msg }}</h1>
    <div class="card_Post">
      <div>
      <hr />
        <div class="card_newPost">
          <h2>Nouvelle publication :</h2>
          <input v-model="title" type="text" class="form-row-input" placeholder="Titre"/>
            <div class="form-row">
              <textarea v-model="description" class="form-row" cols="30" rows="5"/>
              <input class="postSource" name="source" type="file" accept="image/jpg, image/jpeg, image/png, image/webp, image/gif, video/x-msvideo, video/mp4, video/mpeg, video/ogg, video/mp2t, video/webm, video/3gpp , video/3gpp2">
            </div>
          <button @click="addPost()" id="Post">Ajouter une publication</button>
        </div>

        <div class="comments" v-for="(comment, idx) in comments" v-bind:key="idx">
          <h3>{{ comment.nom }}</h3>
          <p>{{ comment.commentaire }}</p>
          <div v-if="comment.note > 1">
          <span v-for="i in comment.note" v-bind:key="i">👍</span>
        </div>
        <span v-else>👎</span>
      </div>
    </div>
      <button @click="addCom()" id="coms">Ajouter un commentaire</button>
      <button @click="delPost()" id="suppressPost">Supprimer la publication</button>
    </div>
  </div>
</template>

<script>

import { mapActions, mapState } from "vuex"

export default {
  name: "Posts",
  props: {
    msg: String,
  },
  data: function () {
    return {
      posts: [],
      comments: {},
      title: '',
      description: '',

    async mounted() {
      if (!this.user.token) {
        this.$router.push("/");
        return
      }
      const postsInfos = await this.getAllPosts()
      this.posts = postsInfos.post
    },

      abonnes: 0,
   
    }
  },

  computed: {
    ...mapState({
      user: "user",
      post: "posts"
    }),
  },

  methods: {
    async addPost() {
      try {
        const source = document.querySelector('.postSource').files[0]
        const postSource = new FormData()
        postSource.append('image', source)
        postSource.append('title', this.title)
        postSource.append('description', this.description)
        await this.createPost(postSource)
        this.$router.go()
      }
      catch (error) {
        console.log(error)
      }
    },
    async delPost(postid) {
      try {
        const data = await this.deletePost({postid})
        delete this.posts.find(el => el.id === postid)
        this.$router.go()
      }
      catch (error) {
        console.error(error)
      }
    },
    ...mapActions(['getAllPosts', 'createPost', 'deletePost', 'postReaction', 'getPostComment', 'deleteComment'])
  },
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
  font-size: 22px;
}

.card_Post {
  max-width: 100%;
  width: 70%;
  margin: auto;
  background: #d7d7d7;
  border-radius: 16px;
  padding: 32px;
}

.card {
  max-width: 100%;
  width: 1400px;
  background: white;
  border-radius: 16px;
  padding: 32px;
  margin-top: 1em;
}

.card_newPost {
  max-width: 100%;
  background: white;
  border-radius: 16px;
  padding: 32px;
  margin-top: 1em;
}

.form-row {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px 0px;
  gap:16px;
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
  height: 22px;
  width: 25%;
}

.comments {
  width: 300px;
  margin: auto;
  background: rgb(38, 109, 232);
  border-radius: 16px;
  padding: 15px;
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
