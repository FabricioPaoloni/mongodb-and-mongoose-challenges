require('dotenv').config();
let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});


let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let tonyStark = new Person({
    name: 'Tony Stark',
    age: 40,
    favoriteFoods: ['Pizza', 'French potatoes', 'Choripán']
  });

  tonyStark.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  })
};

let arrayOfPeople = [
  { name: 'Aragorn', age: 87, favoriteFoods: ['Apple', 'Lembas bred'] },
  { name: 'Gimli', age: 139, favoriteFoods: ['Pork meat', 'Beer'] },
  { name: 'Legolas', age: 2931, favoriteFoods: ['Lembas bred', 'Elvish salad'] }
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function(err, person) {
    if (err) return console.log(err);
    done(null, person);
  })

};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function(err, person) {
    if (err) return console.log(err);
    done(null, person);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, function(err, person) {
    if (err) return console.log(err);
    done(null, person);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, person) {
    if (err) return console.log(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true }
  )
    .then((doc) => {
      done(null, doc);
    })
    .catch((err) => {
      console.log(err);
    })

};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(
    personId
  )
    .then((response) => {
      done(null, response);
    })
    .catch((err) => {
      console.log(err);
    })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove })
    .then((result) => {
      done(null, result);
    })
    .catch((err) => {
      console.log(err);
    })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ name: true, favoriteFoods: true })
    .exec(function(err, result) {
      if (err) return console.log(err);
      done(null, result);
    })
};

/** **Well Done !!**
 * You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
