/**
 *
 *  This is a HT to the Google doodle of Sept. 6, 2010
 *   ScatteredElements(id,jsncluster) Creates a cluster of 'img'
 *     elements using properties passed in jsncluster and appends
 *     them to the id 'scatter-element-container' element.
 *   The container listens for mouse and touch movement.
 *   Elements in the cluster are "repelled" from the mouse/touch
 *     position as long as there is pointer movement.
 *   The original position is remembered and as they are repositioned
 *     farther from that position they grow in dimension and fade in opacity.
 *   When pointer movement ceases the the elements return to their remembered
 *     positions as if attached by a damped spring and their dimension and
 *     opacity is restored.
 * 
 */

/**
 * Our namespace
 */
sctNS = sctNS || {};

// globals
//
//sctNS.containerID  defined in defineScatterImages.js
sctNS.scatteringElements = null; //created at runtime
sctNS.posUnits = 'px'; // calculations in fractions of view in pixels
sctNS.scatterMagnitude = 2400; // strength of 'force field' of mouse pt
sctNS.scatterDilateRate = 1.15; // rate of swell as els scatter
sctNS.settleInterval = 30; // frequency of settle updates
sctNS.doFade = true; // fade out as size expands

// window functions
//
function adaptToContainer() {
  const container = document.getElementById(sctNS.containerID);
  const scw = container.clientWidth;
  const sch = container.clientHeight;
  const sd = (scw > sch) ? sch : scw; // w/h relative to cw/ch;

  for (let [i, def] of sctNS.elsjsn.entries()) {
    const dims = {};
    dims.id = def.id;
    dims.left = Math.round(scw * def.posFactors.xF) + sctNS.posUnits;
    dims.top = Math.round(sch * def.posFactors.yF) + sctNS.posUnits;
    dims.width = Math.round(sd * def.posFactors.sF) + sctNS.posUnits;
    dims.height = Math.round(sd * def.posFactors.sF) + sctNS.posUnits;
    sctNS.scatteringElements.repositionElement(dims);
  }
}

// on load init
window.addEventListener('DOMContentLoaded', (event) => {
  // create scattering elements
  const container = document.getElementById(sctNS.containerID);
  const cw = container.clientWidth;
  const ch = container.clientHeight;
  const sd = (cw > ch) ? ch : cw;

  // calc run time positions
  for (let [i, el] of sctNS.elsjsn.entries()) {
    el.rtDims.l = Math.round(cw * el.posFactors.xF) + sctNS.posUnits;
    el.rtDims.t = Math.round(ch * el.posFactors.yF) + sctNS.posUnits;
    el.rtDims.w = Math.round(sd * el.posFactors.sF) + sctNS.posUnits;
    el.rtDims.h = Math.round(sd * el.posFactors.sF) + sctNS.posUnits;
  }
  sctNS.scatteringElements = new ScatteredElements(sctNS.containerID, sctNS.elsjsn);

  adaptToContainer();
});


window.addEventListener('resize', (event) => {
  adaptToContainer();
});

window.addEventListener('orientationchange', (event) => {
  adaptToContainer();
});

function mousePosition(e) {
  e = !e ? window.event : e;
  e.preventDefault();

  const mx = parseInt(e.clientX, 10) - sctNS.scatterContainer.offsetLeft;
  const my = parseInt(e.clientY, 10) - sctNS.scatterContainer.offsetTop;
  sctNS.scatteringElements.scatterThem(mx, my);
}
function touchPosition(e) {
  e = !e ? window.event : e;
  e.preventDefault();

  const t = e.changedTouches[0];
  const mx = parseInt(t.clientX, 10) - sctNS.scatterContainer.offsetLeft;
  const my = parseInt(t.clientY, 10) - sctNS.scatterContainer.offsetTop;
  sctNS.scatteringElements.scatterThem(mx, my);
}

/*
 * Create a DOM element from properties in 'elconfig'
 *  expects: rtDims{l,t,w,h}, bkgcolor, srcUrl, alt properties
 *  The created element is appended to sctNS.scatterContainer with style position 'absolute'
 *  and assumes that sctNS.scatterContainer has position 'relative'
 *
 */
function ScatterElement(elconfig) {
  const pl = parseInt(elconfig.rtDims.l, 10);
  const pt = parseInt(elconfig.rtDims.t, 10);
  const pw = parseInt(elconfig.rtDims.w, 10);
  const ph = parseInt(elconfig.rtDims.h, 10);

  // set up values for harmonic oscillator function
  // Stole this equation from Physics This Week
  // Trevor Johnson-Steigelman PhD
  // https://youtu.be/UtkwsWZnp5o
  this.k = 25; // spring constant
  this.m = 100; // mass
  this.beta = 13; // damp factor
  this.gamma = this.beta / (2 * this.m);
  this.omega = Math.sqrt(this.k / this.m);
  this.omegaPrime = Math.sqrt(
    this.omega * this.omega - this.gamma * this.gamma
  );
  this.T = 0;

  this.id = elconfig.id;
  // remember 'rest' location and dims
  this.rstX = pl + pw / 2; // center
  this.rstY = pt + ph / 2; // center
  this.rstW = pw;
  this.rstH = ph;
  // start current at 'rest'
  this.curX = this.rstX;
  this.curY = this.rstY;
  this.curW = this.rstW;
  this.curH = this.rstH;

  //create element and add to parent in DOM
  // note: parent element (scatterContainer)
  //         must be 'positioned' e.g. relative
  //       our elements are position 'absolute' (*)
  //         so we can position them in the container
  this.parent = sctNS.scatterContainer;
  this.d = document.createElement("img");
  this.d.id = elconfig.id;
  this.d.src = elconfig.srcUrl;
  this.d.alt = elconfig.alt;
  this.style = this.d.style;
  this.style.position = "absolute"; // (*)
  this.style.zIndex = "2";
  this.style.left = elconfig.rtDims.l;
  this.style.top = elconfig.rtDims.t;
  this.style.width = elconfig.rtDims.w;
  this.style.height = elconfig.rtDims.h;
  this.style.backgroundColor = elconfig.bkgcolor;
  this.parent.appendChild(this.d);

  this.screenPosition = (cx, cy, w, h) => {
    this.style.left = cx - w / 2 + sctNS.posUnits;
    this.style.top = cy - h / 2 + sctNS.posUnits;
    this.style.width = w + sctNS.posUnits;
    this.style.height = h + sctNS.posUnits;
    this.style.opacity = sctNS.doFade ? this.rstW/w : 1.0;
  };

  // disperse elements and start settle animation
  this.scatter = (mx, my) => {
    // mouse/touch position mx,my in container coords
    // calc distance (mx,my) to (curX,curY)
    const xdiff = mx - this.curX;
    const ydiff = my - this.curY;
    // calc move -  will be inversely proportional to distance^2 from mouse
    const D2 = xdiff * xdiff + ydiff * ydiff;
    const M = -sctNS.scatterMagnitude / D2;
    const dx = M * xdiff;
    const dy = M * ydiff;

    // step away from the mouse
    this.curX += dx;
    this.curY += dy;
    // and resize
    this.Xdisplacement = this.curX - this.rstX;
    this.Ydisplacement = this.curY - this.rstY;
    this.curW *= sctNS.scatterDilateRate;
    this.curH *= sctNS.scatterDilateRate;
    this.screenPosition(this.curX, this.curY, this.curW, this.curH);

    // if already settling restart from new position
    if (this.settleID) {
      clearInterval(this.settleID);
      this.T = 0;
    }
    // launch settle animation
    //   pretty sure we need function instead of => because bind
    this.settleID = setInterval(function() {
      // new displacements from oscillator function
      const newDisplaceX =
        this.Xdisplacement *
        Math.exp(-this.gamma * this.T) *
        Math.cos(this.omegaPrime * this.T);

      const newDisplaceY =
        this.Ydisplacement *
        Math.exp(-this.gamma * this.T) *
        Math.cos(this.omegaPrime * this.T);
      // tick 'time'
      this.T += 1;

      if (Math.abs(newDisplaceX) > 0.005 || Math.abs(newDisplaceY) > 0.005) {
        this.curX = this.rstX + newDisplaceX;
        this.curY = this.rstY + newDisplaceY;
        const dilatedW = this.curW / sctNS.scatterate;
        const dilatedH = this.curW / sctNS.scatterate;
        this.curW = dilatedW > this.curW ? dilatedW : this.rstW;
        this.curH = dilatedH > this.curH ? dilatedH : this.rstH;

        this.screenPosition(this.curX, this.curY, this.curW, this.curH);
      } else {
        //close enough to rest. Cancel ringing
        clearInterval(this.settleID);
        // restore rest positions
        this.curX = this.rstX;
        this.curY = this.rstY;
        this.curW = this.rstW;
        this.curH = this.rstH;
        this.screenPosition(this.curX, this.curY, this.curW, this.curH);
      }
    }.bind(this), sctNS.settleInterval); // bind for scope
  };
}

function ScatteredElements(id, jsncluster) {
  this.containerID = id;
  this.elementCluster = [];
  sctNS.scatterContainer = document.getElementById(id);
  sctNS.scatterContainer.addEventListener("mousemove", mousePosition);
  sctNS.scatterContainer.addEventListener("touchmove", touchPosition);

  // create ScatterElement for each element passed in jsncluster
  // and add to our elementCluster
  for (const scEl of jsncluster) {
    this.elementCluster.push(new ScatterElement(scEl));
  }

  // scatter relative to mouse position
  this.scatterThem = (mx, my) => {
    for (const el of this.elementCluster) {
      el.scatter(mx, my);
    }
  };

  // find matching element and reposition
  this.repositionElement = (newDims) => {
    for (let el of this.elementCluster) {
      if (newDims.id == el.id) {
        const l = parseInt(newDims.left, 10);
        const t = parseInt(newDims.top, 10);
        const w = parseInt(newDims.width, 10);
        const h = parseInt(newDims.height, 10);
        el.rstX = l + w / 2; // center
        el.rstY = t + h / 2; // center
        el.rstW = w;
        el.rstH = h;
        el.curX = el.rstX;
        el.curY = el.rstY;
        el.curW = el.rstW;
        el.curH = el.rstH;
        el.screenPosition(el.curX, el.curY, el.curW, el.curH);
      }
    }
  };
}
