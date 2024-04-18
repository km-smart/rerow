class Gun{
	constructor(_x, _y){
		this.x = _x;
		this.y = _y;
		this.yp = -10;
		this.g = new Sprite(this.x, this.y, 10, 60);
	}
	dispaly(){
		this.y -= 10;
		this.g.y = this.y;
	}
  }