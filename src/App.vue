<template>
  <div id="app">
    <p v-if="demoMsg" class="demo-message">Welcome to Chicago! Feel free to make changes, create, edit, destroy. This is just a demo, so your changes will not be saved. <a @click="demoMsg = false">CLOSE</a></p>
    <keep-alive> 
      <router-view v-if="!loading"></router-view>
      <div v-else class="loading-screen">loading...</div>
    </keep-alive>
    <a v-if="isDemo" @click="exportAllPosts">download</a>
  </div>
</template>

<script>
  import { DEMOPOSTS } from '@/demo.js'
  import AuwalkPost from '@/components/AuwalkPost.js'
  
  export default {
    name: 'mapquill-beta-vue',
    data: function() {
      return {
        loading: true,
        isDemo: false, // allows download of posts, etc.
        demoMsg: false
      }
    },
    async created() {
      // DOWNLOAD POSTS
      if (this.$store.getters['user/currentMap'] == 'demo') {
        this.$store.commit('posts/addAudioPosts', DEMOPOSTS)
      }
      else if (this.$store.getters.useRemoteDatabase) {
        const posts = await this.$store.dispatch('getRemotePosts')
        this.$store.commit('posts/addAudioPosts', posts)
        console.log('posts fetched by App created')
      } else {
        const localStorage = window.localStorage,
              localPosts = localStorage?.getItem('allPosts')
        if (localPosts) {
          this.$store.commit('posts/addAudioPosts', JSON.parse(localPosts))
        }
      }
      
      // REMEMBER USER's first request 
      this.$store.commit('user/setInitialQuery') // tells the user module to store the initial url params
      
      this.loading = false
    },
    methods: {
      exportAllPosts() {
        // BUILD DATA START
        let raw = this.$store.state.posts.allAudioPosts,
            exportablePosts = [],
            data = 'export const DEMOPOSTS = '
        raw.forEach(post => {
          let dpost = new AuwalkPost(post)
          //
          if (post.audioPostType == 'home') post.audioUrl = null
          dpost.audioFile = null // prevent txt caching
          dpost.fileKey = null // no need for this in the demo
          dpost.cubeDataLoaded = true
          //
          exportablePosts.push(dpost)
        })
        data += JSON.stringify(exportablePosts, null, 0)    
        // BUILD DATA FINISHED

          var type = 'javascript',
              filename = 'mapquill download',
              file = new Blob([data], {type: type});
          if (window.navigator.msSaveOrOpenBlob) // IE10+
              window.navigator.msSaveOrOpenBlob(file, filename);
          else { // Others
              var a = document.createElement("a"),
                      url = URL.createObjectURL(file);
              a.href = url;
              a.download = filename;
              document.body.appendChild(a);
              a.click();
              setTimeout(function() {
                  document.body.removeChild(a);
                  window.URL.revokeObjectURL(url);  
              }, 0); 
          }
      }
    }
  }
</script>

<style lang="scss">
  @import "@/css/boilerplate.scss";
  
  .demo-message {
    position: absolute;
    top: 0;
    margin: 0;
    left: 0;
    z-index: 999;
    width: 90%;
    max-width: 600px;
    background: #000000ee;
    color: white;
    padding: 2em;
    a {
      padding: .25em;
      background: white;
      position: relative;
      top: 5px;
      left: 5px;
    }
  }
</style>
