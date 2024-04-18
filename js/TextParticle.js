class TextParticle {
	constructor(x, y) {
	  this.x = x;
	  this.y = y;
	  this.vx = random(-1, 1);
	  this.vy = random(-1, 1);
	  this.textSize = random(12, 24);
	  this.text = "#Wha? ";
	  this.alpha = 200;
	  this.cnt = 0;
	  this.sizeDecay = random(0.97, 0.98);
	  this.color = color(random(10), random(10), random(100)); // 무작위 색상 선택
	}
  
  
	display() {
		this.cnt++;
		
	  noStroke();
	  rectMode(CENTER);
	  fill(this.color, this.alpha); // 선택한 무작위 색상을 사용
	  textSize(this.textSize);
	  text(this.text, this.x, this.y);
	 
	}
  
	update() {
	  this.x += this.vx;
	  this.y += this.vy;
	  this.alpha -= 8;
	  this.textSize *= this.sizeDecay;
	}
  
	isDead() {
	  return this.alpha <= 0;
	}
}