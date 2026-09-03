/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pjbmrocrfbzfvivasoxw.supabase.co",
        pathname: "/storage/v1/object/public/product-images/**",
      },
    ],
  },
}

export default nextConfig
