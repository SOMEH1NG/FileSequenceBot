# File Sequencing Bot

File Sequencing Bot! This Telegram bot is designed to help you organize and sequence your files.

## Features

1. **Sequencing**: Send documents, videos, or audio files to the bot, and it will sequence and organize them for you.

2. **Stats**: Check your usage statistics, including the total number of users and file sequences.

3. **Cancellation**: If you change your mind or make a mistake, you can cancel the file sequencing process using the `/cancel` command.

## Usage

1. **Start a File Sequence:**
   - Use the command `/ssequence` to begin the file sequencing process.
   - Send documents, videos, or audio files one by one.

2. **End the File Sequence:**
   - Use the command `/esequence` to finish the file sequencing process.
   - Receive the sequenced files in the correct order.

3. **Check Statistics:**
   - Use the command `/stats` to view usage statistics.

4. **Cancel File Sequencing:**
   - Use the command `/cancel` if you want to cancel the ongoing file sequencing process.

### VPS Deployment

1. Update and upgrade the system:

    ```bash
    sudo apt update
    sudo apt upgrade -y
    ```

2. Install Node.js and npm:

    ```bash
    sudo apt install -y curl
    curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
    sudo apt install -y nodejs
    ```

3. Clone the repository:

    ```bash
    git clone https://github.com/SOMEH1NG/FileSequenceBot.git
    cd FileSequenceBot
    ```

4. Build the Docker image:

    ```bash
    docker build -t file-sequence-bot .
    ```

5. Run the Docker container:

    ```bash
    docker run -d -p 3000:3000 file-sequence-bot
    ```

6. Check container logs:

    ```bash
    docker logs <container_id>
    ```

7. Stop the Docker container if needed:

    ```bash
    docker stop <container_id>
    ```

## Lang Used

- **Language**: JavaScript
- **Framework**: Telegraf (Telegram Bot Framework)
- **Database**: MongoDB
- **Libraries**: Telegraf, MongoDB


