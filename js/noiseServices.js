/*global noise*/
var noiseServices = (function () {
    'use strict';

    var parameters = {
            octaves: 0,
            frequency: 0,
            persistence: 0,
            lacunarity: 0
        },
        algorithm = 'perlin';


    return {
        createNoise: function (seed) {
            noise.seed(seed);
        },

        updateAlgorithm: function (newAlgo) {
            algorithm = newAlgo;
        },

        getNoiseValue: function (x, y, z) {
            var total = 0,
                octave,
                amplitude = 1,
                maxValue = 0,
                frequency = parameters.frequency;
            
            for (octave = 0; octave <= parameters.octaves; octave += 1) {
                total += (algorithm === 'perlin') ?
                        noise.perlin3(x / frequency, y / frequency, z) * amplitude :
                        noise.simplex3(x / frequency, y / frequency, z) * amplitude;

                maxValue += amplitude;
                amplitude *= parameters.persistence;
                frequency *= parameters.lacunarity;
            }

            return total / maxValue;
        },

        getSimpleNoise: function (x, y) {
            return noise.perlin2(x, y);
        },

        setParameters: function (newParameters) {
            parameters = newParameters;
        },

        refreshNoise: function () {
            noise.seed(Math.random());
        }
    };
}());
