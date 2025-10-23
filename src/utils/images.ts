
// ~/utils/images.ts
import { isUnpicCompatible, unpicOptimizer, astroAssetsOptimizer } from './images-optimization';
import type { ImageMetadata } from 'astro';
import type { OpenGraph } from '@astrolib/seo';
import type { ImagesOptimizer } from './images-optimization';

/** The optimized image shape returned by our ImagesOptimizer */
type OptimizedImage = Awaited<ReturnType<ImagesOptimizer>>[0];

/* ------------------------------------------------------------------ */
/* Load all local images from /src/assets/images (eager, as modules)   */
/* ------------------------------------------------------------------ */
const load = async function () {
  try {
    // EAGER + default import ⇒ we get ImageMetadata directly
    const mods = import.meta.glob(
      '~/assets/images/**/*.{jpeg,jpg,png,tiff,webp,gif,svg,JPEG,JPG,PNG,TIFF,WEBP,GIF,SVG}',
      { eager: true, import: 'default' }
    ) as Record<string, ImageMetadata>;
    return mods;
  } catch {
    return undefined;
  }
};

let _images: Record<string, ImageMetadata> | undefined;

/** */
export const fetchLocalImages = async () => {
  _images = _images || (await load());
  return _images;
};

/* ------------------------------------------------------------------ */
/* Resolve frontmatter `image` to ImageMetadata or URL string          */
/* Supports:                                                          */
/*  - external URLs (http/https)                                      */
/*  - /public paths (/images/...)                                     */
/*  - explicit ~/assets/... paths                                     */
/*  - bare filenames like 'neurodesign.jpg' (looked up in assets/posts)*/
/* ------------------------------------------------------------------ */
export const findImage = async (
  imagePath?: string | ImageMetadata | null
): Promise<string | ImageMetadata | undefined | null> => {
  // Already ImageMetadata (from schema image() or prior resolution)
  if (typeof imagePath !== 'string') return imagePath;

  // External or /public path — just pass through as string URL
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('/')) {
    return imagePath;
  }

  const images = await fetchLocalImages();

  // 1) Explicit ~/assets/... path → direct key lookup
  if (imagePath.startsWith('~/assets/images')) {
    const key = imagePath.replace('~/', '/src/');
    return images && images[key] ? images[key] : null;
  }

  // 2) Bare filename OR subpath like 'posts/neurodesign.jpg'
  //    We match by trailing filename inside /src/assets/images/**
  if (images) {
    const filename = imagePath.split('/').pop()!;
    const match = Object.entries(images).find(([p]) => p.endsWith('/' + filename));
    if (match) return match[1];
  }

  // Not found in assets; return null (caller can fall back to <img> or ignore)
  return null;
};

/* ------------------------------------------------------------------ */
/* Open Graph helpers (unchanged except that findImage handles more)   */
/* ------------------------------------------------------------------ */
export const adaptOpenGraphImages = async (
  openGraph: OpenGraph = {},
  astroSite: URL | undefined = new URL('')
): Promise<OpenGraph> => {
  if (!openGraph?.images?.length) {
    return openGraph;
  }

  const images = openGraph.images;
  const defaultWidth = 1200;
  const defaultHeight = 626;

  const adaptedImages = await Promise.all(
    images.map(async (image) => {
      if (image?.url) {
        const resolvedImage = (await findImage(image.url)) as ImageMetadata | string | undefined;
        if (!resolvedImage) {
          return { url: '' };
        }

        let _image: OptimizedImage | undefined;

        if (
          typeof resolvedImage === 'string' &&
          (resolvedImage.startsWith('http://') || resolvedImage.startsWith('https://')) &&
          isUnpicCompatible(resolvedImage)
        ) {
          _image = (await unpicOptimizer(resolvedImage, [defaultWidth], defaultWidth, defaultHeight, 'jpg'))[0];
        } else if (resolvedImage) {
          const dimensions =
            typeof resolvedImage !== 'string' && resolvedImage?.width <= defaultWidth
              ? [resolvedImage?.width, resolvedImage?.height]
              : [defaultWidth, defaultHeight];
          _image = (await astroAssetsOptimizer(resolvedImage, [dimensions[0]], dimensions[0], dimensions[1], 'jpg'))[0];
        }

        if (typeof _image === 'object') {
          return {
            url: 'src' in _image && typeof _image.src === 'string' ? String(new URL(_image.src, astroSite)) : '',
            width: 'width' in _image && typeof _image.width === 'number' ? _image.width : undefined,
            height: 'height' in _image && typeof _image.height === 'number' ? _image.height : undefined,
          };
        }
        return { url: '' };
      }

      return { url: '' };
    })
  );

  return { ...openGraph, ...(adaptedImages ? { images: adaptedImages } : {}) };
};
