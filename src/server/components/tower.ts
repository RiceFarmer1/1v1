import { OnStart } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import { Logger } from "@rbxts/log";
import { Janitor } from "@rbxts/better-janitor";
import { $NODE_ENV } from "rbxts-transform-env";
import { Signal } from "shared/utils/lemon-signal";
import { Workspace } from "@rbxts/services";
import { Defer } from "shared/utils/teleport-utils";

type Attributes = {}
type Instance = Model & {
	Humanoid: Humanoid;
	Configs: Configuration;
};

function Missle() {
	return () => {};
}

@Component({})
export default abstract class Tower<I extends Attributes = Attributes, K extends Instance = Instance>
	extends BaseComponent<I, K>
	implements OnStart
{
	protected abstract TargetMode: string;

	public LastAttack = 1;

	public janitor = new Janitor();

	constructor(private readonly logger: Logger, components: Components) {
		super();
	}

	onStart() {
		Defer(() => {
			this.instance.AncestryChanged.Connect((tower) => {
				if (!tower.IsDescendantOf(Workspace)) {
					this.janitor.addFunction(() => {
						this.janitor.addInstance(tower);
						this.logger.Fatal(`${this.instance.GetAttribute("ID")} was destroyed`);
					});
				}
			});
		});
	}


	protected async Attack() {}
}
