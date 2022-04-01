<template>
<div class="voxel-cluster" v-if="isMounted && posts && cubes.length">
  <voxel-canvas ref="voxelCan" :store="store" :thePost="cubeComp"></voxel-canvas>
</div>

</template>

<script>
import { CANVASWIDTH, CANVASHEIGHT, coordsToPix } from '@/views/web/sections/voxels/VoxelUtils.js' 
import VoxelCanvas from '@/views/web/sections/voxels/VoxelCanvas.vue'  
  
export default {
  name: 'voxel-cluster',
  props: ['posts', 'store'],
  components: {
    VoxelCanvas
  },
  data() {
    return {
      isMounted: false
    }
  },
  mounted() {
    this.isMounted = true // for our voxelCan ref
  },
  computed: {
    cubes() {
      let payload = []
      
      const usePosts = this.posts.filter((p) => {
        return p.cubeDataLoaded && p.cubeData.length
      })
      
      if (usePosts && usePosts.length > 0) {
        
        // SORT BY HEIGHT
//      usePosts.sort((j,k) => {
//        let maxZ1 = 0,
//            maxZ2 = 0
//        
//        for (const c of j.cubeData) {
//          if (c[2] > maxZ1) maxZ1 = c[2]
//        }
//        for (const u of k.cubeData) {
//          if (u[2] > maxZ2) maxZ2 = u[2]
//        }
//        
//        return maxZ2 - maxZ1
//      })
        // SORT BY LATITUDE
        usePosts.sort((j,k) => {
          return k.audioLatLng.lat - j.audioLatLng.lat
        })
        
        
      }
      
      let dx = 0,
          dy = 0,
          lastLng = 0
//          rando = 1// Math.round(Math.random())
      usePosts.forEach((p) => {
        let maxX = 0,
            maxY = 0
//            dir = i % 2
          p.cubeData.forEach((c) => {
            const cube = [c[0] + dx, c[1] + dy, c[2], c[3]]
            
            payload.push(cube)
            
//            if (dir == rando && c[0] > maxX) {
//              maxX = c[0]
//            }
//            if (dir == Math.abs(rando-1) && c[1] > maxY) {
//              maxY = c[2]
//            }
            if (p.audioLatLng.lng > lastLng && c[0] > maxX) {
              maxX = c[0]
            } 
            if (p.audioLatLng.lng < lastLng && c[1] > maxY){
              maxY = c[1]
            }
          })
        dx += maxX
        dy += maxY
        lastLng = p.audioLatLng.lng
      })
      
      return payload
    },
    cubeComp() {
      let useCubes = [],
          useCubeScale = 1,
          maxHorz = {cubeIndex:0},
          maxVert = {cubeIndex:0},
          minHorz = {cubeIndex:0},
          minVert = {cubeIndex:0},
          horzAdjust = 0,
          vertAdjust = 0
      
      if (this.cubes.length > 0) {
        // calc horz and vert adjust
      const cs = 1 // arbitrary(ish) starting point
       for (var i=0; i<this.cubes.length; i++) {
         const cube = this.cubes[i]
         if (cube.length) {
           let pos = coordsToPix(cube, cs, 0, 0)
           
           pos.cubeIndex = i // yes
           
           if (pos.x > maxHorz.x || !maxHorz.x) {maxHorz = pos}
           if (pos.x < minHorz.x || !minHorz.x) {minHorz = pos}
           if (pos.y > maxVert.y || !maxVert.y) {maxVert = pos}
           if (pos.y < minVert.y || !minVert.y) {minVert = pos}

         }
       }
        
       let unscaledWidth = (maxHorz.x + cs) - (minHorz.x - cs),
           unscaledHeight = (maxVert.y + 0) - (minVert.y - cs * 1.3)
        
       useCubeScale = Math.min(CANVASWIDTH / unscaledWidth, CANVASHEIGHT / unscaledHeight)
        
        // apply padding
        const pad = .8
        useCubeScale *= pad
        useCubeScale = Math.min(useCubeScale, 300)
        
        const minHorzCube = this.cubes[minHorz.cubeIndex],
              maxHorzCube = this.cubes[maxHorz.cubeIndex],
              minVertCube = this.cubes[minVert.cubeIndex],
              maxVertCube = this.cubes[maxVert.cubeIndex]
        
        const cubeHeight = useCubeScale * 1.3,
              halfCubeWidth = useCubeScale,
              left = coordsToPix(minHorzCube, useCubeScale, 0, 0),
              right = coordsToPix(maxHorzCube, useCubeScale, 0, 0),
              top = coordsToPix(minVertCube, useCubeScale, 0, 0),
              bottom = coordsToPix(maxVertCube, useCubeScale, 0, 0)
        
        const sw = (right.x + halfCubeWidth) - (left.x - halfCubeWidth),
              sh = (bottom.y + 0) - (top.y - cubeHeight)
        
       const leftShouldBe = (CANVASWIDTH - sw) / 2, //(sw - CANVASWIDTH * pad) / 2,
             leftActual = left.x - halfCubeWidth,
             topShouldBe = (CANVASHEIGHT - sh) / 2,
             topActual = top.y - cubeHeight * 1.5
       
       horzAdjust = leftShouldBe - leftActual
        vertAdjust = (topShouldBe - topActual)
        
        // select cubes
        useCubes = this.cubes
      }
            
      return {
        cubeData: useCubes,
        cubeScale: useCubeScale,
        horzAdjust: horzAdjust,
        vertAdjust: -vertAdjust  //maxDim * .1
      }
    }
  }
}

</script>

<style lang="scss">
  .voxel-cluster {
    width: 100%; height: 100%;
    overflow: hidden;
    overflow: hidden;
    .voxel-canvas {
      width: 100%; height: 100%; 
      box-sizing: border-box;
      overflow: hidden;
    }
    canvas {
      //filter: grayscale(.2) brightness(1.1); // why not
   }
  }
</style>
