import { visit } from 'unist-util-visit';

// Build a map of filename -> bundled URL (recursively under activities/)
const globbed = import.meta.glob(
  '/src/assets/images/activities/**/*.{jpg,jpeg,png,webp,svg}',
  { eager: true, import: 'default' }
);

// Turn "path/to/file.jpg" -> "file.jpg" (lowercased) and store its URL
const assetByFilename: Record<string, string> = Object.fromEntries(
  Object.entries(globbed).map(([fullPath, mod]: [string, any]) => {
    const url = typeof mod === 'string' ? mod : mod?.src;
    const filename = fullPath.split('/').pop()!.toLowerCase();
    return [filename, url];
  })
);

function isAbsolute(url: string) {
  return /^([a-z]+:)?\/\//i.test(url) || url.startsWith('/');
}

/**
 * Markdown usage examples:
 *   ![Alt](expo-araya.jpg)              -> resolves from src/assets/images/activities/**
 *   ![Alt](some/subdir/expo-araya.jpg)  -> resolves by filename match as well
 *   ![Alt](/images/activities/foo.jpg)  -> left as-is (public path)
 */
export default function remarkResolveActivityImages() {
  return (tree: any) => {
    visit(tree, 'image', (node: any) => {
      const url: string = node.url;
      if (!url || isAbsolute(url)) return;

      const filename = url.split('/').pop()!.toLowerCase();
      const bundled = assetByFilename[filename];

      if (bundled) {
        node.url = bundled; // replace with Vite-bundled asset URL
        return;
      }

      // Fallback: assume it's in /public/images/activities/
      node.url = `/images/activities/${filename}`;
    });
  };
}

