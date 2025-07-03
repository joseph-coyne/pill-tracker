import streamDeck, { LogLevel } from "@elgato/streamdeck";

import { PillTracker } from "./actions/pill-tracker";

streamDeck.logger.setLevel(LogLevel.TRACE);

streamDeck.actions.registerAction(new PillTracker());

streamDeck.connect();