import L from 'leaflet';
import markerExtended from '@/components/LeafletMarker.js'
import LeafletIcon from '@/views/web/sections/map/LeafletIcon.vue'

var _iconCreateFunction = function(markerCluster) {
  // This is the Hack@!
  // I am passing Vue to the cluster data through its icon
  // loser!
    var icon = new LeafletIcon()
    icon.store = markerCluster.getAllChildMarkers()[0].store // weird hack~!!!~
    icon.markerCluster = markerCluster // Ha Ha Ha!!
  
    return L.divIcon({ html: icon.$mount().$el });
}

var ClusterIconExtension = L.MarkerClusterGroup.extend({
  options: {
    iconCreateFunction: _iconCreateFunction,
    zoomToBoundsOnClick: true,
    spiderfyOnMaxZoom: true,
    spiderLegPolylineOptions: { weight: 8, color: '#2196f3', opacity: 1 },
    //disableClusteringAtZoom: 12,
    //clusterPane: 'shadowPane',
    singleMarkerMode: true,
    spiderfyDistanceMultiplier: 3.5,
    showCoverageOnHover: false,
    maxClusterRadius: function() {
//      if (z >= 14) {
//        return 100
//      } else {
//        return 220
//      }
      return 120
    }
  },
  initialize: function(store, map) {
    this.store = store;
    this.map = map;
    this.spiderfied = false

    L.MarkerClusterGroup.prototype.initialize.call(this);
  },
  
  addLayer: function (audioPost) { 
    // HAPPENS when new posts are added to the map, via PopupAddPostClass
    // ACCEPTS structures i.e. "homes"
    // content posts (image/audio) go straight to the store
    
    if (audioPost.audioPostType == 'home') {
      const clusterGroup = this
      const marker = markerExtended(this.store, audioPost)
      
      audioPost.marker = marker

      L.MarkerClusterGroup.prototype.addLayer.call(clusterGroup, marker);
    }

  },
  addLayers: function (audioPosts) {
    // tied up tight
    let markers = []
    audioPosts.forEach(function(audioPost) {
      const marker = markerExtended(this.store, audioPost)
      
      markers.push(marker)
      
      audioPost.marker = marker
      
    }.bind(this))
    
    this.clearLayers()
    L.MarkerClusterGroup.prototype.addLayers.call(this, markers);
  },
  clearLayers: function () {
      L.MarkerClusterGroup.prototype.clearLayers.call(this);
  },
  refreshClusters: function () {
      L.MarkerClusterGroup.prototype.refreshClusters.call(this);
  }
})

ClusterIconExtension.addInitHook(function() {
  this.on('spiderfied', () => {
    document.getElementById('map-full').classList.add('spiderfied')
  })
  this.on('unspiderfied', () => {
    document.getElementById('map-full').classList.remove('spiderfied')
  })
})

/* factory */
export default function clusterIconExtension(store, map) {
  return new ClusterIconExtension(store, map)
}


/* also */
//
//L.MarkerCluster.include({
//  getClusterCount: function() {
//    const allMarkers = this.getAllChildMarkers(),
//          origLatLngs = []
//    
//    allMarkers.forEach(function(m) {
//      const latLng = m.getLatLng(),
//            s = latLng.lat + ' ' + latLng.lng
//      if (origLatLngs.indexOf(s) == -1) {
//        origLatLngs.push(s)
//      }
//    })
//    
//    return origLatLngs.length
//  }
//
//});