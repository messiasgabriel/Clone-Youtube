const API_KEY = "AIzaSyBWcY-Ki7ACo9W6t-z0fwa9RatDfMxyQGA";
const ENDPOINT = "https://www.googleapis.com/youtube/v3/search";
const CHANNEL = "GET https://www.googleapis.com/youtube/v3/channels";
const SEARCH_BUTTON = document.querySelector(".btnSearch");
const SEARCH_INPUT = document.querySelector(".inputSearch");

export default function initSearch() {
  // ATIVA TODA A FUNÇÃO COM CLICK NO BOTAO
  SEARCH_BUTTON.addEventListener("click", searchVideos);

  // OBTEM OS VIDEOS
  async function searchVideos() {
    const searchTerm = SEARCH_INPUT.value;
    const params = {
      part: "snippet",
      q: searchTerm,
      type: "video",
      key: API_KEY,
    };
    const url = new URL(ENDPOINT);
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
    try {
      const response = await fetch(url);
      const data = await response.json();
      displayResults(data.items);
    } catch (error) {
      console.error(error);
    }
  }
  // COLOCA NA TELA OS RESULTADOS
  function displayResults(items) {
    console.log(items);
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
}
