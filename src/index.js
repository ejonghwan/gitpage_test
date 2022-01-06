import img from '../src/assets/images/aa.jpeg'


window.addEventListener('DOMContentLoaded', () => {
    const img = document.querySelector('.img')
    img.innerHTML `
        <img src=${img} />
    `
})