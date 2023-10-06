import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  name: "Peach",
  rating: 7,
  review: "Pretty solid as a fruit",
});

const kiwi = new Fruit({
  name: "Kiwi",
  score: 10,
  review: "The best fruit",
});

const orange = new Fruit({
  name: "Orange",
  score: 4,
  review: "Peels are tough to eat",
});

const banana = new Fruit({
  name: "Banana",
  score: 6,
  review: "There hard to swallow",
});

Fruit.find()
  .then(function (fruits) {
    fruits.forEach((fruit) => {
      console.log(fruit.name);
    });
  })
  .catch(function (err) {
    console.log(err);
  });

// Fruit.updateOne({ _id: "651edf0c1379c0811f7058c1" }, { name: "Dragon Fruit" })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Fruit.deleteOne({ _id: "651edeec04520d4374098cfd" })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Fruit.insertMany([kiwi, orange, banana]);

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "John",
  age: 37,
  favoriteFruit: kiwi,
});

// Person.deleteMany({ name: "John" })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const pineapple = new Fruit({
  name: "Pineapple",
  score: 9,
  review: "Great fruit",
});

// const person = new Person({
//   name: "Amy",
//   age: 12,
//   favoriteFruit: pineapple,
// });

// pineapple.save();

person.save();

// async function main() {
//   try {
//     await mongoose.connect("mongodb://localhost:27017/fruitsDB", {
//       useNewUrlParser: true,
//     });

//     const fruitSchema = new mongoose.Schema({
//       name: String,
//       rating: Number,
//       review: String,
//     });

//     const Fruit = mongoose.model("Fruit", fruitSchema);

//     const fruit = new Fruit({
//       name: "Apple",
//       rating: 7,
//       review: "Pretty solid as a fruit",
//     });

//     await fruit.save();

//     console.log("Fruit saved successfully");
//   } catch (error) {
//     console.error("Error:", error);
//   } finally {
//     mongoose.connection.close(); // Close the connection when done
//   }
// }

// (async () => {
//   await main();
// })();
