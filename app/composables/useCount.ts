export interface CounterOptions{
  initialValue:number;
  min:number;
  max:number;
  step:number;
}

export function useCount(options:CounterOptions){
  const count=ref<number>(options.initialValue);

  const decrement=()=>{
    if(count.value-options.step<options.min)
      throw Error('MIN in danger');

    count.value-=options.step;
  };

  const increment=()=>{
    if(count.value+options.step>options.max)
      throw Error('MAX in danger');

    count.value+=options.step;
  };

  return{
    count,
    decrement,
    increment,
  };
}
