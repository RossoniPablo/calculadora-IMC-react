import { useState } from "react"
import Button from "./components/Button"
import Input from "./components/Input"
import Label from "./components/Label"
import ReferenceTable from "./components/ReferenceTable"
import { IMCResult, calculateIMC } from "./lib/IMC"

import ResultsTable from "./components/ResultsTable"


function App() {
  const [IMCData, setIMCData] = useState<null | { weight: number, height: number, IMC: number, IMCResult: string }>(null)



  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    //Pegar dados do formulário
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData) as { weight: string, height: string }


    console.log(data);

    //Tratar campos vazio
    const { weight, height } = data
    if (!weight || !height) {
      alert('Opss... você precisa preencher os campos')
      return
    }

    //Transformar os dados que vem em string para number, tratar a (,) e letras
    const weightNumber = parseFloat(weight.replace(',', '.'))
    const heightNumber = parseFloat(height.replace(',', '.')) / 100

    if (isNaN(weightNumber) || isNaN(heightNumber)) {
      alert('Opss... você precisa preencher os campos com números válidos')
    }

    //Tratar com números inválidos 
    if (weightNumber < 2 || weightNumber > 500) {
      alert('Opss.. o peso precisa ser maior que 2kg e menor que 500kg')
    }

    if (heightNumber < 0.5 || heightNumber > 2.5) {
      alert('Opss.. a altura precisa ser maior que 50cm e menor que 2.5 metros')
    }

    //Calcular imc
    const IMC = calculateIMC(weightNumber, heightNumber)
    const IMCResultString = IMCResult(IMC)

    //Mostrar o resultando no front end
    setIMCData({
      weight: weightNumber,
      height: heightNumber,
      IMC: IMC,
      IMCResult: IMCResultString
    })

    //Limpar formulário
    event.currentTarget.reset()
  }

  function handleClickReset(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    setIMCData(null)

  }

  return (
    <main className="bg-white max-w-4xl mx-auto md:px-48 md:py-20 px-5 py-10">
      <section id="form">
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="weight" >Peso (kg) </Label>
            <Input disabled={!!IMCData} type="text" name="weight" id="weight" />
          </div>

          <div className="mt-4">
            <Label htmlFor="height">Altura (cm) </Label>
            <Input disabled={!!IMCData} type="text" name="height" id="height" />
          </div>

          {IMCData ? (
            <Button onClick={handleClickReset} type="button">Refazer</Button>
          ) : (
            <Button type="submit">Calcular</Button>
          )}
        </form>

      </section>

      <section id="result" className="py-10 px-4 h-40">
        {IMCData ? (
          <ResultsTable IMCData={IMCData} />
        ) : (
          <p className="text-center text-neutral-600 text-xl">Saiba agora se está no seu peso ideal</p>
        )}

      </section>

      <section id="reference-table">
        <ReferenceTable />
      </section>
    </main >
  )
}

export default App
