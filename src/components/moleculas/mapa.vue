<template>
  <div :id="id" :lugarId="lugarId" class="mapita" :longitud="longitud" :latitud="latitud" :descrip="descrip" :name="name" :imagen="imagen"></div>
</template>

<script>
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
export default {
    name:"mapa",
    props:["id","lugarId","longitud","latitud","descrip","name","imagen"],
    data(){
        return{
            map:null,
            currentMarkers:[],
            datosCalificaicones:[]
        };
        
    },
    mounted(){
        mapboxgl.accessToken = 'pk.eyJ1IjoiYXZyZW1pZ3VlIiwiYSI6ImNrN2UyaGdyZzA0NmozZ250bGNyMHMyaXYifQ.mxEBxZOBHLkzJGPJllpVEg';
        this.map = new mapboxgl.Map({
            container: this.id,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-110.312783,24.125018],
            zoom: 13
        });
        var geocoder=new mapboxgl.GeolocateControl({
            positionOptions: {
            enableHighAccuracy: true
            },
            trackUserLocation: true
            })
        this.map.addControl(geocoder,'bottom-right');
    },
    updated(){
        /*mapboxgl.accessToken = 'pk.eyJ1IjoiYXZyZW1pZ3VlIiwiYSI6ImNrN2UyaGdyZzA0NmozZ250bGNyMHMyaXYifQ.mxEBxZOBHLkzJGPJllpVEg';
        this.map = new mapboxgl.Map({
            container: this.id,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-102.630330,23.630330],
            zoom: 3
        });*/
        
        if(this.currentMarkers!==null) {
            for (var i = this.currentMarkers.length - 1; i >= 0; i--) {
                this.currentMarkers[i].remove();
            }
        }
        var popup = new mapboxgl.Popup({
            offset: 25
        }).setHTML("<h2 id='asd' style='text-align: center;'>"+this.name+"</h2>"+"<p style='text-align: center;'>"+this.descrip+"</p>"+
                   "<img src='"+this.imagen+"' style='width: 220px; height: 100px; border-radius: 10px'>"+
                   "<p style='text-align: center; width: 100%;</p>");
        var marcador = new mapboxgl.Marker();
        marcador.setLngLat([this.longitud, this.latitud]);
        marcador.addTo(this.map);
        this.map.flyTo({
            center: [this.longitud,this.latitud],
            zoom: 15,
            bearing: 0,
            speed: 0.8,
            curve: 1, 
            easing: function(t) {
                return t;
            },
            essential: true
        });
        marcador.setPopup(popup);
        this.currentMarkers.push(marcador);
    }  
}
</script>

<style scoped>
    .mapita{
        height: 100%;
        width: 100%;
    }
    #map{
        top: 0; 
        bottom: 0; 
        width: 100%; 
    }
</style>