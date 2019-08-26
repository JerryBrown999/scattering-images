/****
 * Define an array of config properties for image elements that will be
 *   inserted into the container div and animated by animateScatterImages.js
 */

/**
 * Our namespace: sctNS namespace from animateScatterImages.js
 */
var sctNS = sctNS || {};
sctNS.containerID = 'scatter-images-container'; // must match HTML element

// rtDims{l,t,w,h} computed at runtime 
// posFactors values fraction (0.0<=v<=1.0) (i.e. v*100=%)
//   e.g. posFactors{
//          xF:0.100, // position x at .10 of container width
//          yF:0.470, // position y at .47 of container height
//          sF:0.182, // scale src'd image by this factor
//        }
//
sctNS.elsjsn = [{
    id: 'js-logo',
    rtDims : { l: null, t: null, w: null, h: null},
    bkgcolor: 'transparent',
    srcUrl: 'img/svgs/JavaScript_logo_2.svg',
    alt: 'Javascript Logo',
    posFactors: { xF: 0.100, yF: 0.470, sF: 0.182}
},
{
    id: 'html5-logo',
    rtDims: { l: null, t: null, w: null, h: null },
    bkgcolor: 'transparent',
    srcUrl: 'img/svgs/HTML5_Logo.svg',
    alt: 'HTML5 Logo',
    posFactors: { xF: 0.175, yF: 0.090, sF: 0.325 }
},
{
    id: 'css3-logo',
    rtDims: { l: null, t: null, w: null, h: null },
    bkgcolor: 'transparent',
    srcUrl: 'img/svgs/myMungedCss3_logo.svg',
    alt: 'CSS3 Logo',
    posFactors: { xF: 0.460, yF: 0.150, sF: 0.273 }
},
{
    id: 'vsc-logo',
    rtDims: { l: null, t: null, w: null, h: null },
    bkgcolor: 'transparent',
    srcUrl: 'img/svgs/VSC_Icon.svg',
    alt: 'VSC Logo',
    posFactors: { xF: 0.220, yF: 0.700, sF: 0.172 }
},
{
    id: 'svg-logo',
    rtDims: { l: null, t: null, w: null, h: null },
    bkgcolor: 'transparent',
    srcUrl: 'http://www.w3.org/Icons/SVG/svg-logo-v.svg', // svg enforces remote src
    alt: 'SVG Logo',
    posFactors: { xF: 0.625, yF: 0.430, sF: 0.150 }
},
{
    id: 'git-logo',
    rtDims: { l: null, t: null, w: null, h: null },
    bkgcolor: 'transparent',
    srcUrl: 'img/svgs/Git-logo.svg',
    alt: 'Git Logo',
    posFactors: { xF: 0.680, yF: 0.710, sF: 0.250 }
},
{
    id: 'ME-png',
    rtDims: { l: null, t: null, w: null, h: null },
    bkgcolor: 'transparent',
    srcUrl: 'img/MeTransBgClipped.png',  
    alt: 'Me',
    posFactors: { xF: 0.760, yF: 0.560, sF: 0.150 }
},
{
    id: 'PS-logo',
    rtDims: { l: null, t: null, w: null, h: null },
    bkgcolor: 'transparent',
    srcUrl: 'img/svgs/Adobe_Photoshop_CS6_icon.svg',
    alt: 'Photoshop Logo',
    posFactors: { xF: 0.760, yF: 0.250, sF: 0.150 }
},
{
    id: 'http-logo',
    rtDims: { l: null, t: null, w: null, h: null },
    bkgcolor: 'transparent',
    srcUrl: 'img/svgs/HTTP_logo.svg',
    alt: 'HTTP Logo',
    posFactors: { xF: 0.340, yF: 0.450, sF: 0.208 }
},
{
    id: 'apache-logo',
    rtDims: { l: null, t: null, w: null, h: null },
    bkgcolor: 'transparent',
    srcUrl: 'img/svgs/feather.svg',
    alt: 'Apache Logo',
    posFactors: { xF: 0.450, yF: 0.560, sF: 0.250 }
}
];

