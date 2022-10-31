const login = () =>{
    fetch('http://localhost:8080/').then((res) =>{
       location.href=res.url
   })
   
}

const registro = () =>{
   fetch('http://localhost:8080/signup').then((res) =>{
      location.href=res.url
  })
  
}