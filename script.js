function loadData() {
        Papa.parse("./data/secondHandCars.csv", {
                download: true,
                header: true,
                dynamicTyping: true,
                complete: results => prepareData(results.data)
        })
}



function prepareData(data) {
        const nn = ml5.neuralNetwork({task: 'regression', debug: true})

        data.sort(() => Math.random() > 0.5)
        let trainData = data.slice(0, Math.floor(data.length * 0.8))

        for (let row of trainData) {
                nn.addData({carAge: row.carAge, kmDriven: row.kmDriven, repairs: row.repairs }, { price: row.price })
        }

        nn.normalizeData()
        nn.train({ epochs: 6 }, () => trainPriceCompleted(nn))
}

function trainPriceCompleted(nn) {
        let button = document.querySelector('#saveButton')
        button.addEventListener('click', (event) => saveCarModel(nn));
}

function saveCarModel(nn) {
        nn.save()
}

loadData()