# Teamwork Dashboard GitHub Page (scenario-b)

Deployed GitHub Page for teamwork dashboard at https://teamwork-analytics.github.io/scenario-b/

## Overview

This repository provides a simplified teamwork dashboard hosted on GitHub Pages. The deployed Page demonstrates some dynamic interactions of the dashboard using the data from Session 350 (Peninsula Campus 2023). It does not require any backend server connection to be hosted, and is merely for showcasing teamwork analysis dashboard and its visualisations.

### What can the deployed dashboard do?

On the [application](https://teamwork-analytics.github.io/scenario-b/), users can:

1. **Phases Selection:** Click phases (All, Scenario started, Handover ends, etc.) to modify the timeline range.
2. **Timeline Control:** Undo and redo timeline changes for easy navigation.
3. **Responsive Visualisations:** Observe how graphs, bar charts, and other visualisations change according to selected phases.
4. **Nurse Filtering:** Toggle nurses on/off in the Ward Map for focused analysis and result filtering.
5. **Visualisation Info:** Click the information (i) icons for descriptions of each visualisation.

### What the current version cannot do?

Some features that are not supported in this simplified version are:

1. **Precise Timeline Dragging:** Sliding on the timeline for granular time range selection.
2. **Simulation Video:** Display video playback of the simulation.
3. **Other-Session Data:** Viewing data from sessions other than Session 350.
4. **Tag-Based Filtering:** Clicking timeline labels (on the right of the timeline) for 10-second visualisation snapshots during the label tagging time.
5. **Projector:** Select visualisations and project to another screen for debriefing.

## How to edit and apply changes to the GitHub Page?

First modify code within the `client/` directory.

Then, deploy changes:

```javascript
cd client
npm install
npm run deploy
```
