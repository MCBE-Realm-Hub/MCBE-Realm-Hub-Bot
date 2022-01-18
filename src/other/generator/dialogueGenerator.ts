type version = "1.17";
interface rawtextOpt {
    translate: string,
    with?: Array<string>
}
interface rawtext {
    rawtext: Array<rawtextOpt>
}

interface button {
    name: string | rawtext,
    commands: Array<string>
}
interface scene {
    scene_tag: string,
    npc_name?: string | rawtext,
    text?: string | rawtext,
    on_open_commands?: Array<string>,
    on_close_commands?: Array<string>,
    buttons?: Array<button>
}

class DialogueGenerator {
    json: {
        format_version: version,
        "minecraft:npc_dialogue": {
            scenes: Array<scene>
        }
    };
    /**
     * @param version NPC Dialogue format version
     */
    constructor(version: version) {
        this.json = {
            "format_version": version,
            "minecraft:npc_dialogue": {
                "scenes": []
            }
        };
    };
    private _currentScene: string;
    private getScene(scene: string) {
        return this.json["minecraft:npc_dialogue"].scenes.filter(obj => obj.scene_tag === scene)[0] ?? null;
    };

    public setScene(scene: string): DialogueGenerator {
        this._currentScene = scene;
        this.getScene(scene) ?? this.json["minecraft:npc_dialogue"].scenes.push({ scene_tag: scene });
        return this;
    };
    public setName(name: string | rawtext): DialogueGenerator {
        const scene = this.getScene(this._currentScene);
        scene.npc_name = name;
        return this;
    };
    public setText(text: string | rawtext): DialogueGenerator {
        const scene = this.getScene(this._currentScene);
        scene.text = text;
        return this;
    };
    public setCommands({ onOpen, commands }: { onOpen: boolean, commands: Array<string> }): DialogueGenerator;
    public setCommands({ onClose, commands }: { onClose: boolean, commands: Array<string> }): DialogueGenerator;
    public setCommands({ onOpen, onClose, commands }: { onOpen: boolean, onClose: boolean, commands: Array<string> }): DialogueGenerator
    public setCommands({ onOpen, onClose, commands }: { onOpen?: boolean, onClose?: boolean, commands: Array<string> }): DialogueGenerator {
        const scene = this.getScene(this._currentScene);
        onOpen ? scene.on_open_commands = commands : null;
        onClose ? scene.on_close_commands = commands : null;
        return this;
    };
    public setButton({ name, commands }: { name: string | rawtext, commands: Array<string> }): DialogueGenerator {
		const scene = this.getScene(this._currentScene);
        if(!scene.buttons) scene.buttons = [];
        let sceneExist = scene.buttons.filter(obj => obj.name === name)[0];
        if(sceneExist) sceneExist.commands = commands;
        else scene.buttons.push({ name, commands });
        return this;
    };
    public deleteButton(name: string): DialogueGenerator {
        const scene = this.getScene(this._currentScene);
        const index = scene.buttons?.findIndex(v => v.name === name);
        if(index !== -1) scene.buttons?.splice(index, 1);
        return this;
    };
};

export { DialogueGenerator };
/*
const scene = new DialogueGenerator('1.17')
    .setScene('Client Scene')
    .setName({"rawtext":[{"translate":"character.name","with":["\n"]}]})
    .setText('Client side scene stuff')
    .setCommands({ onClose: true, commands: ['say Closed NPC!'] })
    .setButton({ name: 'Suicide', commands: ['kill @initiator'] })
    .setButton({ name: 'Test scene', commands: ["say This won't get added bc at the bottom its deleted"] })
    .deleteButton('Test scene')

    .setScene('Server Scene')
    .setName('Idk a name')
    .setText('Server side scene stuff')
    .setCommands({ onOpen: true, commands: ['say Opened npc!'] })
    .setButton({ name: {"rawtext":[{"translate":"kill.everyone"}]}, commands: ['kill @initiator'] })
console.log(JSON.stringify(scene.json, null, 2));
*/