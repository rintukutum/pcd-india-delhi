

class PenroseLSystem extends LSystem {

  int steps = 0;
  float somestep = 0.1;
  String ruleW;
  String ruleX;
  String ruleY;
  String ruleZ;
  int tranX, tranY;
  
  
  PVector center;
  ArrayList<PVector> around_center_layer_1;

  PenroseLSystem(int _x, int _y) {
    tranX = _x;
    tranY = _y;
    axiom = "[X]++[X]++[X]++[X]++[X]";
    ruleW = "YF++ZF4-XF[-YF4-WF]++";
    ruleX = "+YF--ZF[3-WF--XF]+";
    ruleY = "-WF++XF[+++YF++ZF]-";
    ruleZ = "--YF++++WF[+ZF++++XF]--XF";
    startLength = 460.0;
    theta = radians(36);  
    reset();
    //
    center = new PVector(_x, _y);
    around_center_layer_1 = new ArrayList<PVector>();
    
    for(int angle=-36-18; angle < 360-36-18; angle+=72){
      float x = center.x+115 * sin(radians(angle));
      float y = center.y+115 * cos(radians(angle));
      around_center_layer_1.add(new PVector(x,y));
    }
    
    for(int angle=-36+18; angle < 360-36+18; angle+=72){
      float x = center.x+115 * sin(radians(angle));
      float y = center.y+115 * cos(radians(angle));
      around_center_layer_1.add(new PVector(x,y));
    }
    //
  }

  void useRule(String r_) {
    rule = r_;
  }

  void useAxiom(String a_) {
    axiom = a_;
  }

  void useLength(float l_) {
    startLength = l_;
  }

  void useTheta(float t_) {
    theta = radians(t_);
  }

  void reset() {
    production = axiom;
    drawLength = startLength;
    generations = 0;
  }

  int getAge() {
    return generations;
  }
  
  void render_onvalid(){
    PVector closest = closestNeighbour();
    if(closest != null){
      fill(0,255,0);
      ellipse(10, 10,10,10);
    }  
  }
  
  void render_poi(){
    roseLayer.fill(255,0,0);
    roseLayer.ellipse(center.x,center.y,10,10);
    for(int i=0; i < around_center_layer_1.size(); i++){
      roseLayer.fill(255,0,0);
      roseLayer.ellipse(around_center_layer_1.get(i).x, around_center_layer_1.get(i).y,10,10);
    }
    
    
    PVector closest = closestNeighbour();
    if(closest != null){
      roseLayer.fill(0,255,0);
      roseLayer.ellipse(closest.x, closest.y,10,10);
    }  
  }
  

  void render() {
    roseLayer.translate(tranX, tranY);
    int pushes = 0;
    int repeats = 1;
    steps += 12;          
    if (steps > production.length()) {
      steps = production.length();
    }

    for (int i = 0; i < steps; i++) {
      char step = production.charAt(i);
      if (step == 'F') {
        roseLayer.stroke(255, 60);
        for (int j = 0; j < repeats; j++) {
          roseLayer.line(0, 0, 0, -drawLength);
          roseLayer.noFill();
          roseLayer.translate(0, -drawLength);
        }
        repeats = 1;
      } 
      else if (step == '+') {
        for (int j = 0; j < repeats; j++) {
          roseLayer.rotate(theta);
        }
        repeats = 1;
      } 
      else if (step == '-') {
        for (int j =0; j < repeats; j++) {
          roseLayer.rotate(-theta);
        }
        repeats = 1;
      } 
      else if (step == '[') {
        pushes++;            
        roseLayer.pushMatrix();
      } 
      else if (step == ']') {
        roseLayer.popMatrix();
        pushes--;
      } 
      else if ( (step >= 48) && (step <= 57) ) {
        repeats = (int)step - 48;
      }
    }

    // Unpush if we need too
    while (pushes > 0) {
      roseLayer.popMatrix();
      pushes--;
    }
  }

  String iterate(String prod_, String rule_) {
    String newProduction = "";
    for (int i = 0; i < prod_.length(); i++) {
      char step = production.charAt(i);
      if (step == 'W') {
        newProduction = newProduction + ruleW;
      } 
      else if (step == 'X') {
        newProduction = newProduction + ruleX;
      }
      else if (step == 'Y') {
        newProduction = newProduction + ruleY;
      }  
      else if (step == 'Z') {
        newProduction = newProduction + ruleZ;
      } 
      else {
        if (step != 'F') {
          newProduction = newProduction + step;
        }
      }
    }

    drawLength = drawLength * 0.5;
    generations++;
    return newProduction;
  }
  

  
  
  PVector closestNeighbour(){
  
    //
    // for rollovers/selection, keep track of the point nearest the mouse
    int closestDist = 50;  // minimum distance
    PVector closestPlace = null;
  
    //
    for(int i=0; i < around_center_layer_1.size(); i++){
      //
      PVector pos = new PVector(around_center_layer_1.get(i).x, around_center_layer_1.get(i).y);
      // check if the distance from the mouse to this point is the closest so far
      int mouseDist = (int)dist(mouseX, mouseY, pos.x, pos.y);
      if (mouseDist < closestDist) {
        closestPlace = new PVector(pos.x, pos.y);
        closestDist = mouseDist;
      }
    }
    //
    return closestPlace;
  }
  

}