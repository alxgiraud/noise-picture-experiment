/*global Vue, canvasServices, noiseServices*/
(function () {
    'use strict';
    var defaultImgName = 'Bird',
        defaultImgSize = 250,
        defaultSpeed = 0.05,
        defaultIntensity = 0.5,

        defaultNoiseParameters = {
            octaves: 1,
            frequency: 25,
            persistence: 0.5,
            lacunarity: 1.5
        },

        callbackCreateImage = function (width) {
            vm.isLoading = false;
            document.getElementById('fps-container').style.width = width + 'px';
        },

        vm = new Vue({
            el: '#app',
            ready: function () {
                var self = this;

                self.$data.speed = defaultSpeed;
                self.$data.fps = 0;
                self.$data.imgName = defaultImgName;
                self.$data.imgSize = defaultImgSize;
                self.$data.hasBasePicture = true;
                self.$data.hasNoise = true;
                self.$data.hasHueVariation = false;
                self.$data.algorithm = 'perlin';
                self.$data.noiseParameters = defaultNoiseParameters;
                self.$data.speed = defaultSpeed;
                self.$data.intensity = defaultIntensity;

                setInterval(function () {
                    self.$data.fps = canvasServices.getFps();
                }, 500);
            },
            data: {
                fps: 0,
                isLoading: false,
                hasHueVariation: false
            },
            methods: {
                onSelectImage: function () {
                    this.isLoading = true;
                    canvasServices.createImage(this.imgName, this.imgSize, callbackCreateImage);
                },
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

    canvasServices.createImage(defaultImgName, defaultImgSize, callbackCreateImage);
    canvasServices.updateSpeed(defaultSpeed);
    canvasServices.updateIntensity(defaultIntensity);
    canvasServices.run();

}());
