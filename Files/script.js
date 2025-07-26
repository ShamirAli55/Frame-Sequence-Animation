
const canvas = document.querySelector("#frame");
const context = canvas.getContext("2d");


const frames = {
    currentIndex : 0,
    maxIndex : 382
};

let imagesLoaded = 0;

const images = [];

function loadImage(index)
{
    if(index >=0 && index <= frames.maxIndex)
    {
        const img = images[index];
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width/img.width;
        const scaleY = canvas.height/img.height;
        const scale = Math.max(scaleX,scaleY);
        
        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        context.clearRect(0,0,canvas.width,canvas.height);
        context.imageSmoothingQuality = "high";
        context.imageSmoothingEnabled = "true";
        context.drawImage(img,offsetX,offsetY, newWidth,newHeight);
        frames.currentIndex = index;
    }
}
function preloadImages()
{
    for(var i=1 ; i<=frames.maxIndex ; i++)
    {
        const Imageurl = `./Frames/frame_${i.toString().padStart(4, 0)}.jpeg`
        const img = new Image();
        img.src = Imageurl;
        img.onload = ()=>
        {
            imagesLoaded++;
            if(imagesLoaded === frames.maxIndex)
            {
              loadImage(frames.currentIndex);
              startAnimation();
            }
        }
        images.push(img);
    }
}

function startAnimation()
{
    var tl = gsap.timeline({
        scrollTrigger :{
            trigger:".cnav",
            start :"top top",
            scrub : 2,
            // markers:true
        }
    })

    tl.to(frames,{
        currentIndex : frames.maxIndex,
        onUpdate : function ()
        {
            loadImage(Math.floor(frames.currentIndex))
        }
    })
}

preloadImages()
