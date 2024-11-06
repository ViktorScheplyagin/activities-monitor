self.onmessage = function (e) {
  const { command, interval } = e.data;
  let timerId;

  if (command === "start") {
    timerId = setInterval(() => {
      self.postMessage("tick");
    }, interval);
  } else if (command === "stop") {
    clearInterval(timerId);
  }
};
