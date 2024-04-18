let player, floor ;
let i = 0;
let G;
let u = 0;
let o = 0;
let imgName;
let img, prevY;;
let rects = [];
let rectPositions = [
  { x: -150, y: 900 },
  { x: -50, y: 1000 },
  { x: -150, y: 1000 },
  { x: -50, y: 900 },
 { x: -140, y: 950 }
];

const numGroups = 6;
const shapesGroups = [];
const shapesToRemoveGroups = [];
const distanceThreshold = 200;
const moveRadius = 50;
const x_s = 0;
const y_s = 0;

// 각 그룹에 대한 색상을 설정합니다.
const groupColors = [
  'rgba(0, 255, 0, 0.5)',
  'rgba(0, 255, 0, 0.5)',
  'rgba(0, 255, 0, 0.5)',
  'rgba(255, 255, 255, 0.201)',
  'rgba(255, 255, 255, 0.201)',
  'rgba(255, 255, 255, 0.201)'
];

// 각 그룹의 크기 범위를 설정합니다.
const groupSizeRanges = [
  { minSize: 60, maxSize: 90 },
  { minSize: 60, maxSize: 90 },
  { minSize: 60, maxSize: 90 },
  { minSize: 10, maxSize: 20 },
  { minSize: 10, maxSize: 20 },
  { minSize: 10, maxSize: 20 }
];

const numGroups2 = 3;
const shapesGroups2 = [];
const shapesToRemoveGroups2 = [];
const distanceThreshold2 = 200;
const moveRadius2 = 50;

// 각 그룹에 대한 색상을 설정합니다.
const groupColors2 = [
	'rgba(128,0,0, 0.01)',
	'rgba(96, 96, 96, 0.01)',
  	'rgba(160, 160, 160, 0.01)'
];

// 각 그룹의 크기 범위를 설정합니다.
const groupSizeRanges2 = [
	{ minSize: 400, maxSize: 700 },
	{ minSize: 400, maxSize: 700 },
 	{ minSize: 100, maxSize: 300 }
];

let isCleaning = false;
let isFiltering = false;
let isMousePressed = false;
let flickerMode = false;
let clickedCounts = [];


let textParticles = [];
let rect_img1;
let	rect_img2;
let	rect_img3;
let	rect_img4;

let angles = [0, 60, 120, 180, 240, 300]; // 글자의 초기 각도 배열
let xRadii = [150, 300, 200, 280, 260, 320]; // x 축 반지름 배열
let yRadii = [100, 150, 120, 140, 160, 155]; // y 축 반지름 배열
let numParticles = 60;
let messages = ['N', 'E', 'W', 'S', 'A', 'B']; // 글자 배열
let textSizeValue = 15; // 글자 크기

//지호코드용 변수생성
let circles = [];
let clickedCount = 0;
let popupDisplayed = false; 
let _G_popupDisplayed = false;
let _green_popupDisplayed = false;


let monster_crop;
let gunShapes = [];
let filterOn = false;
let isPlayerMoving = true;
let _G_ani_trigger = false;
let up_G_ani;
let lazerGun, noiseSound, Walking;

let greencnt = 0;

let prevPlayer = { x: 0, y: 0 };
let _player_ani_trigger = false;


function setup() {
	createCanvas(windowWidth, windowHeight);
	G = new Sprite(1450, 45, 450, 20,);
	u = 0; 
	
	up_G_ani = setInterval(updateGAnimation, 70); // 200ms마다 G 스프라이트의 애니메이션 프레임 업데이트



	// frameRate(30);
	player = new Sprite(0, 0, 50, 50);
	player.img = ['./img/2d_w.png', './img/2d_a.png', './img/2d_d.png', './img/2d_x.png'];
	player.diameter = 10;
	player.bounciness = 0;
	player.friction = 0;
	player.rotationDrag = 0;
	player.drag = 0;
	player.rotationLock = false;

    imgName = './img/2d_w.png', './img/2d_a.png', './img/2d_d.png', './img/2d_x.png';
    
	prevY = player.y;

	for (let i = 0; i < 5; i++) {
		let pos = rectPositions[i];
		if(i === 0){
			rects.push(new MovingRect(pos.x, pos.y, rect_img1));
		}else if(i === 1){
			rects.push(new MovingRect(pos.x, pos.y, rect_img2));
		}else if(i === 2){
			rects.push(new MovingRect(pos.x, pos.y, rect_img3));
		}else if(i === 3){
			rects.push(new MovingRect(pos.x, pos.y, rect_img4));
		}else if(i === 4){
			rects.push(new MovingRect(pos.x, pos.y, rect_img5));
		}
	  }

	textFont('Arial', textSizeValue);
	textAlign(CENTER, CENTER);
	fill(255);
	
	const initialPositions = [
        { x: 100, y: 200 },
        { x: 180, y: 230 },
        { x: 150, y: 130 },
        { x: 30, y: 230 }
    ];

    for (let i = 0; i < initialPositions.length; i++) {
        const { x, y } = initialPositions[i];
        const size = 10;
        const color = 'red';
        circles.push({ x, y, size, color, isClicked: false, isTeleported: false });
    }

	//파란색 원의 초기 위치 (x, y)를 설정
	const startX = 50;
	const startY = 150;

	//파란색 동그라미 생성 및 초기 위치 설정
	const size = 10;
	const color = 'blue';
	circles.push({ x: startX, y: startY, size, color, isClicked: false });

	
	const xOffset = 500;
  	const yOffset = 400;

  	for (j_m = 0; j_m < numGroups; j_m++) {
		const shapes = [];
		const shapesToRemove = [];
		let numShapes = 40; // 모든 그룹의 기본 원 개수

		for (i_o = 0; i_o < numShapes; i_o++) {
			const angle = (i_o / numShapes) * (2 * PI);
			const radius = 200;
			const x = width / 5 + cos(angle) * radius + (j_m % 3) * 300 + xOffset; // x 위치 조정
			const y = height / 2 + sin(angle) * radius + yOffset; // y 위치 조정
			const size = random(groupSizeRanges[j_m].minSize, groupSizeRanges[j_m].maxSize);
			shapes.push(createShape(x, y, size, j_m));
			noStroke();
			shapesToRemove.push(false);
		}
		shapesGroups.push(shapes);
		shapesToRemoveGroups.push(shapesToRemove);
		clickedCounts.push(0);
  }

  const xShift2 = 550; // X 축 이동 값
  const yShift2 = -450; // Y 축 이동 값

  for (let j = 0; j < numGroups2; j++) {
    const shapes2 = [];
    const shapesToRemove2 = [];
    let numShapes2 = 30;

    for (let i = 0; i < numShapes2; i++) {
      const angle2 = (i / numShapes2) * (2 * PI);
      const radius2 = 500;
      const x2 = width / 5 + cos(angle2) * radius2 + (j % 1) * 300 + xShift2; // X 좌표에 xShift2 더함
      const y2 = height / 2 + sin(angle2) * radius2 + yShift2; // Y 좌표에 yShift2 더함
      const size2 = random(groupSizeRanges2[j].minSize, groupSizeRanges2[j].maxSize);
      shapes2.push(createShape2(x2, y2, size2, j));
      noStroke();
      shapesToRemove2.push(false);
    }

    shapesGroups2.push(shapes2);
    shapesToRemoveGroups2.push(shapesToRemove2);
  }


}



function preload() {
	img = loadImage('./img/map_city2.jpg');
	rect_img1 = loadImage('./img/new1.png');
	rect_img2 = loadImage('./img/new2.png');
	rect_img3 = loadImage('./img/new3.png');
	rect_img4 = loadImage('./img/new4.png');
	rect_img5 = loadImage('./img/newsperfact.png');
    red = loadImage('./img/news11.png');
    monster_crop = loadImage('./img/moster_crop.png');
	yourImage1 = loadImage('./img/drum1.png'); 
	yourImage2 = loadImage('./img/drum2.png');
	yourImage3 = loadImage('./img/drum3.png');
	lazerGun = loadSound('./asset/laser_gun.mp3');
	noiseSound = loadSound('./asset/electricsound.mp3');
	walking = loadSound('./asset/Walking.mp3');
  }

function draw() {
	clear();

    if (player.y > prevY) {
        i = (i + 1) % 10;
        imgName = `./img/2d_x${i}.png`;
        player.img = imgName;
    } else if (player.y < prevY) {
        i = (i + 1) % 10;
        player.img = `./img/2d_w${i}.png`;
        //  = imgName;
    } else {
        // 플레이어가 멈춰 있을 때의 이미지
        imgName = `./img/2d_x${i}.png`;
        player.img = imgName;
    }
	if (player.x !== prevPlayer.x || player.y !== prevPlayer.y) {
		if (_player_ani_trigger !== true) {
		   walking.play(); 
		   _player_ani_trigger = true;
	   }
	 }
    prevY = player.y;
	prevPlayer.x = player.x;
	prevPlayer.y = player.y;
   

	camera.on();
	push();
		image(img, -width/2,-height/2);
        image(monster_crop, 1550, -150);

		image(yourImage1, 1050, 950, 0, 0);
        image(yourImage2, 1350, 950, 0, 0);
        image(yourImage3, 1645, 950, 0, 0);    


		player.draw();
		if(isPlayerMoving){
			if (mouse.presses()) {
				_player_ani_trigger = false;
				player.moveTo(mouse, 8);
			}
		}

		if(filterOn){
			if (mouse.presses()) {
				lazerGun.play();
				gunShapes.push(new Gun(mouse.x, mouse.y));
			}
		}
		

		
		camera.x = player.x;
		camera.y = player.y;
		if(camera.y < 0){
			camera.y = 0;
		}

		if(camera.y > 1130){
			camera.y = 1130;

		}

		if(camera.x < 0){
			camera.x = 0;
		}
		if(camera.x > 3500 - width){
			camera.x = 3500 - width;

		}
		if(player.y < 65){
			player.y = 65;
		}
		
		push();
		translate( 0,  0);
		
		for(let i = 0; i < gunShapes.length; i++){
			gunShapes[i].dispaly();
			if (G.collides(gunShapes[i].g)) {
				G.vel.y = -1;
				gunShapes[i].g.h -= 52;
				if(_G_ani_trigger != true){
					noiseSound.play();
					_G_ani_trigger = true;
				}else{}
			}
		}

		if(_G_ani_trigger){
			clearInterval(up_G_ani);
			setInterval(updateGAnimation_target, 50);
		}

		if(clickedCount == 5){
			rects[4].display();
			rects[4].update();
		}else{
			for (let i = 0; i < 4; i++) {
				rects[i].display();
				rects[i].update();
			}
		}
		
		
		for (let i = textParticles.length - 1; i >= 0; i--) {
			textParticles[i].display();
			textParticles[i].update();
			if (textParticles[i].isDead()) {
			textParticles.splice(i, 1);
			}
		}
		pop();
		
		push();
		translate(-80, 1000);

		for (let i = 0; i < 30; i++) {
			for (let j = 0; j < angles.length; j++) {
			
			// 각 글자의 위치 계산
			let x = cos(angles[j] + i * 360 / numParticles) * xRadii[j];
			let y = -sin(angles[j] + i * 360 / numParticles) * yRadii[j];
		
			fill(255);
			textSize(textSizeValue);
		
			// 글자 그리기
			text(messages[j], x, y);
			}
		}
		
		// 각 글자의 회전 각도 증가
		for (let i = 0; i < angles.length; i++) {
			angles[i] += radians(15 * (i + 1)); // 각 글자의 회전 속도를 다르게 설정

			if (angles[i] >= 360) {
				angles[i] = 0;
			}
		}
		pop();

	pop();

 // 동그라미 그리기 및 이벤트 처리
    for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];

        // 마우스와 동그라미 사이의 거리 계산
        const distance = dist(mouse.x, mouse.y, circle.x, circle.y);

        // 마우스 클릭 이벤트 처리
        if (mouseIsPressed && distance <= circle.size * 20 / 2 && !circle.isClicked) {
            circle.isClicked = true;
            clickedCount++;
			
        }

        // 텔레포트하기
        if (distance <= 50 && circle.color !== 'blue' && !circle.isTeleported) {
            circle.x = random(width);
            circle.y = random(height);
            circle.isTeleported = true;
        }


        // 빨간색 동그라미 그리기
        if (circle.color === 'red' && !circle.isClicked) {
            fill(circle.color);
            image(red,circle.x, circle.y);
        }
		
    }
	
    for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];

        // 마우스와 동그라미 사이의 거리 계산
        const distance = dist(mouse.x, mouse.y, circle.x, circle.y);

		if (circle.color === 'blue' && !circle.isClicked) {
			fill(circle.color);
			image(red, circle.x, circle.y);
		}

        // 일정 거리를 유지하며 멀어지기
        if (distance <= 100 && circle.color === 'blue') {
            const speed = 5; // 이동 속도 조절

            // 파란색 동그라미와 마우스 사이의 거리가 100 이하일 때에만 멀어지도록 이동
            if (distance <= 100) {
                const dx = circle.x - mouse.x;
                const dy = circle.y - mouse.y;

                // 마우스와의 거리를 계산하여 파란색 동그라미를 멀어지게 함
                const magnitude = sqrt(dx * dx + dy * dy);
                if (magnitude > 0) {
                    circle.x += (dx / magnitude) * speed;
                    circle.y += (dy / magnitude) * speed;
                }
            }
        }
    }
	

        // 파란색 동그라미 그리기
    const blueCircle = circles[circles.length - 1];
    if (!blueCircle.isClicked) {
		fill(blueCircle.color);
		image(red, blueCircle.x, blueCircle.y);
	}


    // 정보 업데이트
    const infoText = document.getElementById('info');
    infoText.textContent = `${clickedCount}/5`;

    if (clickedCount === 5) {
            // 클릭된 동그라미 개수를 확인하여 한 번만 메시지를 표시하도록 수정
            if (!popupDisplayed) {
                setTimeout(() => {
                    alert("Didn't the fragmented words come back as a mirror?");
                }, 100);
            popupDisplayed = true;
        }
    }
	if(G.y < -550){
		if (!_G_popupDisplayed) {
			setTimeout(() => {
				alert('Fictional horror is bound to dismantle in vain.');
			}, 100);
		_G_popupDisplayed = true;
	}
}
	if(G.y < -550){
		if (!_G_popupDisplayed) {
			setTimeout(() => {
				alert('Fictional horror is bound to dismantle in vain.');
			}, 100);
		_G_popupDisplayed = true;
		}
	}

	if(greencnt == 240){
		if (!_green_popupDisplayed) {
			setTimeout(() => {
				alert('A little hope found on Radio Beach');
			}, 100);
			_green_popupDisplayed = true;
		}
	}
	// 도형 그리기 및 상호작용 처리
	for (let j = 0; j < numGroups; j++) {
		const shapes = shapesGroups[j];
		const shapesToRemove = shapesToRemoveGroups[j];
	
		for (let i = shapes.length - 1; i >= 0; i--) {
		  moveShapeRandomly(shapes[i]);
	
		  if (!shapesToRemove[i]) {
			const col = groupColors[j];
			fill(col);
			noStroke();
			ellipse(shapes[i].x, shapes[i].y, shapes[i].size);
	
			const dx = mouse.x - shapes[i].x;
			const dy = mouse.y - shapes[i].y;
			const distance = dist(mouse.x, mouse.y, shapes[i].x, shapes[i].y);
	
			if (isFiltering) {
			  if (isMousePressed && distance <= distanceThreshold) {
				const speed = 2;
				const angle = atan2(dy, dx);
				shapes[i].x += cos(angle) * speed;
				shapes[i].y += sin(angle) * speed;
			  }
			}
	
			if (isFiltering && isMousePressed && distance <= shapes[i].size) {
				shapesToRemove[i] = true;
				clickedCounts[j]++;
				greencnt++;
			  }
		  }
		}
	}
	
	for (let j = 0; j < numGroups2; j++) {
		const shapes2 = shapesGroups2[j];
		const shapesToRemove2 = shapesToRemoveGroups2[j];

		for (let i = shapes2.length - 1; i >= 0; i--) {
			moveShapeRandomly2(shapes2[i]);

			if (!shapesToRemove2[i]) {
			const col2 = groupColors2[j];
			fill(col2);
			noStroke();
			ellipse(shapes2[i].x, shapes2[i].y, shapes2[i].size);

			const dx2 = mouse.x - shapes2[i].x;
			const dy2 = mouse.y - shapes2[i].y;
			const distance2 = dist(mouseX, mouseY, shapes2[i].x, shapes2[i].y);

			if (mouseIsPressed && distance2 <= distanceThreshold2) {
				const speed2 = 2;
				const angle2 = atan2(dy2, dx2);
				shapes2[i].x += cos(angle2) * speed2;
				shapes2[i].y += sin(angle2) * speed2;
				}
			}
		}
	}
	camera.off();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function updateGAnimation() {
	u = (u + 1) % 10; // G 스프라이트의 프레임 업데이트
	imgName01 = `./img/mn${u}.png`;
	G.img = imgName01;
}
function updateGAnimation_target(){
	u = (u + 1) % 12; // G 스프라이트의 프레임 업데이트
	imgNameTarget = `./img/tmn${u}.png`;
	G.img = imgNameTarget;
}

function createShape(x, y, size, groupIndex) {
	const centerX = width / 3;
	const centerY = height / 2;
	const groupSpacing = 3;
  
	x = centerX + (x - centerX) + groupIndex * groupSpacing;
  
	const colors = groupColors[groupIndex];
	const colorIndex = Math.floor(random(colors.length));
	const col = color(colors[colorIndex]);
  
	return { x, y, size, color: col, originalX: x, originalY: y, isAvoiding: false, dx: 0, dy: 0 };
}
  
function moveShapeRandomly(shape) {
	if (!shape.isClicked) {
	  if (isFiltering || !isCleaning) {
		if (Math.random() < 0.20) {
		  const speed = 1;
		  const angle = Math.random() * Math.PI * 4;
		  shape.dx = Math.cos(angle) * speed;
		  shape.dy = Math.sin(angle) * speed;
		}
		const newX = shape.x + shape.dx;
		const newY = shape.y + shape.dy;
		if (newX > shape.originalX - moveRadius && newX < shape.originalX + moveRadius &&
		  newY > shape.originalY - moveRadius && newY < shape.originalY + moveRadius) {
		  shape.x = newX;
		  shape.y = newY;
		}
	  }
	}
}
  
function mousePressed() {
	isMousePressed = true;
}
  
function mouseReleased() {
	isMousePressed = false;
}
  
function keyPressed() {
	if (key === 'a' || key === 'A') {
	  isFiltering = !isFiltering; 
	}
	if (key === 's' || key === 'S') {
		filterOn = !filterOn;
		mouseClick = false;
		if (filterOn) {
		player.friction = 1; // 움직임 멈춤
		isPlayerMoving = false;
		// for(let i = 0; i < 3; i++){
		// 	let shapeSize = 30; // 도형 크기 설정
		// 	let shapeColor = color(random(255), random(255), random(255)); // 무작위 색상 선택
		// 	gunShapes.push(new GunShape(mouse.x, mouse.y, shapeSize, shapeColor)); // 마우스 위치에서 도형 생성 및 추가
		// }
		} else {
		player.friction = 0; // 움직임 가능
		isPlayerMoving = true;
		}
  }
}

function toggleFiltering() {
	isFiltering = !isFiltering;
}
  
function createShape2(x2, y2, size2, groupIndex2) {
	const centerX2 = width / 2;
	const centerY2 = height / 2;
	const groupSpacing2 = 2;
  
	x2 = centerX2 + (x2 - centerX2) + groupIndex2 * groupSpacing2;
  
	const colors2 = groupColors2[groupIndex2];
	const colorIndex2 = Math.floor(random(colors2.length));
	const col2 = color(colors2[colorIndex2]);
  
	return { x: x2, y: y2, size: size2, color: col2, originalX: x2, originalY: y2, dx: 0, dy: 0 };
}
  
function moveShapeRandomly2(shape2) {
	if (Math.random() < 0.20) {
	  const speed2 = 1;
	  const angle2 = Math.random() * Math.PI * 10;
	  shape2.dx = Math.cos(angle2) * speed2;
	  shape2.dy = Math.sin(angle2) * speed2;
	}
	const newX2 = shape2.x + shape2.dx;
	const newY2 = shape2.y + shape2.dy;
	if (newX2 > shape2.originalX - moveRadius2 && newX2 < shape2.originalX + moveRadius2 &&
	  newY2 > shape2.originalY - moveRadius2 && newY2 < shape2.originalY + moveRadius2) {
	  shape2.x = newX2;
	  shape2.y = newY2;
	}
}