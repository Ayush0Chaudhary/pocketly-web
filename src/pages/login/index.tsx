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


// "use client";
// import React from "react";
// import WaveAnimation from "./gem";

// function LoginAuthenticationPage() {
//   const ref = React.useRef(null);

//   return (
//     <div
//       className="h-[400vh] bg-black w-full dark:border dark:border-white/[0.1] rounded-md relative pt-40 overflow-clip"
//       ref={ref}
//     >
//       {/* <GoogleGeminiEffect
//         pathLengths={[
//           pathLengthFirst,
//           pathLengthSecond,
//           pathLengthThird,
//           pathLengthFourth,
//           pathLengthFifth,
//         ]}
//       /> */}
//     <WaveAnimation/>
//     </div>
//   );
// }


// export default LoginAuthenticationPage;



import { useState } from "react";
import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
import imgs from "@/assets/ha.jpeg"
import { Heart, Smile, Frown } from "lucide-react";

export default function ValentineProposal() {
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100 p-6 text-center">
      <motion.h1
        className="text-4xl font-bold text-red-600 mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      >
        Will you be my Valentine? ❤️
      </motion.h1>
      <motion.img
        src={imgs}
        alt="Love Image"
        className=" shadow-lg mb-6 w-64 h-64 object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
      <div className="flex gap-6">
        <motion.button
          className="px-6 py-3 bg-pink-500 text-white rounded-xl shadow-lg text-lg font-semibold hover:bg-pink-600 transition-all"
          whileHover={{ scale: 1.1 }}
          onClick={() => setAnswer("yes")}
        >
          Yes! <Heart className="inline ml-1" />
        </motion.button>
        <motion.button
          className="px-6 py-3 bg-gray-300 text-gray-700 rounded-xl shadow-lg text-lg font-semibold hover:bg-gray-400 transition-all"
          whileHover={{ scale: 1.1 }}
          onClick={() => setAnswer("no")}
        >
          No <Frown className="inline ml-1" />
        </motion.button>
      </div>
      {answer && (
        <motion.div
          className="mt-6 text-xl font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {answer === "yes" ? (
            <p className="text-green-600">Yay! I love you! ❤️ <Smile /></p>
          ) : (
            <p className="text-red-600">Aww, but I still love you! 🥺</p>
          )}
        </motion.div>
      )}
    </div>
  );
}
