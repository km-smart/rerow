class ImageCircle {
    constructor(x, y, size, img) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.img = img;
    }
  
    display() {
      image(this.img, this.x, this.y, this.size, this.size);
    }
}