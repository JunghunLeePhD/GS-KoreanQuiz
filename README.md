# 🇰🇷 Google Apps Script Korean Quiz 🇰🇷

A simple web app that serves a multiple-choice Korean vocabulary quiz. This project runs entirely on Google Apps Script and uses the Gemini API to provide real-time explanations for the answers.

## 🚀 Getting Started

Follow these steps to set up your development environment.

### Prerequisites

You'll need the following software installed on your host machine:

- **Visual Studio Code**

- **Docker Desktop** (or another compatible container runtime)

- The [**Dev Containers**](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers "null") extension for VS Code.

- **Git Configuration:** Your host machine must have `~/.ssh` keys and a `~/.gitconfig` file set up. The Dev Container will automatically mount and use these for authentication.

### Environment Setup

1. **Clone the Repository** Open your terminal, clone this repository, and navigate into the new directory:

```bash
git clone git@github.com:JunghunLeePhD/GS-KoreanQuiz.git
cd GS-KoreanQuiz
```

2. **Open in Dev Container**

   - Open the project folder (`GS-KoreanQuiz`) in VS Code.

   - A pop-up will appear: "Folder contains a Dev Container configuration file. Reopen in Container?"

   - Click **Reopen in Container**. (The first time you do this, Docker will build the container image, which may take a few minutes).

3. **Log in to `clasp` (One-Time Setup)** Once the container is running, open a new VS Code terminal (it will be inside the container). Run the `clasp login` command and follow the prompts in your browser to authorize it.

```bash
clasp login
```

## 🔧 Project Configuration

Now that your environment is ready, let's configure your Apps Script project.

### 1. Create the GAS Project

Run `clasp create` to make a new project on your Google Drive. This command will link the new project to your local `./src`directory.

```bash
PROJECT_NAME="Korean Quiz Webapp"
clasp create --title "$PROJECT_NAME" --rootDir ./src
clasp push
```

### 2. Get Your Gemini API Key

This quiz uses the Gemini API to explain the answers.

1. Go to [**Google AI Studio**](https://aistudio.google.com/app/apikey "null").

2. Sign in and create a new API key.

3. Copy the key.

### 4. Set Script Properties

1. Go to your new Google Apps Script project in your browser.

2. Click on **Project Settings** (the ⚙️ icon).

3. Scroll down to **Script Properties** and click **Add script property**.

4. Add the following property:

   - **Property:** `GOOGLE_GEMINI_APIKEY`

   - **Value:** Paste the **Gemini API Key** you just copied.

## 🌐 Deployment

To use the project as a web app, you must deploy it.

1. In the Apps Script editor, click the **Deploy** button in the top-right corner.

2. Select **New deployment**.

3. Click the **Select type** gear icon (⚙️) and choose **Web app**.

4. Fill in the settings:

   - **Description:** (e.g., "Initial deployment")

   - **Execute as:** `Me`

   - **Who has access:** `Only myself` (or `Anyone` if you prefer)

5. Click **Deploy**.

6. You will need to **Authorize access** for the script to run as you.

7. Once complete, copy the **Web app URL**. This is the link to your quiz!

## ▶️ Using the Web App

1. Open the **Web app URL** you copied during deployment.

2. Wait a moment for the first quiz question to be loaded.

3. Click the answer you think is correct.

   - **Correct Answer:** The background will turn **blue**, and an explanation from Gemini will appear.

   - **Incorrect Answer:** The background will turn **red**, and an explanation from Gemini will appear.

4. To get a new question, simply click the question text at the top of the screen.

## 📂 File Structure

- `Code.js`: **(Server-Side)** Handles all server logic, including serving the HTML, fetching the quiz data from the JSON file, and calling the Gemini API.

- `Index.html`: **(Client-Side)** The main HTML file that structures the page.

- `Javascript.html`: **(Client-Side)** Contains all the client-side logic, including the `Quiz` class, rendering the HTML, and handling user clicks.

- `Stylesheet.html`: **(Client-Side)** Contains all the CSS for styling the quiz.

- `assets_korean_json.html`: **(Data)** A file that *contains* your raw JSON quiz data, so that the server-side `Code.js` can read it.
