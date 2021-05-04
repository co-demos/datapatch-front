<style scoped>

.logo-container {
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}

svg {
  /* width: 50vw;
  height: 50vh; */
  padding: 20;
}

.arcB {
   stroke-width: 4;
   stroke-linecap: none;
   stroke-linejoin: none;
   stroke-dasharray: 2 3;
   pointer-events: all;
   fill: none
}
.arc {
  stroke-width: 3;
  stroke-linecap: none;
  stroke-linejoin: none;
  stroke-dasharray: 3 1;
  pointer-events: all;
  fill: none
}

.brand {
  display: inline-block; 
  font-size: 17px;
  /* font-family: Quicksand;  */
  line-height: 1.2; 
  pointer-events: all; 
  font-weight: bold; 
  white-space: normal; 
  word-wrap: normal;
}

.teal {
  fill: #6fdcbf;
}
.purple {
  fill: #bc85ff;
}

</style>


<template>
  
  <a
    text
    class="text-none"
    >
    <div 
      class="logo-container pa-5"
      :height="height"
      >
      <svg 
          class="logo" 
          xmlns="http://www.w3.org/2000/svg" 
          xmlns:xlink="http://www.w3.org/1999/xlink" 
          version="1.1" 
          :width="height"
          :height="height"
          viewBox="-.5 -.5 150 150">
        <defs>
      
          <style type="text/css">@import url(https://fonts.googleapis.com/css?family=Montserrat);&#xa;@import url(https://fonts.googleapis.com/css?family=Poppins);&#xa;@import url(https://fonts.googleapis.com/css?family=Nunito);&#xa;@import url(https://fonts.googleapis.com/css?family=Quicksand);&#xa;</style>
          
          <!-- masks -->
          <mask id="maskArcs" maskUnits="userSpaceOnUse" stroke="white">
          </mask>
          <mask id="maskArcs2" maskUnits="userSpaceOnUse" stroke="white">
          </mask>
          <mask id="maskText">
            <!--  <rect class="masker" x="70" y="34" width="75" height="15" scaleY="0" fill="white"/>  -->
            <!-- <rect class="masker" x="70" y="49" width="75" height="15" scale-y="0" fill="white"/> -->
            <rect class="masker" x="67" y="49" width="75" height="17" opacity="0" fill="white"/>
            
          </mask>
          
        </defs>
        
        <!-- texts -->
        <g id="name" opacity="60%">
          <text class="brand teal" x="67" y="63">data</text>
          <text class="brand teal" x="68" y="81">patch</text>
        </g>
        
        <g id="name2" mask="url(#maskText)">
          <text class="brand purple" x="67" y="63">data</text>
          <text class="brand purple" x="68" y="81">patch</text>
        </g>
        
        
        <!-- arcs -->
        <g id="arcsReveal2" mask="url(#maskArcs2)" class="purple" stroke="#bc85ff" >
        </g>

        <g id="arcsReveal" mask="url(#maskArcs)" class="teal" stroke="#6fdcbf">

          <path class="arc" d="M 66.83 105.99 C 52.25 106.3 38.66 98.64 31.37 86.01 C 24.07 73.39 24.22 57.79 31.77 45.31 C 39.31 32.83 53.04 25.44 67.61 26.03"/>
          <path class="arc" d="M 88.42 105.02 C 69.59 115.84 45.72 111.67 31.68 95.1 C 17.63 78.54 17.42 54.31 31.17 37.5 C 44.93 20.69 68.72 16.11 87.74 26.6"/>
          <path class="arc" d="M 105.69 96.41 C 92.77 113.27 70.6 120.13 50.41 113.51 C 30.23 106.89 16.43 88.23 16.01 66.99 C 15.59 45.75 28.64 26.56 48.54 19.15 C 68.45 11.73 90.87 17.7 104.45 34.04"/>
          <path class="arc" d="M 18.59 38.11 C 31.69 15.86 58.5 5.71 83.05 13.71 C 107.59 21.71 123.27 45.71 120.73 71.41 C 118.19 97.1 98.12 117.57 72.48 120.62 C 46.84 123.66 22.54 108.46 14.05 84.07"/>
          <path class="arc" d="M 33.53 15.55 C 59.24 -1.01 93.3 4.43 112.58 28.18 C 131.86 51.93 130.19 86.37 108.71 108.14 C 87.22 129.91 52.8 132.04 28.8 113.08"/>
          <path class="arc" d="M 61.42 1.16 C 85.52 -0.54 108.58 11.27 121.29 31.82 C 134 52.38 134.25 78.29 121.95 99.09 C 109.65 119.89 86.82 132.15 62.69 130.92"/>

        </g> 
        
      </svg>
    </div>
  </a>

</template>


<script>

  import { gsap } from "gsap"


  // cf : https://www.cassie.codes/posts/creating-my-logo-animation/
  // cf : https://css-tricks.com/libraries-for-svg-drawing-animations/
  // cf : https://greensock.com/get-started/#CSSPlugin
  // cf : https://codepen.io/GreenSock/full/vYBRPbO

  export default {
    name: 'LogoAnimated',
    head () {
      return {
        script: [
          // {
          //   // hid: 'stripe',
          //   type: 'text/javascript',
          //   defer: true,
          //   async: true,
          //   src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.3.1/gsap.min.js",
          //   callback: () => { console.log("gsap loaded") } 
          // },
          // {
          //   // hid: 'stripe',
          //   type: 'text/javascript',
          //   defer: true,
          //   async: true,
          //   src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/DrawSVGPlugin3.min.js",
          //   callback: () => { console.log("DrawSVGPlugin3 loaded") } 
          // },
          // {
          //   hid: 'stripe',
          //   type: 'text/javascript',
          //   defer: true,
          //   async: true,
          //   src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/plugins/ColorPropsPlugin.min.js"
          // },
        ]

      }
    },

    props: [
      'animated',
      'height',
      'yoyo',
      'repeat'
    ],

    data () {
      return {
        redo: false,
      }
    },

    beforeMount () {
      this.redo = this.repeat
      this.amount = this.repeat
    },

    mounted() {

      // console.clear();
      let targets = gsap.utils.toArray("#arcsReveal path")

      let arcsReveal2 = document.querySelector("#arcsReveal2")
      let appenpMask = document.querySelector("#maskArcs")
      let appenpMask2 = document.querySelector("#maskArcs2")

      // copy main paths arcs
      targets.forEach((obj, i) => {
        let clone = obj.cloneNode(true)
        arcsReveal2.appendChild(clone)
        let clone2 = obj.cloneNode(true)
        clone2.removeAttribute("stroke-dasharray")
        // clone2.removeAttribute("drawSVG");
        gsap.set(clone2, { 
          attr: { stroke: "white" }, 
          // drawSVG: 0 
        })
        appenpMask.appendChild(clone2);
      })

      targets.forEach((obj, i) => {
        let clone = obj.cloneNode(true)
        clone.removeAttribute("stroke-dasharray")
        // clone.removeAttribute("drawSVG");
        gsap.set(clone, {
          attr: { stroke: "white" },
          // drawSVG: 0 
        })
        appenpMask2.appendChild(clone)
      })

      this.animate()
    },

    methods: {
      animate()  {

        // animations for text
        gsap.to(".masker", {
          duration: 1,
          ease: 'circ.inOut',
          attr: { y: 68 },
          //attr: { y: 82 },
          yoyo: true,
          repeat: this.redo,
          repeatDelay: 2
        })
        gsap.set(".masker", {
          scaleY: 0,
        })
        gsap.to(".masker", {
          duration: 1,
          opacity: 1,
          ease: 'circ.inOut',
          scaleY: 1,
          yoyo: true,
          repeat: this.redo,
          repeatDelay: 2
        })

        gsap.to("#name", {
          duration: .9,
          opacity: 1,
          ease: 'power1.out',
          yoyo: true,
          repeat: this.redo,
          repeatDelay: 2.1
        })

        /*
        gsap.to("#name .brand", {
          duration: 1,
          //fill: "#6fdcbf",
          ease: "power1.out",
          yoyo: true,
          repeat: this.redo,
          repeatDelay: 2
        })
        */


        // animations arcs
        const easeArcs = 'sine.inOut'
        gsap.to("#maskArcs path", {
          duration: 1,
          // drawSVG: true,
          ease: easeArcs,
          yoyo: true,
          stagger: {
            amount: 1, 
            from: 0
          },
          repeat: this.redo,
          repeatDelay: 1
        })

        gsap.to("#maskArcs2 path", {
          duration: .5,
          // drawSVG: true,
          ease: easeArcs,
          yoyo: true,
          stagger: {
            amount: 1, 
            from: 0
          },
          repeat: this.redo,
          repeatDelay: 1.5,
        })

        /*
        gsap.from("#arcsReveal2 path, #arcsReveal path", {
          duration: 1.5,
          strokeDasharray: "0 4",
          //strokeWidth: 4,
          ease: "slow.inOut",
          yoyo: true,
          repeat: this.redo,
          repeatDelay: 1.5,
        })
        */

        // rotation arcs

        /*const arcsCenter = "51 66"
        gsap.set("#arcsReveal2, #arcsReveal, #maskArcs, #maskArcs2", {
          transformOrigin: arcsCenter,
        })

        gsap.from("#arcsReveal2 , #arcsReveal, #maskArcs, #maskArcs2", {
          duration: 1.5,
          rotation: -20,
          //transformOrigin: arcsCenter,
          svgOrigin: "75 75",
          ease: 'slow.inOut',
          yoyo: true,
          repeat: this.redo,
          repeatDelay: 1.5
        })
        */

        const origin = "70 68"
        const angle = -45
        gsap.from("#maskArcs path", {
          duration: 1,
          rotation: angle,
          //transformOrigin: arcsCenter,
          svgOrigin: origin,
          stagger: {
            amount: 1, 
            from: 0
          },
          ease: 'slow.inOut',
          yoyo: true,
          repeat: this.redo,
          repeatDelay: 1
        })
        gsap.from("#arcsReveal path", {
          duration: 1,
          rotation: angle,
          strokeDasharray: "0 4",
          //transformOrigin: arcsCenter,
          svgOrigin: origin,
          stagger: {
            amount: 1, 
            from: 0
          },
          ease: 'slow.inOut',
          yoyo: true,
          repeat: this.redo,
          repeatDelay: 1
        })
        gsap.from("#maskArcs2 path", {
          duration: 1,
          rotation: angle,
          //transformOrigin: arcsCenter,
          svgOrigin: origin,
          stagger: {
            amount: 1, 
            from: 0
          },
          ease: 'slow.inOut',
          yoyo: true,
          repeat: this.redo,
          repeatDelay: 1
        })
        gsap.from("#arcsReveal2 path", {
          duration: 1,
          rotation: angle,
          strokeDasharray: "0 4",
          //transformOrigin: arcsCenter,
          svgOrigin: origin,
          stagger: {
            amount: 1, 
            from: 0
          },
          ease: 'slow.inOut',
          yoyo: true,
          repeat: this.redo,
          repeatDelay: 1
        })
      }
    }
  }

</script>
