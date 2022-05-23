<template>
  <div class="card">
    <div class="card_Post">
    <h1>{{ msg }}</h1>
      <div>
        <div class="card_createPost">
          <h2>Nouvelle publication</h2>
          <input v-model="title" type="text" class="form-row-input" placeholder="Titre"/>
            <div class="form-row">
              <textarea v-model="description" class="form-row" cols="30" rows="5"/>
              <input class="postSource" name="source" type="file" accept="image/jpg, image/jpeg, image/png, image/webp, image/gif, video/x-msvideo, video/mp4, video/mpeg, video/ogg, video/mp2t, video/webm, video/3gpp , video/3gpp2">
            </div>
          <button @click="addPost()" id="Post">Ajouter une publication</button>
        </div>

        <div class="card_newPost" v-for="post in posts" :key="post.id">
          <div class="title">
            <h2>{{ post.title }}</h2>
            <h3>{{ post.description }}</h3>
            <button v-if="user.isAdmin || user.userId == post.userId" @click="delPost(post.id)">Supprimer 🗑️</button>
          </div>

          <div class="content">
            <p>{{ post.content }}</p>
            <div v-if="post.imageUrl">
              <img v-if="['jpg','png','gif','webp'].includes(post.imageUrl.split('.').pop())" :src="post.imageUrl"/>
            </div>
            <p>{{ post.createdAt }}</p>

            <div class="reaction">
              <p>{{ post.reactions.length }}</p>
              <button v-if="post.liked" @click="deleteReaction(post.id)"><i class="fa-solid fa-thumbs-up deleteReaction"></i></button>
              <button v-else @click="addReaction(post.id)"><i class="fa-solid fa-thumbs-up addReaction"></i></button>
            </div>

            <h3>Commentaires</h3>
            <div class="comments">
              <input v-model="commentaire" type="text" class="form-row-input" placeholder="Commentaire"/>
              <button @click="addCom(post.id)">Ajouter un commentaire</button>
            </div>

            <div class="Coms" v-for="comment in post.comments" :key="comment.id">
              <h4>{{ comment.description }}</h4>
              <button v-if="user.isAdmin || user.userId == comment.userId" @click="delCom(comment.id)">Supprimer com</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Posts",
  props: {
    msg: String,
  },
  data: function () {
    return {
      posts: [],
      comments: {},
      commentaire:"",
      title: "",
      description: "",
    }
  },

  // Mounted permet d'accéder au DOM et au HTML présent dans le template
  async mounted() {
    if (!this.user.token) {
      this.$router.push("/");
      return;
    }
    const postsInfos = await this.getAllPosts()
    this.posts = postsInfos
  },

  computed: {
    ...mapState({
      user: "user",
      post: "posts",
    }),
  },

  methods: {

    async addPost() {
      try {
        const source = document.querySelector(".postSource").files[0];
        // FormData sera rempli avec les clés/valeurs du formulaire en utilisant les noms de propriétés 
        // de chaque élément pour clé et les valeurs soumises. Cela encodera aussi le contenu des fichiers
        const postSource = new FormData();
        postSource.append("imageUrl", source);
        postSource.append("title", this.title);
        postSource.append("description", this.description);
        await this.createPost(postSource);
        const res = await this.getAllPosts()
        this.posts = res
      } catch (error) {
        console.log(error)
      }
    },

    async delPost(postid) {
      await this.$store.dispatch("deletePost", postid)
      const postsInfos = await this.getAllPosts()
      this.posts = postsInfos
    },

    async addCom(postId) {
      if (this.commentaire == "")
      return
      try {
        await this.createComment({
          postId,
          description: this.commentaire
        })
        const res = await this.getAllPosts()
        this.posts = res
      } catch (error) {
        console.log(error)
      }
    },

    async delCom(commentId) {
      await this.$store.dispatch("deleteComment", commentId)
      const res = await this.getAllPosts()
      this.posts = res
    },

    async addReaction(postId) {
      try {
        await this.addReaction( postId )
        const res = await this.getAllPosts()
        this.posts = res
      } catch (error) {
        console.log(error)
      }
    },

    async deleteReaction(postId) {
      try {
      await this.$store.dispatch("deleteReaction", postId)
      const res = await this.getAllPosts()
      this.posts = res
      } catch (error) {
        console.log(error)
      }
    },

    ...mapActions(["getAllPosts","createPost","deletePost","addReaction", "deleteReaction","getPostComment", "createComment","deleteComment"]),
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1 {
  background-color: #205ec3;
  width: 50%;
  color: white;
  font-weight: bold;
  padding: 1em;
  border-radius: 1.5em;
  font-size: 1em;
}

h2 {
  background-color: #56eded;
  padding: 0.5em;
  border-radius: 0.5em;
}

h3 {
  font-size: 1.5em;
}

h4 {
  padding: 1em;
}

p {
  font-size: 22px;
  margin: 1em;
}

img, video {
  width: 100%;
}

.content {
  max-width: 500px;
  width: 100%;
}

.title {
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
}

.reaction {
  display: flex;
  justify-content: center;
  align-items: center;
}

.addReaction {
  color: red;
}

.deleteReaction {
  color: yellow;
}

.Coms {
  background-color: #56eded;
  border-radius: 1em;
}

.comments {
  background-color: #56eded;
  border-radius: 1em;
}

.card {
  max-width: 100%;
  width: 1400px;
  background: white;
  border-radius: 16px;
  padding: 32px;
  margin-top: 1em;
  margin-left: auto;
  margin-right: auto;
}

.card_Post {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
  width: 80%;
  margin: auto;
  background: #d7d7d7;
  border-radius: 16px;
  padding: 32px;
}

.card_createPost {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  background: white;
  border-radius: 16px;
  padding: 20px;  
  margin: 1em;
}

.card_newPost {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
  background: white;
  border-radius: 16px;
  padding: 20px;
  margin: 1em;
}

.form-row {
  display: flex;
  width: 70%;
  flex-direction: column;
  align-items: center;
  margin: 10px 0px;
}

.form-row-input {
  width: 35%;
  font-weight: bold;
  border-radius: 1em;
  border: none;
  margin: 1em;
  padding: 1em;
}

input {
  background: whitesmoke;
  width: 35%;
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
