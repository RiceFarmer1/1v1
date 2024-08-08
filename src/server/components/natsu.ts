import Tower from "./tower";

interface Attributes {}
type Instance = Model & {
	Humanoid: Humanoid;
	Configs: Configuration;
};

export default class Natsu extends Tower<Attributes, Instance> {
	protected TargetMode: string = "";

	public override LastAttack: number = 0;

	constructor() {
		super();
	}

    
	onStart(): void {
		
		if (this.LastAttack <= 0) {
			this.LastAttack = tick();
		}

		// this.janitor.addConnection(this.TowerAdded.Connect(() => {}));
	}
}
