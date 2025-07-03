import { action, KeyDownEvent, KeyUpEvent, SingletonAction, WillAppearEvent, KeyAction } from "@elgato/streamdeck";

@action({ UUID: "com.tocks.pill-tracker.pilltracker" })

export class PillTracker extends SingletonAction<PillTrackerSettings> {
	override onWillAppear(ev: WillAppearEvent<PillTrackerSettings>): void | Promise<void> {
		const keyAction = ev.action as KeyAction<PillTrackerSettings>;

		const { lastPress } = ev.payload.settings;
		const pressedToday = this.wasPressedToday(lastPress);

		if (pressedToday) {
			keyAction.setState(1);
		} else {
			keyAction.setState(0);
		}

		this.scheduleMidnightReset(keyAction);
	}

	override async onKeyDown(ev: KeyDownEvent<PillTrackerSettings>): Promise<void> {
		const keyAction = ev.action as KeyAction<PillTrackerSettings>;

		const nowIso = new Date().toISOString();

		const settings: PillTrackerSettings = {
			lastPress: nowIso,
		};

		await keyAction.setSettings(settings);
		await keyAction.setState(1);
	}

  override onKeyUp(ev: KeyUpEvent<PillTrackerSettings>): void {
    const keyAction = ev.action as KeyAction<PillTrackerSettings>;
    keyAction.setState(1);
  }

	wasPressedToday(lastPressIso?: string): boolean {
		if (!lastPressIso) return false;
		const lastPress = new Date(lastPressIso);
		const now = new Date();
		return (
			lastPress.getFullYear() === now.getFullYear() &&
			lastPress.getMonth() === now.getMonth() &&
			lastPress.getDate() === now.getDate()
		);
	}

	scheduleMidnightReset(keyAction: KeyAction<PillTrackerSettings>) {
		const now = new Date();
		const nextMidnight = new Date(now);
		nextMidnight.setHours(24, 0, 0, 0);
		const msUntilMidnight = nextMidnight.getTime() - now.getTime();

		setTimeout(() => {
			keyAction.setState(0);
			this.scheduleMidnightReset(keyAction);
		}, msUntilMidnight);
	}
}

type PillTrackerSettings = {
	lastPress?: string;
};