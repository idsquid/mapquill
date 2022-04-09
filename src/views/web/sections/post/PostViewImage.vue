<template>
  <div class="image-post pointerable">
    
    <img v-if="thePost.audioUrl" :src="thePost.audioUrl" @load="$emit('contentLoaded')">
    <v-icon v-else class="loading-indicator" name="spinner" spin></v-icon>
    
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'image-post-view',
  props: ['thePost'],
  computed: {
    imageStyle() {
      return 'background-image: url('+this.thePost.audioUrl+');'
    }
  }
})
</script>

<style lang="scss">
  .image-post {
    @include column(center, center);
    width: 100%;
    height: 100%;
/*    min-width: 280px;*/
/*    min-height: 280px;*/
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    overflow: scroll;
    img {
/*      max-height: 150px; //280px;*/
      height: 200px;
    }
  }
  
/*  ENVS*/
  .timeline .image-post img {
    max-height: 145px;
  }
  
</style>