import { useEffect, useRef, useState } from 'react'
import interact from 'interactjs'
import { useTranslations } from '../i18n/LanguageContext'
import Globe, { type GlobeMethods } from 'react-globe.gl'
import './Photography.css'


const translations = {
  en: {
    title: 'Photography',
    subtitle: 'Travel Collection',
    openPhoto: 'Open photo',
    lightbox: 'Enlarged photo view',
    closePhoto: 'Close enlarged photo',
    chongqing: 'Chongqing',
    viewChongqingPhotos: 'View {count} photos from Chongqing',
    allPhotos: 'All photos',
    photoCount: '{count} photos',
  },
  zh: {
    title: '摄影',
    subtitle: '旅行合集',
    openPhoto: '打开照片',
    lightbox: '放大的照片视图',
    closePhoto: '关闭放大照片',
    chongqing: '重庆市',
    viewChongqingPhotos: '查看重庆市的 {count} 张照片',
    allPhotos: '全部照片',
    photoCount: '{count} 张照片',
  },
}

const thumbModules = import.meta.glob(
  [
    '../images/travel/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}',
    '../images/**/*重庆*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}',
  ],
  {
    eager: true,
    query: { w: '900', format: 'webp', quality: '75' },
    import: 'default',
  },
) as Record<string, string>

const fullModules = import.meta.glob(
  [
    '../images/travel/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}',
    '../images/**/*重庆*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}',
  ],
  {
    eager: true,
    query: { w: '1920', format: 'webp', quality: '85' },
    import: 'default',
  },
) as Record<string, string>

function shuffleArray<T>(array: T[]) {
  const result = [...array]

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

const initialTravelImages = shuffleArray(
  Object.keys(thumbModules).map((path) => ({
    id: path,
    thumbSrc: thumbModules[path],
    fullSrc: fullModules[path],
    alt: `${path.split('/').pop()?.replace(/\.[^.]+$/, '') || 'travel'} photo`,
    locationId: path.split('/').pop()?.includes('重庆') ? 'chongqing' : null,
  })),
)

const chongqingImages = initialTravelImages.filter((image) => image.locationId === 'chongqing')
const chongqingLocation = { lat: 29.563, lng: 106.5516 }
const travelLocations = chongqingImages.length ? [chongqingLocation] : []

function TravelGlobe({ onSelectChongqing }: { onSelectChongqing: () => void }) {
  const t = useTranslations(translations)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const globeRef = useRef<GlobeMethods | undefined>(undefined)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return
    }

    const { width, height } = container.getBoundingClientRect()
    setSize({ width, height })

    const observer = new ResizeObserver((entry) => {
      const { width, height } = entry[0].contentRect
      setSize({ width, height })
    })
    observer.observe(container)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="travel-globe"
      style={{
        width: '100%',
        height: 'min(640px, 65svh, calc(100vw - 2rem))',
        position: 'relative',
      }}
    >
      {size.width > 0 && (
        <Globe
          ref={globeRef}
          width={size.width}
          height={size.height}
          globeTileEngineUrl={(column: number, row: number, zoom: number) =>
            `https://tile.openstreetmap.org/${zoom}/${column}/${row}.png`
          }
          backgroundColor="rgba(0, 0, 0, 0)"
          htmlElementsData={travelLocations}
          htmlAltitude={0.01}
          htmlTransitionDuration={0}
          htmlElement={() => {
            const marker = document.createElement('div')
            marker.className = 'travel-photo-marker'

            const button = document.createElement('button')
            button.type = 'button'
            button.className = 'travel-photo-marker-button'
            button.setAttribute('aria-label', t.viewChongqingPhotos.replace('{count}', String(chongqingImages.length)))
            button.title = t.chongqing
            button.onclick = (event) => {
              event.stopPropagation()
              onSelectChongqing()
            }

            const thumbnail = document.createElement('img')
            thumbnail.src = chongqingImages[0].thumbSrc
            thumbnail.alt = ''
            thumbnail.draggable = false

            const count = document.createElement('span')
            count.className = 'travel-photo-marker-count'
            count.textContent = String(chongqingImages.length)

            const label = document.createElement('span')
            label.className = 'travel-photo-marker-label'
            label.textContent = t.chongqing

            button.append(thumbnail, count, label)
            marker.append(button)
            return marker
          }}
          onGlobeReady={() => {
            if (travelLocations.length) {
              globeRef.current?.pointOfView({ ...chongqingLocation, altitude: 1.8 })
            }
          }}
        />
      )}
    </div>
  )
}



const Photography = () => {
  const t = useTranslations(translations)
  const [images, setImages] = useState(initialTravelImages)
  const [chongqingOnly, setChongqingOnly] = useState(false)
  const [selectedImage, setSelectedImage] = useState<(typeof initialTravelImages)[number] | null>(null)
  const [imageRowSpans, setImageRowSpans] = useState<Record<string, number>>({})
  const galleryRef = useRef<HTMLDivElement | null>(null)
  const suppressClickIdsRef = useRef<Set<string>>(new Set())
  const visibleImages = chongqingOnly
    ? images.filter((image) => image.locationId === 'chongqing')
    : images

  useEffect(() => {
    if (!selectedImage) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedImage(null)
      }
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedImage])

  useEffect(() => {
    if (!galleryRef.current) {
      return
    }

    const isMobile = 
      window.matchMedia('(pointer: coarse) || (max-width: 768px)').matches
      if (isMobile) {
        return
      }

    const interactable = interact('.draggable-photo').draggable({
      listeners: {
        start(event) {
          const target = event.target as HTMLElement
          target.classList.add('is-dragging')
          target.dataset.x = '0'
          target.dataset.y = '0'
          target.dataset.dragMoved = 'false'
        },
        move(event) {
          const target = event.target as HTMLElement
          const x = (parseFloat(target.dataset.x || '0') || 0) + event.dx
          const y = (parseFloat(target.dataset.y || '0') || 0) + event.dy

          if (Math.abs(x) > 4 || Math.abs(y) > 4) {
            target.dataset.dragMoved = 'true'
          }

          target.style.transform = `translate(${x}px, ${y}px)`
          target.dataset.x = String(x)
          target.dataset.y = String(y)
        },
        end(event) {
          const target = event.target as HTMLElement
          const gallery = galleryRef.current
          const draggedId = target.dataset.photoId
          const didDrag = target.dataset.dragMoved === 'true'

          if (didDrag && draggedId) {
            suppressClickIdsRef.current.add(draggedId)
          }

          if (gallery && draggedId && didDrag) {
            const draggedRect = target.getBoundingClientRect()
            const draggedCenter = {
              x: draggedRect.left + draggedRect.width / 2,
              y: draggedRect.top + draggedRect.height / 2,
            }

            const otherCards = Array.from(gallery.querySelectorAll<HTMLElement>('.draggable-photo')).filter(
              (card) => card !== target && card.dataset.photoId,
            )

            let nearestCard: HTMLElement | null = null
            let nearestDistance = Infinity

            for (const card of otherCards) {
              const rect = card.getBoundingClientRect()
              const center = {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
              }
              const distance = Math.hypot(center.x - draggedCenter.x, center.y - draggedCenter.y)

              if (distance < nearestDistance) {
                nearestDistance = distance
                nearestCard = card
              }
            }

            if (nearestCard?.dataset.photoId) {
              const targetId = nearestCard.dataset.photoId
              const targetRect = nearestCard.getBoundingClientRect()
              const targetCenter = {
                x: targetRect.left + targetRect.width / 2,
                y: targetRect.top + targetRect.height / 2,
              }
              const sameRow = Math.abs(draggedCenter.y - targetCenter.y) < targetRect.height / 2
              const insertAfter =
                draggedCenter.y > targetCenter.y || (sameRow && draggedCenter.x > targetCenter.x)

              setImages((prevImages) => {
                const nextImages = [...prevImages]
                const draggedIndex = nextImages.findIndex((image) => image.id === draggedId)

                if (draggedIndex === -1) {
                  return prevImages
                }

                const [draggedImage] = nextImages.splice(draggedIndex, 1)
                const targetIndex = nextImages.findIndex((image) => image.id === targetId)

                if (targetIndex === -1) {
                  nextImages.splice(draggedIndex, 0, draggedImage)
                  return nextImages
                }

                const insertIndex = insertAfter ? targetIndex + 1 : targetIndex
                nextImages.splice(insertIndex, 0, draggedImage)
                return nextImages
              })
            }
          }

          target.classList.remove('is-dragging')
          target.style.transform = ''
          target.dataset.x = '0'
          target.dataset.y = '0'
          target.dataset.dragMoved = 'false'
        },
      },
    })

    return () => {
      interactable.unset()
    }
  }, [])

  const handleImageClick = (image: (typeof initialTravelImages)[number]) => {
    if (suppressClickIdsRef.current.delete(image.id)) {
      return
    }

    setSelectedImage(image)
  }

  const handleImageLoad = (imageId: string, event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget
    const naturalWidth = img.naturalWidth
    const naturalHeight = img.naturalHeight
    const renderedWidth = img.clientWidth

    if (!naturalWidth || !naturalHeight || !renderedWidth) {
      return
    }

    const renderedHeight = (renderedWidth * naturalHeight) / naturalWidth

    const CARD_CHROME = 18
    const GRID_ROW_UNIT = 8
    const GRID_GAP = 24

    const cardHeight = renderedHeight + CARD_CHROME
    const rowSpan = Math.ceil((cardHeight + GRID_GAP) / (GRID_GAP + GRID_ROW_UNIT))

    setImageRowSpans((prev) => {
      if (prev[imageId] === rowSpan) {
        return prev
      }

      return {
        ...prev,
        [imageId]: rowSpan,
      }
    })
  }

  return (
    <section id="photography" className="photography">
      <h2 className="section-title">{t.title}</h2>
      <div className="photography-header">
        <p className="photography-subtitle">{t.subtitle}</p>
      </div>
      <TravelGlobe onSelectChongqing={() => {
        setChongqingOnly(true)
        galleryRef.current?.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          block: 'start',
        })
      }} />
      <div className="photography-collection">
        <h3>{chongqingOnly ? t.chongqing : t.allPhotos}</h3>
        <span aria-live="polite">{t.photoCount.replace('{count}', String(visibleImages.length))}</span>
        {chongqingOnly && (
          <button type="button" onClick={() => setChongqingOnly(false)}>
            {t.allPhotos}
          </button>
        )}
      </div>
      <div ref={galleryRef} className="photography-gallery">
        {visibleImages.map((image) => (
          <figure
            className={`photo-frame draggable-photo`}
            key={image.id}
            data-photo-id={image.id}
            style={{ '--row-span': imageRowSpans[image.id] ?? 30 } as React.CSSProperties}
          >
            <button
              type="button"
              className="photo-frame-button"
              onClick={() => handleImageClick(image)}
              aria-label={`${t.openPhoto}: ${image.alt}`}
            >
              <img
                src={image.thumbSrc}
                alt={image.alt}
                decoding="async"
                fetchPriority="low"
                loading="lazy"
                onLoad={(event) => handleImageLoad(image.id, event)}
              />
            </button>
          </figure>
        ))}
      </div>
      {selectedImage && (
        <div
          className="photo-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={t.lightbox}
          onClick={() => setSelectedImage(null)}
        >
          <div className="photo-lightbox-content" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="photo-lightbox-close"
              onClick={() => setSelectedImage(null)}
              aria-label={t.closePhoto}
            >
              ×
            </button>
            <img decoding="async" fetchPriority="high" src={selectedImage.fullSrc} alt={selectedImage.alt} />
          </div>
        </div>
      )}
    </section>
  )
}

export default Photography
