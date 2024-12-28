// import { useRef, useEffect } from 'react';
// import * as THREE from 'three';
// import { GoogleGeminiEffect } from './gem';

// function LoginAuthenticationPage() { 

//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     // Initialize Three.js scene, camera, and renderer
//     const scene = new THREE.Scene();
//     const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
//     if (!canvasRef.current) return;
//     const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
//     renderer.setSize(window.innerWidth, window.innerHeight);

//     // Set camera position
//     camera.position.z = 1;

//     // Plane geometry
//     const planeGeometry = new THREE.PlaneGeometry(2, 2);

//     // Shader material
//     const shaderMaterial = new THREE.ShaderMaterial({
//       uniforms: {
//         resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
//         time: { value: 0 }
//       },
//       vertexShader: `
//         precision highp float;
//         attribute vec2 uv;
//         varying vec2 vUv;
//         void main() {
//           vUv = uv;
//           gl_Position = vec4(position, 1.0);
//         }
//       `,
//       fragmentShader: `
//         precision highp float;
//         varying vec2 vUv;
//         uniform vec2 resolution;
//         uniform float time;
//         #define SPEED 1.2
//         #define CYAN vec3(0, 1., 1.)
//         #define RED vec3(1., 0, 0)
//         #define BLUE vec3(0, 0, 1.)
        
//         float f(float x) {
//           return sin(x + time * SPEED) * .2;
//         }
        
//         float ff(float x) {
//           return f(x) * .5 + f(x*2.) * .2 + f(x*5.) * .3;
//         }
        
//         vec3 draw(vec2 p, float thickness, vec3 color, float amp) {
//           float r = 1. - smoothstep(abs(p.y - ff(p.x) * amp), 0., thickness);
//           vec3 c = r * color;
//           return c;
//         }
        
//         void main() {
//           vec2 p = vec2(vUv.x * 2. - 1., 1. - vUv.y * 2.);
//           vec3 c = vec3(0);
//           for (int i = 0; i < 3; i++) {
//             float lum = .5 - float(i)*.1;
//             float amp = 0.5 + float(i) * .6;
//             float thick = 0.02 + 0.05 * float(i);
//             c += draw(p + vec2(float(i), 0), thick, BLUE, amp) * lum;
//             c += draw(p + vec2(float(i + 1.), 0), thick, CYAN, amp) * lum;
//             c += draw(p + vec2(float(i + 2.), 0), thick, RED, amp) * lum;
//           }
//           c = clamp(c * vec3(2., .5, 2.), 0., 1.);
//           gl_FragColor = vec4(c, 1.);
//         }
//       `,
//     });

//     // Mesh with plane geometry and shader material
//     const planeMesh = new THREE.Mesh(planeGeometry, shaderMaterial);
//     scene.add(planeMesh);

//     // Animation loop
//     const animate = () => {
//       shaderMaterial.uniforms.time.value += 0.01; // Update time
//       renderer.render(scene, camera);
//       requestAnimationFrame(animate);
//     };

//     animate();

//     // Handle window resizing
//     const onResize = () => {
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       shaderMaterial.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
//     };

//     window.addEventListener('resize', onResize);

//     return () => {
//       window.removeEventListener('resize', onResize);
//       renderer.dispose();
//     };
//   }, []);

//   return (
//     // <canvas
//     //   ref={canvasRef}
//     //   style={{ width: '100vw', height: '100vh', display: 'block' }}
//     // />
//     <GoogleGeminiEffect/>
//   );
// }

// export default LoginAuthenticationPage;


"use client";
import { useScroll, useTransform } from "framer-motion";
import React from "react";
import WaveAnimation, { GoogleGeminiEffect } from "./gem";

function LoginAuthenticationPage() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // const pathLength = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  return (
    <div
      className="h-[400vh] bg-black w-full dark:border dark:border-white/[0.1] rounded-md relative pt-40 overflow-clip"
      ref={ref}
    >
      {/* <GoogleGeminiEffect
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
      /> */}
    <WaveAnimation/>
    </div>
  );
}


export default LoginAuthenticationPage;
