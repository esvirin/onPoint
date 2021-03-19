const floatFooter = document.querySelector('.float__footer')
const floatPagin = document.querySelectorAll('.pag_item') 
const inputRange = document.querySelector('#input__range')
const rangeImage = document.querySelector('.range__input img')
const rangeFill = document.querySelector('.range__input .fill')
const sectionThree = document.querySelector('.section-three')
const breakPoints = [0, 768, 1536]

let currentPage = 0
let touchStart = 0
let touchMove = 0
let touchModule = 0 




document.addEventListener('scroll', function(){
  //kill bottom nav
  let position = window.scrollY
  position > 50 ? floatFooter.style.display = 'none' : floatFooter.style.display = 'flex'
  
    if(position >= 1500){
      currentPage = 2 
    }else if(position < 750){
      currentPage = 0
    }else {
      currentPage = 1}

// pagination
  floatPagin.forEach(function(item){
    if(item.id-1 === currentPage){
      item.style.backgroundColor = '#f78b1f'
    }else{item.style.backgroundColor = '#fff'}
  })
  
})


//touch handler
document.addEventListener('touchstart', start =>{
  touchStart = start.touches[0].clientY
})

document.addEventListener('touchmove', move=>{
  move.preventDefault()
  touchMove = move.touches[0].clientY
  touchModule = touchStart - touchMove
},{ passive: false })

document.addEventListener('touchend', function(){

  if(touchModule > 200 && currentPage < 2) {
    window.scrollTo(0, breakPoints[currentPage + 1],{ behavior: 'smooth'})
  }
  if(touchModule < -200 && currentPage > 0) {
    window.scrollTo(0, breakPoints[currentPage - 1],{ behavior: 'smooth' })
  }

})




// logic of input-range
inputRange.addEventListener('change',function(ev){

  switch(+ev.target.value){
    case 0 :
      rangeFill.style.width = '0%'
      rangeImage.style.marginLeft = 'inherit'
      sectionThree.style.backgroundPosition = 'left'
    break;

    case 1 : 
      rangeFill.style.width = '50%'
      rangeImage.style.marginLeft = '50%'
      sectionThree.style.backgroundPosition = 'center'
    break;

    case 2 :
      rangeFill.style.width = '100%'
      rangeImage.style.marginLeft = '100%'
      sectionThree.style.backgroundPosition = 'right'
    break;
  }
})


