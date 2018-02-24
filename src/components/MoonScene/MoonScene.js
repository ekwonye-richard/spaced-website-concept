import React, { Component } from 'react';
import * as THREE from 'three';
import TXT_IMG from '../../shared/Moon_Model/MoonMap2_2500x1250.jpg';

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

    let spotLight = new THREE.SpotLight(0xaaa4a1);
    spotLight.position.set(60, 10, 125);
    spotLight.intensity = 2;
    this.scene.add(spotLight);

    var moonGeometry = new THREE.SphereGeometry(65, 350, 350);

    var texture = THREE.ImageUtils.loadTexture(TXT_IMG);

    var moonMaterial = new THREE.MeshPhongMaterial();
    moonMaterial.map = texture;
    moonMaterial.shininess = 1;
    moonMaterial.normalScale.set(-0.3, -0.3);

    var moon = new THREE.Mesh(moonGeometry, moonMaterial);

    moon.material.map.wrapS = THREE.RepeatWrapping;
    moon.material.map.wrapT = THREE.RepeatWrapping;
    moon.material.map.repeat.set(2, 1);

    moon.position.x = 15;
    moon.position.y = window.innerHeight < 840 ? 10 : 0;
    moon.position.z = 0;
    moon.rotation.x = 0.22;
    moon.rotation.y = -9.5;
    moon.name = 'moon';

    this.scene.add(moon);

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

    const model = this.scene.getObjectByName('moon');
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
      const model = this.scene.getObjectByName('moon');

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
