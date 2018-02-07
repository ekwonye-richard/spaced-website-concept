import React, { Component } from 'react';
import * as THREE from 'three';
import * as MaterialLoader from 'three-mtl-loader';
import * as ObjectLoader from 'three-obj-loader';
import './App.css';
import MTL from './shared/iPhone7Plus_OBJ.mtl';
import OBJ from './shared/iPhone7Plus_OBJ.obj';

class App extends Component {
  constructor() {
    super();

    this.animate = this.animate.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);

    const previousMousePosition = {
      x: 0,
      y: 0
    };

    this.state = {
      previousMousePosition
    }
  }

  componentDidMount() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 1, 2000 );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.refs.threeWrapper.appendChild( this.renderer.domElement );

    this.camera.position.z = 250;

    const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
    this.scene.add( ambientLight );

    const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
    this.camera.add( pointLight );

    const scene = this.scene;
    const threeLoader = THREE;
    const MTLLoader = MaterialLoader;
    const OBJLoader = ObjectLoader;
    OBJLoader(threeLoader);

    const materials = new MTLLoader();
    materials.load(MTL, material => {
      material.preload();

      const loader = new threeLoader.OBJLoader();

      loader.setMaterials(material);

      loader.load(
        OBJ,
        object => {
            // object.position.y = - 95;
            object.name = 'iPhoneModel';
            // object.rotation.x = Math.PI/4;
            // object.rotation.y = Math.PI/4;
            object.rotation.x = 1.5;
            object.rotation.y = 0;
            object.rotation.z = 0.4;

            scene.add( object );
        },
        xhr => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        error => {
          console.log('An error happened');
          console.log(error);
        }
      );
    });

    this.renderer.setPixelRatio( window.devicePixelRatio );

    this.animate();
    
  }

  animate() {
    requestAnimationFrame( this.animate );
    this.renderer.render(this.scene, this.camera);
  }

  onMouseMove(e) {
    const model = this.scene.getObjectByName( 'iPhoneModel' );
    
    const { previousMousePosition, isDragging } = this.state;
    const { nativeEvent } = e;

    const deltaMove = {
      x: nativeEvent.offsetX-previousMousePosition.x,
      y: nativeEvent.offsetY-previousMousePosition.y
    };

    if(isDragging) {
            
        const deltaRotationQuaternion = new THREE.Quaternion()
            .setFromEuler(new THREE.Euler(
                this.toRadians(deltaMove.y * 1),
                this.toRadians(deltaMove.x * 1),
                0,
                'XYZ'
            ));
        
        model.quaternion.multiplyQuaternions(deltaRotationQuaternion, model.quaternion);
    }
    
    const mousePosition = {
      x: nativeEvent.offsetX,
      y: nativeEvent.offsetY
    };

    this.setState({
      previousMousePosition: mousePosition
    })

  }

  toRadians(angle) {
    return angle * (Math.PI / 180);
  }

  render() {
    const { isDragging } = this.state;
    return (
      <div className="App">
        <div 
          className={`three-wrapper ${isDragging ? 'grabbing' : ''}`}
          ref="threeWrapper"
          onMouseMove={this.onMouseMove}
          onMouseDown={ () => this.setState({isDragging: true})}
          onMouseUp={ () => this.setState({isDragging: false})}
        />
      </div>
    );
  }
}

export default App;
