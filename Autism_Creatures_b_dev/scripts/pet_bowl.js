import { world, system,BlockPermutation } from '@minecraft/server';

world.beforeEvents.worldInitialize.subscribe((initEvent) => {
    initEvent.blockComponentRegistry.registerCustomComponent("autism_creatures:on_interact", {
        onPlayerInteract: ({ player, block }) => {
            if (!player.isValid() || !block) return;
            const selectedItem = player.getComponent('inventory').container?.getItem(player.selectedSlotIndex);
            if (!selectedItem) return;

            world.sendMessage(`\n\n§6item selected = ${selectedItem.typeId}`);

            if (selectedItem.typeId === 'minecraft:water_bucket') {

                world.sendMessage(`§dUsed water bucket on ${block.typeId}`);  // check the name it gave against the name in your if below

                if (
                    [
                        'autism_creatures:autism_creature_bowl'
                    ].includes(block.typeId)) {

                    const currentState = block.permutation.getState('autism_creatures:water');

                    world.sendMessage(`§bCurrent state = ${currentState}`);

                    block.setPermutation(block.permutation.withState('autism_creatures:water', 1));

                    system.runTimeout(() => {
                        world.sendMessage(`§aNew State = ${block.permutation.getState('autism_creatures:water')}`);
                    }, 1);

                    world.sendMessage(`§bRemoved 1`);
                }
            };

            if (selectedItem.typeId === 'minecraft:bucket') {

                world.sendMessage(`§dUsed bucket on ${block.typeId}`);  // check the name it gave against the name in your if below

                if (
                    [
                        'autism_creatures:autism_creature_bowl'
                    ].includes(block.typeId)) {

                    const currentState = block.permutation.getState('autism_creatures:water');

                    world.sendMessage(`§bCurrent state = ${currentState}`);

                    block.setPermutation(block.permutation.withState('autism_creatures:water', 0));

                    system.runTimeout(() => {
                        world.sendMessage(`§aNew State = ${block.permutation.getState('autism_creatures:water')}`);
                    }, 0);
                }
            };
        }
    });
});