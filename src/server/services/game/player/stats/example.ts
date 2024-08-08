import { Service, OnStart, OnInit } from "@flamework/core";
import { Logger } from "@rbxts/log";
import { DataStoreService, Players } from "@rbxts/services";

// comment

@Service({})
export class PlayerService implements OnStart, OnInit {
	// GetOrderedDataStore is for leaderboard
	//private readonly playerLeaderboard = DataStoreService.GetOrderedDataStore("Leaderboard")
	private readonly playerDataStore = DataStoreService.GetDataStore("PlayerData");

	/** @ignore */
	constructor(private readonly logger: Logger) {}

	onInit() {
		// imported from @Rbxts/services
		Players.PlayerAdded.Connect((player) => {
			warn(`${player.UserId} has joined the game`);

			// .catch will watch for any errors
			this.onPlayerJoin(player).catch((err) => warn(`Failed to load player data: ${err}`));
		});
	}

	onStart() {}

	// async means sth to do with promises
	private async onPlayerJoin(player: Player): Promise<void> {
		return Promise.try(() => {
			// now we get player data
			const [success, data] = pcall(() => this.playerDataStore.GetAsync(`PlayerData_${player.UserId}`));

			// if player data isnt found, we know its a new player.
			if (!success) {
				// do something
			} else {
				// do something such as setting the gui cash display
			}
		});
	}

	private async onPlayerLeave(): Promise<void> {}
}
