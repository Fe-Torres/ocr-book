function pegaDados(funcaoCallback){
  console.log("Entrei na call stack") 
  setTimeout(()=>{
    const dados = {"Pessoa":"Felipe"}
    console.log("Oi")
    funcaoCallback(dados)
    console.log("Sai da call stack")
    return dados
  },3 * 1000)
}

const dados_result = pegaDados((res)=>{
  console.log(res)
})
console.log("Opa")