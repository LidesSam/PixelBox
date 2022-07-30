class PixelBoard{
    constructor(){
        
        this.parent=null
        for(var i=0; i<16;i++){
            var line = [];
            for(var j=0; j<16;j++){
                line.push(0);
            }
            this.drawMatrix.push(line)
        }
        this.DrawPixelOn=this.DrawPixelOn.bind(this)
    }

    DrawPixelOn(){

    }


}