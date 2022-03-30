<template>
<div class="content-flower">
    <div :class="'flower-post ' + p.mimeType" v-for="(p, i) in usePosts" :key="'flower-post'+i">
      <img class="flower-post-content" v-if="p.mimeType == 'image'" :src="p.audioUrl">
      <div class="flower-post-content" v-if="p.mimeType == 'audio'"><v-icon name="music"></v-icon></div>
      <div class="flower-post-content" v-if="p.mimeType == 'text' && p.audioPostType == 'content'"><v-icon name="font"></v-icon></div>
<!--
      <div class="flower-post-content a-structure" v-else-if="">
        <voxel-canvas v-if="useVoxels" :thePost="bigData" :store="store"></voxel-canvas>
        <v-icon name="home" color="#fff"></v-icon>
      </div>
-->
    </div>
  </div>
</template>

<script>
//import VoxelCanvas from '@/views/web/sections/voxels/VoxelCanvas.vue'  
  
export default {
  name: 'content-flower',
  props: ['posts', 'store'],
  data() {
    return {
      useVoxels: false
    }
  },
  computed: {
    usePosts() {
      return this.posts.filter((p) => p.audioPostType == 'content').slice(0, 9)
    }
  },
  components: {
//    VoxelCanvas
  }
}
</script>

<style lang="scss">
/*  $content-edge: 10em;*/
  .content-flower.circle, .use-content-flower-circle .content-flower {
    @include on-circle($item-count: 5.5, $circle-size: 8em, $item-size: 4em, $rot: 45, $dir: -1); 
/*    overflow: hidden;*/
    @include column(flex-end, center);
    perspective: 400em;
    perspective-origin: 0em -180em;
    position: absolute;
/*    font-size: 10em;*/
    z-index: 2;
    opacity: 1;
/*    top: -1em;*/
    .flower-post {
      border-radius: 10em;
    }
    .voxel-canvas {
/*
      width: 100%;
      height: 100%;
*/
    }
  }
  .content-flower.grid {
    position: absolute;
    z-index: -1;
    width: 100%; height: 100%;
    display: grid;
    grid-template: repeat(3, 33.333%) / repeat(3, 33.333%);

      .flower-post {
        &:nth-child(4), &:nth-child(5) {
          grid-column-start: 3;
        }
        &:nth-child(6) {
          grid-column-start: 1;
          grid-row-start: 2;
        }
        &:nth-child(7) {
          grid-column-start: 2;
          grid-row-start: 2;
        }
        &:nth-child(8) {
          grid-column-start: 1;
          grid-row-start: 3;
        }
        &:nth-child(9) {
          grid-column-start: 2;
          grid-row-start: 3;
        }
    }  
  }
  .got-voxels  .content-flower {
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
/*    transform: scale(.5);*/
  }
  .flower-post {
    box-sizing: border-box;
    overflow: hidden;
    background-color: #eeeeeeee;
    border: 1px solid black;
    border-radius: 1.2em;
    &.audio {
/*      background-color: $lightgrey;*/
/*      color: $darkwhite; broken */
/*      border: 2px solid $darkblue;*/
    }
    &.image {
/*      opacity: .9;*/
    }
  }
  .flower-post-content {
    @include column(center, center);
    width: 100%; height: 100%;
    font-size: 1em;
    .fa-icon {
      width: 1em;
      height: 1em;
    }
    &.a-structure {
      background: $darkwhite;
      color: $lightgreen;
    }
/*    background: green;*/
  }

</style>