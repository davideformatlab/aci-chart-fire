class ChartContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            </style>
            <canvas></canvas>
        `;

        this.init3D();
    }

    init3D() {
        const canvas = this.shadowRoot.querySelector('canvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, this.clientWidth / this.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas });

        renderer.setSize(this.clientWidth, this.clientHeight);

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render(scene, camera);
        }

        animate();
    }
}

class InfoPanel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <h2>ACI Chart Information</h2>
            <p>Select an element on the chart to learn more about it.</p>
        `;
    }
}

customElements.define('chart-container', ChartContainer);
customElements.define('info-panel', InfoPanel);
