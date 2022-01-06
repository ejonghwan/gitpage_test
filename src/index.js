import img from '../src/assets/images/aa.jpeg'
import './assets/css/style.css'


window.addEventListener('load', () => {
    const imgele = document.querySelector('.imgaa')
    imgele.innerHTML = `
        <img src=${img} />
    `
    // console.log(imgele)
})