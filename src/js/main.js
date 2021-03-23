const floatFooter = document.querySelector('.float__footer')
const floatPagin = document.querySelectorAll('.pag_item') 
const inputRange = document.querySelector('#input__range')
const sectionThree = document.querySelector('.section-three')
const parallaxImg = document.querySelectorAll('.section-two img')


let currentPage = 0
let touchStart = 0
let touchMove = 0
let touchModule = 0 

//add parallax
document.addEventListener('scroll',function(){
  parallaxImg.forEach(item=>{
    item.style.transform = `translateY(${window.scrollY/8}px)`
  })
})

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
    window.scrollBy({ top: 768, behavior: 'smooth' })
  }
  if(touchModule < -200 && currentPage > 0) {
    window.scrollBy({ top: -768, behavior: 'smooth'})
  }

})

//sticky range
inputRange.addEventListener('input',function(ev){
  let val = +ev.target.value
  if(val <= 25){inputRange.value = 0}else
  if(val >= 75 && val <= 100){inputRange.value = 100}else
  if(val > 100 && val <= 125){inputRange.value = 100}else
  if(val >= 175 && val <= 200){inputRange.value = 200}
})


// logic of input-range
inputRange.addEventListener('input',function(ev){
  
  switch(+ev.target.value){
    case 0 :
      sectionThree.style.backgroundPosition = 'left'
    break;

    case 100 : 
      sectionThree.style.backgroundPosition = 'center'
    break;

    case 200 :
      sectionThree.style.backgroundPosition = 'right'
    break;
  }
})




