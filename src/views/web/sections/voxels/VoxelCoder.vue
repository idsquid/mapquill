<template>
<div class="voxel-coder">
  <div class="dimension-input di">
    <span>X</span>
      <div class="numeric-selector">
        <input v-model.number="ux1" inputmode="numeric" pattern="[0-9]*">
        <v-icon scale=".9" name="minus-square" @click="ux1 -= 1"/>
        <v-icon scale=".9" name="plus-square" @click="ux1 += 1" />
      </div> 
    <span class="plain">to</span> 
    <div class="numeric-selector">
      <input v-model.number="ux2" inputmode="numeric" pattern="[0-9]*">
      <v-icon scale=".9" name="minus-square" @click="ux2 -= 1"/>
      <v-icon scale=".9" name="plus-square" @click="ux2 += 1" />
    </div>
  </div>
  <div class="dimension-input di">
    <span>Y</span>
    <div class="numeric-selector">
      <input v-model.number="uy1" inputmode="numeric" pattern="[0-9]*">
      <v-icon scale=".9" name="minus-square" @click="uy1 -= 1"/>
      <v-icon scale=".9" name="plus-square" @click="uy1 += 1" />
    </div> 
    <span class="plain">to</span> 
    <div class="numeric-selector">
      <input v-model.number="uy2" inputmode="numeric" pattern="[0-9]*">
      <v-icon scale=".9" name="minus-square" @click="uy2 -= 1"/>
      <v-icon scale=".9" name="plus-square" @click="uy2 += 1" />
    </div>
  </div>
  <div class="dimension-input di">
    <span>Z</span>
    <div class="numeric-selector">
      <input v-model.number="uz1" inputmode="numeric" pattern="[0-9]*">
      <v-icon scale=".9" name="minus-square" @click="uz1 -= 1"/>
      <v-icon scale=".9" name="plus-square" @click="uz1 += 1" />
    </div> 
    <span class="plain">to</span> 
    <div class="numeric-selector">
      <input v-model.number="uz2" inputmode="numeric" pattern="[0-9]*">
      <v-icon scale=".9" name="minus-square" @click="uz2 -= 1"/>
      <v-icon scale=".9" name="plus-square" @click="uz2 += 1" />
    </div>
    </div>
  <button class="coder-action-button" @click="buildFromInputs">
    <slot class="hammer-icon"></slot>
  </button>
</div>
</template>

<script>
export default {
  name: 'voxel-coder',
  data() {
    return {
      ux1: 1,
      ux2: 1,
      uy1: 1,
      uy2: 1,
      uz1: 1,
      uz2: 1
    }
  },
  emits: ['triggerAction'],
  computed: {
    vertSlider: {
      get() {return this.useVert},
      set(val) {
        this.thePost.vertAdjust = val
      }
    }
  },
  methods: {
    buildFromInputs() {
      // check good numbers
      const fields = ['ux1','ux2','uy1','uy2','uz1','uz2']
      //
      let goodInputs = true
      //
      fields.forEach(f => {
        let value = parseInt(this[f])
        if (typeof value != 'number') {
          goodInputs = false
        }
      })
      for (var i=0; i<fields.length; i += 2) {
        const s = fields[i],
              e = fields[i+1]
        if (this[s] > this[e]) {
          goodInputs = false
        }
      }
      //
      if (!goodInputs) {
        alert('bad inputs!')
      } else {
//          CHECKS OUT - GOOD INPUTS
//          DO THE BUILDING
        for (var x = this['ux1']; x <= this['ux2']; x++) {
          for (var y = this['uy1']; y <= this['uy2']; y++) {
            for (var z = this['uz1']; z <= this['uz2']; z++) {
//              if (this.activeControl == 'cube') {
//                this.createCubeAt(null, x, y, z)
//              }
//              if (this.activeControl == 'trash' || this.activeControl == 'tint') {
//                for (var k=0; k<this.cubes.length; k++) {
//                  const checkMe = this.cubes[k]
//                  if (checkMe[0]==x && checkMe[1]==y && checkMe[2]==z) {
//                    if (this.activeControl == 'trash') {
//                      this.cubes.splice(k,1)
//                    }
//                    if (this.activeControl == 'tint') {
//                      this.cubes[k][3] = this.currentClass
//                      this.changes++
//                    }
//                    break;
//                  }
//                }
//              }
              this.$emit('triggerAction', {x:x, y:y, z:z})
            }
          }
        }
      }
    }
  }
}

</script>

<style lang="scss">
  .voxel-coder {
    display: grid;
    @include centered;
    grid-template: repeat(3, auto) / 70% 30%;
    grid-template-areas: 'x action' 'y action' 'z action';
    background-color: $lightyellow;
    box-sizing: border-box;
    padding: .5em 0;
    border: 1px dashed $lightblue;
    grid-row-gap: 8px;
/*    grid-column-gap: 8px;*/
    
    @include phone-only {
      grid-template: none / repeat(3, 30%) 1fr;
      grid-template-areas: 'x y z action';
      grid-area: coder;
/*      width: 90%;*/
    }
    
    .di {
      @include row(center, center);
      box-sizing: border-box;
/*      padding: 5px;*/
      &:nth-child(1) {
        grid-area: x;
      }
      &:nth-child(2) {
        grid-area: y;
      }
      &:nth-child(3) {
        grid-area: z;
      }
      span {
        box-sizing: border-box;
        padding: 5px;
        font-weight: bold;
        background-color: $darkgrey;
        color: $lightorange;
        border-radius: 1em 0 0 1em;
        border: 1px solid $medgrey;
        border-right: none;
        &.plain {
          border-radius: 0;
          border-left: none;
        }
      }
    }
    button.coder-action-button {
      grid-area: action;
      width: 2em;
      justify-self: center;
      margin-bottom: .5em;
      border-radius: 3em;
      background-color: $lightorange;
      color: $lightblack;
      border: 1px solid black;
/*      margin: 0 10px;*/
      @include phone-only {
        align-self: center;
      }
    }
  }
  .numeric-selector {
    display: grid;
    grid-template: 2em 1.5em / 1.5em 1.5em;
    background: $lightgrey;
    color: $lightorange;
    > * {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }
    :first-child {
      grid-column: 1 / 3;
    }
  }
</style>