const neuralNetwork = ml5.neuralNetwork({task: 'regression'})
neuralNetwork.load('./model/model.json', modelLoaded)

async function modelLoaded() {
    console.log("Model Loaded, lets predict!")

}


let guessButton = document.getElementById('guess')
guessButton.addEventListener('click', ev => predict(ev))

async function predict(ev) {
    let carAge = document.querySelector("#carAge").value;
    let kmDriven = document.querySelector("#kmDriven").value;
    let repairs = document.querySelector("#repairs").value;

    const
    result = await neuralNetwork.predict({
        carAge: parseInt(carAge),
        kmDriven: parseInt(kmDriven),
        repairs: parseInt(repairs)
    })
    console.log(result)
let price = result[0].price;
    let priceRounded = price.toFixed(2)


    let resultText = `Brum says: youre vehicle is worth €${priceRounded}!`
    console.log(resultText)
    let endResult = document.getElementById('result')
    endResult.innerHTML = resultText;
}

