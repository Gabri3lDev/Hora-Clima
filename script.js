const hor = document.getElementById("hora");
const min = document.getElementById("minuto");
const Dia = document.getElementById("Dia");
const diasem = document.getElementById("diaSem");
const mes = document.getElementById("mes");
const ano = document.getElementById("ano");

	

let nameV = document.getElementById("TempC");
let city = document.getElementById("City");
let umidade = document.getElementById("Umidade");
let vento = document.getElementById("Vento");
let horaA = new Date().getHours()

const sol = document.getElementById("Sun");
const lua = document.getElementById("Moon");
const backG = document.getElementById("back");


const swiper = new Swiper('.swiper', {
  
    pagination: {
      el: '.swiper-pagination',
    },
});

function addD(Digito){
  if(Digito < 10){
    return "0" + Digito
  }
  else{
    return Digito
  }
}

const horario = () =>{

  hor.innerText = addD(horaA)

  let minu = new Date().getMinutes()
  min.innerText = addD(minu)

  let DiaS = (new Date().getDay() + 1)

  let dia = (new Date().getDate())
  Dia.innerText = dia

  let month = (new Date().getMonth() + 1)

  let Ano = (new Date().getFullYear())
  ano.innerText = Ano

  switch( DiaS ) {
    case 1:
      diasem.innerText = 'Domingo';
      break;
    case 2:
      diasem.innerText = 'Segunda-feira';
      break;
    case 3:
      diasem.innerText = 'Terça-feira';
      break;
    case 4:
      diasem.innerText = 'Quarta-feira';
      break;
    case 5:
      diasem.innerText = "Quinta-feira";
      break;
    case 6:
      diasem.innerText = "Sexta-feira";
      break;
    case 7:
      diasem.innerText = 'Sábado';
  }

  switch(month){
    case 1:
      mes.innerText = 'Janeiro';
      break;
    case 2:
      mes.innerText = 'Fevereiro';
      break;
    case 3:
      mes.innerText = 'Março';
      break;
    case 4:
      mes.innerText = 'Abril';
      break;
    case 5:
      mes.innerText = 'Maio';
      break;
    case 6:
      mes.innerText = 'Junho';
      break;
    case 7:
      mes.innerText = 'Julho';
      break;
    case 8:
      mes.innerText = 'Agosto';
      break;
    case 9:
      mes.innerText = 'Setembro';
      break;
    case 10:
      mes.innerText = 'Outubro';
      break;
    case 11:
      mes.innerText = 'Novembro ';
      break;
    case 12:
      mes.innerText = 'Dezembro';
  }
}

const icon = () => {
  if (horaA >= 18) {
    lua.style.display = "flex";
    sol.style.display = "none";
    backG.style.display = "flex"
  }

  else if(horaA < 6){
    lua.style.display = "flex";
    sol.style.display = "none";
    backG.style.display = "flex"
  }

  else {
    lua.style.display = "none";
    sol.style.display = "flex";
    backG.style.display = "none"
  }
}

icon()

setInterval(horario, 1000)


const clim = () =>{
  navigator.geolocation.getCurrentPosition(
    
    (pos) =>{

      let lat = pos.coords.latitude

      let lon = pos.coords.longitude

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0d0dec1fa4d43c7cb2154ce939335973`)
      .then(response => response.json())

      .then(data =>{
        let tempC = parseFloat(data.main.temp) - 273.15;
        let tempCa = (tempC).toFixed(1)
        let City = data.name
        let Umid = (data.main.humidity + '%')
        let velo = parseInt((data.wind.speed * 360)/100)
        let vent = (velo + ' Km/h' )
        nameV.innerText = tempCa + '°C'
        city.innerText = City
        umidade.innerText = Umid
        vento.innerText = vent
        console.log(data)
      }
    ).catch( error =>{
      alert("Error!")
    })
  })
    

}
clim()