$(document)
  .ready(function() {

    var binder = document.querySelector.bind(document);

    var camera = new THREE.Camera();
    camera.position.z = 1;

    var scene = new THREE.Scene();

    var geometry = new THREE.PlaneBufferGeometry(2, 2);

    var uniforms = {
      time: { type: "f", value: Math.random() },
      resolution: { type: "v2", value: new THREE.Vector2() },
      mouse: { type: "v2", value: new THREE.Vector2() },
    };

    var material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: binder('#vs').text,
      fragmentShader: binder('#fs').text,
    });

    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    var renderer = new THREE.WebGLRenderer({ canvas: $('canvas')[0], alpha: true });
    renderer.domElement.addEventListener('mousemove', recordMousePosition);
    renderer.setClearColor( 0xFFFFFF, 0 );

    render(0);

    function recordMousePosition(e) {
      // normalize the mouse position across the canvas
      // so in the shader the values go from -1 to +1
      var canvas = renderer.domElement;
      var rect = canvas.getBoundingClientRect();

      uniforms.mouse.value.x = (e.clientX - rect.left) / canvas.clientWidth  *  2 - 1;
      uniforms.mouse.value.y = (e.clientY - rect.top ) / canvas.clientHeight * -2 + 1;      
    }

    function resize() {
      var canvas = renderer.domElement;
      var dpr    = window.devicePixelRatio;  // make 1 or less if too slow
      var width  = canvas.clientWidth  * dpr;
      var height = canvas.clientHeight * dpr;
      if (width != canvas.width || height != canvas.height) {
        renderer.setSize( width, height, false );
        uniforms.resolution.value.x = renderer.domElement.width;
        uniforms.resolution.value.y = renderer.domElement.height;
      }
    }

    function render(time) {
      resize();
      uniforms.time.value += time * 0.0000001;
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }

  })
;
