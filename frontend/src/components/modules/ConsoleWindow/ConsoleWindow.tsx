import React from 'react';

export const ConsoleWindow = (result: string) => {
  const consoleWindow = window.open("", "ConsoleOutput", "width=650,height=330");
  if (consoleWindow) {
    consoleWindow.document.open();
    consoleWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Console Output</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: monospace;
            background-color: #272822;
            color: #f8f8f2;
            overflow: hidden;
          }
          #console-output {
            width: 100%;
            height: 100vh;
            padding: 10px;
            box-sizing: border-box;
            white-space: pre;
            overflow: auto;
          }
        </style>
      </head>
      <body>
        <div id="console-output"></div>
        <script>
          window.onload = function() {
            const outputElement = document.getElementById('console-output');
            outputElement.textContent = ${JSON.stringify(result)};
          }
        </script>
      </body>
      </html>
    `);
    consoleWindow.document.close();
  }
};
