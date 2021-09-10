module.exports= {
  createRandomDigit() {
    return Math.floor(Math.random() * 10);
  },
  createRandomNumber(left, right) {
    if(left > right) {
      throw new Error("参数有误");
    }
    return Math.floor(Math.random() * (right - left)) + left;
  }

}
