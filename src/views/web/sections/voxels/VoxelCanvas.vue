<template>
<div v-if="thePost"  class="voxel-canvas" :class="topClass">
  <div class="canvas-container" v-show="scale <= 720 && cubeData.length">
<!--    <canvas ref="shadowCanvas"></canvas>-->
    <canvas ref="canvas"></canvas>
  </div>
  <div v-if="scale > 720 && photoContent.length" class="photo-container" :style="photoStyle"> </div>
  <v-icon name="map-pin" v-else-if="scale > 720 && !photoContent.length" color="#33333399"></v-icon>
  <slot></slot>
</div>
<div v-else>no post</div>
</template>

<script>
import colors from '@/css/_colors.scss'  
  
export default {
  name: 'voxel-canvas',
  data() {
    return {
      canvas: null,
      ctx: null,
      cs: null, // cubeScale
      canvasWidth: 1000,
      canvasHeight: 1000
    }
  },
  props: ['thePost', 'store'],
  mounted() {
    this.canvas = this.$refs.canvas
    this.ctx = this.$refs.canvas.getContext('2d')
    this.canvas.width = this.canvasWidth
    this.canvas.height = this.canvasHeight
    this.draw()
  },
  computed: {
    topClass() {
      return {
        'photo-mode': this.scale > 720, 
        'voxel-mode': this.scale <= 720, 
        'pin-mode': this.scale > 720 && !this.photoContent.length}
    },
    cubeData() {
      return this.thePost.cubeData
    },
    scale() {
      return this.thePost.cubeScale || "120"
    },
    horz() {
      return this.thePost.horzAdjust || "-5"
    },
    vert() {
      return this.thePost.vertAdjust || "0"
    },
    photoContent() {
      const store = this.store || this.$store // HACKERY!!!
      return store.getters['posts/contentById'](this.thePost.audioId, 'image')
    },
    photoStyle() {
      return {
        backgroundImage: 'url(' + this.photoContent[0].audioUrl + ')',
        backgroundSize: this.scale/4 + '%',
        backgroundPosition: -(this.horz * .20 - 10) + '% ' + this.vert * .50 + '%'
      }
    }
  },
  watch: {
    cubeData() {
      this.draw()
    },
    scale() {
      this.draw()
    },
    horz() {
      this.draw()
    },
    vert() {
      this.draw()
    }
  },
  methods: {
    addImageProcess(src){
      return new Promise((resolve, reject) => {
        let img = new Image()
        img.onload = () => resolve(img)
        img.onerror = function() {
          console.log(src)
          reject()
        }
        img.src = src
      })
    },
    async draw() {
      const ctx = this.ctx,
            w = this.canvasWidth,
            h = this.canvasHeight,
            cs = parseInt(this.thePost.cubeScale) * 1.1
      
      ctx.clearRect(0, 0, w, h);

//      DRAW SHADOWS
      this.thePost.cubeData.forEach(c => {
        let coords = this.cubeCoords([c[0], c[1], c[2]], cs, this.thePost.horzAdjust, this.thePost.vertAdjust),
            h = cs * 1.33,
            shadeOpacity = (10 - c[2]) / 50,
            shade = 'rgba(33, 33, 33, ' + shadeOpacity + ')'
        
        coords.x = coords.x + c[2] * coords.wx - coords.wx 
        coords.y = coords.y + c[2] * h - h
        
        this.drawShadow(coords.x, coords.y, coords.wx, coords.wy, shade)
      });
      
//      FADE SHADOWS
//      var bgGrad = ctx.createLinearGradient(w * .1, h, h * 1.5, 0);
//      bgGrad.addColorStop(0, 'rgba(255, 255, 0, 0)');
//      bgGrad.addColorStop(.6, 'rgba(0, 0, 0, 1)');
//      ctx.globalCompositeOperation = "destination-out";
//      ctx.fillStyle = bgGrad;
//      ctx.fillRect(0,0,this.canvasWidth,canvas.height);
      
      let imageStartX = 0
      for (var ii=0; ii<this.thePost.cubeData.length; ii++) {
        let c = this.thePost.cubeData[ii]
        
        let color = c[3], // coverup!
            coords = this.cubeCoords(c, cs, this.thePost.horzAdjust, this.thePost.vertAdjust)
        
         this.drawCube(coords.x, coords.y, coords.wx, coords.wy, coords.wz, color)
        
        if (c[3] == 'image-poster-start') {
          imageStartX = coords.x - coords.wx
        }
        if (c[3] == 'image-poster-end') {
          const image = new Image(), //await this.addImageProcess(c[4]),
                _ctx = this.ctx
          
          image.src = c[4]
          
//          await image.decode()
          if (image.width > 0) {
            const w = coords.x - imageStartX,
                  h = w * 1.5,
                  wi = image.width,
                  hi = image.height,
                  sw = wi / 4,
                  sh = sw,
                  sx = (wi - sw) / 2,
                  sy = (hi - sh) / 2
            
          _ctx.setTransform(1, .5, 0, 1, coords.x-coords.wx/2, coords.y-coords.wy/2);
          _ctx.drawImage(image, sx, sy, sw, sh, -w + 20, -40, w, h)
          _ctx.setTransform(1, 0,0,1,0,0);  
          } else {
            const loadingImage = new Image()
            loadingImage.onload = () => {
              this.draw()
            }
            loadingImage.src = c[4]
          }
        }
       
        
        
        
      }
    },
    cubeCoords(c, cs, horz, vert) {
      let wx = cs,
          wy = cs,
          wz = cs + cs / 3
            
      let x = -(c[0] - 1) * wx + this.canvasWidth / 2 + (c[1] - 1) * wx,
          y = (c[1] - 1) * wy / 2 + this.canvasHeight / 2 + (c[0] - 1) * wx / 2
      
      // account fo z
        y = y - (c[2] - 1) * wz
      
      // center y
        y = y + wz * .7
      
      // add horx and vert adjust
        x = x + parseFloat(horz)// * cs * 1.3
        y = y - parseFloat(vert)// * cs * 1.4
      
      return {x: x, y: y, wx: wx, wy: wy, wz: wz}
      
    },
    drawCube(x, y, wx, wy, wz, color) {
      const ctx = this.ctx
        
//      ctx.globalCompositeOperation = 'source-over';
      
        // left face
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - wx, y - wx * 0.5);
        ctx.lineTo(x - wx, y - wz - wx * 0.5);
        ctx.lineTo(x, y - wz * 1);
        ctx.closePath();
        ctx.fillStyle = colors['med'+color] || colors['medgrey']
        //ctx.strokeStyle = "#7a7a51";
        //ctx.stroke();
        ctx.fill();

        // right face
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + wy, y - wy * 0.5);
        ctx.lineTo(x + wy, y - wz - wy * 0.5);
        ctx.lineTo(x, y - wz * 1);
        ctx.closePath();
        ctx.fillStyle = colors['dark'+color] || colors['darkgrey']
        //ctx.strokeStyle = "#676744";
        //ctx.stroke();
        ctx.fill();

        // center face
        ctx.beginPath();
        ctx.moveTo(x, y - wz);
        ctx.lineTo(x - wx, y - wz - wx * 0.5);
        ctx.lineTo(x, y - wz - (wx * 0.5 + wy * 0.5));
        ctx.lineTo(x + wy, y - wz - wy * 0.5);
        ctx.closePath();
        ctx.fillStyle = colors['light'+color] || colors['lightgrey']
        //ctx.strokeStyle = "#8e8e5e";
        //ctx.stroke();
        ctx.fill(); 
    },
    drawShadow(x, y, wx, wy) {
      const ctx = this.ctx
      
//       ctx.globalCompositeOperation = 'source-in-out';
      
      // shadow
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - wx, y - wx * 0.5);
        ctx.lineTo(x - wx + wy, y - (wx * 0.5 + wy * 0.5));
        ctx.lineTo(x + wx * 1, y - (wx * 0.5 + wy * 0.5));
        ctx.lineTo(x + wx * 2, y - wy * 0.5);
        ctx.lineTo(x + wx * 1, y);
        ctx.closePath();
        ctx.fillStyle = '#444' //'rgba(0,0,0,.2)';
        //ctx.strokeStyle = "#8e8e5e";
        //ctx.stroke();
        ctx.fill(); 
    }
  }
}

</script>

<style lang="scss">
 .voxel-canvas {
   @include column(center, center);
   width: $mapIconWidth;
   height: $mapIconHeight;
   overflow: visible;
   filter: contrast(1.2);
   
/*
   width: $mapIconWidth;
   height: $mapIconHeight;
*/
   .canvas-container {
     width: 100%;
     height: 100%;
     position: relative;
     overflow: hidden;
     border-radius: 99em;
   }
   canvas, .photo-container {
      background: transparent;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
    }
   .photo-container {
     @include iconRound;
      z-index: 0;
     border-radius: 99em;
     overflow: hidden;
   }
  }
  .pin-mode {
    @include iconRound;
    overflow: visible;
  }
  .structure .canvas-container {
    @include iconRound;
  }
  .popup-open .canvas-container {
    background-color: #eee;
    @include noClip;
  }
  
</style>