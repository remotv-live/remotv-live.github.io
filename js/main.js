let hls;
let video = document.getElementById('video');
let externalPlayerFrame = document.getElementById('externalPlayerFrame');

document.addEventListener('DOMContentLoaded', function() {
  renderChannels();
  playChannel("https://tv.sainaertebat.com/hls2/bein1.m3u8");
});

function stopAllPlayers() {
  if (video) {
    video.pause();
    video.currentTime = 0;
    video.removeAttribute('src');
    video.load();
  }
  
  if (hls) {
    hls.destroy();
    hls = null;
  }
  
  if (externalPlayerFrame) {
    externalPlayerFrame.src = '';
  }
}

function showChannelDialog() {
  document.getElementById('channelDialog').style.display = 'flex';
}

function hideChannelDialog() {
  document.getElementById('channelDialog').style.display = 'none';
}

function showQualityDialog() {
  document.getElementById('qualityDialog').style.display = 'flex';
}

function hideQualityDialog() {
  document.getElementById('qualityDialog').style.display = 'none';
}

function playChannel(streamUrl) {
  stopAllPlayers();
  hideChannelDialog();
  
  if (streamUrl.startsWith('external:')) {
    const externalUrl = streamUrl.replace('external:', '');
    const externalPlayer = document.querySelector('.external-player');
    
    externalPlayerFrame.src = externalUrl;
    externalPlayer.style.display = 'block';
    document.querySelector('.player-container').style.display = 'none';
  } else {
    document.querySelector('.player-container').style.display = 'block';
    document.querySelector('.external-player').style.display = 'none';
    initPlayer(streamUrl);
  }
}

function initPlayer(streamUrl) {
  if (Hls.isSupported()) {
    hls = new Hls({
      maxMaxBufferLength: 60,
      maxBufferSize: 60 * 1000 * 1000,
      maxBufferLength: 30,
      lowLatencyMode: false,
      enableWorker: true,
      startLevel: -1,
      abrEwmaDefaultEstimate: 500000,
      abrBandWidthFactor: 0.95,
      abrBandWidthUpFactor: 0.7,
      abrMaxWithRealBitrate: true
    });
    
    hls.loadSource(streamUrl);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function(event, data) {
      updateQualitySelector(data.levels);
    });
    
    hls.on(Hls.Events.ERROR, function(event, data) {
      if (data.fatal) {
        switch(data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            console.error('خطأ في الشبكة:', data.details);
            hls.startLoad();
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            console.error('خطأ في الوسائط:', data.details);
            hls.recoverMediaError();
            break;
          default:
            console.error('خطأ غير معروف:', data);
            initPlayer(streamUrl);
            break;
        }
      }
    });
    
    video.play().catch(e => console.log('خطأ في التشغيل التلقائي:', e));
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = streamUrl;
    video.addEventListener('loadedmetadata', function() {
      video.play();
    });
  } else {
    alert('المتصفح لا يدعم تشغيل هذا النوع من الفيديو');
  }
}

function updateQualitySelector(levels) {
  const select = document.getElementById('quality');
  
  while (select.options.length > 1) {
    select.remove(1);
  }
  
  levels.forEach((level, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = level.height + 'p';
    select.appendChild(option);
  });
  select.addEventListener('change', function() {
    if (this.value === 'auto') {
      hls.currentLevel = -1;
    } else {
      hls.currentLevel = parseInt(this.value);
    }
  });
}
