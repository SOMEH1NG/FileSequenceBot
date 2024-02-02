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

1. Clone the repository:

    ```bash
    git clone https://github.com/SOMEH1NG/FileSequenceBot
    cd FileSequenceBot
    ```

2. Build the Docker image:

    ```bash
    sudo docker build -t file-sequence-bot .
    ```

3. Run the Docker container:

    ```bash
    sudo docker run -d -p 8080:8080 file-sequence-bot
    ```

4. Check container logs:

    ```bash
    sudo docker logs <container id>
    ```

5. Stop the Docker container if needed:

    ```bash
    sudo docker stop <container_id>
    ```
    
## Lang Used

- **Language**: JavaScript
- **Framework**: Telegraf (Telegram Bot Framework)
- **Database**: MongoDB
- **Libraries**: Telegraf, MongoDB


