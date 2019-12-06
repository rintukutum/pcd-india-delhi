PenroseLSystem ds;

void setup() {
  size(640, 360);
  ds = new PenroseLSystem();
  ds.simulate(4);
}

void draw() {
  background(0);
  ds.render();
}