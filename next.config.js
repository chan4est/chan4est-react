module.exports = {
  async redirects() {
    return [
      {
        source: '/resume',
        destination: '/Chandler-Forrest-Software-Engineer-Resume.pdf',
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