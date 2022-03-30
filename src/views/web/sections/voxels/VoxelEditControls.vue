<template>
<div class="vec voxel-edit-controls" v-if="thePost" :class="{'edits-photo': thePost.cubeScale > 720, 'edits-vox': thePost.cubeScale < 720}">
  <div class="vox-cam-toggle">
      <div v-if="thePost.cubeScale < 721" class="button" @click="thePost.cubeScale = 721">Goto Photo Mode</div>
      <div v-else class="button" @click="thePost.cubeScale = 120">Goto Voxel Mode</div>
  </div>
  <div class="sliders">
    <div class="controller">
      <input v-if="thePost.cubeScale > 720" type="range" icon="font-scaler" min="721" max="1440" v-model="fontSlider">
      <input v-else type="range" icon="font-scaler" min="10" max="200" v-model="fontSlider">
      <label for="font-scaler">Scale</label>
    </div>
    <div class="controller">
      <input type="range" icon="horz-scaler" :min="-adjustMinMax" :max="adjustMinMax" v-model="horzSlider" step="1">
      <label for="font-scaler">Left/Right</label>
    </div>
    <div class="controller">
      <input type="range" icon="vert-scaler" :min="-adjustMinMax" :max="adjustMinMax" v-model="vertSlider" step="1">
      <label for="vert-scaler">Up/Down</label>
    </div>
  </div>
  <div class="color-options">
    <div v-for="(color, i) in colorCodes" :key="color" class="swatch" :class="{active: selectedColor == i}" @click="selectColor(i)">
      <v-icon name="circle" :style="'fill:' + color"></v-icon>
    </div>
  </div>
  <div class="edit-options">
    <div v-for="(cont, i) in editControls" :key="cont + '-' + i" class="swatch" :class="{active: selectedControl == i}" @click="selectControl(i)">
      <v-icon :name="editIcons[i]"></v-icon>
    </div>
    <div class="coder-toggle swatch" :class="{open: coderOpen}" @click="coderOpen = !coderOpen"><v-icon name="code"></v-icon></div>
    <div class="swatch delete-all" @click="clearCubes"><v-icon name="ban" style="fill: #bf272c"></v-icon></div>
    
<!--     <a class="a-link" @click="clearCubes">clear all cubes</a>-->
  </div>
  
  <VoxelCoder @triggerAction="(pos) => $emit('triggerAction', pos)" v-if="coderOpen">
    <v-icon :name="editIcons[selectedControl]"></v-icon>
  </VoxelCoder>
 
<!--
  <div class="vox-cam-toggle">
    <div class="button" @click="thePost.cubeScale = 120">Goto Voxel Mode</div>
  </div>
-->
  <div class="preview">
    <voxel-canvas :thePost="thePost"></voxel-canvas>
    <label>Preview</label>
  </div>
  
</div>
<div v-else>
  no post
  </div>
</template>

<script>
import VoxelCanvas from '@/views/web/sections/voxels/VoxelCanvas.vue'  
import VoxelCoder from '@/views/web/sections/voxels/VoxelCoder.vue' 
export default {
  name: 'voxel-edit-controls',
  props: ['colors', 'colorCodes', 'currentColor', 'editControls', 'editIcons'],
  components: {VoxelCanvas, VoxelCoder},
  data() {
    return {
      adjustMinMax: 500,
      selectedColor: 0,
      selectedControl: 0,
      coderOpen: false
    }
  },
  emits: ['newColor', 'newControl', 'triggerAction'],
  computed: {
    thePost() {
       return this.$store.getters['posts/structureById'](this.$route.params.audioId)
    },
    useScale() {
      return this.thePost?.cubeScale || 100
    },
    useVert() {
      return this.thePost?.vertAdjust || 0
    },
    useHorz() {
      return this.thePost?.horzAdjust || 0
    },
    fontSlider: {
      get() {
        return this.useScale
      },
      set(val) {
        this.thePost.cubeScale = val
      }
    },
    horzSlider: {
      get() {return this.useHorz},
      set(val) {
        this.thePost.horzAdjust = val
      }
    },
    vertSlider: {
      get() {return this.useVert},
      set(val) {
        this.thePost.vertAdjust = val
      }
    }
  },
  methods: {
    selectColor(i) {
      this.selectedColor = i
      this.$emit('newColor', i)
    },
    selectControl(i) {
      this.selectedControl = i
      this.$emit('newControl', i)
    },
    clearCubes() {
      const doIt = confirm("Are you sure? This will delete all the cubes...")
      if (doIt) {
      const thePost = this.thePost
      thePost['cubeData'] = []
      thePost['cubeScale'] = 100
      thePost['horzAdjust'] = 0
      }
    }
  }
}
</script>

<style lang="scss">
  .voxel-edit-controls {
    display: grid;
    font-size: 12px;
    grid-template: repeat(99, auto) / none;
    background-color: #ffffffaa;
    grid-template-areas: 'toggle';
    @include phone-only {
      grid-template: repeat(3, auto) / repeat(3, 33%);
      grid-template-areas: '. . toggle' 'slider slider slider' 'colors actions preview' 'coder coder coder';
      .sliders {
        grid-area: slider;
        .controller {
        display: grid;
        grid-template: none / 80% 1fr;
        }
      }
      .color-options, .vox-cam-toggle {
        grid-area: colors;
      }
      .edit-options {
        grid-area: actions;
      }
      .preview {
        grid-area: preview;
      }
    }
    & > div {
      margin: .5em 0;
/*      padding: 5px;*/
      box-sizing: border-box;
    }
    
    &.edits-photo {
      .color-options, .edit-options {
        display: none;
      }
    }
    &.edits-vox {
      
    }
    
    .vox-cam-toggle {
      grid-area: toggle;
      
    }
    
    .sliders, .color-options, .edit-options {
      padding: 0 5px;
    }
    
  }
  
/*
  .controller {
    @include column(center, center);
    input {
      width: 90%;
    }
  }
*/
  .preview {
    @include column(center, center);
  }
  
  .edit-options {
    position: relative;
    .a-link {
      position: absolute;
      right: 0;
      bottom: 0;
      margin: 1em 0;
      color: $medpurple;
/*      border: 1px solid $lightred;*/
/*      padding: 3px;*/
      text-decoration: underline;
    }
  }
  .swatch {
    @include column(center, center);
    float: left;
    box-sizing: border-box;
    background-color: $darkwhite;
    width: 2em;
    height: 2em;
    border: 1px solid black;
    border-left-color: $darkwhite;
    border-top-color: $lightwhite;
    cursor: pointer;
    &.active, &.open {
      box-shadow: 0 0 3px black inset;
      border: none;
      background-color: #2196f33e;
    }
    
    &.coder-toggle {
/*      margin-left: 1em;*/
/*      border-radius: 10px;*/
      color: $medblue;
      width: 3em;
/*      background-color: $lightgrey;*/
      clear: both;
      margin-right: 5px;
      &.open {
        background-color: $lightyellow;
        transform: scale(.9);
      }
    }
    &.delete-all, &.coder-toggle {
      margin-top: 5px;
      border-radius: 3px;
      border-top-color: $darkyellow;
      border-left-color: $darkyellow;
/*      border-style: dashed;*/
      background-color: $medwhite;
/*      clear: both;*/
/*      float: right;*/
/*      border-color: transparent;*/
/*      background-color: transparent;*/
    }
  }
  
</style>