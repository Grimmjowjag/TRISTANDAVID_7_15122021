<template>
  <div class="card">
    <h1>{{ msg }}</h1>
    <div class="card_Post">
      <div>
        <div class="card_newPost">
          <h2>Nouvelle publication :</h2>
          <input v-model="title" type="text" class="form-row-input" placeholder="Titre"/>
            <div class="form-row">
              <textarea v-model="description" class="form-row" cols="30" rows="5"/>
              <input class="postSource" name="source" type="file" accept="image/jpg, image/jpeg, image/png, image/webp, image/gif, video/x-msvideo, video/mp4, video/mpeg, video/ogg, video/mp2t, video/webm, video/3gpp , video/3gpp2">
            </div>
          <button @click="addPost()" id="Post">Ajouter une publication</button>
        </div>

        <div class="card_newPost" v-for="post of posts" :key="post.id">
          <div id="title">
            <h1>{{post.title}}</h1> 
            <h3>{{post.description}}</h3>
            <h2><span v-if="user.isAdmin || user.id == post.UserId" @click="delPost(post.id)" class="button">Supprimer 🗑️</span></h2>
          </div>

          <div id="content">
            <p>{{post.content}}</p>
            <div v-if="post.imageUrl">
              <img v-if="['jpg','png','gif','webp'].includes(post.imageUrl.split('.').pop())" :src="post.imageUrl"/>
            </div>
            <p>{{ post.createdAt }}</p>
            <button @click="addCom(post.id)">Ajouter un commentaire</button>
          </div>


          <div id="comments" v-for="comment of comments[post.id]" :key="comment.id">
            <h3>{{ comment.User }} <span v-if="user.isAdmin || user.id == comment.UserId" @click="delCom(post.id, comment.id)" class="button">Supprimer com</span></h3>
            <p>{{ comment.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment"
moment.locale("fr")

export default {
  name: "Posts",
  props: {
    msg: String,
  },
  data: function () {
    return {
      posts: [],
      comments: {},
      title: "",
      description: "",
    }
  },

  async mounted() {
    if (!this.user.token) {
      this.$router.push("/");
      return;
    }
    const postsInfos = await this.getAllPosts();
      postsInfos.data.forEach(post => { 
        post.createdAt = moment(post.createdAt).format('MMMM Do YYYY, HH:mm:ss')
       })
      this.posts = postsInfos.data
    },

  computed: {
    ...mapState({
      user: "user",
      post: "posts",
    }),
  },

  methods: {

    // async addCom(postid) {
    //   try {
    //     await this.createComment({

    //       content: this.content 
    //     })
    //   }
    // },

    async comment(postid) {
      try {
        const data = await this.getPostComment(postid);
        this.comments[postid] = data.comment;
      } catch (error) {
        console.log(error)
      }
    },

    addCom(postid) {
      this.$router.push("/comment/" + postid);
    },

    async addPost() {
      try {
        const source = document.querySelector(".postSource").files[0];
        const postSource = new FormData();
        postSource.append("imageUrl", source);
        postSource.append("title", this.title);
        postSource.append("description", this.description);
        await this.createPost(postSource);
        const res = await this.getAllPosts()
        this.posts = res.data
      } catch (error) {
        console.log(error);
      }
    },

    async delPost(postid) {
      console.log(postid);
      await this.$store.dispatch("deletePost", postid)
      const postsInfos = await this.getAllPosts();
      this.posts = postsInfos.data
    },

    ...mapActions(["getAllPosts","createPost","deletePost","postReaction","getPostComment", "createComment","deleteComment"]),
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1 {
  background-color: #205ec3;
  color: white;
  font-weight: bold;
  margin: 1em;
  padding: 1em;
  border: none;
  border-radius: 1.5em;
  font-size: 1em;
}

h2 {
  border-radius: 10px;
}

h3 {
  font-size: 1.5em;
}

p {
  font-size: 22px;
  background-color: #d7d7d7;
  /* width: 30%; */
}

img, video {
  max-width: 95%;
}

#title {
  width: 99%;
  display: inline-flex;
  justify-content: space-between;
}

#comments {
  width: 300px;
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
  max-width: 100%;
  width: 80%;
  box-sizing: border-box;
  margin: auto;
  background: #d7d7d7;
  border-radius: 16px;
  padding: 32px;
}

.card_newPost {
  max-width: 100%;
  background: white;
  border-radius: 16px;
  padding: 32px;
  margin: 1em;
}

.form-row {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px 0px;
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
