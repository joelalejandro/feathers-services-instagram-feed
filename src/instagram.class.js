/* eslint-disable no-unused-vars */
const request = require('request-promise');

class Service {
  constructor (options) {
    this.options = options || {};
    this.lastUpdated = 0;

    if (!this.options.username) {
      throw new Error('[InstagramService]: missing `username` option; please set it in your configuration file under the `instagramUsername` key or in the `username` parameter of the service\'s constructor.');
    }
  }

  find (params) {
    const service = this;
    return request({
      url: `https://www.instagram.com/${this.options.username}/media/`,
      json: true
    }).then(function instagramMedia(media) {
      if (Date.now() - service.lastUpdated >= 90000) {
        const filteredMedia = media.items.map(function(photo) {
          const item = {
            mediaType: photo.type,
            permalink: photo.link,
            caption: photo.caption.text,
            createdAt: new Date(photo.created_time * 1000),
            hashtags: photo.caption.text.match(/#\w+/g),
            likeCount: photo.likes.count,
            thumbnail: photo[`${photo.type}s`].thumbnail ? photo[`${photo.type}s`].thumbnail.url : null,
            lowResolution: photo[`${photo.type}s`].low_resolution.url,
            standardResolution: photo[`${photo.type}s`].standard_resolution.url,
            playCount: null
          };
          if (item.type === 'video') {
            item.thumbnail = photo.images.thumbnail.url;
            item.playCount = photo.video_views;
          }
          return item;
        });
        service.mediaCache = filteredMedia;
        service.lastUpdated = Date.now();
      }

      return Promise.resolve(service.mediaCache);
    });
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
