// قائمة القنوات مع روابطها
const channels = {
  "سيرفر أساسي": [
    { name: "beIN Sport 1", url: "https://wo.cma.footballii.ir/hls2/b1.m3u8" },
    { name: "beIN Sport 2", url: "https://wo.cma.footballii.ir/hls2/b2_src.m3u8" },
    { name: "beIN Sport 3", url: "https://wo.cma.footballii.ir/hls2/b3_src.m3u8" },
    { name: "beIN Sport 4", url: "" },
    { name: "beIN Sport 5", url: "" },
    { name: "beIN Sport 6", url: "" }
  ],
  "سيرفر إحتياطي": [
    { name: "beIN Sport 1", url: "https://tv.sainaertebat.com/hls2/bein1.m3u8" },
    { name: "beIN Sport 2", url: "" },
    { name: "beIN Sport 3", url: "" },
    { name: "4", url: "" }, 
    { name: "5", url: "" }, 
    { name: "6", url: "" },
    { name: "7", url: "" }, 
    { name: "8", url: "" }, 
    { name: "9", url: "" }, 
    { name: "Xtra 1", url: "" },
    { name: "Xtra 2", url: "" }, 
    { name: "Xtra 3", url: "" }, 
    { name: "Xtra 4", url: "" }, 
    { name: "Xtra 5", url: "" }, 
    { name: "Xtra 6", url: "" }, 
    { name: "Xtra 7", url: "" }, 
    { name: "Xtra 8", url: "" }, 
    { name: "Xtra 9", url: "" } 
  ],
  "أبو ظبي الرياضية - AD SPORTS": [
    { name: "AD SPORTS 1", url: "" },
    { name: "AD SPORTS 2", url: "" },
    { name: "AD SPORTS PREMIUM 1", url: "" },
    { name: "PREMIUM 2", url: "" }
  ],
  "الرياضات العربية - Arab Sports": [
    { "name": "العراقية الرياضية", "url": "https://stream.veo.buzz:6050/sport/ch13/adaptive.m3u8" },
    { "name": "عمان الرياضية", "url": "https://partneta.cdn.mgmlcdn.com/omsport/smil:omsport.stream.smil/chunklist.m3u8" },
    { "name": "الكويت الرياضية 1", "url": "https://kwtspta.cdn.mangomolo.com/sp/smil:sp.stream.smil/chunklist.m3u8" },
    { "name": "الكويت الرياضية 2", "url": "https://kwtsplta.cdn.mangomolo.com/spl/smil:spl.stream.smil/chunklist.m3u8" },
    { "name": "دبي الرياضية 1", "url": "https://dmidspta.cdn.mgmlcdn.com/dubaisports/smil:dubaisports.stream.smil/chunklist.m3u8" },
    { "name": "دبي الرياضية 2", "url": "https://dmitwlvvll.cdn.mgmlcdn.com/dubaisportshd/smil:dubaisportshd.smil/chunklist.m3u8" },
    { "name": "دبي الرياضية 3", "url": "https://dmitwlvvll.cdn.mgmlcdn.com/dubaisportshd5/smil:dubaisportshd5.smil/chunklist.m3u8" },
    { "name": "الشارقة الرياضية", "url": "https://svs.itworkscdn.net/smc4sportslive/smc4.smil/playlist.m3u8" },
    { "name": "ياس الرياضية", "url": "" },
    { "name": "البحرين الرياضية 1", "url": "https://5c7b683162943.streamlock.net/live/ngrp:sportsone_all/playlist.m3u8" },
    { "name": "البحرين الرياضية 2", "url": "https://5c7b683162943.streamlock.net/live/ngrp:bahrainsportstwo_all/playlist.m3u8" },
    { "name": "Arryadia", "url": "https://cdn.live.easybroadcast.io/abr_corp/73_arryadia_k2tgcj0/playlist_dvr.m3u8" },
  ],
};

function renderChannels() {
  const container = document.getElementById('channelsContainer');
  container.innerHTML = '';
  
  for (const [groupName, channelList] of Object.entries(channels)) {
    const validChannels = channelList.filter(channel => channel.url && channel.url.trim() !== '');
    
    if (validChannels.length === 0) continue;
    
    const groupDiv = document.createElement('div');
    groupDiv.className = 'channel-group';
    
    const title = document.createElement('h3');
    title.textContent = groupName;
    groupDiv.appendChild(title);
    
    const rowDiv = document.createElement('div');
    rowDiv.className = 'channels-row';
    
    validChannels.forEach(channel => {
      const btn = document.createElement('button');
      btn.className = 'channel-btn';
      btn.textContent = channel.name;
      btn.onclick = () => playChannel(channel.url);
      rowDiv.appendChild(btn);
    });
    
    groupDiv.appendChild(rowDiv);
    container.appendChild(groupDiv);
  }
}
