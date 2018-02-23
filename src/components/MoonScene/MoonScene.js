import React, { Component } from 'react';
import * as THREE from 'three';
import * as ObjectLoader from 'three-obj-loader';
import OBJ from '../../shared/Moon_Model/moon.obj';
import TXT_IMG from '../../shared/Moon_Model/MoonMap2_2500x1250.jpg';
import BUMP_MAP from '../../shared/Moon_Model/moon-normal.jpg';

import texture_image from '../../shared/images/planet-512.jpg';
import nMap from '../../shared/images/normal-map-512.jpg';
import sMap from '../../shared/images/water-map-512.jpg';

const CANVAS_WIDTH = 1440;
const CANVAS_HEIGHT = 1050;
class MoonScene extends Component {
  constructor() {
    super();

    this.animate = this.animate.bind(this);
    this.modelAnimateIn = this.modelAnimateIn.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);

    this.state = {
      wrapperClass: ''
    };
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
    this.camera.lookAt(this.scene.position);

    const ambientLight = new THREE.AmbientLight(0x7d7874, 0.5);
    // this.scene.add(ambientLight);

    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(40, 40, 70);
    spotLight.intensity = 2;
    this.scene.add(spotLight);

    // const spotLight = new THREE.SpotLight(0xffffff, 0.4);
    // spotLight.position.set(590, 180, 500);
    // spotLight.castShadow = true;

    // spotLight.power = 8;
    // spotLight.distance = 80000;

    // this.scene.add(spotLight);

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

    var planetGeometry = new THREE.SphereGeometry(60, 300, 300);

    //Load the planet textures
    var texture = THREE.ImageUtils.loadTexture(texture_image);
    var normalmap = THREE.ImageUtils.loadTexture(nMap);
    var specmap = THREE.ImageUtils.loadTexture(sMap);

    var planetMaterial = new THREE.MeshPhongMaterial();
    planetMaterial.map = texture;

    planetMaterial.specularMap = specmap;
    planetMaterial.specular = new THREE.Color(0xff0000);
    planetMaterial.shininess = 1;

    planetMaterial.normalMap = normalmap;
    planetMaterial.normalScale.set(-0.3, -0.3);

    var planet = new THREE.Mesh(planetGeometry, planetMaterial);

    //here we allow the texture/normal/specular maps to wrap
    planet.material.map.wrapS = THREE.RepeatWrapping;
    planet.material.map.wrapT = THREE.RepeatWrapping;
    planet.material.normalMap.wrapS = THREE.RepeatWrapping;
    planet.material.normalMap.wrapT = THREE.RepeatWrapping;
    planet.material.specularMap.wrapS = THREE.RepeatWrapping;
    planet.material.specularMap.wrapT = THREE.RepeatWrapping;

    //here we repeat the texture/normal/specular maps twice along X
    planet.material.map.repeat.set(2, 1);
    planet.material.normalMap.repeat.set(2, 1);
    planet.material.specularMap.repeat.set(2, 1);

    planet.position.x = 0;
    planet.position.y = 0;
    planet.position.z = 0;
    planet.name = 'planet';

    // scene.add(planet);

    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.animate();
    this.props.isReady && this.modelAnimateIn();
    window.addEventListener('mousemove', this.onMouseMove);
  }

  modelAnimateIn() {
    if (this.camera.position.z === 250) {
      this.setState({ hasCompletedModelAnimateIn: true });

      return;
    }

    // const model = this.scene.getObjectByName('moonModel');
    const model = this.scene.getObjectByName('planet');
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
      // const model = this.scene.getObjectByName('moonModel');
      const model = this.scene.getObjectByName('planet');

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

  componentDidUpdate(prevProps) {
    if (this.props.isReady && !prevProps.isReady) {
      this.setState({
        wrapperClass: 'show-wrapper'
      });
      this.modelAnimateIn();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.onMouseMove);
  }

  render() {
    const { beginExit } = this.props;
    return (
      <div
        className={`scene-wrapper ${this.state.wrapperClass} ${
          beginExit ? 'begin-exit' : ''
        }`}
        ref="threeWrapper"
      />
    );
  }
}

export default MoonScene;
