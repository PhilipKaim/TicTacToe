
class Person {
  constructor(name = 'Anonymous', age = 0) {
    this.name = name;
    this.age = age;
  }
  getGretting() {
    //return 'Hi. I am ' + this.name + '!';
    return `Hi. I am ${this.name}!`;
  }
  getDescription() {
    return `${this.name} is ${this.age} year(s) old.`;
  }
}

class Student extends Person {
  constructor(name, age, major) {
    super(name, age);
    this.major = major;
  }
  hasMajor() {
    return !!this.major;
  }
  getDescription() {
    let description = super.getDescription();

    if (this.hasMajor()) {
      description += ` Their major is ${this.major}.`;
    }
    
    return description;
  }
}

class Traveler extends Person {
  constructor(name, age,  ajor = undefined, location) {
    super(name, age);
    this.location = location;
  }
  getGretting() {
    let greet = super.getGretting();

    if (this.location) {
        greet += ` I am visiting from ${this.location}.`;
    }

    return greet;
  }
}

const me = new Traveler('Philip Kaim', 21, 'Computer Science', 'Tampa');
console.log(me.getGretting());

const other = new Traveler();
console.log(other.getGretting());
