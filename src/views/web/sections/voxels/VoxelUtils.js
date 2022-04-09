export const CANVASWIDTH = 1000
export const CANVASHEIGHT = 1000

export class Cube {
  constructor(x, y, z, cl, env) {
    this.x = x
    this.y = y
    this.z = z
    this.cssClass = cl
    this.environment = env || 'live'
  }
  
  get asArray() {
    return [this.x, this.y, this.z, this.cssClass, this.environment]
  }
}

export function aFloor(width, length) {
  let cubes = []
  for (var x=1; x<width; x++) {
    for (var y=1; y<length; y++) {
      const cube = new Cube(x, y, 0, 'floor-cube floor', 'floor').asArray
      cubes.push(cube)
    }
  }
  return cubes
}

export function aCube(x, y, z, cl='') {
  const c = new Cube(x, y, z, cl + ' voxel-shape').asArray
  return c
}

export function coordsToPix(c, cs, horz, vert) {
    let wx = cs,
        wy = cs,
        wz = cs + cs / 3

    let x = -(c[0] - 1) * wx + CANVASWIDTH / 2 + (c[1] - 1) * wx,
        y = (c[1] - 1) * wy / 2 + CANVASHEIGHT / 2 + (c[0] - 1) * wx / 2

    // account fo z
      y = y - (c[2] - 1) * wz

    // center y
      y = y + wz * .7

    // add horx and vert adjust
      x = x + parseFloat(horz) * cs * 1.3
      y = y - parseFloat(vert) * cs * 1.4

    return {x: x, y: y, wx: wx, wy: wy, wz: wz}
}

export function anImageStructure(post) {
  const d = 7,
        d2 = 3,
        h = 8
  let x = 1,
      y=1,
      z = 1,
      cube = [1,1,1,'blank']
  let payload = []
  // base
  for ( x=1; x<=4; x++) {
    for ( y=1; y<=d; y++) {
      cube = [x, y, 1, 'yellow']
      if (x>3 || y==d) {cube[3] = 'green'}
      payload.push(cube)
     
    }
  }
  // pole
//  for ( z=2; z<d; z++) {
//    payload.push([d2, d2, z, 'grey'])
//  }
  // board
  for ( z=d2; z<=h; z++) {
    for ( y=3; y<=d; y++) {
      if (z==d2 && y==3) {
        payload.push([d2, y, z, 'image-poster-start'])
      }
      else if (z==h && y==d) {
        payload.push([d2, y, z, 'image-poster-end',post.audioUrl])
      } else {
        payload.push([d2, y, z, 'brown'])
      }
    }
  }
  return payload
}