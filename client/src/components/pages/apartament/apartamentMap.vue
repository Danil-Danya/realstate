<template>
    <div class="apartament__map" id="map">
        <div class="container">
            <h2 class="apartament__map-title">Where you’ll be</h2>
            <div class="apartament__map-container" v-if="width > 580" style="width: 100%; height: 500px;">
            </div>
        </div>
        <div class="apartament__map-container" v-if="width < 580" style="width: 100%; height: 500px;"></div>
    </div>
</template>

<style lang="scss" scoped>
    @import '@/assets/styles/pages/apartament/map.scss';
</style>

<script>
import locatios from '@/configs/config.location.json'

export default {
    data: () => ({
        locatios: locatios,
        width: window.innerWidth
    }),
    props: {
        dataMap: Object
    },

    methods: {
        async initMap() {
            const { Map } = await google.maps.importLibrary("maps");
            const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

            let map = document.querySelector('.apartament__map-container');
            let location = {};

            for (let i = 0; i < this.locatios.locations.length; i++) {
                if (this.locatios.locations[i].name === this.dataMap.addres) {
                    location.lat = this.locatios.locations[i].lat ? this.locatios.locations[i].lat : 25.21448776458042;
                    location.long = this.locatios.locations[i].long ? this.locatios.locations[i].long : 55.29115157192866;
                    
                    break;
                }
                else {
                    location.lat = 25.21448776458042;
                    location.long = 55.29115157192866;
                }
            }
            
            let myMap = await new Map(map, {
                zoom: 13,
                center: { lat: location.lat, lng: location.long },
                disableDefaultUI: true,
                //mapId: 'test map',
                styles: [
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#e9e9e9"
                            },
                            {
                                "lightness": 17
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#f5f5f5"
                            },
                            {
                                "lightness": 20
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 17
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 29
                            },
                            {
                                "weight": 0.2
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 18
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 16
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#f5f5f5"
                            },
                            {
                                "lightness": 21
                            }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#dedede"
                            },
                            {
                                "lightness": 21
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 16
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "saturation": 36
                            },
                            {
                                "color": "#333333"
                            },
                            {
                                "lightness": 40
                            }
                        ]
                    },
                    {
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#f2f2f2"
                            },
                            {
                                "lightness": 19
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#fefefe"
                            },
                            {
                                "lightness": 20
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#fefefe"
                            },
                            {
                                "lightness": 17
                            },
                            {
                                "weight": 1.2
                            }
                        ]
                    }
                ]
            })
        
            let marker = new google.maps.Marker ({
                map: myMap,
                position: {
                    lat: Number(this.dataMap.lat),
                    lng: Number(this.dataMap.long)
                },
                title: this.dataMap.title,
                icon: require('@/assets/images/static/map/majak.svg')
            })

            console.log(marker.postion);
        }
    },

    async mounted () {
        this.$nextTick(async () => {
            await this.initMap()
        })
        console.log(this.dataMap);
    }
}

</script>