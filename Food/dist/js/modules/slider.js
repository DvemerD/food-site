function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    
    // Slider

    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          arrowPrev = document.querySelector(prevArrow),
          arrowNext = document.querySelector(nextArrow),
          currentSlide = document.querySelector(currentCounter),
          totalSlide = document.querySelector(totalCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    function modStyleOpacity() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = '1';
    }

    function modCurrentNumber() {
        if (slideIndex< 10) {
            currentSlide.textContent = `0${slideIndex}`;
        } else {
            currentSlide.textContent = slideIndex;
        }
    }

    function modStrToNumber(str) {
        return +str.replace(/\D/g, '');
    }

    

    if (slides.length < 10) {
        totalSlide.textContent = `0${slides.length}`;
        currentSlide.textContent = `0${slideIndex}`;
    } else {
        totalSlide.textContent = slides.length;
        currentSlide.textContent = slideIndex;    
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0 ) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    arrowNext.addEventListener('click', () => {
        if (offset == modStrToNumber(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += modStrToNumber(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`; 
        
        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        modCurrentNumber();
        modStyleOpacity();
    });

    arrowPrev.addEventListener('click', () => {
        if (offset == 0) {
            offset = modStrToNumber(width) * (slides.length - 1)
        } else {
            offset -= modStrToNumber(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;  
        
        if (slideIndex == 1) {
            slideIndex = 4;
        } else {
            slideIndex--;
        }

        modCurrentNumber();
        modStyleOpacity();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = modStrToNumber(width) * (slideTo - 1)

            slidesField.style.transform = `translateX(-${offset}px)`;
            
            modCurrentNumber();
            modStyleOpacity();
        });
    });
}

export default slider;