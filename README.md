# scattering-images

![screen shot](/img/screenshot.png) . 

GithubPage: https://jerrybrown999.github.io/scattering-images/

## Overview

* Creates a cluster of \<img\> elements using properties defined in a javascript array of objects in `define-scatter-images.js` and appends them to the HTML \<div\> with id 'scatter-images-container' defined in `index.html`.

* The CSS for 'scatter-images-container' should be positioned, e.g. `position: relative;`, so inserted \<img\> elements can be explicitly positioned in container.

* The cluster of \<img\>s is animated by the javascript file 'animate-scatter-images.js`.

* The container listens for mouse and touch movement.

* Elements in the cluster are "repelled" from the mouse/touch
 position as long as there is pointer movement.

* The original position of each inserted \<img\> element is remembered and as they are "repelled" farther from that position they grow in dimension and fade in opacity.

* When pointer movement ceases the the images return to their original
 positions as if attached by a damped spring and their dimension and
 opacity is restored.  

This is a nod to the Google Doodle of Sept. 6, 2010:
https://www.google.com/logos/particle.html 
 ___
 
## To adapt to your HTML page:

1. Clone this repo to your machine:  

```http

https://help.github.com/en/articles/cloning-a-repository

```

2. Copy define-scatter-images.js and animate-scatter-images.js to your project (mine is in "./js").  
You will need the paths for the images you use (mine are in "./img/svgs").  
In your HTML page include a \<div\> tag with unique Id and include script src tags for the javascript files:

```javascript
    <div id="scatter-images-container"></div>

    <script src="js/define-scatter-images.js"></script>  
    <script src="js/animate-scatter-images.js"></script>
```

3. In your CSS file style the \<div\>:  

```javascript
    #scatter-images-container {  
        position: relative; /* Need this. */

        /* width, height, background-color etc.
        ...
        I use svg cursor
        cursor: url('../img/svgs/Radiate.svg'), move;
        */
    }`  
```

4. Edit `define-scatter-images.js` so that:  

- `sctNS.containerID = 'scatter-images-container'; // must match HTML element`

- The array sctNS.elsjsn[] should have an {} for each image you want to animate.  
e.g.

``` javascript

// rtDims{l,t,w,h} computed at runtime  
// posFactors values fraction (0.0<=v<=1.0) (i.e. v*100=%)  
//   e.g. posFactors{  
//          xF:0.100, // position x at .10 of container width  
//          yF:0.470, // position y at .47 of container height  
//          sF:0.182, // scale src'd image by this factor  
//        }  
//  
`
sctNS.elsjsn = [{
    id: 'git-logo', // ** id for your img element
    rtDims: { l: null, t: null, w: null, h: null },
    bkgcolor: 'transparent',
    srcUrl: 'img/svgs/Git-logo.svg', // ** path to your image
    alt: 'Git Logo',
    posFactors: { xF: 0.680, yF: 0.710, sF: 0.250 } // ** edit for your values
},
{
// ** one for each image
},
...
];
```
