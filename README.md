# Noise Picture Experiment

![screenshot demo](https://raw.githubusercontent.com/alxgiraud/noise-picture-experiment/master/img/screenshot.jpg "screenshot")


## Repositories used

 - [Vue.js](https://github.com/vuejs/vue)
 - [Noisejs](https://github.com/josephg/noisejs)
 - [Bootstrap](https://github.com/twbs/bootstrap)
 
## How it works

You can used the checkboxes to show or hide the **picture**, the **noise** or the **hue variation**.

The **hue variation** uses the noise to smoothly update the colors with random tints.

**Algorithm** radio buttons allow you to used [Perlin Noise](https://en.wikipedia.org/wiki/Perlin_noise) or [Simplex Noise](https://en.wikipedia.org/wiki/Simplex_noise) algorithms.

The noise seed is randomly picked. You can use the *Refresh Noise* button to get a new seed.

| Slider      	| Effect                                                                 	|
|-------------	|------------------------------------------------------------------------	|
| Speed       	| Define how fast the noise and the hue variation evolve                 	|
| Intensity   	| Set the noise less or more visible                                     	|
| Frequency   	| Increase or decrease the number of cycles per unit length              	|
| Octaves     	| Define the amount of noises that are added together to form final noise 	|
| Persistence 	| Define how much influence each successive octave have                  	|
| Lacunarity 	| Define how quickly the frequency increases for each successive octave     |

Additional information about Perlin noise and the attributes used can be found at the following urls:

 - http://flafla2.github.io/2014/08/09/perlinnoise.html
 - http://www.redblobgames.com/articles/noise/introduction.html
 - http://libnoise.sourceforge.net/glossary/

## Performance

The fps may vary based on your browser. The performance appears to be better on **Mozilla Firefox**.

In case of performance issues use **small-sized images** and try to **limit the use of octaves**.

## Demo

**https://noise-picture-experiment.herokuapp.com/**
