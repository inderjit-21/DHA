// export const Vertex = `
//  varying vec2 vUv;
//  uniform float uHover;
//  uniform float uTime;

//   void main() {
//   vUv = uv;

//   vec3 pos = position;
//   float wave = sin(uv.x + uv.y * 6.0 + uTime * 2.0) * 4.0;
//   pos.z += wave * uHover;

//   gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
// }
// `;

// --------------------------------------------------------------------

export const Vertex = `
varying vec2 vUv;
uniform float uHover;
uniform float uTime;

void main() {
  vUv = uv;

  vec3 pos = position;

  float dist = distance(uv, vec2(0.5));
  float ripple = sin(dist * 10.0 - uTime * 3.0) * 4.15;

  pos.z += ripple * uHover;


  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

// --------------------------------------------------------------------







// export const Fragment = `
// precision mediump float;

// uniform sampler2D uTexture;
// uniform vec2 uImageSize;
// uniform vec2 uPlaneSize;


// varying vec2 vUv;

// void main() {
//   vec2 uv = vUv;

//   float imageAspect = uImageSize.x / uImageSize.y;
//   float planeAspect = uPlaneSize.x / uPlaneSize.y;

//   vec2 scale = vec2(1.0);

//   if (planeAspect > imageAspect) {
//     // Plane is wider → crop top/bottom
//     scale.y = imageAspect / planeAspect;
//   } else {
//     // Plane is taller → crop left/right
//     scale.x = planeAspect / imageAspect;
//   }

//   // Center the image (object-position: center)
//   uv = (uv - 0.5) * scale + 0.5;

//   // Crop overflow (object-fit: cover)
//   if (
//     uv.x < 0.0 || uv.x > 1.0 ||
//     uv.y < 0.0 || uv.y > 1.0
//   ) {
//     discard;
//   }

//   gl_FragColor = texture2D(uTexture, uv);
// }`;

export const Fragment = `
precision mediump float;

uniform sampler2D uTexture;
uniform vec2 uImageSize;
uniform vec2 uPlaneSize;

uniform float uIsActive;   // 1.0 if this mesh is hovered
uniform float uHasHover;   // 1.0 if any mesh is hovered

varying vec2 vUv;

vec3 grayscale(vec3 color) {
  float gray = dot(color, vec3(0.299, 0.587, 0.114));
  return vec3(gray);
}

void main() {
  vec2 uv = vUv;

  float imageAspect = uImageSize.x / uImageSize.y;
  float planeAspect = uPlaneSize.x / uPlaneSize.y;

  vec2 scale = vec2(1.0);

  if (planeAspect > imageAspect) {
    scale.y = imageAspect / planeAspect;
  } else {
    scale.x = planeAspect / imageAspect;
  }

  uv = (uv - 0.5) * scale + 0.5;

  if (
    uv.x < 0.0 || uv.x > 1.0 ||
    uv.y < 0.0 || uv.y > 1.0
  ) {
    discard;
  }

  vec4 color = texture2D(uTexture, uv);

  // 👉 BLACK & WHITE LOGIC
  if (uHasHover > 0.5 && uIsActive < 0.5) {
    color.rgb = grayscale(color.rgb);
  }

  gl_FragColor = color;
}
`;
