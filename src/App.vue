<template>
  <div id="app">
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
        isDemo: false,
        allowDownload: true
      }
    },
    async created() {
      // DOWNLOAD POSTS
      if (this.$store.getters['user/currentMap'] == 'demo') {
        console.log('loading demo')
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
          post.audioUrl = 'https://tradbot.com/demo/dist/'
          post.audioFile = null // prevent txt caching
          post.fileKey = null // no need for this in the demo
          exportablePosts.push(new AuwalkPost(post))
        })
        data += JSON.stringify(exportablePosts)    
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
</style>
