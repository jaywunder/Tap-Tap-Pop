# Tap Tap Pop

Clone of the iOS game "Pop the Lock" for learning machine learning/artificial intelligence.  

### Running locally
This project uses WebWorkers for the AI part of the page so the game part isn't bogged down. The problem is that Chrome
(and I assume other browsers too) doesn't let webworkers access local files.  

To run the project locally, use something like python's SimpleHTTPServer module to start a local server.


```bash
python -m "SimpleHTTPServer" 8000
```

Will let you access the webpage at `localhost:8000`. Good luck, have fun!


### License

MIT

