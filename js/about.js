
function draw(canvas,x,y)
    {
    var gl=canvas.getContext("2d");
    var im=new Image();
        gl.clearRect(0, 0, canvas.width, canvas.height);
        im.onload=function(e)
        {
            gl.drawImage(im,x,y,im.width/10,im.height/10);

        }
        im.src="h.jpg";
    }
    var x =parseInt(Math.random()*300);
    var y =55;
        



 var PAINT = {RenderId:'',CanvasId:'',flag:1};
 PAINT.render=function ()
 {
     this.RenderId= setInterval(PAINT.draw,1000);
 };
     PAINT.init=function ()
     {
         var ele = document.createElement("canvas");
         PAINT.CanvasId="Canvas";
             ele.setAttribute("id",PAINT.CanvasId);
             ele.style.width="100%";
             ele.style.height="100%";
             document.getElementById('CanvasParent').appendChild(ele);
             PAINT.render();

        setInterval(function()
        {
              if (y<-20) 
              {
                x =parseInt(Math.random()*300);
                y =55;
              }
              draw(ele,x,y--);
        },100);
     };
     PAINT.draw=function ()
     {
         var canvas =document.getElementById(PAINT.CanvasId);
         var gl= canvas.getContext("experimental-webgl");
         if (gl)
         {
             gl.clearColor(Math.random(),Math.random(),Math.random,1);
             gl.clear(gl.COLOR_BUFFER_BIT);

         }
         else
         {
             console.log("browser doesnt support webgl features");
         }
     }
     PAINT.destroy=function ()
     {
         clearInterval(PAINT.RenderId);
         var ele=document.getElementById(PAINT.CanvasId);
         document.body.removeChild(ele);

     }
document.getElementById('AboutHeading').addEventListener("click",function(){
    if (PAINT.flag) 
    {
            PAINT.flag=0;
            PAINT.init();
            
    }
});

