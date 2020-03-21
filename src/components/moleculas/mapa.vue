<template>
  <div :id="id" class="mapita" :longitud="longitud" :latitud="latitud" :descrip="descrip" :name="name" :imagen="imagen">
  </div>
</template>

<script>
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
export default {
    name:"mapa",
    props:["id","longitud","latitud","descrip","name","imagen"],
    data(){
        return{
            map:null,
        };
    },
    mounted(){
        mapboxgl.accessToken = 'pk.eyJ1IjoiYXZyZW1pZ3VlIiwiYSI6ImNrN2UyaGdyZzA0NmozZ250bGNyMHMyaXYifQ.mxEBxZOBHLkzJGPJllpVEg';
        this.map = new mapboxgl.Map({
            container: this.id,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-102.630330,23.630330],
            zoom: 3
        });
    },
    updated(){
        
        mapboxgl.accessToken = 'pk.eyJ1IjoiYXZyZW1pZ3VlIiwiYSI6ImNrN2UyaGdyZzA0NmozZ250bGNyMHMyaXYifQ.mxEBxZOBHLkzJGPJllpVEg';
        this.map = new mapboxgl.Map({
            container: this.id,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-102.630330,23.630330],
            zoom: 3
        });

        for (const i in this.longitud) {
        var popup = new mapboxgl.Popup({ offset: 25}).setHTML("<h2 style='text-align: center;'>"+this.name[i]+"</h2>"+"<p style='text-align: center;'>"+this.descrip[i]+"</p>"+"<img src='"+this.imagen[i]+"' style='width: 220px; height: 100px; border-radius: 10px'>");
        var marcador = new mapboxgl.Marker();
        marcador.setLngLat([this.longitud[i], this.latitud[i]]);
        marcador.addTo(this.map);
        this.map.flyTo({
            center: [this.longitud[0],this.latitud[0]],
            zoom: 13,
            speed: 0.2,
            curve: 1,
            easing(t) {
                return t;
            }
        });

        marcador.setPopup(popup);
        }
    }    
}
</script>

<style scoped>
    .mapita{
        height: 100%;
        width: 100%;
    }
</style>