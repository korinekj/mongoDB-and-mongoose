require("dotenv").config();
let mongoose = require("mongoose");

//connect to database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//create a MODEL constructor called Person from the personSchema
let personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});
let Person = mongoose.model("Person", personSchema);

//Create and Save a Record (document) of a Model
const createAndSavePerson = (done) => {
  let person = new Person({
    name: "Jarda",
    age: 28,
    favoriteFoods: ["Burger", "Spagetti", "Chicken"],
  });

  person.save((error, data) => {
    if (error) {
      console.log(error);
    } else {
      done(null, data);
    }
  });

  // person
  //   .save()
  //   .then((data) => {
  //     done(null, data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople)
    .then((docs) => {
      console.log(docs);
      done(null, docs);
    })
    .catch((err) => {
      console.log(err);
    });

  // Person.create(arrayOfPeople, (err, data) => {
  //   if (err) {
  //     return console.log(err);
  //   } else {
  //     done(null, data);
  //   }
  // });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log(docs);
      done(null, docs);
    }
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, doc) => {
    if (err) return console.log(err);
    console.log(doc);
    done(null, doc);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, doc) => {
    if (err) return console.log(err);
    console.log(doc);
    done(null, doc);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, doc) => {
    if (err) return console.log(err);
    doc.favoriteFoods.push(foodToAdd);
    console.log(doc.favoriteFoods);
    doc.save((err, doc) => {
      if (err) return console.log(err);
      console.log(doc);
      done(null, doc);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, doc) => {
      if (err) return console.log(err);
      console.log(doc);
      done(null, doc);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, doc) => {
    if (err) return console.log(err);
    console.log(doc);
    done(null, doc);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, (err, doc) => {
    if (err) return console.log(err);
    console.log(doc);
    done(null, doc);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: "asc" })
    .limit(2)
    .select("-age")
    .exec((err, docs) => {
      if (err) return console.log(err);
      console.log(docs);
      done(null, docs);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
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
