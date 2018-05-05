module.exports = {
  '/api': {
    target: process.env.API_GATEWAY,
    changeOrigin: true,
    logLevel: 'debug'
  },
  '/admin': {
    target: process.env.DJANGO_ADMIN_GATEWAY,
    changeOrigin: true,
    logLevel: 'debug'
  },
  '/static': {
    target: process.env.STATIC_GATEWAY,
    changeOrigin: true,
    logLevel: 'debug'
  },
  '/media': {
    target: process.env.MEDIA_GATEWAY,
    changeOrigin: true,
    logLevel: 'debug'
  }
}
