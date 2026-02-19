# DnD 5etools DM Screen Encounter Display

This tool allows you to have a displayable version for encounters tracked on [5etools DM Screen](https://5e.tools/dmscreen.html).

Using 5etools' sources, you will be able to have the page display information form the encounter, such as:
- Current Round
- Current creature on turn
- Initiative order
- Exact HP of each PC
- Exact HP of each monster OR a healthbar which changes corresponding to the monster's current HP, but not showing exact values
- Pictures for each combatant (PC and monsters)

![example](doc/images/example.png)

## Installation Guide
### Windows
1. Make sure [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) is installed
2. Make sure Docker Desktop is running.
3. Start/double click on **start_docker.bat**
4. Type in your browser: http://YOUR.LOCAL.IP.ADDRESS:8080

## How To Use
### Windows
1. Start/double click on **start_docker.bat**
  - Or just type `docker compose up` if display and hosting will be done on the same machine
2. Type in your browser: http://YOUR.LOCAL.IP.ADDRESS:8080
3. Start up [5etools' DM Screen](https://5e.tools/dmscreen.html)
4. Add an Initiative Tracker (Plus -> Special -> Initiative Tracker)
5. Click on the ![profile_icon](doc/images/dmscreen_profile_icon.png) icon.
6. Select Standard
7. Start Server
8. Copy token
9. Paste token in the webapp
10. Press connect.

## Customization Options
- I suggest to turn on some settings in the 5etools Initiative Tracker settings:
  - Player View: Show exact player HP
  - Player View: Show exact monster HP
  - Player View: Show ordinals

- In order to show the players' avatar/image, you need to modify the `public/assets/players.json` file.
  - Modify player name
  - Add an URL or local image file to the `imageUrl` field.

- If any modification has been done, you need to rebuild and restart the docker image!
