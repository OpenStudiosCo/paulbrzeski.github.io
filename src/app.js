!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";
  analytics.load("cUKYdp0otSF13STqmBCPHS2nhBitqdFx");
  analytics.page();
  }}();

$(document)
  .ready(function() {

    var binder = document.querySelector.bind(document);

    var camera = new THREE.Camera();
    camera.position.z = 1;

    var scene = new THREE.Scene();

    var geometry = new THREE.PlaneBufferGeometry(2, 2);

    window.uniforms = {
      time: { type: "f", value: Math.random() },
      resolution: { type: "v2", value: new THREE.Vector2() },
      mouse: { type: "v2", value: new THREE.Vector2() }
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

    render(Math.floor((Math.random() * 12000000) + 10000));

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

    var direction = 'up';
    var time_max = 1200;
    function render(time) {
      resize();
      if (time > time_max) {
        time = Math.floor((Math.random() * time_max) + time_max);
      }
      if (uniforms.time.value > time_max) {
        direction = 'down';
      }
      if (uniforms.time.value < 0) {
        direction = 'up';
      }
      if (direction == 'up') {
        uniforms.time.value += time * .000001;  
      }
      else {
        uniforms.time.value -= time * .000001;  
      }
      
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }

  })
;
