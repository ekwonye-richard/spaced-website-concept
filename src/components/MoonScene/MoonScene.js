import React, { Component } from 'react';
import * as THREE from 'three';
import * as ObjectLoader from 'three-obj-loader';
import OBJ from '../../shared/Moon_Model/moon.obj';
import TXT_IMG from '../../shared/Moon_Model/MoonMap2_2500x1250.jpg';
import BUMP_MAP from '../../shared/Moon_Model/moon-normal.jpg';

class MoonScene extends Component {
  constructor() {
    super();

    this.animate = this.animate.bind(this);
    this.modelIntro = this.modelIntro.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);

    const previousMousePosition = {
      x: 0,
      y: 0
    };

    this.state = {
      previousMousePosition
    };
  }

  componentDidMount() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.refs.threeWrapper.appendChild(this.renderer.domElement);

    this.camera.position.z = 150;

    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.05);
    this.scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(590, 180, 90);
    // spotLight.position.set( 35000, 10000, -1200 );
    spotLight.castShadow = true;
    spotLight.penumbra = 0;
    // spotLight.distance = 40000;
    spotLight.distance = 5000;
    spotLight.decay = 10;

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
      moonObj.position.x = 18;
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
    this.modelIntro();
  }

  modelIntro() {
    if (this.camera.position.z === 200) {
      return;
    }

    const model = this.scene.getObjectByName('moonModel');
    requestAnimationFrame(this.modelIntro);

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
    const model = this.scene.getObjectByName('moonModel');
    const { previousMousePosition, isDragging } = this.state;
    const { nativeEvent } = e;

    const deltaMove = {
      x: nativeEvent.offsetX - previousMousePosition.x,
      y: nativeEvent.offsetY - previousMousePosition.y
    };

    if (isDragging) {
      model.rotation.x += deltaMove.y / 600;
      model.rotation.y += deltaMove.x / 600;
    }

    const mousePosition = {
      x: nativeEvent.offsetX,
      y: nativeEvent.offsetY
    };

    this.setState({
      previousMousePosition: mousePosition
    });
  }

  render() {
    const { isDragging } = this.state;

    return (
      <div
        className={`three-wrapper ${isDragging ? 'grabbing' : ''}`}
        ref="threeWrapper"
        onMouseMove={this.onMouseMove}
        onMouseDown={() => this.setState({ isDragging: true })}
        onMouseUp={() => this.setState({ isDragging: false })}
      />
    );
  }
}

export default MoonScene;
