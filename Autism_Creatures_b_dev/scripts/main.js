import { world } from '@minecraft/server';

world.beforeEvents.worldInitialize.subscribe(eventData => {
  eventData.blockComponentRegistry.registerCustomComponent(
    "autism_creatures:test_component",
    {
      onTick(event) {
        const block = event.block;
        const dimension = block.dimension;
        const location = block.location;

        dimension.runCommandAsync(`summon autism_creatures:autism_creature ${location.x + 0.5} ${location.y + 1} ${location.z + 0.5}`);
      }
    }
  );
});
