# README

## Index.js

The `index.js` file serves as the central script for your Discord bot, interacting with a Minecraft server. Here's a breakdown of its key components:

### Dependencies
- **Discord.js**: Handles interactions with the Discord API.
- **fs (File System)**: Enables file system operations, used for reading and writing JSON files.
- **child_process**: Facilitates the spawning of child processes, employed here for communication with the Minecraft server.
- **config**: A separate configuration file for storing sensitive information and server paths.

### Constants
- **overworldTp, netherTp, endTp**: Constants defining different teleportation commands for distinct Minecraft dimensions.
- **altaccount**: Specifies an alternative account, "Camera Man 3000," for teleportation commands.
- **commandsFile**: The path to the JSON file storing custom commands.

### Minecraft Server Initialization
- The script initializes the Minecraft server using the `spawn` function, capturing its output and error streams for logging.

### Discord Bot Initialization
- A Discord bot is created using the Discord.js library, with the provided token for authentication.

### Custom Commands Handling
- Custom commands are loaded from the `commands.json` file using the `loadCommands` function.
- The script responds to Discord messages, executing commands based on user input.
- Custom teleportation commands (`tpalt_o`, `tpalt_n`, `tpalt_e`, `tpalt`) are handled, utilizing the specified Minecraft dimensions and coordinates.
- Commands like `add`, `remove`, and `savecommands` allow users to modify and manage the list of custom commands dynamically.

### Execution of Custom Commands
- Custom commands are executed using the `executeCustomCommand` function, which interprets the command details and triggers the corresponding action on the Minecraft server.

### Saving Custom Commands
- The `savecommands` command allows users to persistently save any changes made to the custom commands list.

### Note
- Ensure that the Minecraft server executable (`bedrock_server`) and its dependencies are correctly configured, as specified in the `config` file.
- Customize the bot's behavior by adjusting the command logic and responses in the script.

## Usage Guide and Command List

### Discord Bot Commands

To interact with the Discord bot, use the designated prefix (as defined in your `config` file) followed by one of the commands listed below. For example, if your prefix is `-`, you would type `-command` to invoke the 'command' action.

### Example
- **Command Prefix**: `-`
- **Usage**: `-command`

### Command List

1. **`command`**
    - **Description**: Traverses the Matrix.
    - **Usage**: `-command`

2. **`tpalt_o`**
    - **Description**: Teleports the alternative account to the specified location in the Overworld.
    - **Usage**: `-tpalt_o [coordinates]`

3. **`tpalt_n`**
    - **Description**: Teleports the alternative account to the specified location in the Nether.
    - **Usage**: `-tpalt_n [coordinates]`

4. **`tpalt_e`**
    - **Description**: Teleports the alternative account to the specified location in the End.
    - **Usage**: `-tpalt_e [coordinates]`

5. **`tpalt`**
    - **Description**: Teleports the alternative account to the specified location in the Overworld.
    - **Usage**: `-tpalt [coordinates]`

6. **`remove`**
    - **Description**: Removes a custom command.
    - **Usage**: `-remove [name]`

7. **`add`**
    - **Description**: Adds a new custom command for the Overworld.
    - **Usage**: `-add [name] | [description] / [coordinates]`

8. **`add_n`**
    - **Description**: Adds a new custom command for the Nether.
    - **Usage**: `-add_n [name] | [description] / [coordinates]`

9. **`add_e`**
    - **Description**: Adds a new custom command for the End.
    - **Usage**: `-add_e [name] | [description] / [coordinates]`

10. **`savecommands`**
    - **Description**: Saves the current list of custom commands to the JSON file.
    - **Usage**: `-savecommands`

### Discord Bot Commands (From `commands.json`)

1. **`home`**
    - **Description**: One moment while I walk back home.
    - **Usage**: `-home`

2. **`raid`**
    - **Description**: Need some emeralds, or maybe some redstone?
    - **Usage**: `-raid`

3. **`gunpowder`**
    - **Description**: Would you like to ignite some TNT?
    - **Usage**: `-gunpowder`

4. **`iron`**
    - **Description**: Meow, meow, meowww...
    - **Usage**: `-iron`

5. **`shulker`**
    - **Description**: UNLIMITED STORAGE!!!
    - **Usage**: `-shulker`

6. **`gold`**
    - **Description**: Oink, oink, swords galore.
    - **Usage**: `-gold`

7. **`fortress`**
    - **Description**: Farming wither skeletons in Minecraft is a skeleton of a job, but someone has got to do it.
    - **Usage**: `-fortress`

Users can now trigger these commands by typing the specified command name after the dash in the Discord chat. Adjust the prefix according to your configuration.
