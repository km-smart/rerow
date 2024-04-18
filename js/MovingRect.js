class MovingRect {
	constructor(_x, _y, _rect_img) {
	  this.initialX = _x;
	  this.initialY = _y;
	  this.x = _x;
	  this.y = _y;
	  this.xOffset = 0;
	  this.yOffset = 0;
	  this.angle = 0;
	  this.rectimg = _rect_img;
	  this.cnt = 0;
	}
	display() {
	  push();
	  image(this.rectimg,this.x, cos(this.angle) * 50 + this.y);
	  pop();
	}
	update() {
		for (let i = 0; i < rects.length; i++) {
			let distance = dist(mouse.x, mouse.y, rects[i].x, rects[i].y);
			if (distance < 100) {
				 if(frameCount % 3 == 0){
					rects[i].createTextParticle();
	            }
			}
		  }
		  this.rectMove();
	}
	rectMove(){
		let targetX = mouse.x;
		let targetY = mouse.y;
		// 마우스와의 거리 계산
		let distance = dist(this.x, this.y, targetX, targetY);
		// 거리가 일정 기준 값보다 작을 경우, 멀어지도록 이동
		if (distance < 100) {
		  let angleToMouse = atan2(targetY - this.y, targetX - this.x);
		  this.xOffset -= cos(angleToMouse) * 2;
		  this.yOffset -= sin(angleToMouse) * 2;
		} else {
		  // 그렇지 않을 경우, 초기 위치로 되돌아가도록 이동
		  let distanceToInitial = dist(this.x, this.y, this.initialX, this.initialY);
		  if (distanceToInitial > 1) {
			let angleToInitial = atan2(this.initialY - this.y, this.initialX - this.x);
			this.xOffset += cos(angleToInitial) *2;
			this.yOffset += sin(angleToInitial) *2;
		  }
		}
	
		// 사각형 위치 제한
		this.x = this.initialX + this.xOffset;
		this.y = this.initialY + this.yOffset;
	
		// 각도 업데이트
		this.angle += radians(150);
	  }
	createTextParticle() {
	  // 랜덤한 위치 계산
	  let randomX = mouse.x + random(-80, 10);
	  let randomY = mouse.y + random(-50, 50);
  console.log("나 텍스트 만듬")
	  let textParticle = new TextParticle(randomX, randomY);
	  textParticles.push(textParticle);
	}
}