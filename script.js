// 获取 Canvas 和上下文
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

// 设置 Canvas 大小
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// 烟花粒子类
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 5; // 随机水平速度
        this.vy = (Math.random() - 0.5) * 5; // 随机垂直速度
        this.radius = Math.random() * 2 + 1; // 随机粒子大小
        this.color = `hsla(${Math.random() * 360}, 100%, 50%, ${Math.random()})`; // 随机颜色
        this.life = 100; // 粒子生命周期
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// 烟花效果管理
const particles = [];
function createFirework(x, y) {
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle(x, y));
    }
}

// 主循环
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, index) => {
        p.update();
        p.draw();
        if (p.life <= 0) {
            particles.splice(index, 1); // 移除生命周期结束的粒子
        }
    });
    // 随机生成烟花
    if (Math.random() < 0.02) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        createFirework(x, y);
    }
    requestAnimationFrame(animate);
}
animate();

// 背景音乐控制
const bgMusic = document.getElementById('aud');

// 页面加载时自动播放静音音乐
window.onload = () => {
    bgMusic.muted = true; // 静音播放
    bgMusic.play()
        .then(() => console.log('静音音乐自动播放'))
        .catch((error) => console.log('自动播放失败:', error));
};

// 用户点击页面后取消静音并播放音乐
document.addEventListener('click', () => {
    if (bgMusic.muted) {
        bgMusic.muted = false;
        bgMusic.play()
            .then(() => console.log('音乐开始播放'))
            .catch(err => console.error('播放失败:', err));
    }
});