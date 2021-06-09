import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import panzoom from "panzoom";


@Component({
  selector: 'app-zoom-component',
  templateUrl: './zoom-component.component.html',
  styleUrls: ['./zoom-component.component.css']
})
export class ZoomComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  @ViewChild('scene', { static: false }) scene: ElementRef;
  @Input() imgfile;
  @Input() _id;

  id1:number=-1;
  panZoomController;
  
  zoomLevels: number[];
  currentZoomLevel: number;
  instance;


  re_id(){
    console.log("s")
  }
  onClickHome(){
    // const wait=ms=>new Promise(resolve => setTimeout(resolve, ms));

    this.panZoomController.zoomAbs(0, 0, 1);
    this.panZoomController.smoothMoveTo(0,0)
    // wait(100).then(() => {
    //   this.panZoomController.smoothMoveTo(0,0)
    //   });
    
    // let element = document.getElementById('scene').getAttribute('transform');
    // document.getElementById('scene').setAttribute('transform', "matrix(1 0 0 1 0 0)") ;
    // document.getElementById('scene1').id = "scene";
  }

  // zoom() {
  //   const isSmooth = true;
  //   const scale = this.currentZoomLevel;
    

  //   if (scale) {
  //     const transform = this.panZoomController.getTransform();
  //     const deltaX = transform.x;
  //     const deltaY = transform.y;
  //     const offsetX = scale + deltaX;
  //     const offsetY = scale + deltaY;
      
  //     if (isSmooth) {
       
  //       this.panZoomController.smoothZoomAbs(0, 0, scale);
        
        
  //     }
  //   }

  // }

  // zoomToggle(zoomIn: boolean) {
    
  //   const idx = this.zoomLevels.indexOf(this.currentZoomLevel);
    
  //   if (zoomIn) {
  //     if (typeof this.zoomLevels[idx + 1] !== 'undefined') {
  //       this.currentZoomLevel = this.zoomLevels[idx + 1];
  //     }
  //   } else {
  //     if (typeof this.zoomLevels[idx - 1] !== 'undefined') {
  //       this.currentZoomLevel = this.zoomLevels[idx - 1];
  //     }
  //   }

  //   if (this.currentZoomLevel === 1) {
  //     this.panZoomController.smoothMoveTo(0, 0);
  //     this.panZoomController.smoothZoomAbs(0, 0, 1);
  //   } else {
  //     this.zoom();
  //   }
  //   console.log(this.currentZoomLevel,this.zoomLevels[idx])
  // }




  ngAfterViewInit() {

    this.zoomLevels = [0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3];
    this.currentZoomLevel = this.zoomLevels[4];
    // panzoom(document.querySelector('#scene'));
    this.panZoomController = panzoom(document.getElementById('scene'));
    // this.panZoomController = panzoom(this.scene.nativeElement);

    // let instance = panzoom(document.querySelector('#nw1'));;
    // instance.on('panstart', function(e) {
    //   console.log('Fired when pan is just started ', e);
    //   // Note: e === instance.
    // });
    
    // instance.on('pan', function(e) {
    //   console.log('Fired when the `element` is being panned', e);
    // });
    
    // instance.on('panend', function(e) {
    //   console.log('Fired when pan ended', e);
    // });
    
    // instance.on('zoom', function(e) {
    //   console.log('Fired when `element` is zoomed');
    //   console.log(instance.getTransform());
    //   // instance.setTransformOrigin({x: 0, y: 0});

      
    // });
    
    // instance.on('zoomend', function(e) {
    //   console.log('Fired when zoom animation ended', e);
    // });
    
    // instance.on('transform', function(e) {
    //   // This event will be called along with events above.
    //   console.log('Fired when any transformation has happened', e);
    // });
  }

  // panzoom(document.getElementById('scene'), {
  //   beforeWheel: function(e) {
  //     // allow wheel-zoom only if altKey is pressed. Otherwise - ignore
  //     var shouldIgnore = !e.altKey;
  //     return shouldIgnore;
  //   }
  // })
 
}
