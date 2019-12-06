import com.hamoid.*;

ArrayList<PenroseLSystem> ds_group = new ArrayList<PenroseLSystem>();

PGraphics roseLayer;
PGraphics maskLayer;
PFont mono;

VideoExport videoExport;

void setup() {
  size(720, 720);
  mono = loadFont("SourceSansPro-Black-300.vlw");

  videoExport = new VideoExport(this);
  videoExport.startMovie();
  //
  PenroseLSystem ds = new PenroseLSystem(width/2, height/2);
  ds.simulate(5);
  ds_group.add(ds);
  
  
  //
  roseLayer = createGraphics(width, height);
  //
  maskLayer = createGraphics(width, height);
  maskLayer.beginDraw();
  maskLayer.background(0, 0);
  maskLayer.translate(width/2, height/2);
  maskLayer.fill(255);
  maskLayer.textFont(mono);
  maskLayer.textSize(250);
  maskLayer.textAlign(CENTER, CENTER);
  maskLayer.noStroke();
  maskLayer.text("OPEN", 0, -height/6);
  maskLayer.text("CALL", 0, height/6);
  maskLayer.endDraw();
}

void draw() {
  background(0);
  roseLayer.beginDraw();

  roseLayer.background(0);
  for (int i=0; i < ds_group.size(); i++) {
    roseLayer.pushMatrix();
    ds_group.get(i).render();
    roseLayer.popMatrix();
  }
  
  
  roseLayer.endDraw();

  roseLayer.mask(maskLayer);
  image(roseLayer, 0, 0);
  
  for (int i=0; i < ds_group.size(); i++) {
    pushMatrix();
    //ds_group.get(i).render_poi();
    ds_group.get(i).render_onvalid();
    popMatrix();
  }
  

  videoExport.saveFrame();
}

void mouseClicked(){
  for (int i=0; i < ds_group.size(); i++) {
    PVector clo = ds_group.get(i).closestNeighbour();
    println(clo);
    if(clo != null){
      PenroseLSystem ds = new PenroseLSystem((int)clo.x, (int)clo.y);
      ds.simulate(5);
      ds_group.add(ds);
    }
  }  
}

void keyPressed() {
  if (key == 'q') {
    videoExport.endMovie();
  }
}