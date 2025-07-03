# 🩺 Pill Tracker — Stream Deck Plugin

Log and display whether you’ve taken your medication for the day, right from your Stream Deck.  
This plugin helps you track daily meds at a glance, turning the button green when pressed and resetting it at midnight.

---

## 📸 Features

- ✅ One-tap to mark your pill as taken for today  
- ✅ Button stays green for the rest of the day  
- ✅ Automatically resets to red at midnight  
- ✅ Optional: disable auto-reset or manually reset via Property Inspector  

---

## 🛠 Installation

### For development

**Step 2. Clone the repo**
```bash
git clone https://github.com/joseph-coyne/pill-tracker
cd pill-tracker
```

**Step 3. Install dependencies**
```bash
npm install
```

**Step 4. Build the plugin**
```bash
npm run build
```

**Step 5. Symlink the built plugin folder**
```powershell
Remove-Item "$env:APPDATA\Elgato\StreamDeck\Plugins\com.tocks.med-tracker.sdPlugin" -Recurse -Force

New-Item -ItemType SymbolicLink `
    -Path "$env:APPDATA\Elgato\StreamDeck\Plugins\com.tocks.med-tracker.sdPlugin" `
    -Target "$PWD\com.tocks.med-tracker.sdPlugin"
```

**Step 6. Restart the Stream Deck app**

**Step 7. Add the button**
In the Stream Deck app, find **Pill Tracker** in the actions list and drag it onto your preferred key.

---

## 🖼 Property Inspector Settings

In the Stream Deck app, click the action’s gear icon to open its settings:

- ✅ **Auto Reset at Midnight:** Toggle automatic reset of the button at midnight.
- 🔘 **Manual Reset Button:** Reset the button state to red immediately.

---

## 📁 Project Structure

```
.
├── src/
│   ├── actions/
│   │   └── pill-tracker.ts
│   └── plugin.ts
├── com.tocks.med-tracker.sdPlugin/
│   ├── manifest.json
│   ├── bin/plugin.js
│   └── imgs/
│       └── actions/track/
│           ├── red.png
│           ├── green.png
│           └── icon.png
├── ui/
│   └── pill-tracker.html
```

---

## 🧪 Development Notes

- Uses the official [`@elgato/streamdeck`](https://www.npmjs.com/package/@elgato/streamdeck) SDK
- Written in TypeScript
- Bundled with Rollup

Recommended:
```bash
npm run watch
```
to rebuild on file changes.

---

## 📄 License

MIT © Joseph Coyne
