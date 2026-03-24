<script setup lang="ts">
import type { ISnakeGameConfig,GameSpeed } from '~/types/snake-game';

const emit=defineEmits<{
  (e:'back'):void;
  (e:'play',settings:ISnakeGameConfig):void;
}>();

const appleCount=useCount({
  initialValue:1,
  min:1,
  max:3,
  step:1,
});

const gridSize=useCount({
  initialValue:7,
  min:7,
  max:13,
  step:2,
});

const speedOrder:GameSpeed[]=['slow','normal','fast']
const speed=useCycle<GameSpeed>(speedOrder,0,{cyclic:true});
const speedMap:Record<GameSpeed,string>={
  slow:'Slow',
  normal:'Normal',
  fast:'Fast',
};
const speedLabel=computed(()=>speedMap[speed.state.value]);

type ToggleState='off'|'on';
const showGrid=useCycle<ToggleState>(['off','on'],0,{cyclic:true});
const labelMap:Record<ToggleState,string>={
  'off':'Off',
  'on':'On',
};
const showGridLabel=computed(()=>labelMap[showGrid.state.value]);

function play(){
  const settings:ISnakeGameConfig={
    gridSize:{
      width:gridSize.count.value,
      height:gridSize.count.value,
    },
    appleCount:appleCount.count.value,
    showGrid:showGrid.state.value==='on',
    speed:speed.state.value,
  };

  emit('play',settings);
}
</script>

<template>
  <TheScene>
    <div class="settings-content">
      <div class="settings-options">
        <SnakeSettingsOption label="Grid Size">
          <SnakeSettingsCount
            @left="gridSize.decrement"
            @right="gridSize.increment"
            :value="gridSize.count.value"
            :disable-left="gridSize.count.value<=7"
            :disable-right="gridSize.count.value>=13"
          />
        </SnakeSettingsOption>
        <SnakeSettingsOption label="Number of apples">
          <SnakeSettingsCount
            @left="appleCount.decrement"
            @right="appleCount.increment"
            :value="appleCount.count.value"
            :disable-left="appleCount.count.value<=1"
            :disable-right="appleCount.count.value>=3"
          />
        </SnakeSettingsOption>
        <SnakeSettingsOption label="Show grid">
          <SnakeSettingsCount
            @left="showGrid.decrease"
            @right="showGrid.increase"
            :value="showGridLabel"
          />
        </SnakeSettingsOption>
        <SnakeSettingsOption label="Speed">
          <SnakeSettingsCount
            @left="speed.decrease"
            @right="speed.increase"
            :value="speedLabel"
          />
        </SnakeSettingsOption>
      </div>
      <div class="settings-actions">
        <SnakeButton @click="$emit('back')">Back</SnakeButton>
        <SnakeButton @click="play">Start</SnakeButton>
      </div>
    </div>
    <SnakeGrid/>
  </TheScene>
</template>

<style scoped>
.settings-content{
  position:relative;
  z-index:10;
}

.settings-options{
  min-width:500px;
  margin-bottom:24px;
  display:flex;
  flex-direction:column;
  row-gap:8px;
}

.settings-actions{
  display:flex;
  justify-content:space-between;
  column-gap:12px;
}
</style>
