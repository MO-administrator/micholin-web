export const getHypotenuse = (a: number, b:number) => {
  return Math.sqrt(a * a + b * b);
}

export const degreesToRadians = (deg: number) => {
  return deg * (Math.PI/180);
}

export const radiansToDegress = (rad: number) => {
  if (rad < 0) {
    return (360.0 + (rad * 180/Math.PI)).toFixed(2);
  } else {
    return (rad * (180/Math.PI)).toFixed(2);
  }
}

export const getAngleFromXAndY = (x: number,y: number) => {
  let adj = x;
  let opp = y;
  return radiansToDegress(Math.atan2(opp, adj));
}

type Circle = { x: number; y: number; radius: number };

export const areCirclesColliding = (circle1: Circle, circle2: Circle) => {
  let dx = circle1.x - circle2.x;
  let dy = circle1.y - circle2.y;
  let distance = getHypotenuse(dx, dy);
  let sumOfRadii = circle1.radius + circle2.radius;

  if (distance < sumOfRadii) {
    // circles collide
    return true;
  } else if (distance === sumOfRadii) {
    // circles are touching
    return true;
  } else if (distance > sumOfRadii) {
    // no collision
    return false;
  } else {
    return false;
  }
}
