import React, { Component } from 'react';
import * as THREE from 'three';
import * as ObjectLoader from 'three-obj-loader';
import OBJ from '../../shared/Moon_Model/moon.obj';
import TXT_IMG from '../../shared/Moon_Model/MoonMap2_2500x1250.jpg';
import BUMP_MAP from '../../shared/Moon_Model/moon-normal.jpg';

const CANVAS_WIDTH = 1440;
const CANVAS_HEIGHT = 1050;
class MoonScene extends Component {
  constructor() {
    super();

    this.animate = this.animate.bind(this);
    this.modelAnimateIn = this.modelAnimateIn.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);

    this.state = {};
  }

  componentDidMount() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      34,
      CANVAS_WIDTH / CANVAS_HEIGHT,
      1,
      2000
    );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
    this.refs.threeWrapper.appendChild(this.renderer.domElement);

    this.camera.position.z = 215;

    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.05);
    this.scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    // spotLight.position.set(590, 180, 90);
    spotLight.position.set(35000, 10000, -1200);
    spotLight.castShadow = true;
    spotLight.penumbra = 0;
    spotLight.distance = 40000;
    // spotLight.distance = 5000;
    // spotLight.decay = 10;

    this.scene.add(spotLight);

    const scene = this.scene;
    const threeLoader = THREE;
    const OBJLoader = ObjectLoader;
    OBJLoader(threeLoader);

    const manager = new THREE.LoadingManager();
    const loader = new THREE.ImageLoader(manager);

    const moonTexture = new THREE.Texture();

    loader.load(TXT_IMG, image => {
      moonTexture.image = image;
      moonTexture.needsUpdate = true;
    });

    const meshes = [];

    const objLoader = new threeLoader.OBJLoader();

    objLoader.load(OBJ, object => {
      object.traverse(child => {
        if (child instanceof THREE.Mesh) {
          meshes.push(child);
        }
      });

      const moonObj = meshes[0];
      moonObj.name = 'moonModel';
      moonObj.position.x = 20;
      moonObj.position.y = 15;
      moonObj.rotation.x = 0.22;
      moonObj.rotation.y = -2;

      scene.add(moonObj);

      const moonBumpMap = new THREE.TextureLoader().load(BUMP_MAP);

      moonObj.material = new THREE.MeshPhongMaterial({
        map: moonTexture,
        bumpMap: moonBumpMap,
        specular: 0xfff7e8,
        bumpScale: 1
      });
    });

    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.animate();
    this.modelAnimateIn();

    window.addEventListener('mousemove', this.onMouseMove);
  }

  modelAnimateIn() {
    if (this.camera.position.z === 250) {
      this.setState({ hasCompletedModelAnimateIn: true });

      return;
    }

    const model = this.scene.getObjectByName('moonModel');
    requestAnimationFrame(this.modelAnimateIn);

    if (model) {
      this.camera.position.z += 0.5;
      model.rotation.x -= 0.0015;
      model.rotation.y += 0.0035;
    }
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  }

  onMouseMove(e) {
    const { previousMousePosition, hasCompletedModelAnimateIn } = this.state;

    if (!hasCompletedModelAnimateIn) {
      return;
    }

    if (previousMousePosition) {
      const model = this.scene.getObjectByName('moonModel');

      const deltaMove = {
        x: e.screenX - previousMousePosition.x,
        y: e.screenY - previousMousePosition.y
      };

      model.rotation.x += deltaMove.y / 2300;
      model.rotation.y += deltaMove.x / 2300;
    }

    const mousePosition = {
      x: e.screenX,
      y: e.screenY
    };

    this.setState({
      previousMousePosition: mousePosition
    });
  }

  render() {
    return <div className="scene-wrapper" ref="threeWrapper" />;
  }
}

export default MoonScene;
