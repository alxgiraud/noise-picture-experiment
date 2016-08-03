/*global Vue, canvasServices, noiseServices*/
(function () {
    'use strict';
    var defaultNoiseParameters = {
            octaves: 2,
            frequency: 0.025,
            persistence: 0.5
        },

        app = new Vue({
            el: '#app',
            data: {
                hasBasePicture: true,
                hasNoise: true,
                hasHueVariation: false,
                algorithm: 'perlin',
                noiseParameters: defaultNoiseParameters,
                speed: 0.05,
                intensity: 0.7
            },
            methods: {
                onSelectMode: function () {
                    canvasServices.updateMode(this.mode);
                },
                onSelectAlgorithm: function () {
                    noiseServices.updateAlgorithm(this.algorithm);
                },
                onCheckMode: function () {
                    canvasServices.updateModes(this.hasBasePicture, this.hasNoise, this.hasHueVariation);
                },
                onSlide: function () {
                    noiseServices.setParameters(this.noiseParameters);
                },
                onSlideSpeed: function () {
                    canvasServices.updateSpeed(this.speed);
                },
                onSlideIntensity: function () {
                    canvasServices.updateIntensity(this.intensity);
                },
                refreshNoise: function () {
                    noiseServices.refreshNoise();
                }
            }
        });

    noiseServices.createNoise(Math.random());
    noiseServices.setParameters(defaultNoiseParameters);
    
    canvasServices.createImage();
    canvasServices.run();

}());
