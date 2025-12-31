"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import type { Artwork } from "@/types/artwork"

interface ArtworkCardProps {
  artwork: Artwork
  isActive: boolean
  dragOffset: number
  index: number
  currentIndex: number
}

export function ArtworkCard({ artwork, isActive, dragOffset, index, currentIndex }: ArtworkCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)
  const distance = index - currentIndex
  const parallaxOffset = dragOffset * (0.1 * (distance + 1))

  // Load image when card is within 2 slides of current
  useEffect(() => {
    if (Math.abs(distance) <= 2) {
      setShouldLoad(true)
    }
  }, [distance])

  return (
    <motion.div
      className="relative flex-shrink-0"
      animate={{
        scale: isActive ? 1 : 0.85,
        opacity: isActive ? 1 : 0.5,
        rotateY: distance * 5,
      }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      style={{
        x: parallaxOffset,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="group relative overflow-hidden rounded-2xl"
        animate={{
          y: isHovered && isActive ? -10 : 0,
          boxShadow: isHovered && isActive ? "0 40px 80px -20px rgba(0,0,0,0.8)" : "0 20px 40px -10px rgba(0,0,0,0.5)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Glassmorphism frame */}
        <div className="absolute inset-0 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm" />

        {/* Image container */}
        <div className="relative h-[400px] w-[400px] overflow-hidden rounded-2xl p-3 md:h-[500px] md:w-[500px]">
          {/* Loading placeholder */}
          {!imageLoaded && shouldLoad && (
            <div className="absolute inset-3 rounded-xl bg-gray-800 animate-pulse" />
          )}
          
          {/* Error placeholder */}
          {imageError && (
            <div className="absolute inset-3 rounded-xl bg-gray-800 flex items-center justify-center">
              <span className="text-gray-400 text-sm">Failed to load</span>
            </div>
          )}
          
          {/* Actual image */}
          {shouldLoad && !imageError && (
            <motion.img
              src={artwork.image}
              alt={artwork.title}
              className={`h-full w-full rounded-xl object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              animate={{
                scale: isHovered && isActive ? 1.05 : 1,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              crossOrigin="anonymous"
              draggable={false}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              loading="lazy"
            />
          )}

          {/* Gradient overlay for text */}
          <motion.div
            className="absolute inset-x-3 bottom-3 rounded-b-xl bg-gradient-to-t from-black/80 via-black/40 to-transparent"
            initial={{ opacity: 0, height: "30%" }}
            animate={{
              opacity: isActive ? 1 : 0,
              height: isHovered ? "50%" : "30%",
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Artwork info */}
          <motion.div
            className="absolute inset-x-3 bottom-3 select-none p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 20,
            }}
            transition={{ duration: 0.4, delay: isActive ? 0.1 : 0 }}
          >
          </motion.div>
        </div>
      </motion.div>

      {/* Reflection effect */}
      <motion.div
        className="absolute -bottom-20 left-3 right-3 h-20 overflow-hidden rounded-2xl opacity-20 blur-sm"
        style={{
          background: `linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)`,
          transform: "scaleY(-1)",
        }}
        animate={{ opacity: isActive ? 0.15 : 0.05 }}
      />
    </motion.div>
  )
}
