//normalize data
var heights = [];
var sizes = [];
const sizeCategories = ["XS","S","M","L","XL","XXL"];

data.map(item => {
  heights.push( (item.height - 1200)/900 );
  sizes.push(sizeCategories.indexOf(item.size));
});

console.log(heights);
//console.log(sizes);
//console.log("max: ", Math.max.apply(Math, heights));
//console.log("min: ", Math.min.apply(Math, heights));

let inputdata = tf.tensor1d(heights);
let sizesTensor = tf.tensor1d(sizes, "int32");
let outputdata = tf.oneHot(sizesTensor, 6);

inputdata.print();
//outputdata.print();

//create model
let model = tf.sequential();

let hiddenLayer = tf.layers.dense({
  units: 16,
  activation: "sigmoid",
  inputDim: 1
});

let outputLayer = tf.layers.dense({
  units: 6,
  activation: "softmax"
});

model.add(hiddenLayer);
model.add(outputLayer);

model.compile({
  optimizer: tf.train.sgd(0.2),
  loss: "categoricalCrossentropy"
});
