/*global noiseServices*/
var canvasServices = (function () {
    'use strict';

    var canvas = document.getElementById('mainCanvas'),
        ctx = canvas.getContext('2d'),
        fps = 0,
        lastCalledTime,

        hasBasePicture = true,
        hasNoise = true,
        hasHueVariation = false,

        requestId = 0,
        unalteredData = [],

        loopIndex = 0,
        speed = 0,
        intensity = 0,

        privateMethods = {
            saveUnalteredData: function () {
                var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                unalteredData = imgData.data;
            },
            draw: function () {

                var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height),
                    data = imgData.data,
                    x,
                    y,
                    cell,
                    noiseValue = 0;

                privateMethods.updateFps();

                loopIndex += speed;

                for (x = 0; x < canvas.width; x += 1) {
                    for (y = 0; y < canvas.height; y += 1) {

                        cell = (x + y * canvas.width) * 4;
                        if (hasNoise) {
                            noiseValue = Math.abs(noiseServices.getNoiseValue(x, y, loopIndex)) * 256;
                        }

                        data[cell] = privateMethods.getNewDataCell(cell, noiseValue, privateMethods.getHueVariation(0));
                        data[cell + 1] = privateMethods.getNewDataCell(cell + 1, noiseValue, privateMethods.getHueVariation(10));
                        data[cell + 2] = privateMethods.getNewDataCell(cell + 2, noiseValue, privateMethods.getHueVariation(20));
                    }
                }

                ctx.putImageData(imgData, 0, 0);

                requestId = window.requestAnimationFrame(privateMethods.draw);
            },
            updateFps: function () {
                if (!lastCalledTime) {
                    lastCalledTime = Date.now();
                    fps = 0;
                    return;
                }
                var delta = (Date.now() - lastCalledTime) / 1000;
                lastCalledTime = Date.now();
                fps = 1 / delta;
            },
            getNewDataCell: function (cell, noiseValue, hueVariation) {
                var dataCell = 0;

                if (!hasBasePicture && hasNoise) {
                    dataCell = noiseValue * intensity * hueVariation;
                } else if (hasBasePicture && !hasNoise) {
                    dataCell = Math.max(Math.min(unalteredData[cell] * hueVariation, 255), 0);
                } else if (hasBasePicture && hasNoise) {
                    dataCell = Math.max(Math.min(unalteredData[cell] * (1 + intensity) - noiseValue * intensity * hueVariation, 255), 0);
                }

                return dataCell;
            },
            getHueVariation: function (index) {
                if (!hasHueVariation) {
                    return 1;
                }
                return (hasHueVariation) ? (noiseServices.getSimpleNoise(loopIndex + speed * index, loopIndex + speed * index) + 1) * 2 : 1;
            }
        };

    return {
        createImage: function (imgName, size, callback) {
            if (typeof size === 'undefined' || parseInt(size, 10) === 0) {
                size = 9999999;
            }

            var img = new Image();

            img.crossOrigin = 'Anonymous';
            img.src = './img/' + imgName + '.jpg';

            img.onload = function () {
                var divWidth = document.getElementById('canvasContainer').offsetWidth - 30,
                    width = Math.min(divWidth, img.width, size),
                    height = img.height * width / img.width;

                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(img, 0, 0, width, height);

                privateMethods.saveUnalteredData();

                if (callback) {
                    callback(width);
                }
            };
        },
        run: function () {
            if (requestId === 0) {
                requestId = window.requestAnimationFrame(privateMethods.draw);
            }
        },
        getFps: function () {
            return fps;
        },
        updateModes: function (newHasBasePicture, newHasNoise, newHasHueVariation) {
            hasBasePicture = newHasBasePicture;
            hasNoise = newHasNoise;
            hasHueVariation = newHasHueVariation;
        },
        updateSpeed: function (newSpeed) {
            speed = newSpeed;
        },
        updateIntensity: function (newIntensity) {
            intensity = newIntensity;
        }
    };
}());
