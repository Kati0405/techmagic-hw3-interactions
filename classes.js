class Animal {
  constructor(name, age, noise) {
    this.name = name;
    this.age = age;
    this.noise = noise;
  }
  makeNoise() {
    return `${this.name} says ${this.noise}`;
  }
}

class Cat extends Animal {
  constructor(name, age, noise) {
    super(name, age, noise);
    this.noise = 'Meow';
  }
}

class Dog extends Animal {
  constructor(name, age) {
    super(name, age);
    this.noise = 'Woof';
  }
}

let pussyCat = new Cat('Pussy', '12');
console.log(pussyCat.makeNoise());

let barkingDog = new Dog('Ruth', '10');
console.log(barkingDog.makeNoise());

class Rectangle {
  constructor(_width, _height, _color) {
    this.width = _width;
    this.height = _height;
    this.color = _color;
  }

  getArea() {
    return this.width * this.height;
  }
}

let myRectangle1 = new Rectangle('3', '5', 'blue');
let myRectangle2 = new Rectangle('8', '10', 'blue');
console.log(myRectangle1.getArea());
console.log(myRectangle2.getArea());
