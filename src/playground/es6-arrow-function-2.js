const multiplier = {
  numbers: [3, 4, 8],
  multiplyBy: 3,
  multiply() {
    return this.numbers.map((i) => this.multiplyBy * i);
  },
};

console.log(multiplier.multiply());
