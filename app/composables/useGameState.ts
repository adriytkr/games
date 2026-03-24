export function useGameState<T>(initialState:T){
  const state=ref<T>(initialState);

  const setState=(newState:T)=>{
    state.value=newState;
  };

  return{
    state,
    setState,
  };
}
