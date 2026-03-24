export class GameLoop{
  private m_lastTime:number=0;
  private m_loopId:number|null=null;
  private m_isRunning:boolean=false;

  private onUpdate:(timestamp:number)=>void;
  private tickRate:number;

  constructor(
    onUpdate:(timestamp:number)=>void,
    tickRate:number,
  ){
    this.onUpdate=onUpdate;
    this.tickRate=tickRate;
  }

  public start():void{
    if(this.m_isRunning)return;
    this.m_isRunning=true;
    this.m_loopId=requestAnimationFrame(this.run);
  }

  public stop():void{
    this.m_isRunning=false;
    if(this.m_loopId!==null){
      cancelAnimationFrame(this.m_loopId);
      this.m_loopId=null;
    }
  }

  public run=(timestamp:number):void=>{
    if(!this.m_isRunning)return;

    const delta=timestamp-this.m_lastTime;

    if(delta >= this.tickRate){
      this.onUpdate(timestamp);
      this.m_lastTime=timestamp;
    }

    this.m_loopId=requestAnimationFrame(this.run);
  }
}
