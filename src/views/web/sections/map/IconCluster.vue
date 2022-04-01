<template>
<div class="icon-cluster" :class="topClass">
  <content-flower :posts="allContentPosts" :store="store"></content-flower>
  <voxel-cluster v-if="useVoxelCluster" :posts="structurePosts" :store="store"></voxel-cluster>
  
  <div class="empty-cluster">
    <v-icon name="map-pin" v-for="(c,i) in clusterChildren" :key="'empty-structure-'+i"></v-icon>
  </div>
  
  <div class="content-info" v-if="allContentPosts.length">
    {{ allContentPosts.length }}
<!--    <v-icon name="camera" style="fill:white;"></v-icon>-->
  </div>
  
  <div class="cluster-info">
    {{ clusterChildren.length }} 
<!--    <v-icon name="home" style="fill:white;"></v-icon>-->
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import VoxelCluster from '@/views/web/sections/voxels/VoxelCluster.vue' 
import ContentFlower from '@/views/components/ContentFlower.vue' 
  
export default Vue.extend({
  name: 'icon-cluster',
  props: ['cluster', 'store'],
  data() {
    return {
      useVoxelCluster: true
    }
  },
  components: {
    ContentFlower,
    VoxelCluster
  },
  created() {
    for (const p of this.allPosts) {
      if (p.audioPostType == 'home' && !p.cubeDataLoaded) {
        this.store.dispatch('posts/loadCubeData', p)
      }
    }
  },
  computed: {
    topClass() {
      return {
        'use-content-flower-circle': true, //this.useContentPosts.length > 0,
        'got-content': this.useContentPosts.length > 0,
        'no-visible-content': null, //this.useContentPosts.length == 0,
        'got-voxels': this.structurePosts.length > 0,
        'got-nothing': this.allContentPosts.length == 0 && this.structurePosts.length == 0
      }
    },
    clusterChildren: function() {
      return this.cluster.getAllChildMarkers()
    },
    allPosts() {
      //
        let allContent = []
        let numStructures = 0
        let payload = []
        const contentLimit = 16
        const structLimit = 16
        const source = this.clusterChildren 
        
        for (var i=0; i<source.length; i++) {
          const marker = source[i],
                content = this.store.getters['posts/contentById'](marker.options.audioId),
                theStructure = this.store.getters['posts/structureById'](marker.options.audioId)
          
          if (allContent.length < contentLimit) {
            if (theStructure.cubeScale > 720) {
              for (var c of content) { c.fromStructure = false }
            }
            allContent = allContent.concat(content)
          }
          if (numStructures < structLimit) {
            allContent = allContent.concat(theStructure)
            numStructures++
          }
        }
      
        // sorting here is necessary, yes.
        allContent.sort((a,b) => {
          return a.postDate < b.postDate ? 1 : -1 
        })
        
        // push to payload
        for (var j = 0; j < allContent.length; j++) {
          payload.push(allContent[j])
        }
      
      // send Something
      while (payload.length < 2) {
        payload.push({})
      }
      
        return payload
    },
    allContentPosts() {
      return this.allPosts.filter((p) => {return p.audioPostType == 'content'}) || []
    },
    useContentPosts() {
      // create some anonymity
      return this.allContentPosts.filter((p) => {return p.fromStructure === false}) || []
    },
    structurePosts() {
      return this.allPosts.filter((p) => {return p.audioPostType == 'home' && p.cubeData.length > 1}) || []
    }
  },
  methods: {
    postStyle(post) {
      if (post.mimeType == 'image') {
        return 'background-image: url(' + post.audioUrl + ')'
      } else {
        return ''
      }
    }
  }
})

</script>

<style lang="scss">
$pieSize: 8em;
  
.icon-cluster {
  @include column(center, center);
  position: absolute;
  top: -$pieSize/2;
  left: -$pieSize/2;
  z-index: -2;
  width: $pieSize;
  height: $pieSize;
  overflow: hidden;
  border-radius: 1em;
  border: 2px solid $darkblue;
  &.use-content-flower-circle {background-color: #004b99aa; 
  }
  &.got-nothing {background-color: $markerBlueFaded; box-shadow: none; border: 1px dashed $darkblue; border-radius: 10em;
  }
  &.got-voxels.no-visible-content {
/*    border-radius: 10em 0;*/
    background-color: #eeeeee44;
  }
  background-color: $medblue;
  box-sizing: border-box;
  box-shadow: 6px 18px 11px rgb(0 0 0 / 46%);
  color: white;
  
  // LAYOUT
  display: grid;
  grid-template: 33% 1fr / 1fr 33%;
  .content-flower {
    display: none;
  }
  &.use-content-flower-circle .content-flower {
    display: flex;
    .flower-post {
      border-radius: 10em;
    }
  }
  &.got-voxels .content-flower {
    display: grid;
  }
  &.no-visible-content .content-flower {
    display: none;
  }
  .voxel-cluster, .content-flower {
    grid-column: 1 / 3;
    grid-row: 1 / 3;
    border-radius: 8px;
/*    opacity: .9;*/
    .flower-post {
      border-radius: 8px;
    }
  }
  &.got-content .voxel-cluster {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
    background: linear-gradient($darkblue 0%, #eeeeee 50%);
  }
}
  .empty-cluster {display: none;}
  .icon-cluster.got-nothing {
    display: flex;
/*    background-color: transparent;*/
    .empty-cluster {
      display: block;
    }
  }
  
  .cluster-info {
    background-color: $darkblue;
    position: absolute;
    left: 0em;
    bottom: 0em;
    z-index: 1;
    color: $lightwhite;
    font-weight: bold;
/*    text-shadow: -2px 2px 4px black;*/
    font-size: 14px;
    margin: 0 0 -1px -1px;
    padding: .25em;
    border-radius: 0em;
    min-width: 1em;
    text-align: center;
    border-radius: 0 5px 0 0;
  }
  .content-info {
    @extend .cluster-info;
    background: $medpurple;
/*    color: black;*/
/*    text-shadow: 2px 2px 4px white;*/
    top: 0;
    bottom: auto;
    right: 0;
    left: auto;
    border-radius: 0 0 0 5px;
  }


</style>