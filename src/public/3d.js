const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas')
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(5)

const earthTexture = new THREE.TextureLoader().load('faputa.jpg')

const moon = new THREE.Mesh(
  new THREE.BoxGeometry(2.5, 2.5, 2.5),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
  })
)
scene.add(moon)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0xffffff)

scene.add(pointLight, ambientLight)

function animate() {
  requestAnimationFrame(animate)
  moon.rotation.y += 0.015
  moon.rotation.z += 0.015
  moon.rotation.x += 0.015

  renderer.render(scene, camera)
}

animate()