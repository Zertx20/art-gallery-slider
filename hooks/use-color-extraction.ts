"use client"

import { useState, useEffect } from "react"
import { extractColors } from "@/lib/color-extractor"
import { DEFAULT_COLORS } from "@/lib/constants"
import type { Artwork } from "@/types/artwork"

export function useColorExtraction(artworks: Artwork[]): Record<number, string[]> {
  const [colors, setColors] = useState<Record<number, string[]>>({})
  const [extractedImages, setExtractedImages] = useState<Set<string>>(new Set())

  useEffect(() => {
    artworks.forEach((artwork) => {
      // Only extract colors if not already done and image is different
      if (!colors[artwork.id] && !extractedImages.has(artwork.image)) {
        setExtractedImages(prev => new Set(prev).add(artwork.image))
        
        // Use requestIdleCallback for non-blocking extraction
        const extractColorsIdle = () => {
          extractColors(artwork.image).then((extractedColors) => {
            setColors((prev) => ({ ...prev, [artwork.id]: extractedColors }))
          }).catch(() => {
            // Silently fail and use default colors
          })
        }
        
        if ('requestIdleCallback' in window) {
          requestIdleCallback(extractColorsIdle)
        } else {
          setTimeout(extractColorsIdle, 0)
        }
      }
    })
  }, [artworks, colors, extractedImages])

  return colors
}

export function useCurrentColors(colors: Record<number, string[]>, artworkId: number | undefined): string[] {
  return colors[artworkId ?? -1] || [...DEFAULT_COLORS]
}
