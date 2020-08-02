import moment from 'moment';

export const timeSincePostCreation = (timestamp) => {
  const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return moment(new Date(timestamp)).format('MMM Do YYYY');
  }

  interval = Math.floor(seconds / 604800);
  if (interval >= 1) {
    return moment(new Date(timestamp)).format('MMM Do');
  }

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + ' days ago';
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + ' hours ago';
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + ' minutes ago';
  }

  return Math.floor(seconds) + ' seconds ago';
};

export const timeSinceCommentCreation = (timestamp) => {
  const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
  let interval = Math.floor(seconds / 604800);
  if (interval >= 1) {
    return interval + 'w';
  }

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + 'd';
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + 'h';
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + 'm';
  }

  return Math.floor(seconds) + 's';
};
