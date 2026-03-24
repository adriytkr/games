<script setup lang="ts">
import type { ISnakeGameConfig } from '~/types/snake-game';

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

function play(){
  const settings:ISnakeGameConfig={
    gridSize:{
      width:gridSize.count.value,
      height:gridSize.count.value,
    },
    appleCount:appleCount.count.value,
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
          />
        </SnakeSettingsOption>
        <SnakeSettingsOption label="Number of apples">
          <SnakeSettingsCount
            @left="appleCount.decrement"
            @right="appleCount.increment"
            :value="appleCount.count.value"
          />
        </SnakeSettingsOption>
      </div>
      <div class="settings-actions">
        <SnakeButton @click="$emit('back')">Back</SnakeButton>
        <SnakeButton @click="play">Start</SnakeButton>
      </div>
    </div>
  </TheScene>
</template>

<style scoped>
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
