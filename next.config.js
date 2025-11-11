module.exports = {
  async redirects() {
    return [
      {
        source: '/resume',
        destination: '/Chandler-Forrest-Resume.pdf',
        permanent: false,
      },
      {
        source: '/map',
        destination: '/map.png',
        permanent: false,
      },
    ];
  },
};