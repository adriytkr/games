export function useCycle<T>(
  states:T[],
  index:number,
  options:{cyclic:boolean}={cyclic:true},
){
  const currentIndex=ref(index);
  const state=computed(()=>getStateByIndex(states,currentIndex.value));

  function getStateByIndex(states:T[],index:number):T{
    const state=states[index];

    if(state===undefined)
      throw Error('Invalid index');

    return state;
  }

  function decrease(){
    if(currentIndex.value===0){
      if(options.cyclic)currentIndex.value=states.length-1;
      else throw Error('Cyclic is disabled');
      return;
    }

    currentIndex.value--;
  }

  function increase(){
    if(currentIndex.value===states.length-1){
      if(options.cyclic)currentIndex.value=0;
      else throw Error('Cyclic is disabled');
      return;
    }

    currentIndex.value++;
  }

  return{
    state,
    decrease,
    increase,
  };
}
