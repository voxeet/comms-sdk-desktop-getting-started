const previewVideo = document.getElementById('preview-video');
const backgroundBlurPreviewBtn = document.getElementById('background-blur-preview-btn');
const backgroundImagePreviewBtn = document.getElementById('background-image-preview-btn');
const stopVideoFilterPreviewBtn = document.getElementById('stop-video-filter-preview-btn');
const backgroundImagePreviewInput = document.getElementById('background-image-preview-input');
const videoDenoisePreviewChk = document.getElementById('video-denoise-preview-chk');

const initUI = () => {
  const nameMessage = document.getElementById('name-message');
  const joinButton = document.getElementById('join-btn');
  const conferenceAliasInput = document.getElementById('alias-input');
  const leaveButton = document.getElementById('leave-btn');
  const startVideoBtn = document.getElementById('start-video-btn');
  const stopVideoBtn = document.getElementById('stop-video-btn');
  const startAudioBtn = document.getElementById('start-audio-btn');
  const stopAudioBtn = document.getElementById('stop-audio-btn');
  const startScreenShareBtn = document.getElementById('start-screenshare-btn');
  const stopScreenShareBtn = document.getElementById('stop-screenshare-btn');
  const backgroundBlurBtn = document.getElementById('background-blur-btn');
  const backgroundImageBtn = document.getElementById('background-image-btn');
  const stopVideoFilterBtn = document.getElementById('stop-video-filter-btn');
  const backgroundImageInput = document.getElementById('background-image-input');
  const videoDenoiseChk = document.getElementById('video-denoise-chk');
  const startRecordingBtn = document.getElementById('start-recording-btn');
  const stopRecordingBtn = document.getElementById('stop-recording-btn');

  // Video filter cache
  let videoFilterMode = 'none';

  // Update the login message with the name of the user
  nameMessage.innerHTML = `You are logged in as ${randomName}`;
  joinButton.disabled = false;

  // Init preview video and buttons
  initPreview();

  backgroundBlurPreviewBtn.onclick = () => {
    // Start the Background Blur on the preview video
    videoFilterMode = 'bokeh';
    setVideoFilterInPreview(videoFilterMode)
      .then(() => {
        backgroundBlurPreviewBtn.disabled = true;
        stopVideoFilterPreviewBtn.disabled = false;
        backgroundImagePreviewBtn.disabled = backgroundImagePreviewInput.files.length === 0;
      });
  }

  stopVideoFilterPreviewBtn.onclick = () => {
    // Stop background effects on the preview video
    videoFilterMode = 'none';
    setVideoFilterInPreview(videoFilterMode)
      .then(() => {
        backgroundBlurPreviewBtn.disabled = false;
        stopVideoFilterPreviewBtn.disabled = true;
        backgroundImagePreviewBtn.disabled = backgroundImagePreviewInput.files.length === 0;
      });
  }

  backgroundImagePreviewBtn.onclick = () => {
    // Start the Background Image on the preview video
    videoFilterMode = 'staticimage';
    setVideoFilterInPreview(videoFilterMode)
      .then(() => {
        backgroundBlurPreviewBtn.disabled = false;
        stopVideoFilterPreviewBtn.disabled = false;
        backgroundImagePreviewBtn.disabled = true;
      });
  }

  backgroundImagePreviewInput.onchange = () => {
    backgroundImagePreviewBtn.disabled = backgroundImagePreviewInput.files.length === 0;
  }

  videoDenoisePreviewChk.onclick = () => {
    // Enable/disabled video noise reduction on the preview video
    setVideoFilterInPreview(videoFilterMode);
  }

  joinButton.onclick = () => {
    // Default conference parameters
    // See: https://docs.dolby.io/interactivity/docs/js-client-sdk-model-conferenceparameters
    let conferenceParams = {
      liveRecording: false,
      rtcpMode: "average", // worst, average, max
      ttl: 0,
      videoCodec: "H264", // H264, VP8
      dolbyVoice: true
    };

    // See: https://docs.dolby.io/interactivity/docs/js-client-sdk-model-conferenceoptions
    let conferenceOptions = {
      alias: conferenceAliasInput.value,
      params: conferenceParams
    };

    // 1. Create a conference room with an alias
    VoxeetSDK.conference.create(conferenceOptions)
      .then((conference) => {
        // See: https://docs.dolby.io/interactivity/docs/js-client-sdk-model-joinoptions

        // Create video filter options which will be applied just after join
        const videoFilterOptions = {
          imageFile: backgroundImagePreviewInput.files.length ? backgroundImagePreviewInput.files[0] : undefined,
          videoDenoise: videoDenoisePreviewChk.checked
        }

        const joinOptions = {
          constraints: {
            audio: true,
            video: false
          },
          simulcast: false,
          videoFilter: videoFilterMode,
          videoFilterOptions: videoFilterOptions
        };

        // 2. Join the conference
        VoxeetSDK.conference.join(conference, joinOptions)
          .then((conf) => {
            previewVideo.srcObject = null;
            backgroundBlurPreviewBtn.disabled = true;
            stopVideoFilterPreviewBtn.disabled = true;
            backgroundImagePreviewBtn.disabled = true;
            backgroundImagePreviewInput.disabled = true;
            videoDenoisePreviewChk.disabled = true;
            conferenceAliasInput.disabled = true;
            joinButton.disabled = true;
            leaveButton.disabled = false;
            startVideoBtn.disabled = false;
            startAudioBtn.disabled = true;
            stopAudioBtn.disabled = false;
            startScreenShareBtn.disabled = false;
            startRecordingBtn.disabled = false;

            backgroundImageInput.files = backgroundImagePreviewInput.files;
            videoDenoiseChk.checked = videoDenoisePreviewChk.checked;
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  leaveButton.onclick = () => {
    // Leave the conference
    VoxeetSDK.conference.leave()
      .then(() => {
        // Init preview and back to default filter mode
        initPreview();
        videoFilterMode = 'none';

        conferenceAliasInput.disabled = false;
        joinButton.disabled = false;
        leaveButton.disabled = true;
        startVideoBtn.disabled = true;
        stopVideoBtn.disabled = true;
        startAudioBtn.disabled = true;
        stopAudioBtn.disabled = true;
        startScreenShareBtn.disabled = true;
        stopScreenShareBtn.disabled = true;
        startRecordingBtn.disabled = true;
        stopRecordingBtn.disabled = true;
        backgroundBlurBtn.disabled = true;
        stopVideoFilterBtn.disabled = true;
        backgroundImageBtn.disabled = true;
        backgroundImageInput.disabled = true;
        videoDenoiseChk.disabled = true;
      })
      .catch((err) => console.error(err));
  };

  startVideoBtn.onclick = () => {
    // Start sharing the video with the other participants
    VoxeetSDK.conference.startVideo(VoxeetSDK.session.participant)
      .then(() => {
        startVideoBtn.disabled = true;
        stopVideoBtn.disabled = false;
        backgroundBlurBtn.disabled = videoFilterMode === 'bokeh';
        stopVideoFilterBtn.disabled = videoFilterMode === 'none';
        backgroundImageBtn.disabled = videoFilterMode === 'staticimage' || backgroundImageInput.files.length === 0;
        backgroundImageInput.disabled = false
        videoDenoiseChk.disabled = false;
      })
      .catch((err) => console.error(err));
  };

  stopVideoBtn.onclick = () => {
    // Stop sharing the video with the other participants
    VoxeetSDK.conference.stopVideo(VoxeetSDK.session.participant)
      .then(() => {
        stopVideoBtn.disabled = true;
        startVideoBtn.disabled = false;
        backgroundBlurBtn.disabled = true;
        stopVideoFilterBtn.disabled = true;
        backgroundImageBtn.disabled = true;
        backgroundImageInput.disabled = true;
        videoDenoiseChk.disabled = true;
      })
      .catch((err) => console.error(err));
  };

  startAudioBtn.onclick = () => {
    // Start sharing the Audio with the other participants
    VoxeetSDK.conference.startAudio(VoxeetSDK.session.participant)
      .then(() => {
        startAudioBtn.disabled = true;
        stopAudioBtn.disabled = false;
      })
      .catch((err) => console.error(err));
  };

  stopAudioBtn.onclick = () => {
    // Stop sharing the Audio with the other participants
    VoxeetSDK.conference.stopAudio(VoxeetSDK.session.participant)
      .then(() => {
        stopAudioBtn.disabled = true;
        startAudioBtn.disabled = false;
      })
      .catch((err) => console.error(err));
  };

  startScreenShareBtn.onclick = () => {
    // Start the Screen Sharing with the other participants
    VoxeetSDK.conference.startScreenShare()
      .then(() => {
        startScreenShareBtn.disabled = true;
        stopScreenShareBtn.disabled = false;
      })
      .catch((err) => console.error(err));
  };

  stopScreenShareBtn.onclick = () => {
    // Stop the Screen Sharing
    VoxeetSDK.conference.stopScreenShare()
      .catch((err) => console.error(err));
  };


  backgroundBlurBtn.onclick = () => {
    // Start the Background Blur on the local video
    videoFilterMode = 'bokeh';
    setVideoFilterInConference(videoFilterMode)
      .then(() => {
        backgroundBlurBtn.disabled = true;
        stopVideoFilterBtn.disabled = false;
        backgroundImageBtn.disabled = backgroundImageInput.files.length === 0;;
      })
      .catch((err) => console.error(err));
  };

  stopVideoFilterBtn.onclick = () => {
    // Stop the video filter applied on the local video
    videoFilterMode = 'none';
    setVideoFilterInConference(videoFilterMode)
      .then(() => {
        backgroundBlurBtn.disabled = false;
        stopVideoFilterBtn.disabled = true;
        backgroundImageBtn.disabled = backgroundImageInput.files.length === 0;
      })
      .catch((err) => console.error(err));
  };

  backgroundImageBtn.onclick = () => {
    // Start the Background Image on the local video
    videoFilterMode = 'staticimage';
    setVideoFilterInConference(videoFilterMode)
      .then(() => {
        backgroundBlurBtn.disabled = false;
        stopVideoFilterBtn.disabled = false;
        backgroundImageBtn.disabled = true;
      });
  }

  backgroundImageInput.onchange = () => {
    backgroundImageBtn.disabled = backgroundImageInput.files.length === 0;
  }

  videoDenoiseChk.onclick = () => {
    // Enable/disabled video noise reduction on the local video
    setVideoFilterInConference(videoFilterMode);
  }

  startRecordingBtn.onclick = () => {
    let recordStatus = document.getElementById('record-status');
    
    // Start recording the conference
    VoxeetSDK.recording.start()
      .then(() => {
        recordStatus.innerText = 'Recording...';
        startRecordingBtn.disabled = true;
        stopRecordingBtn.disabled = false;
      })
      .catch((err) => console.error(err));
  };

  stopRecordingBtn.onclick = () => {
    let recordStatus = document.getElementById('record-status');

    // Stop recording the conference
    VoxeetSDK.recording.stop()
      .then(() => {
        recordStatus.innerText = '';
        startRecordingBtn.disabled = false;
        stopRecordingBtn.disabled = true;
      })
      .catch((err) => console.error(err));
  };
};

// Add a video stream to the web page
const addVideoNode = (participant, stream) => {
  let videoNode = document.getElementById('video-' + participant.id);

  if (!videoNode) {
    videoNode = document.createElement('video');

    videoNode.setAttribute('id', 'video-' + participant.id);
    videoNode.setAttribute('height', 240);
    videoNode.setAttribute('width', 320);
    videoNode.setAttribute("playsinline", true);
    videoNode.muted = true;
    videoNode.setAttribute("autoplay", 'autoplay');
    videoNode.style = 'background: gray;';

    const videoContainer = document.getElementById('video-container');
    videoContainer.appendChild(videoNode);
  }

  navigator.attachMediaStream(videoNode, stream);
};

// Remove the video streem from the web page
const removeVideoNode = (participant) => {
  let videoNode = document.getElementById('video-' + participant.id);

  if (videoNode) {
    videoNode.srcObject = null; // Prevent memory leak in Chrome
    videoNode.parentNode.removeChild(videoNode);
  }
};

// Add a new participant to the list
const addParticipantNode = (participant) => {
  // If the participant is the current session user, don't add them to the list
  if (participant.id === VoxeetSDK.session.participant.id) return;

  let participantNode = document.createElement('li');
  participantNode.setAttribute('id', 'participant-' + participant.id);
  participantNode.innerText = `${participant.info.name}`;

  const participantsList = document.getElementById('participants-list');
  participantsList.appendChild(participantNode);
};

// Remove a participant from the list
const removeParticipantNode = (participant) => {
  let participantNode = document.getElementById('participant-' + participant.id);

  if (participantNode) {
    participantNode.parentNode.removeChild(participantNode);
  }
};

// Add a screen share stream to the web page
const addScreenShareNode = (stream) => {
  let screenShareNode = document.getElementById('screenshare');

  if (screenShareNode) {
    return alert('There is already a participant sharing a screen!');
  }

  screenShareNode = document.createElement('video');
  screenShareNode.setAttribute('id', 'screenshare');
  screenShareNode.autoplay = 'autoplay';
  navigator.attachMediaStream(screenShareNode, stream);

  const screenShareContainer = document.getElementById('screenshare-container');
  screenShareContainer.appendChild(screenShareNode);
}

// Remove the screen share stream from the web page
const removeScreenShareNode = () => {
  let screenShareNode = document.getElementById('screenshare');

  if (screenShareNode) {
    screenShareNode.srcObject = null; // Prevent memory leak in Chrome
    screenShareNode.parentNode.removeChild(screenShareNode);
  }
  
  const startScreenShareBtn = document.getElementById('start-screenshare-btn');
  startScreenShareBtn.disabled = false;
  
  const stopScreenShareBtn = document.getElementById('stop-screenshare-btn');
  stopScreenShareBtn.disabled = true;
}

const setVideoFilterInPreview = (mode) => {
  // Set |stream| field to apply a filter on this stream
  const videoFilterOptions = {
    stream: previewVideo.srcObject,
    imageFile: backgroundImagePreviewInput.files.length ? backgroundImagePreviewInput.files[0] : undefined,
    videoDenoise: videoDenoisePreviewChk.checked
  }

  // Set video filter on specific |stream|
  return VoxeetSDK.videoFilters.setFilter(mode, videoFilterOptions)
    .catch((err) => console.error(err));
}

const setVideoFilterInConference = (mode) => {
  const videoFilterOptions = {
    imageFile: backgroundImageInput.files.length ? backgroundImageInput.files[0] : undefined,
    videoDenoise: videoDenoiseChk.checked
  }

  // Set video filter on a local stream
  return VoxeetSDK.videoFilters.setFilter(mode, videoFilterOptions)
    .catch((err) => console.error(err));
}

const initPreview = () => {
  return navigator.mediaDevices.getUserMedia({video: {width: 320, height: 240}})
    .then((stream) => {
      previewVideo.srcObject = stream;
      backgroundBlurPreviewBtn.disabled = false;
      backgroundImagePreviewInput.disabled = false;
      backgroundImagePreviewBtn.disabled = backgroundImagePreviewInput.files.length === 0;
      stopVideoFilterPreviewBtn.disabled = true;
      videoDenoisePreviewChk.disabled = false;
    })
    .catch((err) => console.error(err));
}