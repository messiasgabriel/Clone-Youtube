const apiKey = "AIzaSyBtjI7ziwDmPHBdbp_ZdHjace4bi2OUqG8";
const endpoint = "https://www.googleapis.com/youtube/v3/search";
const inputSearch = document.querySelector(".inputSearch");
const btnSearch = document.querySelector(".btnSearch");
const params = {
  part: "snippet",
  q: "Queen",
  type: "video",
  key: apiKey,
};

// PROCURA OS VIDEOS

// OBTEM OS VIDEOS
async function getVideos() {
  const url = new URL(endpoint);
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );
  try {
    const response = await fetch(url);
    const data = await response.json();
    renderResults(data.items);
  } catch (error) {
    console.error(error);
  }
}

// COLOCA NA TELA OS RESULTADOS
function renderResults(items) {
  const youtubeResults = document.getElementById("youtube-results");
  youtubeResults.innerHTML = ``;
  items.forEach((item) => {
    const {
      id: { videoId },
      snippet: {
        title: videoTitle,
        channelTitle,
        description: videoDescription,
        thumbnails: {
          high: { url: thumbnailHigh },
          default: { url: thumbnailDefault },
        },
        publishedAt: videoDate,
      },
    } = item;

    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const videoDateTime = new Date(videoDate);
    const formattedDate = `${videoDateTime.getDate()}/${
      videoDateTime.getMonth() + 1
    }/${videoDateTime.getFullYear()}`;
    const today = new Date();
    const formattedToday = `${today.getDate()}/${
      today.getMonth() + 1
    }/${today.getFullYear()}`;
    const differenceYears = today.getFullYear() - videoDateTime.getFullYear();
    const html = `
      <div class="video">
          <div class="video-thumbnail">
            <a href="${videoUrl}" target="_blank">
            <img src="${thumbnailHigh}">
          </div>
          <div class="video-details">
            <div class="title">
              <h3>${videoTitle}</h3>
              <a class="channel">
                <div class="author">
                  <img src="${thumbnailDefault}">
                </div>${channelTitle}
              </a>
              <span>${differenceYears} years ago</span>
              <p>${videoDescription}</p>
            </div>
          </div>
        </div>
    `;
    youtubeResults.innerHTML += html;
  });
}
getVideos();
