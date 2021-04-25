const trainCount = 1000;

//train model
async function train(){
  let options = {
    epochs: trainCount,
    validationSplit: 0.1,
    shuffle: true
  }
  return await model.fit(inputdata,outputdata, options);
};
console.log("Train start");

train().then((result)=>{
  console.log("Train finished");
  console.log(result);

  let heightTextBox = document.getElementById("height");
  let getResultBtn = document.getElementById("getResult");
  let resultText = document.getElementById("resultText");

  getResultBtn.addEventListener("click", ()=>{
    let test = heightTextBox.value;
    let heightInput = (test - 1200)/900;
    let heightInputTensor = tf.tensor1d([heightInput]);

    console.log(test + "+" + heightInput);

    //Predict
    let predictResult = model.predict(heightInputTensor);
    let max = predictResult.argMax(1).dataSync();

    console.log(predictResult);
    console.log(max);
    resultText.innerHTML = "size ao phu hop cua ban la: " + sizeCategories[max];
  })

});
