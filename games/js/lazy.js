function lazyImg() {
    const img = document.querySelectorAll(".lazy")
    const callback = en => {
        en.forEach(item => {
            if (item.isIntersecting) {
                const imgs = item.target
                const dataSrc = imgs.getAttribute("data-src")
                setTimeout(() => {
                    imgs.setAttribute('src', dataSrc)
                }, 500)
                observer.unobserve(imgs)
            }
        })
    }
    const observer = new IntersectionObserver(callback)
    img.forEach(item => {
        observer.observe(item)
    })
}
lazyImg()

window.onload = function () {
    lazyImg()
}

