"use client";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import {useAppContext} from '@/components/common/AppContext'
import * as THREE from "three";
import { Vertex, Fragment } from "@/components/shaders/ProjectHover";

const ImgMesh = ({ img, texture, hasHover }) => {
  const mesh = useRef();
  const material = useRef();
  const hoverValue = useRef(0);

  // ✅ Set image size ONLY when everything is ready
  useEffect(() => {
    if (
      !material.current ||
      !material.current.uniforms ||
      !material.current.uniforms.uImageSize ||
      !texture ||
      !texture.image
    ) {
      return;
    }

    const image = texture.image;

    material.current.uniforms.uImageSize.value.set(
      image.naturalWidth || image.width,
      image.naturalHeight || image.height,
    );
  }, [texture]);

  useFrame((state, delta) => {
    if (
      !img ||
      !mesh.current ||
      !material.current ||
      !material.current.uniforms ||
      !material.current.uniforms.uPlaneSize
    )
      return;

    // Smooth hover animation
    const target = img.__hovered ? 1 : 0;

    // Hover animation
    hoverValue.current = THREE.MathUtils.lerp(hoverValue.current, target, 0.08);

    hoverValue.current = THREE.MathUtils.lerp(hoverValue.current, target, 0.08);

    material.current.uniforms.uHover.value = hoverValue.current;

    // ✅ THIS WAS MISSING 👇
    material.current.uniforms.uIsActive.value = img.__hovered ? 1 : 0;
    material.current.uniforms.uHasHover.value = hasHover ? 1 : 0;

    const bounds = img.getBoundingClientRect();

    const x = bounds.left + bounds.width / 2 - window.innerWidth / 2;
    const y = -(bounds.top + bounds.height / 2 - window.innerHeight / 2);

    mesh.current.position.set(x, y, 0);
    mesh.current.scale.set(bounds.width, bounds.height, 1);
    material.current.uniforms.uTime.value += delta;

    material.current.uniforms.uPlaneSize.value.set(bounds.width, bounds.height);
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[1, 1, 40, 40]} />
      <shaderMaterial
        ref={material}
        vertexShader={Vertex}
        fragmentShader={Fragment}
        uniforms={{
          uTexture: { value: texture },
          uImageSize: { value: new THREE.Vector2(1, 1) },
          uPlaneSize: { value: new THREE.Vector2(1, 1) },
          uHover: { value: 0 }, // 👈 NEW
          uTime: { value: 0 },

          uIsActive: { value: 0 },
          uHasHover: { value: 0 },
        }}
      />
    </mesh>
  );
};

const ProjectScene = () => {
  const images = useAppContext();
  const [domImages, setDomImages] = useState([]);

  const [hasHover, setHasHover] = useState(false);

  useEffect(() => {
    const check = () => {
      if (images.current.length) {
        setDomImages([...images.current]);
      } else {
        requestAnimationFrame(check);
      }
    };
    check();
  }, []);

  const textures = useTexture(domImages.map((img) => img.src));

  useFrame(() => {
    const anyHover = images.current.some((img) => img.__hovered);
    setHasHover(anyHover);
  });

  return (
    <>
      {domImages.map((img, i) => (
        <ImgMesh key={i} img={img} texture={textures[i]} hasHover={hasHover} />
      ))}
    </>
  );
};

export default ProjectScene;