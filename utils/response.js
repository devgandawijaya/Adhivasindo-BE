const responseUtil = {
  success: (code, message, data = null) => {
    const date = new Date().toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).replace(/ /g, '-');
    return {
      code,
      version: "0.0.1",
      message,
      data,
      date
    };
  },
  error: (code, message, data = null) => {
    const date = new Date().toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).replace(/ /g, '-');
    return {
      code,
      version: "0.0.1",
      message,
      data,
      date
    };
  }
};

module.exports = responseUtil;
