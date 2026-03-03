
// Minimal integration for GitHub Next 'Realtime GitHub' prototype if available.
// If window.RTGH is present (GitHub Next experimental), we open a channel in this repo.
// Otherwise, fall back to BroadcastChannel so multiple tabs/windows stay in sync.

let sendRealtime = () => {};
let subscribeRealtime = (fn) => {};

(function initRealtime(){
  if (window.RTGH && typeof window.RTGH.openChannel === 'function') {
    // Experimental API hook
    window.RTGH.openChannel('princess-mood').then((channel) => {
      channel.on('message', (data) => {
        try { subscribeHandler(JSON.parse(data)); } catch { /* ignore */ }
      });
      sendRealtime = (payload) => channel.send(JSON.stringify(payload));
      subscribeRealtime = (fn) => { subscribeHandler = fn; };
    }).catch(() => setupBroadcastFallback());
  } else {
    setupBroadcastFallback();
  }

  function setupBroadcastFallback(){
    const bc = new BroadcastChannel('princess-mood');
    bc.onmessage = (e) => subscribeHandler(e.data);
    sendRealtime = (payload) => bc.postMessage(payload);
    subscribeRealtime = (fn) => { subscribeHandler = fn; };
  }

  var subscribeHandler = function(){};
})();
